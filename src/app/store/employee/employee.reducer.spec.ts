import { Employee } from '../../core/models/employee';
import * as EmployeeActions from './employee.actions';
import {
  employeeReducer,
  initialEmployeeState
} from './employee.reducer';

describe('EmployeeReducer', () => {
  const mockEmployee: Employee = {
    id: '1',
    name: 'Payal Memane',
    email: 'payal@example.com',
    mobile: '9876543210',
    country: 'India',
    state: 'Maharashtra',
    district: 'Pune'
  };

  const secondEmployee: Employee = {
    id: '2',
    name: 'Rahul Patil',
    email: 'rahul@example.com',
    mobile: '9876543211',
    country: 'India',
    state: 'Maharashtra',
    district: 'Mumbai'
  };

  it('should return the initial state', () => {
    const action = { type: 'Unknown' };

    const state = employeeReducer(undefined, action);

    expect(state).toEqual(initialEmployeeState);
  });

  it('should set loading to true when loading employees', () => {
    const action = EmployeeActions.loadEmployees();

    const state = employeeReducer(initialEmployeeState, action);

    expect(state.loading).toBeTrue();
    expect(state.error).toBeNull();
  });

  it('should store employees when loading succeeds', () => {
    const action = EmployeeActions.loadEmployeesSuccess({
      employees: [mockEmployee, secondEmployee]
    });

    const state = employeeReducer(initialEmployeeState, action);

    expect(state.loading).toBeFalse();
    expect(state.error).toBeNull();
    expect(state.entities['1']).toEqual(mockEmployee);
    expect(state.entities['2']).toEqual(secondEmployee);
  });

  it('should store error when loading fails', () => {
    const action = EmployeeActions.loadEmployeesFailure({
      error: 'Unable to load employees.'
    });

    const state = employeeReducer(initialEmployeeState, action);

    expect(state.loading).toBeFalse();
    expect(state.error).toBe('Unable to load employees.');
  });

  it('should start employee search', () => {
    const action = EmployeeActions.searchEmployee({
      id: '1'
    });

    const state = employeeReducer(initialEmployeeState, action);

    expect(state.searchLoading).toBeTrue();
    expect(state.searchError).toBeNull();
    expect(state.searchedEmployee).toBeNull();
  });

  it('should store searched employee when search succeeds', () => {
    const action = EmployeeActions.searchEmployeeSuccess({
      employee: mockEmployee
    });

    const state = employeeReducer(initialEmployeeState, action);

    expect(state.searchLoading).toBeFalse();
    expect(state.searchError).toBeNull();
    expect(state.searchedEmployee).toEqual(mockEmployee);
  });

  it('should store search error when search fails', () => {
    const action = EmployeeActions.searchEmployeeFailure({
      error: 'Employee not found.'
    });

    const state = employeeReducer(initialEmployeeState, action);

    expect(state.searchLoading).toBeFalse();
    expect(state.searchError).toBe('Employee not found.');
    expect(state.searchedEmployee).toBeNull();
  });

  it('should clear search results', () => {
    const stateWithSearch = {
      ...initialEmployeeState,
      searchLoading: true,
      searchError: 'Employee not found.',
      searchedEmployee: mockEmployee
    };

    const action = EmployeeActions.clearSearch();

    const state = employeeReducer(stateWithSearch, action);

    expect(state.searchLoading).toBeFalse();
    expect(state.searchError).toBeNull();
    expect(state.searchedEmployee).toBeNull();
  });

  it('should start employee update', () => {
    const action = EmployeeActions.updateEmployee({
      id: '1',
      employee: mockEmployee
    });

    const state = employeeReducer(initialEmployeeState, action);

    expect(state.updateLoading).toBeTrue();
    expect(state.updateError).toBeNull();
  });

  it('should update employee when update succeeds', () => {
    const initialState = employeeReducer(
      initialEmployeeState,
      EmployeeActions.loadEmployeesSuccess({
        employees: [mockEmployee]
      })
    );

    const updatedEmployee: Employee = {
      ...mockEmployee,
      name: 'Payal Updated'
    };

    const action = EmployeeActions.updateEmployeeSuccess({
      employee: updatedEmployee
    });

    const state = employeeReducer(initialState, action);

    expect(state.updateLoading).toBeFalse();
    expect(state.updateError).toBeNull();
    expect(state.entities['1']).toEqual(updatedEmployee);
    expect(state.searchedEmployee).toBeNull();
  });

  it('should store update error when update fails', () => {
    const action = EmployeeActions.updateEmployeeFailure({
      error: 'Unable to update employee.'
    });

    const state = employeeReducer(initialEmployeeState, action);

    expect(state.updateLoading).toBeFalse();
    expect(state.updateError).toBe('Unable to update employee.');
  });

  it('should start employee creation', () => {
    const action = EmployeeActions.createEmployee({
      employee: mockEmployee
    });

    const state = employeeReducer(initialEmployeeState, action);

    expect(state.createLoading).toBeTrue();
    expect(state.createError).toBeNull();
  });

  it('should add employee when creation succeeds', () => {
    const action = EmployeeActions.createEmployeeSuccess({
      employee: mockEmployee
    });

    const state = employeeReducer(initialEmployeeState, action);

    expect(state.createLoading).toBeFalse();
    expect(state.createError).toBeNull();
    expect(state.entities['1']).toEqual(mockEmployee);
  });

  it('should store create error when creation fails', () => {
    const action = EmployeeActions.createEmployeeFailure({
      error: 'Failed to create employee'
    });

    const state = employeeReducer(initialEmployeeState, action);

    expect(state.createLoading).toBeFalse();
    expect(state.createError).toBe('Failed to create employee');
  });

  it('should start employee deletion', () => {
    const action = EmployeeActions.deleteEmployee({
      id: '1'
    });

    const state = employeeReducer(initialEmployeeState, action);

    expect(state.deleteLoading).toBeTrue();
    expect(state.deleteError).toBeNull();
  });

  it('should remove employee when deletion succeeds', () => {
    const initialState = employeeReducer(
      initialEmployeeState,
      EmployeeActions.loadEmployeesSuccess({
        employees: [mockEmployee, secondEmployee]
      })
    );

    const action = EmployeeActions.deleteEmployeeSuccess({
      id: '1'
    });

    const state = employeeReducer(initialState, action);

    expect(state.deleteLoading).toBeFalse();
    expect(state.deleteError).toBeNull();
    expect(state.entities['1']).toBeUndefined();
    expect(state.entities['2']).toEqual(secondEmployee);
    expect(state.searchedEmployee).toBeNull();
  });

  it('should store delete error when deletion fails', () => {
    const action = EmployeeActions.deleteEmployeeFailure({
      error: 'Unable to delete employee.'
    });

    const state = employeeReducer(initialEmployeeState, action);

    expect(state.deleteLoading).toBeFalse();
    expect(state.deleteError).toBe('Unable to delete employee.');
  });
});