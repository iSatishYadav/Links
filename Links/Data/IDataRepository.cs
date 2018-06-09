using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Links.Data
{
    public interface IDataRepository
    {
        string GetShortCodeByOriginalUrl(string originalLink);
        string GetOriginalLinkByShortCode(string shortLink);
    }
}
