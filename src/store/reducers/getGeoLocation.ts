import {ACTIONS} from '../action';
import {GetGeoLocationActions, GetGeoLocation} from '../actions/getGeoLocation';

const INITIAL_STATE: GetGeoLocation['data'] = {
  status: 10000,
  message: '',
  data: {
    locationName: '',
  },
};

export default function reducer(
  state = INITIAL_STATE,
  action: GetGeoLocationActions,
) {
  switch (action.type) {
    case ACTIONS.geoLocation.get:
      return {
        ...state,
        status: action.data.status,
        message: '',
        data: action.data.data,
      };
    case ACTIONS.geoLocation.error:
      return {
        ...state,
        status: action.data.status,
        message: action.data.message,
      };
    case ACTIONS.geoLocation.clear:
      return INITIAL_STATE;
    default:
      return state;
  }
}
