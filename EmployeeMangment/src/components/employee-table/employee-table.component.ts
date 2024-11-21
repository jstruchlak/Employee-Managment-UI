import { Component, OnInit } from '@angular/core';
import { Employee } from '../../models/employee';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employee-table',
  standalone: true,
  imports: [],
  templateUrl: './employee-table.component.html',
  styleUrl: './employee-table.component.css'
})
export class EmployeeTableComponent {

  employee: Employee[] = [];

  constructor(private employeeService: EmployeeService){}

  ngOnInit() {
    this.employeeService.getEmployees().subscribe((data: Employee[]) => {
      this.employee = data;
      console.log(data);
    });
  }

}
