import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';

import * as EmployeeActions from './store/employee/employee.actions';
import * as CountryActions from './store/country/country.actions';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'employee-management';
  private readonly store = inject(Store);

  constructor() {
    this.store.dispatch(
      EmployeeActions.loadEmployees()
    );
    this.store.dispatch(CountryActions.loadCountries());
  }
}
