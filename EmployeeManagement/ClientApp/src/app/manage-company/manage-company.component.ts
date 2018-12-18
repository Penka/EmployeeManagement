import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Company } from '../models/company';

@Component({
  selector: 'app-manage-company',
  templateUrl: './manage-company.component.html',
})
export class ManageCompanyComponent implements OnInit {
  private company: Company;
  private sub: any;
  private isNewCompany: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string
  ) {
      this.company = new Company();
      this.isNewCompany = true;

  }

  ngOnInit() {
      this.sub = this.route.params.subscribe((params) => {
          const id = params['id'];
          if (id != null) {
            this.isNewCompany = false;
             this.getCompanyDetail(id);
          }
      });
  }

  getCompanyDetail(id: number) {
      const url = this.baseUrl + 'api/Companies/' + id;
      this.http.get<Company>(url).subscribe(result => {
        this.company = result;
      }, error => console.error(error));
  }

  onSubmit() {
    const url = this.baseUrl + 'api/Companies/';
    if (this.isNewCompany) {
      this.http.post<any>(url, this.company).subscribe(data =>
        this.router.navigate(['companies/', data.id]),
      error => console.log(error));
    } else {
      this.http.put<any>(url + this.company.id, this.company).subscribe(data =>
        this.router.navigate(['companies/', this.company.id]),
        error => console.log(error));
    }
  }

}
