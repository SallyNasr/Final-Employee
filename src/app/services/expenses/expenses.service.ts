import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {
  ExpenseClaimEntryModel,
  ExpenseClaimModel, ExpenseDetailModel,
  TotalClaimsPerTypePerEmployeeModel
} from "../../Models/expenses.model";

@Injectable({
  providedIn: 'root'
})
export class ExpensesService {
  private apiUrl = 'http://localhost:9090/expenseclaims'; // Replace with your actual API base URL

  constructor(private http: HttpClient) {}

  getExpenseClaimEntries(): Observable<ExpenseClaimEntryModel[]> {
    return this.http.get<ExpenseClaimEntryModel[]>(`http://localhost:9090/expenseclaimsentry/all`);
  }

  getExpensesHeader(): Observable<ExpenseClaimModel[]> {
    return this.http.get<ExpenseClaimModel[]>(`${this.apiUrl}/all`);
  }

  getTotalClaimsPerTypePerEmployee(employeeId: number): Observable<TotalClaimsPerTypePerEmployeeModel[]> {
    return this.http.get<TotalClaimsPerTypePerEmployeeModel[]>(`${this.apiUrl}/totalclaims/${employeeId}`);
  }

  getDetails(id: number): Observable<ExpenseDetailModel[]> {
    return this.http.get<ExpenseDetailModel[]>(`${this.apiUrl}/details/${id}`);
  }

  getTotalClaimsForExpenseClaim(expenseClaimId: number): Observable<TotalClaimsPerTypePerEmployeeModel[]> {
    return this.http.get<TotalClaimsPerTypePerEmployeeModel[]>(`${this.apiUrl}/totalclaims/${expenseClaimId}`);
  }

}
