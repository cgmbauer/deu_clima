import React from 'react';
import {View, Text, Image} from 'react-native';

import currentWeatherStyle from './style';

import {useState} from 'react';
import {useEffect} from 'react';

interface CurrentWeatherProps {
  timezone: string;
  weatherToday: {
    temp: string;
    weather: {
      id: number;
      main: string;
      description: string;
      icon: string;
    }[];
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
const DayShade = require('../../assets/img/dayShade.png');
const NightShade = require('../../assets/img/nightShade.png');

const CurrentWeather = ({timezone, weatherToday}: CurrentWeatherProps) => {
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [displayedImage, setDisplayedImage] = useState('');
  const [dayShift, setdayShift] = useState('');

  useEffect(() => {
    const currentLocation = timezone.split('/')[1];
    setLocation(currentLocation);

    const descriptionCapitalLetter =
      weatherToday.weather[0].description.charAt(0).toUpperCase() +
      weatherToday.weather[0].description.slice(1);

    setDescription(descriptionCapitalLetter);

    const checkShift = weatherToday.weather[0].icon.includes('d');
    setdayShift(checkShift ? DayShade : NightShade);

    const weather = weatherToday.weather[0].id;
    if (weather >= 200 && weather <= 599) {
      setDisplayedImage(StormImage);
    } else if (weather >= 600 && weather <= 699) {
      setDisplayedImage(SnowImage);
    } else if (weather >= 700 && weather <= 799) {
      setDisplayedImage(FogImage);
    } else if (weather === 800) {
      if (checkShift) {
        setDisplayedImage(SunImage);
      } else {
        setDisplayedImage(MoonImage);
      }
    } else if (weather === 801 || weather === 802) {
      if (checkShift) {
        setDisplayedImage(CloudyDay);
      } else {
        setDisplayedImage(CloudyNight);
      }
    } else if (weather === 803 || weather === 804) {
      setDisplayedImage(CloudImage);
    }
  }, [timezone, weatherToday]);

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

      <View style={{marginTop: 70, alignItems: 'center', position: 'relative'}}>
        <Image
          source={displayedImage}
          style={{
            width: 220,
            height: 220,
            resizeMode: 'cover',
            zIndex: 1,
          }}
        />
        {/* <Image
          source={dayShift}
          style={{
            width: 100,
            height: 100,
            resizeMode: 'cover',
            position: 'absolute',
            top: 0,
            right: 10,
          }}
        /> */}
      </View>

      <View style={{marginTop: 10}}>
        <Text
          style={[
            currentWeatherStyle.textDefault,
            currentWeatherStyle.locationText,
          ]}>
          {`${Math.round(weatherToday.temp)}ºC`}
        </Text>
      </View>
    </>
  );
};

export default CurrentWeather;
