import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';

import currentWeatherStyle from './style';

import {ImageAndTemperature} from '../index';

interface CurrentWeatherProps {
  locationName: string;
  weatherToday: {
    dt: number;
    temp: number;
    weather: {
      id: number;
      main: string;
      description: string;
      icon: string;
    }[];
  };
}

const CurrentWeather = ({locationName, weatherToday}: CurrentWeatherProps) => {
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    setLocation(locationName);

    const descriptionCapitalLetter =
      weatherToday.weather[0].description.charAt(0).toUpperCase() +
      weatherToday.weather[0].description.slice(1);

    setDescription(descriptionCapitalLetter);
  }, [locationName, weatherToday]);

  return (
    <>
      <View>
        <Text
          style={[
            currentWeatherStyle.textDefault,
            currentWeatherStyle.locationText,
          ]}>
          {location}
        </Text>
        <Text
          style={[
            currentWeatherStyle.textDefault,
            currentWeatherStyle.currentDescriptionText,
          ]}>
          {description}
        </Text>
      </View>

      <View style={currentWeatherStyle.imageAndTemperatureContainer}>
        <ImageAndTemperature
          imageWidth={220}
          imageHeight={220}
          temperatureFontSize={34}
          weatherData={weatherToday}
        />
      </View>
    </>
  );
};

export default CurrentWeather;
