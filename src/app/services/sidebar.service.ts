import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  baseUrl=`https://localhost:8080`
  constructor(private http:HttpClient) {


  }

  toggleSidebar(): void {
    const sidebarToggle = document.body.querySelector('#sidebarToggle') as HTMLElement;

    if (sidebarToggle) {
      console.log("toggle side bar");
      sidebarToggle.addEventListener('click', (event: Event) => {
        event.preventDefault();
        this.toggleBodyClass();
      });
    }
  }

  private toggleBodyClass(): void {
    console.log("toggle body class");
    document.body.classList.toggle('sb-sidenav-toggled');
    const isToggled = document.body.classList.contains('sb-sidenav-toggled');
    localStorage.setItem('sb|sidebar-toggle', isToggled.toString());
  }
}
