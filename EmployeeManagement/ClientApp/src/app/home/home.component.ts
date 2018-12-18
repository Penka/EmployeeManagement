import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Company } from '../models/company';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent {
  public popoverMessage: string = 'Are you sure you want to delete this company';
  public companies: Company[];

  constructor(private router: Router,
    private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string) {
    http.get<Company[]>(baseUrl + 'api/Companies/').subscribe(result => {
      this.companies = result;
    }, error => console.error(error));
  }
  editCompany(company: Company) {
    this.router.navigate(['edit-company', company.id]);
  }

  deleteCompany(company: Company): void {
    this.http.delete(this.baseUrl + 'api/Companies/' + company.id)
        .subscribe( data => {
          this.companies = this.companies.filter(e => e !== company);
        });
  }

  addCompany() {
    this.router.navigate(['add-company']);
  }
}


