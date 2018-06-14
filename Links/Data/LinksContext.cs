using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace Links.Data
{
    public partial class LinksContext : DbContext
    {
        public LinksContext()
        {
        }

        public LinksContext(DbContextOptions<LinksContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Link> Link { get; set; }
        public virtual DbSet<Log> Log { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Link>(entity =>
            {
                entity.Property(e => e.CreatedBy)
                    .IsRequired()
                    .HasMaxLength(200);

                entity.Property(e => e.OriginalLink).IsRequired();
            });

            modelBuilder.Entity<Log>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Browser).HasMaxLength(100);

                entity.Property(e => e.Device).HasMaxLength(100);

                entity.Property(e => e.IpAddress).HasMaxLength(50);

                entity.Property(e => e.Os).HasMaxLength(50);

                entity.HasOne(d => d.Link)
                    .WithMany(p => p.Log)
                    .HasForeignKey(d => d.LinkId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Log_Link");
            });
        }
    }
}
