using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Links.Data
{
    public interface IDataRepository
    {
        int SaveLink(string originalLink, string userName);
        string GetLink(int shortLink);    
        string UpdateAccessStats(int id, string ipAddress, DateTime timestamp, string userAgent, string browser, string os, string device);
        Log[] GetLogsByLinkId(int linkId, string userName);
    }
}
