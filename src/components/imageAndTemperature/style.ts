import {StyleSheet} from 'react-native';

const imageAndTemperatureStyle = StyleSheet.create({
  imageAndTemperatureContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  momentContainer: {
    alignItems: 'center',
    marginBottom: 5,
  },
  imageContainer: {
    alignItems: 'center',
    position: 'relative',
  },
  temperatureContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  textDefault: {
    textAlign: 'center',
    color: '#fff',
  },
});

export default imageAndTemperatureStyle;
