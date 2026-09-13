import { createAction, props } from '@ngrx/store';
import { Employee } from '../../core/models/employee';

// Load all employees
export const loadEmployees = createAction(
  '[Employee] Load Employees'
);

export const loadEmployeesSuccess = createAction(
  '[Employee] Load Employees Success',
  props<{ employees: Employee[] }>()
);

export const loadEmployeesFailure = createAction(
  '[Employee] Load Employees Failure',
  props<{ error: string }>()
);

// Search employee
export const searchEmployee = createAction(
  '[Employee] Search Employee',
  props<{ id: string }>()
);

export const searchEmployeeSuccess = createAction(
  '[Employee] Search Employee Success',
  props<{ employee: Employee }>()
);

export const searchEmployeeFailure = createAction(
  '[Employee] Search Employee Failure',
  props<{ error: string }>()
);

// Clear search result
export const clearSearch = createAction(
  '[Employee] Clear Search'
);

// Update Employee
export const updateEmployee = createAction(
  '[Employee] Update Employee',
  props<{ id: string; employee: Employee }>()
);

export const updateEmployeeSuccess = createAction(
  '[Employee] Update Employee Success',
  props<{ employee: Employee }>()
);

export const updateEmployeeFailure = createAction(
  '[Employee] Update Employee Failure',
  props<{ error: string }>()
);

// Add Employee
export const createEmployee = createAction(
  '[Employee] Create Employee',
  props<{ employee: Employee }>()
);

export const createEmployeeSuccess = createAction(
  '[Employee] Create Employee Success',
  props<{ employee: Employee }>()
);

export const createEmployeeFailure = createAction(
  '[Employee] Create Employee Failure',
  props<{ error: string }>()
);

// Delete Employee
export const deleteEmployee = createAction(
  '[Employee] Delete Employee',
  props<{ id: string }>()
);

export const deleteEmployeeSuccess = createAction(
  '[Employee] Delete Employee Success',
  props<{ id: string }>()
);

export const deleteEmployeeFailure = createAction(
  '[Employee] Delete Employee Failure',
  props<{ error: string }>()
);