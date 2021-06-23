using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Problem.Api
{
    public class ApplicationDbContext : DbContext
    {
        public DbSet<Models.Problem> Problems { get; set; } //the table for problems

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options): base(options) { }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
        }
    }
}
