import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Employee } from '../../models/employee';
import { EmployeeService } from '../../services/employee.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.css'
})
export class EmployeeFormComponent implements OnInit {

  employee: Employee = {
    id: 0,
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    position: ''
  }

  isEditing: boolean = false;
  
  errorMessage: string = "";

  constructor (
    private employeeService: EmployeeService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
      // console log result 
      this.route.paramMap.subscribe((result) => console.log(result))
      // get the 'id' property of the result
      this.route.paramMap.subscribe((result) => {
        const id = result.get('id');

        if(id){
          // editing employee
          this.isEditing = true;
          console.log("Is Editing")

          // convert id string above into a number using 'Number(id)'
         this.employeeService.getEmployeeById(Number(id)).subscribe({
          next: (result) => this.employee = result,
          error: (err) => this.errorMessage = `Error occured (${err.status})`
         })
        }

      })
  }

  onSubmit(): void {
    // editing 
    if(this.isEditing){
      this.employeeService.editEmployee(this.employee)
        .subscribe({
          next: () => {
            this.router.navigate(['/'])
          }, 
          error: (err) => {
            console.log(err)
            this.errorMessage = `An Error Has Occured: ${err.status}`
          }
        }
      )

    } else {
      // creating
      this.employeeService.createEmployee(this.employee)
        .subscribe({
          next: () => {
            this.router.navigate(['/'])
          }, 
          error: (err) => {
            console.log(err)
            this.errorMessage = `An Error Has Occured: ${err.status}`
          }
        }
      )
    }
  }



    
  

}
