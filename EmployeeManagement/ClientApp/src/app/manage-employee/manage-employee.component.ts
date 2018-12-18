import { Component, OnInit, Inject } from '@angular/core';
import { Employee } from '../models/employee';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Company } from '../models/company';
import { ExperienceLevelOptions, ExperienceLevel } from '../models/experienceLevel';

@Component({
  selector: 'app-manage-employee',
  templateUrl: './manage-employee.component.html',
})
export class ManageEmployeeComponent implements OnInit {
  private companyName: string;
  private experienceLevelOptions;
  private employee: Employee;
  private sub: any;
  private isNewEmployee: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string
  ) {
      this.employee = new Employee();
      this.isNewEmployee = true;
      this.experienceLevelOptions = ExperienceLevelOptions;
  }

  ngOnInit() {
      this.sub = this.route.params.subscribe((params) => {
          const id = params['id'];
          if(id != null) {
            this.isNewEmployee = false;
             this.getEmployeeDetail(id);
          } else {
            this.route.queryParams.subscribe(params => {
              this.companyName = params["companyName"];
              this.employee.company = new Company();
              this.employee.company.id = params["companyId"];
            });
          }
      });
  }

  getEmployeeDetail(id: number) {
      const url = this.baseUrl + 'api/Employees/' + id;
      this.http.get<Employee>(url).subscribe(result => {
        this.employee = result;
      }, error => console.error(error));
  }

  onSubmit(){
    const url = this.baseUrl + 'api/Employees/';
    if (this.isNewEmployee){
      this.http.post<any>(url, this.employee).subscribe(data =>
        this.router.navigate(['companies/' + this.employee.company.id]),
      error => console.log(error));
    } else {
      this.http.put<any>(url + this.employee.id, this.employee).subscribe(data =>
        this.router.navigate(['companies/' + this.employee.company.id]),
        error => console.log(error));
    }

  }

}
