using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace EmployeeManagement.Data.Models
{
    public class Company
    {
        [Key]
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
