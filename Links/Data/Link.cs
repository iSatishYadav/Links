using System;
using System.Collections.Generic;

namespace Links.Data
{
    public partial class Link
    {
        public Link()
        {
            Log = new HashSet<Log>();
        }

        public int Id { get; set; }
        public string OriginalLink { get; set; }
        public string CreatedBy { get; set; }
        public DateTime CreatedOn { get; set; }
        public string Stats { get; set; }

        public ICollection<Log> Log { get; set; }
    }
}
