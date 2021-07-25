import api from './api';
import Config from 'react-native-config';

class WeatherService {
  public async getOneCallWeather() {
    const response = api.get(
      `weather?q=recife&units=metric&lang=pt_br&appid=${Config.OPEN_WEATHER_API}`,
    );

    return response;
  }
}

export default new WeatherService();
