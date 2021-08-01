const StormImage = require('../assets/img/storm.png');
const SunImage = require('../assets/img/sun.png');
const MoonImage = require('../assets/img/night.png');
const SnowImage = require('../assets/img/snowflake.png');
const FogImage = require('../assets/img/fog.png');
const CloudImage = require('../assets/img/cloud.png');
const CloudyNight = require('../assets/img/cloudy-night.png');
const CloudyDay = require('../assets/img/cloudy.png');

const checkImage = (weatherId: number, isDay: boolean) => {
  if (weatherId >= 200 && weatherId <= 599) {
    return StormImage;
  } else if (weatherId >= 600 && weatherId <= 699) {
    return SnowImage;
  } else if (weatherId >= 700 && weatherId <= 799) {
    return FogImage;
  } else if (weatherId === 800) {
    if (isDay) {
      return SunImage;
    } else {
      return MoonImage;
    }
  } else if (weatherId === 801 || weatherId === 802) {
    if (isDay) {
      return CloudyDay;
    } else {
      return CloudyNight;
    }
  } else if (weatherId === 803 || weatherId === 804) {
    return CloudImage;
  } else {
    return CloudImage;
  }
};

export default checkImage;
