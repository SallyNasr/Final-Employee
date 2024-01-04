import {Component} from '@angular/core';
import {LeaveModel, LeaveTypeModel} from "../../../Models/leave.model";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {EmployeeModel} from "../../../Models/employee.model";
import {LeavesService} from "../../../services/leaves/leaves.service";
import {LeavetypesService} from "../../../services/leavetypes/leavetypes.service";
import {EmployeeService} from "../../../services/employee/employee.service";

interface Page<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
}

@Component({
  selector: 'app-add-leave-modal',
  templateUrl: './add-leave-modal.component.html',
  styleUrls: ['./add-leave-modal.component.css']
})

export class AddLeaveModalComponent {
  httpOptions={
    headers:new HttpHeaders({
      'Content-Type':'application/json',
    })
  }
  loadingIndicator = true;


  addLeaveForm:FormGroup;
  editLeaveForm:FormGroup;

  leaves: Page<LeaveModel[]> = { content: [], totalPages: 0, totalElements: 0 };
  // leaves:LeaveModel[]=[];

  employees:EmployeeModel[]=[];
  leaveTypes: LeaveTypeModel[] = [];


  isModalVisible = false;
  isDeleteModalVisible = false;
  isEditModalVisible = false;
  editedLeave: any = {};
  deletedLeave:any={};

  searchTerm: string = '';
  filterLeave:LeaveModel[]=[];

  leavesData: LeaveModel[] = [];

  leaveType: number = 0;
  employeeId: number = 0;

  // originalLeaves: LeaveModel[] = []; // Original list of leaves
  // displayedLeaves: LeaveModel[] = []; // List to display on the current page
  currentPage: number = 1;
  pageSize: number = 10;

  constructor(private httpClient: HttpClient, private leaveService: LeavesService, private fb: FormBuilder,private leaveTypesService:LeavetypesService,private employeeService:EmployeeService) {

    this.addLeaveForm = this.fb.group({
      employeeId: [null, Validators.required],
      fromDate: ['', Validators.required],
      leaveType: [null, Validators.required],
      numberOfDays: ['', Validators.required],
      note: ['', Validators.required],
      toDate: ['', Validators.required],
    })

    this.editLeaveForm = this.fb.group({
      employeeId: [null, Validators.required],
      fromDate: ['', Validators.required],
      leaveType: [null, Validators.required],
      numberOfDays: ['', Validators.required],
      note: ['', Validators.required],
      toDate: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getAllLeaves();
    this.getAllLeaveType();
    this.getAllEmployees();

  }

  onPageChange(event: any): void {
    this.currentPage = event.page;
    this.getAllLeaves();
  }

  openEditModal(leave: LeaveModel): void {
    this.isEditModalVisible = true;
    this.editLeaveForm.patchValue({
      leaveType: leave.typeOfLeaves.id,
      fromDate: leave.fromDate,
      toDate: leave.toDate,
      numberOfDays: leave.numberOfDays,
      notes: leave.note,
      employeeId: leave.employeeName.id
    });
    this.editedLeave = leave;
  }

  openDeleteModal(leave: LeaveModel): void {
    this.isDeleteModalVisible = true;
    this.deletedLeave = leave;
  }

  closeEditModal() {
    this.isEditModalVisible = false;
  }

  closeDeleteModal() {
    this.isDeleteModalVisible = false;
  }

  // getLeavesByTypeAndEmployee() {
  //   // Call your API to get leaves by type and employee
  //   this.leaveService.getLeavesByTypeAndEmployee().subscribe((data: LeaveModel[]) => {
  //     this.leaves = data;
  //   });
  // }

 getAllLeaves() {
   this.leaveService.getAllLeaves(this.currentPage, this.pageSize)
     .subscribe((data: Page<LeaveModel[]>) => {
       this.leaves = data;
       this.filterLeave=this.leavesData;
     });
 }

  closeModal() {
    this.isModalVisible = false;
  }

  addLeave() {
    const newLeave:LeaveModel= {
      fromDate: this.addLeaveForm.get('fromDate')?.value,
      toDate: this.addLeaveForm.get('toDate')?.value,
      numberOfDays: this.addLeaveForm.get('numberOfDays')?.value,
      note: this.addLeaveForm.get('note')?.value,
      employeeId: this.addLeaveForm.get('employeeId')?.value,
      leaveType: this.addLeaveForm.get('leaveType')?.value,
      typeOfLeaves: {
        id: this .addLeaveForm.get('id')?.value,
        name: this .addLeaveForm.get('name')?.value,
      },
      employeeName: {
        id: this .addLeaveForm.get('id')?.value,
        name: this .addLeaveForm.get('name')?.value,
      },
    };

    // const newLeave:LeaveModel = this.addLeaveForm.value;
    this.leaveService.addLeave(newLeave).subscribe(response => {
      console.log('Leave added successfully:', response);
      this.getAllLeaves();
      this.isModalVisible = false;
    },
    (error) => {
      console.error('Error adding leave:', error);
      console.error('Full error response:', error.error); // Log the full error response
    });
  }

  updateLeave(): void {
    debugger;
    const updatedLeave = this.editLeaveForm.value;
    const leaveId = this.editedLeave.id;
    this.leaveService.updateLeave(leaveId, updatedLeave).subscribe(()=>{
      const index = this.leavesData.findIndex(leave => leave.id === leaveId);
      if (index !== -1) {
        this.leavesData[index] = updatedLeave;
        console.log("addLeave", this.editLeaveForm.value);

      }
    });
    this.isEditModalVisible = false;
    this.getAllLeaves();
    // window.location.reload();
  }
  // updateLeave(): void {
  //   const updatedEmployee = this.editLeaveForm.value;
  //   const leaveId = this.editedLeave.id;
  //   this.leaveService.updateLeave(leaveId, updatedEmployee).subscribe();
  //   this.getAllLeaves();
  //   this.isEditModalVisible = false;
  //   // window.location.reload();
  //   console.log(updatedEmployee);
  // }
  deleteLeave():void {
    const leaveId = this.deletedLeave.id;
    this.leaveService.deleteLeave(leaveId).subscribe( data => {
      console.log(data);
      this.getAllLeaves();
      this.closeDeleteModal()
    });
  }

  applySearchFilter(): void {
    // this.filterLeave = this.leavesData.filter((leave) => {
    //     return leave.leaveType.toLowerCase().includes(this.searchTerm.toLowerCase());
    //   }
    // );
   }

  // filteredLeaves(): LeaveModel[] {
  //   if (this.searchTerm.trim() === '') {
  //     return this.leavesData;
  //   }
  //   const leaves=leave.leaveType.toLowerCase();
  //   const lowerCaseQuery = this.searchTerm.toLowerCase();
  //   return this.leavesData.filter(leave =>
  //     leaves.includes(lowerCaseQuery)
  //   );
  // }

  getAllLeaveType(): void {
    console.log('Calling getAllLeaveType');
    this.leaveTypesService.getAllLeaveTypes().subscribe(
      (leaves) => {
        console.log('Departments received:', leaves);
        this.leaveTypes = leaves;
      },
      (error) => {
        console.error('Error fetching departments:', error);
      }
    );
  }
  getAllEmployees() {
    this.employeeService.getAllEmployees().subscribe(
      data => {
        this.employees = data;
      });
  }


  // getAllLeaves(): void {
  //
  //       this.leaveService.getLeavesByTypeAndEmployee(
  //         this.leaveType ?? 1,
  //         this.employeeId ?? 3,
  //         this.currentPage,
  //         this.pageSize)
  //           // this.totalElements = this.leaves.totalElements;
  //        console.error('Error fetching leaves:');
  //         }

  // incrementPage(): void {
  //   this.currentPage++;
  //   this.getAllLeaves();
  // }
  //
  // decrementPage(): void {
  //   if (this.currentPage > 0) {
  //     this.currentPage--;
  //     this.getAllLeaves();
  //   }
  // }
}
