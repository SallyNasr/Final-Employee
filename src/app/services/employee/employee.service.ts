import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, of} from "rxjs";
import { catchError, tap } from 'rxjs/operators';
import { EmployeeModel} from "../../Models/employee.model";

@Injectable({
  providedIn: 'root',
})


export class EmployeeService {
  employees: EmployeeModel[] = [];

  private apiUrl = 'http://localhost:9090/api/employees';

  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getAllEmployees(): Observable<EmployeeModel[]> {
    return this.http.get<EmployeeModel[]>(`${this.apiUrl}/all`);
   }

  addEmployee(employeeData: EmployeeModel): Observable<object> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.apiUrl}/add`, employeeData, { headers });

  }
  updateEmployee(id: number,employeeData:EmployeeModel[]): Observable<object> {
    return this.http.patch(`${this.apiUrl}/update/${id}`, employeeData);
  }

  deleteEmployee(id: number): Observable<object> {
    const deleteUrl=`${this.apiUrl}/delete/${id}`
    return this.http.delete(deleteUrl)
  }

  searchEmployee(term: string): Observable<any[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<EmployeeModel[]>(`${this.apiUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
        this.log(`found employees matching "${term}"`) :
        this.log(`no employees matching "${term}"`)),
      catchError(this.handleError<EmployeeModel[]>('searchEmployee', []))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

  private log(message: string) {
   alert(message)
  }

}
