
using Microsoft.EntityFrameworkCore;
using System;

namespace Problem.Persistance.Database
{
    public class ProblemDbContext : DbContext
    {
        public DbSet<Domain.Problem> Problems { get; set; }

        public ProblemDbContext(DbContextOptions<ProblemDbContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
        }
    }
}
