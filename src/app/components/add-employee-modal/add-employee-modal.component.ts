import { Component } from '@angular/core';

@Component({
  selector: 'app-add-employee-modal',
  templateUrl: './add-employee-modal.component.html',
  styleUrls: ['./add-employee-modal.component.css']
})
export class AddEmployeeModalComponent {
isModalVisible=false;

  closeModal() {
    this.isModalVisible = false;
  }

}