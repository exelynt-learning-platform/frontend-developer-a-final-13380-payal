import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Employee } from '../../../../core/models/employee';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-employee-table',
  imports: [
    MatButtonModule,
    MatIconModule,
    MatTooltipModule
  ],
  templateUrl: './employee-table.component.html',
  styleUrl: './employee-table.component.scss'
})
export class EmployeeTableComponent {
  @Input() employees: Employee[] = [];

  @Output() edit = new EventEmitter<Employee>();

  @Output() delete = new EventEmitter<Employee>();

  selectedEmployee: Employee | null = null;
  showDeletePopup = false;

  //Edit Employee Details
  editEmployee(employee: Employee): void {
  this.edit.emit(employee);
}

  //Delete Employee
  deleteEmployee(employee: Employee): void {
    this.selectedEmployee = employee;
    this.showDeletePopup = true;
  }

  // Cancel Detetation
  cancelDelete(): void {
    this.showDeletePopup = false;
    this.selectedEmployee = null;
  }

  // Confirm Deletation 
  confirmDelete(): void {

    if (!this.selectedEmployee) {
      return;
    }

    this.delete.emit(this.selectedEmployee);
    this.showDeletePopup = false;
    this.selectedEmployee = null;
  }

}
