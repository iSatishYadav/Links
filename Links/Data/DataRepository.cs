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

        public string GetOriginalLinkByShortCode(string shortCode)
        {
            int id = ShortUrl.Decode(shortCode);
            var link = _context.Link.Find(id);
            if (link == null)
            {
                return null;
            }
            UpdateAccessStats(id);
            return link.OriginalLink;
        }

        public string CreateShortCodeFromOriginalUrl(string originalLink, string userName)
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
                            //TODO: Get IP
                            Ip = "",
                            Timestamp = DateTime.Now
                        }
                    }
                })
            };
            _context.Link.Add(link);
            _context.SaveChanges();
            int id = link.Id;
            string shortCode = ShortUrl.Encode(id);
            return shortCode;
        }

        public string UpdateAccessStats(int id)
        {
            var idParmeter = new SqlParameter("@Id", id);
            _context.Database.ExecuteSqlCommand(@"UPDATE [dbo].Link SET Stats = JSON_MODIFY(Stats, '$.clicks', JSON_VALUE(Stats, '$.clicks') + 1) WHERE Id = @Id", idParmeter);
            return null;
        }
    }
}
