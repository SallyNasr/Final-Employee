import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {EmployeesComponent} from "./components/employees/employees.component";
import {LeavesComponent} from "./components/leaves/leaves.component";
import {ExpensesComponent} from "./components/expenses/expenses.component";
import {ExpenseClaimEntriesComponent} from "./components/expense-claim-entries/expense-claim-entries.component";

const routes: Routes = [
  { path: 'employees', component: EmployeesComponent },
  { path: 'leaves', component: LeavesComponent },
  { path: 'expenses', component: ExpensesComponent },
  { path: '', redirectTo: '/employees', pathMatch: 'full' },
  { path: 'expense-claim-entries/:id', component: ExpenseClaimEntriesComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
