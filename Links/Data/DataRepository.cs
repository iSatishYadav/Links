using Links.Models;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
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
            return link.OriginalLink;
        }

        public string GetShortCodeByOriginalUrl(string originalLink)
        {
            var link = new Link { CreatedBy = "Satish", CreatedOn = DateTime.Now, OriginalLink = originalLink };
            _context.Link.Add(link);
            _context.SaveChanges();
            int id = link.Id;
            string shortCode = ShortUrl.Encode(id);
            return shortCode;
        }
    }
}
