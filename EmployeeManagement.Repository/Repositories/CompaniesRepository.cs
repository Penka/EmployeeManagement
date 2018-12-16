using EmployeeManagement.Data.Models;
using EmployeeManagement.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace EmployeeManagement.Repository
{
    public class CompaniesRepository : Repository<Company>, ICompaniesRepository
    {
        public CompaniesRepository(EmployeeManagementDbContext context) : base(context)
        {
        }

        public override Company Get(int id) => 
            _entities.AsNoTracking().Include(c => c.Employees).FirstOrDefault(c => c.Id == id);
    }
}

