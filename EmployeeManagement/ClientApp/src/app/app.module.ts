import { AgGridModule } from 'ag-grid-angular';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CompanyDetailsComponent } from './company-details/company-details.component';
import { ManageEmployeeComponent } from './manage-employee/manage-employee.component';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { ManageCompanyComponent } from './manage-company/manage-company.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CompanyDetailsComponent,
    ManageEmployeeComponent,
    ManageCompanyComponent
  ],
  imports: [
    AgGridModule.withComponents(null),
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ConfirmationPopoverModule.forRoot({
      confirmButtonType: 'danger' // set defaults here
    }),
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      {
        path: "companies/:id",
        component: CompanyDetailsComponent
      },
      {
        path: "edit-employee/:id",
        component: ManageEmployeeComponent
      },
      {
        path: "add-employee",
        component: ManageEmployeeComponent
      },
      {
        path: "edit-company/:id",
        component: ManageCompanyComponent
      },
      {
        path: "add-company",
        component: ManageCompanyComponent
      }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
