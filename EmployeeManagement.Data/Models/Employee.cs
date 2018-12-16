using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EmployeeManagement.Data.Models
{
    public class Employee
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(200)]
        public string Name { get; set; }

        [Required]
        public DateTime StartDate { get; set; }

        [Required]
        [Range(0, double.MaxValue)]
        [RegularExpression(@"\d+(\.\d{1,2})?", ErrorMessage = "Invalid salary")] // 2 symbols after decimal point
        public double Salary { get; set; }

        [Required]
        [Range(0, 40)]
        public int VacationDays { get; set; }
        
        [Required]
        public ExperienceLevel ExperienceLevel { get; set; }

        [Required]
        [ForeignKey("Company")]
        public int CompanyId { get; set; }

        public Company Company { get; set; }
    }
}
