export type Actions = {
  weather: {
    get: 'weather/get';
    clear: 'weather/clear';
    error: 'weather/error';
  };
};

const ACTIONS: Actions = {
  weather: {
    get: 'weather/get',
    clear: 'weather/clear',
    error: 'weather/error',
  },
};

export {ACTIONS};
