using AutoMapper;
using EmployeeManagement.DTOs;

using DbEmployee = EmployeeManagement.Data.Models.Employee;

namespace EmployeeManagement.Helpers
{
    public class EmployeesTypeConverter : ITypeConverter<Employee, DbEmployee>
    {
        public DbEmployee Convert(DTOs.Employee source, DbEmployee destination, ResolutionContext context)
        {
            DbEmployee result = new DbEmployee()
            {
                CompanyId = source.Company.Id,
                Id = source.Id,
                ExperienceLevel = (EmployeeManagement.Data.Models.ExperienceLevel)source.ExperienceLevel,
                Name = source.Name,
                StartDate = source.StartDate,
                Salary = source.Salary,
                VacationDays = source.VacationDays
            };

            return result;
        }
    }
}
