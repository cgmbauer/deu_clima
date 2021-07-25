import {ThunkAction} from 'redux-thunk';
import {ACTIONS, Actions} from '../action';
import WeatherServices from '../../services/weather';

export interface GetWeather {
  type: Actions['weather']['get'];
  data: {
    status: number;
    message?: string;
    data: {
      timeZone: string;
      current: {
        temp: string;
        weather: {
          id: number;
          main: string;
          description: string;
          icon: string;
        }[];
      };
      hourly: {
        temp: string;
        weather: {
          id: number;
          main: string;
          description: string;
          icon: string;
        }[];
      }[];
      daily: {
        temp: string;
        weather: {
          id: number;
          main: string;
          description: string;
          icon: string;
        }[];
      }[];
    };
  };
}

export interface ErrorGetWeather {
  type: Actions['weather']['error'];
  data: {
    status: number;
    message: string;
  };
}

export interface ClearGetWeather {
  type: Actions['weather']['clear'];
}

export type GetWeatherActions = GetWeather | ClearGetWeather | ErrorGetWeather;

export const getWeather = (
  latitude: number,
  longitude: number,
): ThunkAction<any, any, any, GetWeatherActions> => {
  return async (dispatch) => {
    try {
      const response = await WeatherServices.getOneCallWeather({
        latitude,
        longitude,
      });

      dispatch({
        type: ACTIONS.weather.get,
        data: {
          status: response.status,
          data: {
            timeZone: response.data.timezone,
            current: response.data.current,
            hourly: response.data.hourly,
            daily: response.data.daily,
          },
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

export const clearLogin = (): ThunkAction<any, any, any, GetWeatherActions> => {
  return (dispatch) => {
    dispatch({
      type: ACTIONS.weather.clear,
    });
  };
};
