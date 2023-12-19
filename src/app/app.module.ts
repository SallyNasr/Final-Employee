import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import {SidebarService} from "./services/sidebar.service";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmployeesComponent } from './components/employees/employees.component';
import { LeavesComponent } from './components/leaves/leaves.component';
import { ExpensesComponent } from './components/expenses/expenses.component';
import { HttpClientModule } from '@angular/common/http';
import { AddEmployeeModalComponent } from './components/add-employee-modal/add-employee-modal.component';
import { CustomActionsComponent } from './components/custom-actions/custom-actions.component';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    EmployeesComponent,
    LeavesComponent,
    ExpensesComponent,
    AddEmployeeModalComponent,
    CustomActionsComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgSelectModule


  ],
  providers: [SidebarService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
