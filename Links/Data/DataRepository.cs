using Links.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Data.SqlClient;
using System.Linq;

namespace Links.Data
{
    public class DataRepository : IDataRepository
    {
        private readonly LinksContext _context;
        public DataRepository(LinksContext linksContext)
        {
            _context = linksContext;
        }

        public string GetLink(int id)
        {
            var link = _context.Link.Find(id);
            if (link == null)
            {
                return null;
            }
            return link.OriginalLink;
        }

        public int SaveLink(string originalLink, string userName)
        {
            var link = new Link
            {
                CreatedBy = userName,
                CreatedOn = DateTime.Now,
                OriginalLink = originalLink,
                Stats = Serialize.ToJson(new Stats
                {
                    Clicks = 0
                })
            };
            _context.Link.Add(link);
            _context.SaveChanges();
            int id = link.Id;
            return id;
        }

        public string UpdateAccessStats(int id, string ipAddress, DateTime timestamp, string userAgent, string browser, string os, string device)
        {
            var idParmeter = new SqlParameter("@Id", id);
            _context.Database.ExecuteSqlCommand(@"EXEC [dbo].[UpdateStats] @Id, @IpAddress, @TimeStamp, @UserAgent, @Browser, @Os, @Device",
                idParmeter,
                new SqlParameter("@IpAddress", ipAddress),
                new SqlParameter("@TimeStamp", timestamp),
                new SqlParameter("@UserAgent", userAgent),
                new SqlParameter("@Browser", browser),
                new SqlParameter("@Os", os),
                new SqlParameter("@Device", device));
            return null;
        }

        public Log[] GetLogsByLinkId(int linkId, string userName)
        {
            return _context.Log.Where(x => x.Link.Id == linkId && (x.Link.CreatedBy.ToUpper().Equals(userName.ToUpper()) || _context.ApplicationUsers.Where(a => a.UserName.Equals(userName)).Select(u => u.ApplicationId.ToString()).Contains(x.Link.CreatedBy))).OrderByDescending(x => x.Timestamp).ToArray();
        }
    }
}
