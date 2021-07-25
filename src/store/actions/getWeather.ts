import {ThunkAction} from 'redux-thunk';
import {ACTIONS, Actions} from '../action';
import WeatherServices from '../../services/weather';

export const getWeather = (): ThunkAction<any, any, any, any> => {
  return async (dispatch) => {
    try {
      const response = await WeatherServices.getOneCallWeather();

      dispatch({
        type: ACTIONS.weather.get,
        data: {
          status: response.status,
          data: response.data,
        },
      });
    } catch (err) {
      console.log(`${ACTIONS.weather.error}: `, err);

      dispatch({
        type: ACTIONS.weather.error,
        data: {
          status: err.response.status,
          message: 'Desculpe, serviço temporariamente indisponível.',
        },
      });
    }
  };
};

export const clearLogin = (): ThunkAction<any, any, any, any> => {
  return (dispatch) => {
    dispatch({
      type: ACTIONS.weather.clear,
    });
  };
};
