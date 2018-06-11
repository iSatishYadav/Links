using Links.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

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
                    Clicks = 0,
                    Log = new Log[]
                    {
                        new Log
                        {
                            Id = Guid.NewGuid(),
                            Ip = "",
                            Timestamp = DateTime.Now
                        }
                    }
                })
            };
            _context.Link.Add(link);
            _context.SaveChanges();
            int id = link.Id;
            return id;
        }

        public string UpdateAccessStats(int id, string ipAddress, DateTime timestamp, string userAgent)
        {
            var idParmeter = new SqlParameter("@Id", id);
            _context.Database.ExecuteSqlCommand(@"EXEC [dbo].[UpdateStats] @Id, @IpAddress, @TimeStamp, @UserAgent, @Browser, @Os, @Device",
                idParmeter, 
                new SqlParameter("@IpAddress", ipAddress), 
                new SqlParameter("@TimeStamp", timestamp), 
                new SqlParameter("@UserAgent", userAgent), 
                new SqlParameter("@Browser", ""), 
                new SqlParameter("@Os", ""), 
                new SqlParameter("@Device", ""));
            return null;
        }
    }
}
