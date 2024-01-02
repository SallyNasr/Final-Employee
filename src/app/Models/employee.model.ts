export class EmployeeModel {
  id?: number;
  address: string;
  departmentId?: number;
  email: string;
  name: string;
  department: DepartmentModel;

  constructor() {
    this.name = '';
    this.email = '';
    this.address = '';
    // this.departmentId = 0;
    this.department = new DepartmentModel();
  }
}

export class DepartmentModel{
  id?:number;
  name:string;
  constructor() {
    this.name='';
  }
}
