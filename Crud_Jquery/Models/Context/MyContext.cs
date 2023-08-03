using Crud_Jquery.Models.Entity;
using Microsoft.EntityFrameworkCore;

namespace Crud_Jquery.Models.Context
{
    public class MyContext:DbContext
    {
        public MyContext(DbContextOptions<MyContext> options) : base(options) { }

        public DbSet<Product> Products { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Brand> Brands { get; set; }
    }
}
