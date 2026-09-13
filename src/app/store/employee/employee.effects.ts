import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  catchError,
  map,
  of,
  switchMap,
  withLatestFrom
} from 'rxjs';

import * as EmployeeActions from './employee.actions';
import { EmployeeService } from '../../core/services/employee.service';
import { Store } from '@ngrx/store';
import { selectEmployeeEntities } from './employee.selectors';

@Injectable()
export class EmployeeEffects {

  private readonly actions$ = inject(Actions);
  private readonly employeeService = inject(EmployeeService);
  private readonly store = inject(Store);

  // Load all employees
  loadEmployees$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeeActions.loadEmployees),

      switchMap(() =>
        this.employeeService.getEmployees().pipe(
          map((employees) =>
            EmployeeActions.loadEmployeesSuccess({ employees })
          ),

          catchError(() =>
            of(
              EmployeeActions.loadEmployeesFailure({
                error: 'Unable to load employees.'
              })
            )
          )
        )
      )
    )
  );

  // Search employee 
  searchEmployee$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeeActions.searchEmployee),

      withLatestFrom(
        this.store.select(selectEmployeeEntities)
      ),

      map(([{ id }, employees]) => {

        const employee = employees[id];

        if (employee) {
          return EmployeeActions.searchEmployeeSuccess({
            employee
          });
        }

        return EmployeeActions.searchEmployeeFailure({
          error: 'Employee not found.'
        });
      })
    )
  );

  updateEmployee$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeeActions.updateEmployee),

      switchMap(({ id, employee }) =>
        this.employeeService.updateEmployee(id, employee).pipe(

          map((updatedEmployee) =>
            EmployeeActions.updateEmployeeSuccess({
              employee: updatedEmployee
            })
          ),

          catchError((error) => {
            console.error('Update employee API error:', error);

            return of(
              EmployeeActions.updateEmployeeFailure({
                error: 'Unable to update employee. Please try again.'
              })
            );
          })
        )
      )
    )
  );

  createEmployee$ = createEffect(() =>
    this.actions$.pipe(

      ofType(EmployeeActions.createEmployee),

      switchMap(({ employee }) =>
        this.employeeService.createEmployee(employee).pipe(

          map(createdEmployee =>
            EmployeeActions.createEmployeeSuccess({
              employee: createdEmployee
            })
          ),

          catchError(error =>
            of(
              EmployeeActions.createEmployeeFailure({
                error: 'Failed to create employee'
              })
            )
          )

        )
      )

    )
  );

  deleteEmployee$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeeActions.deleteEmployee),

      switchMap(({ id }) =>
        this.employeeService.deleteEmployee(id).pipe(

          map(() =>
            EmployeeActions.deleteEmployeeSuccess({ id })
          ),

          catchError((error) => {
            console.error('Delete employee API error:', error);

            return of(
              EmployeeActions.deleteEmployeeFailure({
                error: 'Unable to delete employee. Please try again.'
              })
            );
          })
        )
      )
    )
  );

}