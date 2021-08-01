import React, {useState, useEffect} from 'react';
import {useCallback} from 'react';
import {View, Text, Image} from 'react-native';
import moment from 'moment';

import imageAndTemperatureStyle from './style';

interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

interface TemperatureObject {
  day: number;
}

interface CurrentWeatherProps {
  temperatureFontSize: number;
  imageWidth: number;
  imageHeight: number;
  showHour?: boolean;
  showWeekDay?: boolean;
  weatherData: {
    dt: number;
    temp: number | TemperatureObject;
    weather: Weather[];
  };
}
const StormImage = require('../../assets/img/storm.png');
const SunImage = require('../../assets/img/sun.png');
const MoonImage = require('../../assets/img/night.png');
const SnowImage = require('../../assets/img/snowflake.png');
const FogImage = require('../../assets/img/fog.png');
const CloudImage = require('../../assets/img/cloud.png');
const CloudyNight = require('../../assets/img/cloudy-night.png');
const CloudyDay = require('../../assets/img/cloudy.png');

const ImageAndTemperature = ({
  temperatureFontSize = 16,
  imageWidth = 100,
  imageHeight = 100,
  showHour = false,
  showWeekDay = false,
  weatherData,
}: CurrentWeatherProps) => {
  const [displayedImage, setDisplayedImage] = useState('');

  useEffect(() => {
    const isDay = weatherData.weather[0].icon.includes('d');

    const weatherId = weatherData.weather[0].id;

    if (weatherId >= 200 && weatherId <= 599) {
      return setDisplayedImage(StormImage);
    } else if (weatherId >= 600 && weatherId <= 699) {
      return setDisplayedImage(SnowImage);
    } else if (weatherId >= 700 && weatherId <= 799) {
      return setDisplayedImage(FogImage);
    } else if (weatherId === 800) {
      if (isDay) {
        return setDisplayedImage(SunImage);
      } else {
        return setDisplayedImage(MoonImage);
      }
    } else if (weatherId === 801 || weatherId === 802) {
      if (isDay) {
        return setDisplayedImage(CloudyDay);
      } else {
        return setDisplayedImage(CloudyNight);
      }
    } else if (weatherId === 803 || weatherId === 804) {
      return setDisplayedImage(CloudImage);
    } else {
      return setDisplayedImage(CloudImage);
    }
  }, [weatherData]);

  const getTime = useCallback(() => {
    const now = moment.unix(weatherData.dt).utc(true);
    const hour = now.format('HH:mm');

    return (
      <View style={imageAndTemperatureStyle.momentContainer}>
        <Text
          style={[
            imageAndTemperatureStyle.textDefault,
            {fontSize: temperatureFontSize},
          ]}>
          {hour}
        </Text>
      </View>
    );
  }, [temperatureFontSize, weatherData.dt]);

  const getWeekDay = useCallback(() => {
    const now = moment.unix(weatherData.dt).utc(true);
    const dayOfWeek =
      now.format('dddd').charAt(0).toUpperCase() +
      now.format('dddd').slice(1).split('-')[0];

    return (
      <View style={imageAndTemperatureStyle.momentContainer}>
        <Text
          style={[
            imageAndTemperatureStyle.textDefault,
            {fontSize: temperatureFontSize},
          ]}>
          {dayOfWeek}
        </Text>
      </View>
    );
  }, [temperatureFontSize, weatherData.dt]);

  return (
    <View style={imageAndTemperatureStyle.imageAndTemperatureContainer}>
      {showHour && !showWeekDay && getTime()}
      {!showHour && showWeekDay && getWeekDay()}
      <View style={imageAndTemperatureStyle.imageContainer}>
        <Image
          source={displayedImage}
          style={{
            width: imageWidth,
            height: imageHeight,
            resizeMode: 'cover',
          }}
        />
      </View>

      <View style={imageAndTemperatureStyle.temperatureContainer}>
        <Text
          style={[
            imageAndTemperatureStyle.textDefault,
            {fontSize: temperatureFontSize},
          ]}>
          {`${
            typeof weatherData.temp === 'number'
              ? Math.round(weatherData.temp)
              : Math.round(weatherData.temp.day)
          }ºC`}
        </Text>
      </View>
    </View>
  );
};

export default ImageAndTemperature;
