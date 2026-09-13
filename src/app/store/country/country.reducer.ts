import { createReducer, on } from '@ngrx/store';
import {
  EntityState,
  EntityAdapter,
  createEntityAdapter
} from '@ngrx/entity';

import { Country } from '../../core/models/country';
import * as CountryActions from './country.actions';

export interface CountryState extends EntityState<Country> {
  loading: boolean;
  error: string | null;
}

export const countryAdapter: EntityAdapter<Country> =
  createEntityAdapter<Country>();

export const initialCountryState: CountryState =
  countryAdapter.getInitialState({
    loading: false,
    error: null
  });

export const countryReducer = createReducer(
  initialCountryState,

  on(CountryActions.loadCountries, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

  on(CountryActions.loadCountriesSuccess, (state, { countries }) =>
    countryAdapter.setAll(countries, {
      ...state,
      loading: false,
      error: null
    })
  ),

  on(CountryActions.loadCountriesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);