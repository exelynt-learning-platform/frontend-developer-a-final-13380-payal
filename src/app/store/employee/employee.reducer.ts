import { createReducer, on } from '@ngrx/store';
import {
  EntityState,
  EntityAdapter,
  createEntityAdapter
} from '@ngrx/entity';

import { Employee } from '../../core/models/employee';
import * as EmployeeActions from './employee.actions';

export interface EmployeeState extends EntityState<Employee> {
  loading: boolean;
  error: string | null;

  searchLoading: boolean;
  searchError: string | null;
  searchedEmployee: Employee | null;

  updateLoading: boolean;
  updateError: string | null;

  createLoading: boolean;
  createError: string | null;

  deleteLoading: boolean;
  deleteError: string | null;
}

export const employeeAdapter: EntityAdapter<Employee> =
  createEntityAdapter<Employee>();

export const initialEmployeeState: EmployeeState =
  employeeAdapter.getInitialState({
    loading: false,
    error: null,

    searchLoading: false,
    searchError: null,
    searchedEmployee: null,

    updateLoading: false,
    updateError: null ,

    createLoading: false,
    createError: null,

    deleteLoading: false,
    deleteError: null
  }
);

export const employeeReducer = createReducer(
  initialEmployeeState,
    on(EmployeeActions.loadEmployees, (state) => ({
      ...state,
      loading: true,
      error: null
    })),

    on(EmployeeActions.loadEmployeesSuccess, (state, { employees }) =>
        employeeAdapter.setAll(employees, {
        ...state,
        loading: false,
        error: null
      })
    ),

    on(EmployeeActions.loadEmployeesFailure, (state, { error }) => ({
      ...state,
      loading: false,
      error
    })),

    on(EmployeeActions.searchEmployee, (state) => ({
      ...state,
      searchLoading: true,
      searchError: null,
      searchedEmployee: null
    })),

    on(EmployeeActions.searchEmployeeSuccess, (state, { employee }) => ({
      ...state,
      searchLoading: false,
      searchError: null,
      searchedEmployee: employee
    })),

    on(EmployeeActions.searchEmployeeFailure, (state, { error }) => ({
      ...state,
      searchLoading: false,
      searchError: error,
      searchedEmployee: null
    })),

    on(EmployeeActions.clearSearch, (state) => ({
      ...state,
      searchLoading: false,
      searchError: null,
      searchedEmployee: null
    })),

    on(EmployeeActions.updateEmployee, (state) => ({
      ...state,
      updateLoading: true,
      updateError: null
    })),

    on(
      EmployeeActions.updateEmployeeSuccess,
      (state, { employee }) =>
        employeeAdapter.updateOne(
          {
            id: employee.id,
            changes: employee
          },
          {
            ...state,
            updateLoading: false,
            updateError: null,
            searchedEmployee: null
          }
        )
    ),

    on(EmployeeActions.updateEmployeeFailure, (state, { error }) => ({
      ...state,
      updateLoading: false,
      updateError: error
    })),

    on(EmployeeActions.createEmployee, (state) => ({
      ...state,
      createLoading: true,
      createError: null
    })),

    on(
      EmployeeActions.createEmployeeSuccess,
      (state, { employee }) =>
        employeeAdapter.addOne(employee, {
        ...state,
        createLoading: false,
        createError: null
      })
    ),

    on(EmployeeActions.createEmployeeFailure, (state, { error }) => ({
      ...state,
      createLoading: false,
      createError: error
    })),

    on(EmployeeActions.deleteEmployee, (state) => ({
      ...state,
      deleteLoading: true,
      deleteError: null
    })),

    on(
      EmployeeActions.deleteEmployeeSuccess,
      (state, { id }) =>
      employeeAdapter.removeOne(id, {
        ...state,
        deleteLoading: false,
        deleteError: null,
        searchedEmployee: null
      })
    ),

    on(EmployeeActions.deleteEmployeeFailure, (state, { error }) => ({
      ...state,
      deleteLoading: false,
      deleteError: error
    })),

);