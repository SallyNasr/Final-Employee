import {Component, OnInit} from '@angular/core';
import {LeavesService} from "../../services/leaves/leaves.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {LeaveModel, LeaveTypeModel} from "../../Models/leave.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {EmployeeModel} from "../../Models/employee.model";
import {EmployeeService} from "../../services/employee/employee.service";
import {ActivatedRoute} from "@angular/router";

// interface Page<T> {
//   content: T[];
//   totalPages: number;
//   totalElements: number;
// }
@Component({
  selector: 'app-leaves',
  templateUrl: './leaves.component.html',
  styleUrls: ['./leaves.component.css']
})
export class LeavesComponent implements OnInit {
  httpOptions={
    headers:new HttpHeaders({
      'Content-Type':'application/json',
    })
  }

  //   leaves: Page<LeaveModel[]> = { content: [], totalPages: 0, totalElements: 0 };
  //   leave:LeaveModel[]=[];
  // leavesData: LeaveModel[] = [];
  //
  //
  // employees:EmployeeModel[]=[];
  // leaveTypes: LeaveTypeModel[] = [];
  //
  //
  //
  // filterLeave:LeaveModel[]=[];
  //
  // currentPage: number = 1;
  // pageSize: number = 10;

  constructor(private httpClient: HttpClient, private leavesService: LeavesService, private employeeService: EmployeeService, private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    // this.getAllLeaves();
    //
    // this.route.params.subscribe(params => {
    //   const leaveType = params['leaveType'];
    //   const employeeId = params['employeeId'];
    //   if (leaveType !== undefined && employeeId !== undefined) {
    //     this.leavesService.getLeavesByTypeAndEmployee(leaveType, employeeId)
    //       .subscribe(leave => {
    //         this.leave = this.leavesData;
    //       });
    //   }
    // });
  }


  // getAllLeaves() {
  //   this.leavesService.getAllLeaves(this.currentPage, this.pageSize)
  //     .subscribe((data: Page<LeaveModel[]>) => {
  //       this.leaves = data;
  //       this.filterLeave=this.leavesData;
  //     });
  // }
  //
  // getAllEmployees() {
  //   this.employeeService.getAllEmployees().subscribe(
  //     data => {
  //       this.employees = data;
  //     });
  // }





}
