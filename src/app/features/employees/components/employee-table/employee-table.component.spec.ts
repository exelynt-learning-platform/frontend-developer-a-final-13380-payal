import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeTableComponent } from './employee-table.component';
import { Employee } from '../../../../core/models/employee';

describe('EmployeeTableComponent', () => {
  let component: EmployeeTableComponent;
  let fixture: ComponentFixture<EmployeeTableComponent>;

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

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeTableComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(EmployeeTableComponent);
    component = fixture.componentInstance;

    component.employees = [mockEmployee, secondEmployee];

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display employees in the table', () => {
    const rows = fixture.nativeElement.querySelectorAll('tbody tr');

    expect(rows.length).toBe(2);
  });

  it('should emit employee when edit is clicked', () => {
    spyOn(component.edit, 'emit');

    component.editEmployee(mockEmployee);

    expect(component.edit.emit).toHaveBeenCalledWith(mockEmployee);
  });

  it('should open delete popup when delete is clicked', () => {
    component.deleteEmployee(mockEmployee);

    expect(component.showDeletePopup).toBeTrue();
    expect(component.selectedEmployee).toEqual(mockEmployee);
  });

  it('should close delete popup when cancel is clicked', () => {
    component.deleteEmployee(mockEmployee);

    component.cancelDelete();

    expect(component.showDeletePopup).toBeFalse();
    expect(component.selectedEmployee).toBeNull();
  });

  it('should emit selected employee when delete is confirmed', () => {
    spyOn(component.delete, 'emit');

    component.deleteEmployee(mockEmployee);
    component.confirmDelete();

    expect(component.delete.emit).toHaveBeenCalledWith(mockEmployee);
  });

  it('should close popup after delete is confirmed', () => {
    component.deleteEmployee(mockEmployee);

    component.confirmDelete();

    expect(component.showDeletePopup).toBeFalse();
    expect(component.selectedEmployee).toBeNull();
  });

  it('should not emit delete when there is no selected employee', () => {
    spyOn(component.delete, 'emit');

    component.confirmDelete();

    expect(component.delete.emit).not.toHaveBeenCalled();
  });
});