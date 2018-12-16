using AutoMapper;
using EmployeeManagement.DTOs;
using EmployeeManagement.Repository.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

using DbCompany = EmployeeManagement.Data.Models.Company;

namespace EmployeeManagement.Controllers
{
    [Route("api/[controller]")]
    public class CompaniesController : Controller
    {
        private readonly ICompaniesRepository _companiesRepository;

        public CompaniesController(ICompaniesRepository companiesRepository)
        {
            _companiesRepository = companiesRepository;
        }
        
        [HttpGet]
        public IActionResult Get()
        {
            var allCompanies = _companiesRepository.GetAll();
            return Ok(Mapper.Map<IEnumerable<Company>>(allCompanies));
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var companyDetails = _companiesRepository.Get(id);

            if (companyDetails == null)
            {
                return NotFound();
            }

            return Ok(Mapper.Map<Company>(companyDetails));
        }

        [HttpPost]
        public IActionResult Post([FromBody]Company company)
        {
            var dbCompany = Mapper.Map<DbCompany>(company);

            _companiesRepository.Add(dbCompany);
            _companiesRepository.SaveChanges();

            return CreatedAtAction("Get", new { id = dbCompany.Id }, Mapper.Map<Company>(dbCompany));
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody]Company company)
        {
            var companyDetails = _companiesRepository.Get(id);

            if (companyDetails == null)
            {
                return NotFound();
            }

            var dbCompany = Mapper.Map<DbCompany>(company);

            _companiesRepository.Update(dbCompany);
            _companiesRepository.SaveChanges();

            return NoContent();
        }
        
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var companyDetails = _companiesRepository.Get(id);

            if (companyDetails == null)
            {
                return NotFound();
            }

            _companiesRepository.Remove(companyDetails);
            _companiesRepository.SaveChanges();

            return NoContent();
        }
    }
}
