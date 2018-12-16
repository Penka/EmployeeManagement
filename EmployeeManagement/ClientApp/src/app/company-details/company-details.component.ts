import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Company } from '../models/company';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-company-details',
	templateUrl: './company-details.component.html',
})
export class CompanyDetailsComponent {
  public company: Company;
  private sub: any;

  constructor(
      private route: ActivatedRoute,
      private http: HttpClient,
      @Inject('BASE_URL') private baseUrl: string
  ) {
      this.company = new Company();
      this.company.name = "test name";
      this.company.address = "test address";
      this.company.id = 1;
  }

  ngOnInit() {
      this.sub = this.route.params.subscribe((params) => {
          const id = params['id']; 
          this.getCompanyDetail(id);
      });
  }

  getCompanyDetail(id: number) {
      const url = this.baseUrl + 'api/Companies/' + id;
    //   this.http.get<Company>(url).subscribe(result => {
    //     this.company = result;
    //   }, error => console.error(error));
  }
}
