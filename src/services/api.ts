import axios from 'axios';
import Config from 'react-native-config';

const api = axios.create({
  baseURL: `https:///api.openweathermap.org/data/2.5/weather?q=recife&units=metric&lang=pt_br&appid=${Config.OPEN_WEATHER_API}`,
});

export default api;
