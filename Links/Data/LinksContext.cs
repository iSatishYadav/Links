using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Links;

namespace Links.Models
{
    public class LinksContext : DbContext
    {
        public LinksContext (DbContextOptions<LinksContext> options)
            : base(options)
        {
        }

        public DbSet<Link> Link { get; set; }
    }
}
