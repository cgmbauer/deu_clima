import {combineReducers} from 'redux';

import getWeather from './getWeather';

export const rootReducer = combineReducers({
  getWeather,
});

export type RootState = ReturnType<typeof rootReducer>;
