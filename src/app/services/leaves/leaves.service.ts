// import { Injectable } from '@angular/core';
// import {Observable, of} from "rxjs";
// import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
// import {LeaveModel} from "../../Models/leave.model";
// import {catchError, tap} from "rxjs/operators";
// import {EmployeeModel} from "../../Models/employee.model";
//
//
// interface Page<T> {
//   content: T[];
//   totalPages: number;
//   totalElements: number;
// }
//
// @Injectable({
//   providedIn: 'root'
// })
//
//
// export class LeavesService {
//
//   leaves: LeaveModel[] = [];
//
//   private apiUrl = 'http://localhost:9090/api/leaves';
//
//   constructor(private http: HttpClient) {}
//
//   httpOptions = {
//     headers: new HttpHeaders({ 'Content-Type': 'application/json' })
//   };
//   getLeavesByLeaveTypeAndEmployeeId(
//     leaveType: number,
//     employeeId: number,
//     page: number = 0,
//     size: number = 10
//   ):
//     Observable<Page<LeaveModel>> {
//     const params = new HttpParams()
//       .set('leaveType', leaveType.toString())
//       .set('employeeId', employeeId.toString())
//       .set('page', page.toString())
//       .set('size', size.toString());
// console.log(params);
//     return this.http.get<Page<LeaveModel>>(
//       `${this.apiUrl}/byTypeAndEmployee`,
//       { params }
//     );
//   }
//
//   getLeavesByTypeAndEmployee(leaveType: number, employeeId: number): Observable<LeaveModel[]> {
//     const params = new HttpParams()
//       .set('leaveType', leaveType.toString())
//       .set('employeeId', employeeId.toString());
//
//     const url = `${this.apiUrl}/getLeavesByTypeAndEmployee?leaveType=${leaveType}&employeeId=${employeeId}`;
//     return this.http.get<LeaveModel[]>(url,{params});
//   }
//
//   addLeave(leaveData: LeaveModel): Observable<object> {
//     // const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
//     return this.http.post(`${this.apiUrl}/add`, leaveData, { withCredentials: true });
//   }
//
//   getAllLeaves(): Observable<LeaveModel[]> {
//     return this.http.get<LeaveModel[]>(`${this.apiUrl}/all`);
//   }
//
//   getAllEmployees(): Observable<EmployeeModel[]> {
//     return this.http.get<EmployeeModel[]>(`${this.apiUrl}/all`);
//   }
//
//
//   updateLeave(id: number,updatedLeave:LeaveModel): Observable<object> {
//     return this.http.patch(`${this.apiUrl}/update/${id}`, updatedLeave);
//   }
//
//   deleteLeave(id: number): Observable<object> {
//     const deleteUrl=`${this.apiUrl}/delete/${id}`
//     return this.http.delete(deleteUrl)
//   }
//
//   searchLeave(term: string): Observable<any[]> {
//     if (!term.trim()) {
//       return of([]);
//     }
//     return this.http.get<LeaveModel[]>(`${this.apiUrl}/?name=${term}`).pipe(
//       tap(x => x.length ?
//         this.log(`found leaves matching "${term}"`) :
//         this.log(`no leaves matching "${term}"`)),
//       catchError(this.handleError<LeaveModel[]>('searchLeave', []))
//     );
//   }
//
//   private handleError<T>(operation = 'operation', result?: T) {
//     return (error: any): Observable<T> => {
//       console.error(error);
//       return of(result as T);
//     };
//   }
//
//   private log(message: string) {
//     alert(message)
//   }
// }

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { LeaveModel } from '../../Models/leave.model';
import { catchError, tap } from 'rxjs/operators';
import { EmployeeModel } from '../../Models/employee.model';

interface Page<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
}

@Injectable({
  providedIn: 'root',
})
export class LeavesService {
  leaves: LeaveModel[] = [];

  private apiUrl = 'http://localhost:9090/api/leave';

  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  // getLeavesByTypeAndEmployee(
  //   leaveType: number,
  //   employeeId: number
  // ): Observable<LeaveModel[]> {
  //   const params = new HttpParams()
  //     .set('leaveType', leaveType.toString())
  //     .set('employeeId', employeeId.toString());
  //   const url = `${this.apiUrl}/getLeavesByTypeAndEmployee`;
  //   return this.http.get<LeaveModel[]>(url, { params });
  // }

  addLeave(leaveData: LeaveModel): Observable<object> {
    return this.http.post(`${this.apiUrl}/submit`, leaveData, { withCredentials: true });
  }

  getAllLeaves(page: number, size: number): Observable<Page<LeaveModel[]>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<Page<LeaveModel[]>>(`${this.apiUrl}/all`, { params });
  }

  getAllEmployees(): Observable<EmployeeModel[]> {
    return this.http.get<EmployeeModel[]>(`${this.apiUrl}/all`);
  }

  updateLeave(id: number, updatedLeave: LeaveModel): Observable<object> {
    return this.http.patch(`${this.apiUrl}/update/${id}`, updatedLeave);
  }

  deleteLeave(id: number): Observable<object> {
    const deleteUrl = `${this.apiUrl}/delete/${id}`;
    return this.http.delete(deleteUrl);
  }

  searchLeave(term: string): Observable<any[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<LeaveModel[]>(`${this.apiUrl}/?name=${term}`).pipe(
      tap((x) =>
        x.length
          ? this.log(`found leaves matching "${term}"`)
          : this.log(`no leaves matching "${term}"`)
      ),
      catchError(this.handleError<LeaveModel[]>('searchLeave', []))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

  private log(message: string) {
    alert(message);
  }

  // getLeavesByType(typeId: number): Observable<LeaveModel[]> {
  //   const url = `${this.apiUrl}/leaves/${typeId}`;
  //   return this.http.get<LeaveModel[]>(url);
  // }

  getLeavesByTypeAndEmployee(leaveType: number, employeeId: number, page: number, size: number): Observable<any> {
    const url = `${this.apiUrl}/byTypeAndEmployee?leaveType=${leaveType}&employeeId=${employeeId}&page=${page}&size=${size}`;
    return this.http.get(url);
  }

  createLeave(leaveData: any): Observable<any> {
    const url = `${this.apiUrl}/createLeave`;
    return this.http.post(url, leaveData);
  }
}
