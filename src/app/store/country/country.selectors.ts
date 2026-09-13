import { createFeatureSelector, createSelector } from '@ngrx/store';

import {
  countryAdapter,
  CountryState
} from './country.reducer';

export const selectCountryState =
  createFeatureSelector<CountryState>('countries');

export const {
  selectAll: selectAllCountries,
  selectEntities: selectCountryEntities,
  selectIds: selectCountryIds,
  selectTotal: selectCountryTotal
} = countryAdapter.getSelectors(selectCountryState);

export const selectCountriesLoading = createSelector(
  selectCountryState,
  (state) => state.loading
);

export const selectCountriesError = createSelector(
  selectCountryState,
  (state) => state.error
);