import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {
  EntriesDetailModel,
  ExpenseClaimEntryModel, ExpenseClaimModel,
  ExpenseDetailModel,
  TotalClaimsPerTypePerEmployeeModel
} from "../../Models/expenses.model";
import {ExpensesService} from "../../services/expenses/expenses.service";

@Component({
  selector: 'app-expense-claim-entries',
  templateUrl: './expense-claim-entries.component.html',
  styleUrls: ['./expense-claim-entries.component.css']
})
export class ExpenseClaimEntriesComponent implements OnInit {
  expenseClaimId: number=0;
  employeeId: number=0;

  // TotalEntries: TotalClaimsPerTypePerEmployeeModel[];
  expenseClaimEntries:ExpenseClaimEntryModel[];
  expenseDetails: ExpenseDetailModel[]=[];
  entryDTOs:EntriesDetailModel[]=[];
  DetailsPerEmp:TotalClaimsPerTypePerEmployeeModel[]=[];

  expenses: ExpenseClaimModel[] = [];

  constructor(private route: ActivatedRoute, private expenseService: ExpensesService, private router: Router) {

    this.expenseClaimEntries=[];
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      console.log('Route Params:', params);
      this.employeeId = +params['employeeId'];
      this.expenseClaimId = +params['id'];

      // this.fetchExpenseClaimEntries();
      this.fetchTotalClaims();
    });
  }
  goBack() {
    this.router.navigate(['/expenses']);
  }

  fetchExpenseClaimEntries() {
    this.expenseService.getExpenseClaimEntries().subscribe((entries) => {
      this.expenseClaimEntries = entries;
    });
  }

  fetchTotalClaims() {
    this.expenseService.getTotalClaimsForExpenseClaim(this.expenseClaimId).subscribe((data) => {
      this.DetailsPerEmp = data;
      console.log(this.DetailsPerEmp);
    });
  }
}
