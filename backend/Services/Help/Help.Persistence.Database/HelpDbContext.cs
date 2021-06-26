using Microsoft.EntityFrameworkCore;
using System;

namespace Help.Persistence.Database
{
    public class HelpDbContext : DbContext 
    {
        public DbSet<Domain.Help> Helps { get; set; }

        public HelpDbContext(DbContextOptions<HelpDbContext> options): base(options) { }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
        }
    }
}
