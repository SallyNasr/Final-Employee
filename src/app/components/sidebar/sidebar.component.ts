import {Component, OnInit} from '@angular/core';
import {SidebarService} from "../../services/sidebar.service";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent  implements OnInit{

  // searchControl:FormGroup;
  constructor(private sidebarService: SidebarService) {

  }

  ngOnInit(): void {

  }


  onToggleSidebar(): void {
    this.sidebarService.toggleSidebar();
  }


  searchControl = new FormControl('');


  // search() {
  //   // const searchTerm = this.searchControl.value;
  //   // this.employees = this.employees.filter(employee =>
  //   //   employee.firstName.toLowerCase().includes(searchTerm?.toLowerCase()) ||
  //   //   employee.lastName.toLowerCase().includes(searchTerm?.toLowerCase())
  //   // );
  // }
  // AddEmployee(){
  //
  // }

}
