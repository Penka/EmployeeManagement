import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Company } from '../models/company';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { Employee } from '../models/employee';
import { ExperienceLevelOptions } from '../models/experienceLevel';

@Component({
  selector: 'app-company-details',
	templateUrl: './company-details.component.html',
})
export class CompanyDetailsComponent {
  public company: Company;
  private experienceLevelOptions;
  public popoverMessage: string = 'Are you sure you want to delete this employee';
  private sub: any;

  constructor(
      private route: ActivatedRoute,
      private http: HttpClient,
      private router: Router,
      @Inject('BASE_URL') private baseUrl: string
  ) {
       this.company = new Company();
       this.experienceLevelOptions = ExperienceLevelOptions;
  }

  ngOnInit() {
      this.sub = this.route.params.subscribe((params) => {
          const id = params['id'];
          this.getCompanyDetail(id);
      });
  }

  getCompanyDetail(id: number) {
      const url = this.baseUrl + 'api/Companies/' + id;
      this.http.get<Company>(url).subscribe(result => {
        this.company = result;
      }, error => console.error(error));
  }

  editEmployee(employee) {
    this.router.navigate(['edit-employee', employee.id]);
  }

  deleteEmployee(employee: Employee): void {
    this.http.delete(this.baseUrl + 'api/Employees/' + employee.id)
        .subscribe( data => {
          this.company.employees = this.company.employees.filter(e => e !== employee);
        });
  }

  addEmployee() {
    const navigationExtras: NavigationExtras = {
        queryParams: {
            'companyId': this.company.id,
            'companyName': this.company.name
        }
    };

    this.router.navigate(['add-employee'], navigationExtras);
  }
}
