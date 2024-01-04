import {Component, OnInit} from '@angular/core';
import { Router} from "@angular/router";
import {ExpensesService} from "../../services/expenses/expenses.service";
import {ExpenseClaimModel, ExpenseDetailModel, TotalClaimsPerTypePerEmployeeModel} from "../../Models/expenses.model";

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css']
})
export class ExpensesComponent implements OnInit {

  expenses: ExpenseClaimModel[] = [];
  expenseDetails: ExpenseDetailModel[]=[];
  DetailsPerEmp:TotalClaimsPerTypePerEmployeeModel[]=[];
  loadingIndicator = true;

  constructor(private expenseService: ExpensesService, private router: Router) {
  }

  ngOnInit() {

    this.fetchExpenses();
  }

  openExpenseClaimEntries(id: number) {
    const selectedRow = this.fetchSelectedRowDetails(id);
    if (selectedRow && selectedRow.employeeId !== undefined) {
      this.router.navigate(['/expense-claim-entries', id]);
       this.fetchTotalClaims(selectedRow.employeeId);
    } else {
      alert('Selected row or employeeId is undefined.');
    }
    // this.getDetails(id);
    console.log(selectedRow);

  }

  fetchTotalClaims(employeeId:number) {
    this.expenseService.getTotalClaimsPerTypePerEmployee(employeeId).subscribe((data) => {
      this.DetailsPerEmp = data;
      console.log(this.DetailsPerEmp);
    });
  }

  fetchSelectedRowDetails(employeeId: number): any {
   return this.expenses.find(row => row.employeeId === employeeId);
  }

//first data
  fetchExpenses() {
    this.expenseService.getExpensesHeader().subscribe((data) => {
      this.expenses = data;

    });
  }

  getDetails(id: number) {
    this.expenseService.getDetails(id).subscribe(details => {
      // console.log(details);
      this.expenseDetails = details;

    });
  }
}
