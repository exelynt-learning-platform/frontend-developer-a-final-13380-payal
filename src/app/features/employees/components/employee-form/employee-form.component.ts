import { Component, EventEmitter, Output, Input, OnChanges, SimpleChanges  } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { Employee } from '../../../../core/models/employee';

@Component({
  selector: 'app-employee-form',
  imports: [ReactiveFormsModule, MatButtonModule],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.scss'
})
export class EmployeeFormComponent {
  @Output() formSubmit = new EventEmitter<Employee>();
  @Output() cancel = new EventEmitter<void>();
  @Input() employee: Employee | null = null;

  employeeForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.employeeForm = this.fb.group({
      name: ['', [
        Validators.required,
        Validators.minLength(2)
      ]],

      email: ['', [
        Validators.required,
        Validators.email
      ]],

      mobile: ['', [
        Validators.required,
        Validators.pattern(/^[0-9]{10}$/)
      ]],

      country: ['', Validators.required],

      state: ['', Validators.required],

      district: ['', Validators.required],

      avatar: ['']
    });
  }

  ngOnChanges(changes: SimpleChanges): void { 
    if (changes['employee'] && this.employee) { 
      this.employeeForm.patchValue({ 
        name: this.employee.name, 
        email: this.employee.email, 
        mobile: this.employee.mobile, 
        country: this.employee.country, 
        state: this.employee.state, 
        district: this.employee.district, 
        avatar: this.employee.avatar 
      });
    } 
  }

  // Submit Form
  onSubmit(): void {
    if (this.employeeForm.invalid) {
      this.employeeForm.markAllAsTouched();
      return;
    }

    this.formSubmit.emit({ 
      ...this.employeeForm.value, 
      id: this.employee?.id ?? '' 
    });
  }

  // Cancel 
  onCancel(): void {
    this.cancel.emit();
  }

  get name() {
    return this.employeeForm.get('name');
  }

  get email() {
    return this.employeeForm.get('email');
  }

  get mobile() {
    return this.employeeForm.get('mobile');
  }

  get country() {
    return this.employeeForm.get('country');
  }

  get state() {
    return this.employeeForm.get('state');
  }

  get district() {
    return this.employeeForm.get('district');
  }

  get isEditMode(): boolean {
    return !!this.employee;
  }

  get formTitle(): string {
    return this.isEditMode ? 'Edit Employee' : 'Add Employee';
  }

  get submitButtonText(): string {
    return this.isEditMode ? 'Update Employee' : 'Add Employee';
  }
}
