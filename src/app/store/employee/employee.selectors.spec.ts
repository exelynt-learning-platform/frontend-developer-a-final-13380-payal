import { Employee } from '../../core/models/employee';
import {
  employeeAdapter,
  EmployeeState
} from './employee.reducer';

import {
  selectEmployeeState,
  selectAllEmployees,
  selectEmployeeEntities,
  selectEmployeeIds,
  selectEmployeeTotal,
  selectEmployeesLoading,
  selectEmployeesError,
  selectSearchedEmployee,
  selectSearchLoading,
  selectSearchError,
  selectEmployeeById,
  selectUpdateLoading,
  selectUpdateError
} from './employee.selectors';

describe('Employee Selectors', () => {

  const mockEmployee: Employee = {
    id: '1',
    name: 'Payal Memane',
    email: 'payal@example.com',
    mobile: '9876543210',
    country: 'India',
    state: 'Maharashtra',
    district: 'Pune'
  };

  const mockEmployee2: Employee = {
    id: '2',
    name: 'Rahul Patil',
    email: 'rahul@example.com',
    mobile: '9876543211',
    country: 'India',
    state: 'Maharashtra',
    district: 'Mumbai'
  };

  const employeeState: EmployeeState = {
    ...employeeAdapter.getInitialState(),

    ids: ['1', '2'],

    entities: {
      '1': mockEmployee,
      '2': mockEmployee2
    },

    loading: false,
    error: null,

    searchLoading: false,
    searchError: null,
    searchedEmployee: mockEmployee,

    updateLoading: false,
    updateError: null,

    createLoading: false,
    createError: null,

    deleteLoading: false,
    deleteError: null
  };

  const rootState = {
    employees: employeeState
  };

  it('should select employee state', () => {
    const result = selectEmployeeState(rootState);

    expect(result).toEqual(employeeState);
  });

  it('should select all employees', () => {
    const result = selectAllEmployees(rootState);

    expect(result).toEqual([
      mockEmployee,
      mockEmployee2
    ]);
  });

  it('should select employee entities', () => {
        const result = selectEmployeeEntities(rootState);

        expect(result['1']).toEqual(mockEmployee);
        expect(result['2']).toEqual(mockEmployee2);
    });

  it('should select employee ids', () => {
    const result = selectEmployeeIds(rootState);

    expect(result).toEqual([
      '1',
      '2'
    ]);
  });

  it('should select total employees', () => {
    const result = selectEmployeeTotal(rootState);

    expect(result).toBe(2);
  });

  it('should select loading state', () => {
    const result = selectEmployeesLoading(rootState);

    expect(result).toBe(false);
  });

  it('should select employee error', () => {
    const result = selectEmployeesError(rootState);

    expect(result).toBeNull();
  });

  it('should select searched employee', () => {
    const result = selectSearchedEmployee(rootState);

    expect(result).toEqual(mockEmployee);
  });

  it('should select search loading state', () => {
    const result = selectSearchLoading(rootState);

    expect(result).toBe(false);
  });

  it('should select search error', () => {
    const result = selectSearchError(rootState);

    expect(result).toBeNull();
  });

  it('should select employee by id when employee exists', () => {
    const selector = selectEmployeeById('1');

    const result = selector(rootState);

    expect(result).toEqual(mockEmployee);
  });

  it('should return null when employee id does not exist', () => {
    const selector = selectEmployeeById('999');

    const result = selector(rootState);

    expect(result).toBeNull();
  });

  it('should select update loading state', () => {
    const result = selectUpdateLoading(rootState);

    expect(result).toBe(false);
  });

  it('should select update error', () => {
    const result = selectUpdateError(rootState);

    expect(result).toBeNull();
  });

});