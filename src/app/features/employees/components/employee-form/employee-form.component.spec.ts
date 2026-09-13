import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeFormComponent } from './employee-form.component';
import { Employee } from '../../../../core/models/employee';

describe('EmployeeFormComponent', () => {
  let component: EmployeeFormComponent;
  let fixture: ComponentFixture<EmployeeFormComponent>;

  const mockEmployee: Employee = {
    id: '1',
    name: 'Payal Memane',
    email: 'payal@example.com',
    mobile: '9876543210',
    country: 'India',
    state: 'Maharashtra',
    district: 'Pune'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeFormComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(EmployeeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have an invalid form initially', () => {
    expect(component.employeeForm.invalid).toBeTrue();
  });

  it('should require name', () => {
    const nameControl = component.employeeForm.get('name');

    nameControl?.setValue('');

    expect(nameControl?.hasError('required')).toBeTrue();
  });

  it('should require a valid email', () => {
    const emailControl = component.employeeForm.get('email');

    emailControl?.setValue('invalid-email');

    expect(emailControl?.hasError('email')).toBeTrue();
  });

  it('should validate mobile number', () => {
    const mobileControl = component.employeeForm.get('mobile');

    mobileControl?.setValue('12345');

    expect(mobileControl?.hasError('pattern')).toBeTrue();
  });

  it('should accept a valid mobile number', () => {
    const mobileControl = component.employeeForm.get('mobile');

    mobileControl?.setValue('9876543210');

    expect(mobileControl?.valid).toBeTrue();
  });

  it('should make the form valid with valid data', () => {
    component.employeeForm.setValue({
      name: 'Payal Memane',
      email: 'payal@example.com',
      mobile: '9876543210',
      country: 'India',
      state: 'Maharashtra',
      district: 'Pune',
      avatar: ''
    });

    expect(component.employeeForm.valid).toBeTrue();
  });

  it('should emit employee data when form is submitted', () => {
    spyOn(component.formSubmit, 'emit');

    component.employee = null;
    component.employeeForm.setValue({
      name: 'Payal Memane',
      email: 'payal@example.com',
      mobile: '9876543210',
      country: 'India',
      state: 'Maharashtra',
      district: 'Pune',
      avatar: ''
    });

    component.onSubmit();

    expect(component.formSubmit.emit).toHaveBeenCalledWith({
      ...component.employeeForm.value,
      id: ''
    });
  });

  it('should emit cancel event', () => {
    spyOn(component.cancel, 'emit');

    component.onCancel();

    expect(component.cancel.emit).toHaveBeenCalled();
  });

  it('should populate form when editing an employee', () => {
    component.employee = mockEmployee;

  component.employeeForm.patchValue({
  name: mockEmployee.name,
  email: mockEmployee.email,
  mobile: mockEmployee.mobile,
  country: mockEmployee.country,
  state: mockEmployee.state,
  district: mockEmployee.district,
  avatar: mockEmployee.avatar ?? ''
});

    expect(component.employeeForm.value).toEqual({
      name: 'Payal Memane',
      email: 'payal@example.com',
      mobile: '9876543210',
      country: 'India',
      state: 'Maharashtra',
      district: 'Pune',
      avatar: ''
    });
  });

  it('should identify edit mode correctly', () => {
    component.employee = mockEmployee;

    expect(component.isEditMode).toBeTrue();
    expect(component.formTitle).toBe('Edit Employee');
    expect(component.submitButtonText).toBe('Update Employee');
  });

  it('should identify add mode correctly', () => {
    component.employee = null;

    expect(component.isEditMode).toBeFalse();
    expect(component.formTitle).toBe('Add Employee');
    expect(component.submitButtonText).toBe('Add Employee');
  });
});