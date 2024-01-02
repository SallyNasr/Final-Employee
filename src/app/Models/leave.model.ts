export class LeaveModel{
  id?:number | null;
  leaveType:number;
  typeOfLeaves:LeaveTypeModel;
  fromDate:Date;
  toDate:Date;
  numberOfDays:number;
  note:String;
  employeeId:number;
  employeeName:EmployeeModel;
  constructor() {
    this.id = null;
    this.leaveType =0;
    this.typeOfLeaves= new LeaveTypeModel();
    this.fromDate = new Date();
    this.toDate = new Date();
    this.numberOfDays =0;
    this.note = '';
    this.employeeId=0;
    this.employeeName = new EmployeeModel();
  }
}

export class LeaveTypeModel {
  id?:number;
  name: string;

  constructor() {
    this.name = '';
  }
}
export class EmployeeModel{
  id?:number;
  name:string;

  constructor() {
    this.name = '';
  }

}
// export class DepartmentModel {
//   id: number;
//   name: string;
// }
