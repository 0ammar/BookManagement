using Microsoft.EntityFrameworkCore;
using Domain.Entities;

namespace Infrastructure.Data
{
    public class ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : DbContext(options)
    {
        public DbSet<Category> Categories => Set<Category>();
        public DbSet<Book> Books => Set<Book>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Category>()
                .Property(c => c.Id)
                .ValueGeneratedOnAdd();

            modelBuilder.Entity<Book>()
                .HasMany(c => c.Categories)
                .WithMany(b => b.Books);

            modelBuilder.Entity<Book>()
                .OwnsOne(i => i.ISBN);
        }
    }
}