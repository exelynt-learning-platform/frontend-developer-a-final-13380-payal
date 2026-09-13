import { TestBed } from '@angular/core/testing';
import {
  HttpTestingController,
  provideHttpClientTesting
} from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { EmployeeService } from './employee.service';
import { Employee } from '../models/employee';


describe('EmployeeService', () => {

  let service: EmployeeService;
  let httpMock: HttpTestingController;

  const apiUrl =
    'https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/employee';

  const mockEmployee: Employee = {
    id: '1',
    name: 'Payal',
    email: 'payal@example.com',
    mobile: '9876543210',
    country: 'India',
    state: 'Maharashtra',
    district: 'Pune'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        EmployeeService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });

    service = TestBed.inject(EmployeeService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all employees', () => {
    service.getEmployees().subscribe(employees => {
      expect(employees).toEqual([mockEmployee]);
    });

    const request = httpMock.expectOne(apiUrl);

    expect(request.request.method).toBe('GET');

    request.flush([mockEmployee]);
  });

  it('should get employee by ID', () => {
    service.getEmployeeById('1').subscribe(employee => {
      expect(employee).toEqual(mockEmployee);
    });

    const request = httpMock.expectOne(`${apiUrl}/1`);

    expect(request.request.method).toBe('GET');

    request.flush(mockEmployee);
  });

  it('should create an employee', () => {
    service.createEmployee(mockEmployee).subscribe(employee => {
      expect(employee).toEqual(mockEmployee);
    });

    const request = httpMock.expectOne(apiUrl);

    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual(mockEmployee);

    request.flush(mockEmployee);
  });

  it('should update an employee', () => {
    service.updateEmployee('1', mockEmployee).subscribe(employee => {
      expect(employee).toEqual(mockEmployee);
    });

    const request = httpMock.expectOne(`${apiUrl}/1`);

    expect(request.request.method).toBe('PUT');
    expect(request.request.body).toEqual(mockEmployee);

    request.flush(mockEmployee);
  });

  it('should delete an employee', () => {
    service.deleteEmployee('1').subscribe(response => {
      expect(response).toBeNull();
    });

    const request = httpMock.expectOne(`${apiUrl}/1`);

    expect(request.request.method).toBe('DELETE');

    request.flush(null);
  });

});