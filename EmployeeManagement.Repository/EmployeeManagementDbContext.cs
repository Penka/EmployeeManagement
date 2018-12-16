using EmployeeManagement.Data.Models;
using Microsoft.EntityFrameworkCore;

namespace EmployeeManagement.Repository
{
    public class EmployeeManagementDbContext : DbContext
    {
        public DbSet<Employee> Employees { get; set; }

        public DbSet<Company> Companies { get; set; }

        public EmployeeManagementDbContext(DbContextOptions options) : base(options)
        {
        }
    }
}
