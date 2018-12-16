using EmployeeManagement.Data.Models;
using EmployeeManagement.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace EmployeeManagement.Repository
{
    public class EmployeesRepository : Repository<Employee>, IEmployeesRepository
    {
        public EmployeesRepository(EmployeeManagementDbContext context) : base(context)
        {
        }

        public override Employee Get(int id) =>
           _entities.AsNoTracking().Include(c => c.Company).FirstOrDefault(c => c.Id == id);
    }
}
