import {StyleSheet} from 'react-native';

const homePageStyle = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
  },
  scrollContainer: {
    flexGrow: 1,
  },

  textDefault: {
    textAlign: 'center',
    color: '#fff',
  },
  dayText: {
    fontSize: 16,
  },
  locationText: {
    fontSize: 34,
  },
  currentDescriptionText: {
    fontSize: 18,
  },
});

export default homePageStyle;
