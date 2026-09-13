import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';

import * as CountryActions from './country.actions';
import { CountryService } from '../../core/services/country.service';

@Injectable()
export class CountryEffects {

  private readonly actions$ = inject(Actions);
  private readonly countryService = inject(CountryService);

  loadCountries$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CountryActions.loadCountries),

      switchMap(() =>
        this.countryService.getCountries().pipe(
          map((countries) =>
            CountryActions.loadCountriesSuccess({ countries })
          ),

          catchError(() =>
            of(
              CountryActions.loadCountriesFailure({
                error: 'Unable to load countries.'
              })
            )
          )
        )
      )
    )
  );
}