import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Company } from '../models/company';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent {
  public companies: Company[];

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<Company[]>(baseUrl + 'api/Companies/').subscribe(result => {
      this.companies = result;
    }, error => console.error(error));
  }
}


