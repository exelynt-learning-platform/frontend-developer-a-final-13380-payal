import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { combineLatest, map } from 'rxjs';
import { Store } from '@ngrx/store';

import { EmployeeTableComponent } from '../../components/employee-table/employee-table.component';
import { EmployeeSearchComponent } from '../../components/employee-search/employee-search.component';
import { EmployeeFormComponent } from '../../components/employee-form/employee-form.component';

import * as EmployeeActions from '../../../../store/employee/employee.actions';

import {
  selectAllEmployees,
  selectEmployeesLoading,
  selectEmployeesError,
  selectSearchedEmployee,
  selectSearchLoading,
  selectSearchError
} from '../../../../store/employee/employee.selectors';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Employee } from '../../../../core/models/employee';


@Component({
  selector: 'app-employee-list',

  standalone: true,

  imports: [
    AsyncPipe,
    EmployeeTableComponent,
    EmployeeSearchComponent,
    EmployeeFormComponent,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],

  templateUrl: './employee-list.component.html',

  styleUrl: './employee-list.component.scss'
})

export class EmployeeListComponent {

  private readonly store = inject(Store);
  selectedEmployee: Employee | null = null;
  showForm = false;
  readonly employees$ = this.store.select(selectAllEmployees);
  readonly loading$ = this.store.select(selectEmployeesLoading);
  readonly error$ = this.store.select(selectEmployeesError);
  readonly searchedEmployee$ = this.store.select(selectSearchedEmployee);
  readonly searchLoading$ = this.store.select(selectSearchLoading);
  readonly searchError$ = this.store.select(selectSearchError);
  
  constructor() {
    this.store.dispatch(
      EmployeeActions.loadEmployees()
    );
  }

  // Display Employees
  readonly displayEmployees$ = combineLatest([
    this.employees$,
    this.searchedEmployee$
  ]).pipe(

    map(([employees, searchedEmployee]) => {

      if (searchedEmployee) {
        return [searchedEmployee];
      }
      return employees;
    })
  );
 
  // Get Id from Search Box and Search Employee
  onSearch(id: string): void {

    this.store.dispatch(
      EmployeeActions.searchEmployee({ id })
    );

  }

  // Clear Search
  onClearSearch(): void {
    this.store.dispatch(
      EmployeeActions.clearSearch()
    );

  }

  // Add Employee
  addEmployee(): void {
    this.selectedEmployee = null;
    this.showForm = true;
  }

  // Edit Eployee
  editEmployee(employee: Employee): void {
    this.selectedEmployee = employee;
    this.showForm = true;
  }

  //Submit Employee
  onFormSubmit(employee: Employee): void {

    if (employee.id) {

      this.store.dispatch(
        EmployeeActions.updateEmployee({
          id: employee.id,
          employee
        })
      );

      this.showForm = false;
      this.selectedEmployee = null;
      return;
    }

    this.store.dispatch(
      EmployeeActions.createEmployee({
        employee
      })
    );

    this.showForm = false;
    this.selectedEmployee = null;
  }

  // Close Form
  closeForm(): void {

    this.showForm = false;
    this.selectedEmployee = null;
  }

  //Delete employee
  deleteEmployee(employee: Employee): void {
    this.store.dispatch(
      EmployeeActions.deleteEmployee({
        id: employee.id
      })
    );
  }
}