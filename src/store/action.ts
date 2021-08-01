export type Actions = {
  weather: {
    get: 'weather/get';
    clear: 'weather/clear';
    error: 'weather/error';
  };
  geoLocation: {
    get: 'geoLocation/get';
    clear: 'geoLocation/clear';
    error: 'geoLocation/error';
  };
};

const ACTIONS: Actions = {
  weather: {
    get: 'weather/get',
    clear: 'weather/clear',
    error: 'weather/error',
  },
  geoLocation: {
    get: 'geoLocation/get',
    clear: 'geoLocation/clear',
    error: 'geoLocation/error',
  },
};

export {ACTIONS};
