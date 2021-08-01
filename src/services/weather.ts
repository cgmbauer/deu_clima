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
      `data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=metric&lang=pt_br&appid=${Config.OPEN_WEATHER_API}`,
    );

    return response;
  }

  public async getGeoLocation({
    latitude,
    longitude,
  }: {
    latitude: number;
    longitude: number;
  }) {
    const response = await api.get(
      `geo/1.0/reverse?lat=${latitude}&lon=${longitude}&units=metric&lang=pt_br&appid=${Config.OPEN_WEATHER_API}`,
    );

    return response;
  }
}

export default new WeatherService();
