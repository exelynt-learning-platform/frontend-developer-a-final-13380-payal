import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import {
  MockStore,
  provideMockStore
} from '@ngrx/store/testing';
import { Observable, of, throwError } from 'rxjs';

import { EmployeeEffects } from './employee.effects';
import * as EmployeeActions from './employee.actions';
import { EmployeeService } from '../../core/services/employee.service';
import { Employee } from '../../core/models/employee';
import { selectEmployeeEntities } from './employee.selectors';

describe('EmployeeEffects', () => {
  let effects: EmployeeEffects;
  let actions$: Observable<unknown>;
  let employeeService: jasmine.SpyObj<EmployeeService>;
  let store: MockStore;

  const mockEmployee: Employee = {
    id: '1',
    name: 'Payal Memane',
    email: 'payal@example.com',
    mobile: '9876543210',
    country: 'India',
    state: 'Maharashtra',
    district: 'Pune'
  };

  beforeEach(() => {
    const serviceSpy = jasmine.createSpyObj<EmployeeService>(
      'EmployeeService',
      [
        'getEmployees',
        'getEmployeeById',
        'createEmployee',
        'updateEmployee',
        'deleteEmployee'
      ]
    );

    TestBed.configureTestingModule({
      providers: [
        EmployeeEffects,
        provideMockActions(() => actions$),
        provideMockStore(),
        {
          provide: EmployeeService,
          useValue: serviceSpy
        }
      ]
    });

    effects = TestBed.inject(EmployeeEffects);

    employeeService = TestBed.inject(
      EmployeeService
    ) as jasmine.SpyObj<EmployeeService>;

    store = TestBed.inject(MockStore);
  });

  // --------------------------------------------------
  // Component Creation
  // --------------------------------------------------

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  // --------------------------------------------------
  // Load Employees
  // --------------------------------------------------

  it('should load employees successfully', (done) => {
    employeeService.getEmployees.and.returnValue(
      of([mockEmployee])
    );

    actions$ = of(
      EmployeeActions.loadEmployees()
    );

    effects.loadEmployees$.subscribe(action => {
      expect(action).toEqual(
        EmployeeActions.loadEmployeesSuccess({
          employees: [mockEmployee]
        })
      );

      expect(
        employeeService.getEmployees
      ).toHaveBeenCalled();

      done();
    });
  });

  it('should return load employees failure when API fails', (done) => {
    employeeService.getEmployees.and.returnValue(
      throwError(() => new Error('API error'))
    );

    actions$ = of(
      EmployeeActions.loadEmployees()
    );

    effects.loadEmployees$.subscribe(action => {
      expect(action).toEqual(
        EmployeeActions.loadEmployeesFailure({
          error: 'Unable to load employees.'
        })
      );

      done();
    });
  });

  // --------------------------------------------------
  // Search Employee
  // --------------------------------------------------

  it('should return search success when employee exists', (done) => {
    store.overrideSelector(
      selectEmployeeEntities,
      {
        '1': mockEmployee
      }
    );

    actions$ = of(
      EmployeeActions.searchEmployee({
        id: '1'
      })
    );

    effects.searchEmployee$.subscribe(action => {
      expect(action).toEqual(
        EmployeeActions.searchEmployeeSuccess({
          employee: mockEmployee
        })
      );

      done();
    });
  });

  it('should return search failure when employee does not exist', (done) => {
    store.overrideSelector(
      selectEmployeeEntities,
      {}
    );

    actions$ = of(
      EmployeeActions.searchEmployee({
        id: '999'
      })
    );

    effects.searchEmployee$.subscribe(action => {
      expect(action).toEqual(
        EmployeeActions.searchEmployeeFailure({
          error: 'Employee not found.'
        })
      );

      done();
    });
  });

  // --------------------------------------------------
  // Update Employee
  // --------------------------------------------------

  it('should update employee successfully', (done) => {
    employeeService.updateEmployee.and.returnValue(
      of(mockEmployee)
    );

    actions$ = of(
      EmployeeActions.updateEmployee({
        id: '1',
        employee: mockEmployee
      })
    );

    effects.updateEmployee$.subscribe(action => {
      expect(action).toEqual(
        EmployeeActions.updateEmployeeSuccess({
          employee: mockEmployee
        })
      );

      expect(
        employeeService.updateEmployee
      ).toHaveBeenCalledWith(
        '1',
        mockEmployee
      );

      done();
    });
  });

  it('should return update failure when API fails', (done) => {
    employeeService.updateEmployee.and.returnValue(
      throwError(() => new Error('API error'))
    );

    actions$ = of(
      EmployeeActions.updateEmployee({
        id: '1',
        employee: mockEmployee
      })
    );

    effects.updateEmployee$.subscribe(action => {
      expect(action).toEqual(
        EmployeeActions.updateEmployeeFailure({
          error:
            'Unable to update employee. Please try again.'
        })
      );

      done();
    });
  });

  // --------------------------------------------------
  // Create Employee
  // --------------------------------------------------

  it('should create employee successfully', (done) => {
    employeeService.createEmployee.and.returnValue(
      of(mockEmployee)
    );

    actions$ = of(
      EmployeeActions.createEmployee({
        employee: mockEmployee
      })
    );

    effects.createEmployee$.subscribe(action => {
      expect(action).toEqual(
        EmployeeActions.createEmployeeSuccess({
          employee: mockEmployee
        })
      );

      expect(
        employeeService.createEmployee
      ).toHaveBeenCalledWith(
        mockEmployee
      );

      done();
    });
  });

  it('should return create failure when API fails', (done) => {
    employeeService.createEmployee.and.returnValue(
      throwError(() => new Error('API error'))
    );

    actions$ = of(
      EmployeeActions.createEmployee({
        employee: mockEmployee
      })
    );

    effects.createEmployee$.subscribe(action => {
      expect(action).toEqual(
        EmployeeActions.createEmployeeFailure({
          error: 'Failed to create employee'
        })
      );

      done();
    });
  });

  // --------------------------------------------------
  // Delete Employee
  // --------------------------------------------------

  it('should delete employee successfully', (done) => {
    employeeService.deleteEmployee.and.returnValue(
      of(void 0)
    );

    actions$ = of(
      EmployeeActions.deleteEmployee({
        id: '1'
      })
    );

    effects.deleteEmployee$.subscribe(action => {
      expect(action).toEqual(
        EmployeeActions.deleteEmployeeSuccess({
          id: '1'
        })
      );

      expect(
        employeeService.deleteEmployee
      ).toHaveBeenCalledWith('1');

      done();
    });
  });

  it('should return delete failure when API fails', (done) => {
    employeeService.deleteEmployee.and.returnValue(
      throwError(() => new Error('API error'))
    );

    actions$ = of(
      EmployeeActions.deleteEmployee({
        id: '1'
      })
    );

    effects.deleteEmployee$.subscribe(action => {
      expect(action).toEqual(
        EmployeeActions.deleteEmployeeFailure({
          error:
            'Unable to delete employee. Please try again.'
        })
      );

      done();
    });
  });
});