import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, of, pipe} from "rxjs";
import { catchError, map, tap } from 'rxjs/operators';
import {Employee} from "../../components/employees/employees.component";

// interface Employee {
//   id: number;
//   name: string;
//   phoneNumber: string;
//   email:string;
//   department:number;
// }

@Injectable({
  providedIn: 'root',
})


export class EmployeeService {
  employees: Employee[] = [];

  private apiUrl = 'https://8080/api/employees';

  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getAllEmployees(): Observable<Employee[]> {
// return this.httpClient.get<any[]>(this.apiUrl);

    const fakeData: Employee[] = [
      { id: 1, name: 'John Doe', phoneNumber: '961258964', email: 'john@example.com', department: 1 },
      { id: 2, name: 'Jane Doe', phoneNumber: '961255562', email: 'jane@example.com', department: 2 },

    ];
     return of(fakeData);
   }

  addEmployee(employeeData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/add`, employeeData);
  }

  updateEmployee(id: number, employeeData: Employee): Observable<string> {
    //get the data of the selected row to be updated and add them int the inputs
    return this.http.patch<string>(`${this.apiUrl}/update/${id}`, employeeData);
  }

  deleteEmployee(id: number): Observable<Employee> {
    const deleteUrl=`${this.apiUrl}/delete/${id}`
    return this.http.delete<Employee>(deleteUrl, this.httpOptions).pipe(
      tap(_ => this.log(`deleted employee of id=${id}`)),
      catchError(this.handleError<Employee>('delete Employee'))
    );
  }

  searchEmployee(term: string): Observable<any[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Employee[]>(`${this.apiUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
        this.log(`found heroes matching "${term}"`) :
        this.log(`no heroes matching "${term}"`)),
      catchError(this.handleError<Employee[]>('searchHeroes', []))
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
