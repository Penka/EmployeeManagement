import { Component, OnInit, Inject } from '@angular/core';
import { Employee } from '../models/employee';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Company } from '../models/company';

@Component({
  selector: 'app-manage-employee',
  templateUrl: './manage-employee.component.html',
})
export class ManageEmployeeComponent implements OnInit {
  private companyName: string;
  
  private employee: Employee;
  private sub: any; 
  private isNewEmployee: boolean;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string
  ) {
      this.employee = new Employee();
      this.isNewEmployee = true; 
      
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

              console.log(this.employee);
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
    this.http.post<any>(url, this.employee).subscribe(data => console.log(data), error => console.log(error));
  }

}