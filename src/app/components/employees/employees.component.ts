import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {EmployeeService} from "../../services/employee/employee.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DepartmentService} from "../../services/department/department.service";
import {DepartmentModel} from "../../Models/department.model";
import { EmployeeModel} from "../../Models/employee.model";

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  httpOptions={
    headers:new HttpHeaders({
      'Content-Type':'application/json',
    })
  }
  employees: EmployeeModel[] = [];
  isModalVisible = false;
  isDeleteModalVisible = false;
  isEditModalVisible = false;
  editedEmployee: any = {};
  deletedEmployee:any={};
  editEmployeeForm: FormGroup;

  addEmployeeForm:FormGroup;
  selectedEmployee: EmployeeModel | any;
  departments: DepartmentModel[]= [];

  searchTerm: string = '';
  selectedDepartment:DepartmentModel[]=[];

  filterEmployee:EmployeeModel[]=[];

  constructor(private httpClient: HttpClient, private employeeService: EmployeeService, private fb: FormBuilder,private departmentService: DepartmentService) {
    this.editEmployeeForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      departmentId: [null, Validators.required],
    });

    this.addEmployeeForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      departmentId: [null, Validators.required],

    });

    }

  ngOnInit(): void {
    this.getAllEmployees();
    this.getAllDepartments();
  }

  getAllEmployees() {
    this.employeeService.getAllEmployees().subscribe(
      data => {
        this.employees = data;
        this.filterEmployee=this.employees;
      });
  }

  openEditModal(employee: EmployeeModel): void {
    this.isEditModalVisible = true;

    this.editEmployeeForm.patchValue({
      name: employee.name,
      email: employee.email,
      address: employee.address,
      departmentId: employee.departmentId,
    });
    this.editedEmployee = employee;
  }

  openDeleteModal(employee: EmployeeModel): void {
    this.isDeleteModalVisible = true;

     this.deletedEmployee = employee;
  }

  closeEditModal() {
    this.isEditModalVisible = false;
  }

  closeDeleteModal() {
    this.isDeleteModalVisible = false;
  }

  closeModal() {
    this.isModalVisible = false;
  }

  addEmployee() {
    console.log("addEmployee", this.addEmployeeForm.value);
    const newEmployee:EmployeeModel= {
      name: this.addEmployeeForm.get('name')?.value,
      email: this.addEmployeeForm.get('email')?.value,
      address: this.addEmployeeForm.get('address')?.value,
      departmentId: this.addEmployeeForm.get('departmentId')?.value,
      department: {
        id: this.addEmployeeForm.get('department')?.value,
        name: this .addEmployeeForm.get('name')?.value,
      },
    };

      this.employeeService.addEmployee(newEmployee).subscribe(
        (response) => {
          console.log('Employee added successfully:',response);
          this.getAllEmployees();
          this.isModalVisible = false;
        },
        (error) => {
          console.error('Error adding employee:', error);
          console.error('Full error response:', error.error);
        }
      );
    }

  onDepartmentChange(event: any) {
    this.addEmployeeForm.patchValue({
      departmentId: event.target.value,
    });
  }


  updateEmployee(): void {
    if (this.editEmployeeForm.valid) {
      const updatedEmployee = this.editEmployeeForm.value;
      const employeeId = this.editedEmployee.id;
      updatedEmployee.departmentId = +this.editEmployeeForm.get('departmentId')?.value;

      this.employeeService.updateEmployee(employeeId, updatedEmployee).subscribe(
        (response) => {
          console.log('Employee updated successfully:', response);
          this.getAllEmployees();
        }, (error) => {
          console.error('Error updating employee:', error);
        }
      );
      this.isEditModalVisible = false;
    }
  }

  deleteEmployee():void {
    const employeeId = this.deletedEmployee.id;
      this.employeeService.deleteEmployee(employeeId).subscribe( data => {
        console.log(data);
        this.getAllEmployees();
        this.closeDeleteModal()
      });
    }


  applySearchFilter(): void {
      this.filterEmployee = this.employees.filter((employee) =>
        employee.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }

   filteredEmployees(): EmployeeModel[] {
    if (this.searchTerm.trim() === '') {
      return this.employees;
    }
    const lowerCaseQuery = this.searchTerm.toLowerCase();
    return this.employees.filter(employee =>
      employee.name.toLowerCase().includes(lowerCaseQuery)
    );
  }

  getAllDepartments(): void {
    console.log('Calling getAllDepartments');
    this.departmentService.getAllDepartments().subscribe(
      (departments) => {
        console.log('Departments received:', departments);
        this.departments = departments;
      },
      (error) => {
        console.error('Error fetching departments:', error);
      }
    );
  }

}
