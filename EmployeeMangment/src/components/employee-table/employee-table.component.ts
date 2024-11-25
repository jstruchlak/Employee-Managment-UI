import { Component, OnInit } from '@angular/core';
import { Employee } from '../../models/employee';
import { EmployeeService } from '../../services/employee.service';
import { CommonModule, NumberSymbol } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'employee-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employee-table.component.html',
  styleUrl: './employee-table.component.css'
})
export class EmployeeTableComponent {

  employees: Employee[] = [];

  constructor(private employeeService: EmployeeService, private router: Router){}

  ngOnInit(){
    this.employeeService.getEmployees().subscribe((data: Employee[]) => {
      this.employees = data;
      console.log(data);
    });
  }

  deleteEmployee(id: number): void {
    this.employeeService.deleteEmployee(id).subscribe({
      next: (response) => {
        this.employees = this.employees.filter(e => e.id !== id)
      },
      error: (err) => {
        console.log('Error deleting ', err)
      }
    })
  }

  editEmployee(id: number): void {
    this.router.navigate(['edit', id])
  }

}
