import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {EmployeeService} from "../../services/employee/employee.service";
import {FormBuilder, FormControl, FormControlName, FormGroup, Validators} from "@angular/forms";

export interface Employee {
  id: number;
  name: string;
  phoneNumber: string;
  email:string;
  department:number;
}

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  employees: any[] = [];
  isModalVisible =false;
  isDeleteModalVisible=false;
  isEditModalVisible=false;
  editedEmployee: any = {};

  editEmployeeForm:FormGroup;
  // selectedName:FormControl;
  // selectedEmail:FormControl;
  // selectedAddress:FormControl;
  // selectedDepartmentId:FormControl;


  constructor(private httpClient: HttpClient,private employeeService: EmployeeService, private fb: FormBuilder) {
    // this.selectedName=new FormControl();
    // this.selectedEmail=new FormControl();
    // this.selectedAddress=new FormControl();
    // this.selectedDepartmentId=new FormControl();
    this.editEmployeeForm=this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      department: ['', Validators.required],
    })
  }

  ngOnInit(): void {
    this.getAllEmployees();
  }

  // onSearch(query:string=''){
  //   this.employees.setFilter([
  //     {
  //       field:'name',
  //       search:query,
  //     }
  //   ],false
  //   );
  // }

  getAllEmployees(): void {
    this.employeeService.getAllEmployees().subscribe(
      (data: any[]) => {
        this.employees = data;
        console.log('All employees:', this.employees);
      },
      (error) => {
        console.error('Error fetching employees:', error);
      }
    );
  }

  // addFakeEmployee(): void {
  //   const fakeEmployee = {
  //     id: this.employees.length + 1,
  //     name: 'Fake Employee',
  //     phoneNumber: '123 Test St',
  //     email: 'fake@example.com',
  //     department: 3,
  //   };
  //
  //   this.employeeService.addEmployee(fakeEmployee);
  //   this.getAllEmployees(); // Refresh the employee list
  // }

  closeEditModal() {
    this.isEditModalVisible = false;
  }
  closeDeleteModal(){
    this.isDeleteModalVisible = false;
  }
  closeModal() {
    this.isModalVisible = false;
  }

  addEmployee() {
    if (this.editEmployeeForm.valid) {
      console.log("addEmployee")
      const newEmployee = this.editEmployeeForm.value;

      this.employeeService.addEmployee(newEmployee).subscribe(
        (response) => {console.log(response);
          console.log('Employee added successfully:', response);
          // Refresh employee data after adding
          this.getAllEmployees();
          this.isModalVisible = false;
        },
        (error) => {
          console.error('Error adding employee:', error);
        }
      );
    }
  }

  updateEmployee() {console.log("hiii");
    if (this.editEmployeeForm.valid) {
      const updatedEmployee = this.editEmployeeForm.value;
      const employeeId = this.editedEmployee.id;

      this.employeeService.updateEmployee(employeeId, updatedEmployee).subscribe(
        (response) => {
          console.log('Employee updated successfully:', response);

          this.getAllEmployees();// Refresh employee data after update
          this.isEditModalVisible = false;
        },
        (error) => {
          console.error('Error updating employee:', error);
        }
      );
    }
  }

  deleteEmployee(employee:Employee) :void{
    this.employeeService.deleteEmployee(employee.id).subscribe();
    this.isDeleteModalVisible=false;
  }


  // onSearch(): void {
  //   this.filteredEmployee = this.employees.filter((Employee) =>
  //     Employee.toLowerCase().includes(this.filterText.toLowerCase())
  //   );
  // }
}
