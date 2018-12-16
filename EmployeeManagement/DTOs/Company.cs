using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace EmployeeManagement.DTOs
{
    public class Company
    {
        public Company()
        {
            this.Employees = new List<Employee>();
        }

        public int Id { get; set; }

        [Required]
        [MaxLength(200)]
        public string Name { get; set; }

        [Required]
        [MaxLength(400)]
        public string Address { get; set; }

        public List<Employee> Employees { get; set; }
    }
}
