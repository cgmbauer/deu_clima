import api from './api';
import Config from 'react-native-config';

class WeatherService {
  public async getOneCallWeather({
    latitude,
    longitude,
  }: {
    latitude: number;
    longitude: number;
  }) {
    const response = await api.get(
      `onecall?lat=${latitude}&lon=${longitude}&units=metric&lang=pt_br&appid=${Config.OPEN_WEATHER_API}`,
    );

    return response;
  }
}

export default new WeatherService();
