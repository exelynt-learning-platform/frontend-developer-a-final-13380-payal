import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';

import { employeeReducer } from './store/employee/employee.reducer';
import { EmployeeEffects } from './store/employee/employee.effects';
import { countryReducer } from './store/country/country.reducer';
import { CountryEffects } from './store/country/country.effects';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),  
    provideHttpClient(),
    provideStore({
    employees: employeeReducer,
    countries: countryReducer
  }),

  provideEffects([
    EmployeeEffects,
    CountryEffects
  ])
  ]
};
