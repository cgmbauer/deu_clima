import {StyleSheet} from 'react-native';

const currentWeatherStyle = StyleSheet.create({
  textDefault: {
    textAlign: 'center',
    color: '#fff',
  },
  locationText: {
    fontSize: 34,
  },
  currentDescriptionText: {
    fontSize: 18,
  },

  imageAndTemperatureContainer: {
    marginTop: 70,
    alignItems: 'center',
    position: 'relative',
  },
});

export default currentWeatherStyle;
