import {combineReducers} from 'redux';

import getWeather from './getWeather';
import getGeoLocation from './getGeoLocation';

export const rootReducer = combineReducers({
  getWeather,
  getGeoLocation,
});

export type RootState = ReturnType<typeof rootReducer>;
