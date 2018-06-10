using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Links.Data
{
    public interface IDataRepository
    {
        string CreateShortCodeFromOriginalUrl(string originalLink, string userName);
        string GetOriginalLinkByShortCode(string shortLink);    
        string UpdateAccessStats(int id);
    }
}
