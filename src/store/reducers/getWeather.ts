import {ACTIONS} from '../action';
import {GetWeather, GetWeatherActions} from '../actions/getWeather';

const INITIAL_STATE: GetWeather['data'] = {
  status: 10000,
  message: '',
  data: {
    timeZone: '',
    current: {
      temp: '',
      weather: [
        {
          id: 0,
          main: '',
          description: '',
        },
      ],
    },
    daily: [
      {
        temp: '',
        weather: [
          {
            id: 0,
            main: '',
            description: '',
          },
        ],
      },
    ],
    hourly: [
      {
        temp: '',
        weather: [
          {
            id: 0,
            main: '',
            description: '',
          },
        ],
      },
    ],
  },
};

export default function reducer(
  state = INITIAL_STATE,
  action: GetWeatherActions,
) {
  switch (action.type) {
    case ACTIONS.weather.get:
      return {
        ...state,
        status: action.data.status,
        message: '',
        data: action.data.data,
      };
    case ACTIONS.weather.error:
      return {
        ...state,
        status: action.data.status,
        message: action.data.message,
      };
    case ACTIONS.weather.clear:
      return INITIAL_STATE;
    default:
      return state;
  }
}
