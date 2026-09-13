import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  employeeAdapter,
  EmployeeState
} from './employee.reducer';

export const selectEmployeeState =
  createFeatureSelector<EmployeeState>('employees');

export const {
  selectAll: selectAllEmployees,
  selectEntities: selectEmployeeEntities,
  selectIds: selectEmployeeIds,
  selectTotal: selectEmployeeTotal
} = employeeAdapter.getSelectors(selectEmployeeState);
// Load Employees
export const selectEmployeesLoading = createSelector(
  selectEmployeeState,
  (state) => state.loading
);

export const selectEmployeesError = createSelector(
  selectEmployeeState,
  (state) => state.error
);

//Search Loader
export const selectSearchedEmployee = createSelector(
  selectEmployeeState,
  (state) => state.searchedEmployee
);

export const selectSearchLoading = createSelector(
  selectEmployeeState,
  (state) => state.searchLoading
);

export const selectSearchError = createSelector(
  selectEmployeeState,
  (state) => state.searchError
);

export const selectEmployeeById = (id: string) =>
  createSelector(
  selectEmployeeEntities,
  (entities) => entities[id] ?? null
);

// Updater Loader
export const selectUpdateLoading = createSelector(
  selectEmployeeState,
  (state) => state.updateLoading
);

export const selectUpdateError = createSelector(
  selectEmployeeState,
  (state) => state.updateError
);