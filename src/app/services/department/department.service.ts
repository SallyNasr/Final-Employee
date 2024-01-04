import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {DepartmentModel} from "../../Models/department.model";

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

 private apiUrl = 'http://localhost:9090/api/departments';

  constructor(private http: HttpClient) {}
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };


  getAllDepartments(): Observable<DepartmentModel[]> {
    return this.http.get<DepartmentModel[]>(`${this.apiUrl}/all`);
  }

}
