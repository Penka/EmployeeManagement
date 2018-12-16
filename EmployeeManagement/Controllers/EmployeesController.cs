using AutoMapper;
using EmployeeManagement.DTOs;
using EmployeeManagement.Repository.Interfaces;
using Microsoft.AspNetCore.Mvc;

using DbEmployee = EmployeeManagement.Data.Models.Employee;

namespace EmployeeManagement.Controllers
{
    [Route("api/[controller]")]
    public class EmployeesController : Controller
    {
        private readonly IEmployeesRepository _employeesRepository;

        public EmployeesController(IEmployeesRepository employeesRepository)
        {
            _employeesRepository = employeesRepository;
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var employeeDetails = _employeesRepository.Get(id);

            if (employeeDetails == null)
            {
                return NotFound();
            }

            return Ok(Mapper.Map<Employee>(employeeDetails));
        }

        [HttpPost]
        public IActionResult Post([FromBody]Employee employee)
        {
            var dbEmployee = Mapper.Map<DbEmployee>(employee);

            _employeesRepository.Add(dbEmployee);
            _employeesRepository.SaveChanges();

            return CreatedAtAction("Get", new { id = dbEmployee.Id }, Mapper.Map<Employee>(dbEmployee));
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody]Employee employee)
        {
            var employeeDetails = _employeesRepository.Get(id);

            if (employeeDetails == null)
            {
                return NotFound();
            }

            var dbEmployee = Mapper.Map<DbEmployee>(employee);

            _employeesRepository.Update(dbEmployee);
            _employeesRepository.SaveChanges();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var employeeDetails = _employeesRepository.Get(id);

            if (employeeDetails == null)
            {
                return NotFound();
            }

            _employeesRepository.Remove(employeeDetails);
            _employeesRepository.SaveChanges();

            return NoContent();
        }
    }
}
