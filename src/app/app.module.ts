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
import { CustomActionsComponent } from './components/custom-actions/custom-actions.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { AddLeaveModalComponent } from './components/leaves/add-leave-modal/add-leave-modal.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import {LeavesService} from "./services/leaves/leaves.service";
import {EmployeeService} from "./services/employee/employee.service";
import { NgxPaginationModule } from 'ngx-pagination';
import { ExpenseClaimEntriesComponent } from './components/expense-claim-entries/expense-claim-entries.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    EmployeesComponent,
    LeavesComponent,
    ExpensesComponent,
    CustomActionsComponent,
    AddLeaveModalComponent,
    ExpenseClaimEntriesComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgSelectModule,
    NgxDatatableModule,
    NgxPaginationModule

  ],
  providers: [SidebarService,LeavesService, EmployeeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
