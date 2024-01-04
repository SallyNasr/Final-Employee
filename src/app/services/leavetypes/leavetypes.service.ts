import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {LeaveTypeModel} from "../../Models/leave.model";

@Injectable({
  providedIn: 'root'
})
export class LeavetypesService {
private apiUrl = 'http://localhost:9090/api/leavetype';

constructor(private http: HttpClient) {}
httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


getAllLeaveTypes(): Observable<LeaveTypeModel[]> {
  return this.http.get<LeaveTypeModel[]>(`${this.apiUrl}/all`);
}

}
