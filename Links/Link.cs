using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Links
{
    public class Link
    {
        public int Id { get; set; }
        public string OriginalLink { get; set; }

        public string CreatedBy { get; set; }
        public DateTime CreatedOn { get; set; }
        public string Stats { get; set; }
    }
}
