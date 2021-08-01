import {ThunkAction} from 'redux-thunk';
import {ACTIONS, Actions} from '../action';
import WeatherServices from '../../services/weather';

export interface GetGeoLocation {
  type: Actions['geoLocation']['get'];
  data: {
    status: number;
    message?: string;
    data: {
      locationName: string;
    };
  };
}

export interface ErrorGeoLocation {
  type: Actions['geoLocation']['error'];
  data: {
    status: number;
    message: string;
  };
}

export interface ClearGeoLocation {
  type: Actions['geoLocation']['clear'];
}

export type GetGeoLocationActions =
  | GetGeoLocation
  | ClearGeoLocation
  | ErrorGeoLocation;

export const getGeoLocation = (
  latitude: number,
  longitude: number,
): ThunkAction<any, any, any, GetGeoLocationActions> => {
  return async (dispatch) => {
    try {
      const response = await WeatherServices.getGeoLocation({
        latitude,
        longitude,
      });

      dispatch({
        type: ACTIONS.geoLocation.get,
        data: {
          status: response.status,
          data: {
            locationName: response.data[0].name,
          },
        },
      });
    } catch (err) {
      console.log(`${ACTIONS.weather.error}: `, err);

      dispatch({
        type: ACTIONS.geoLocation.error,
        data: {
          status: err.response.status,
          message: 'Desculpe, serviço temporariamente indisponível.',
        },
      });
    }
  };
};

export const clearLogin = (): ThunkAction<
  any,
  any,
  any,
  GetGeoLocationActions
> => {
  return (dispatch) => {
    dispatch({
      type: ACTIONS.geoLocation.clear,
    });
  };
};
