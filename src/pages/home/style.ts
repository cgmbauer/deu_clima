import {StyleSheet} from 'react-native';

const homePageStyle = StyleSheet.create({
  body: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
    paddingHorizontal: 10,
  },
  bodyBgDay: {
    backgroundColor: '#38B6FF',
  },
  bodyBgNight: {
    backgroundColor: '#004aad',
  },
  menuContainer: {
    width: '100%',
    height: 'auto',
    alignItems: 'flex-end',
    position: 'relative',
  },
  menuButton: {
    paddingLeft: 20,
    paddingVertical: 15,
  },
  menuItemContainer: {
    backgroundColor: '#fff',
    width: '40%',
    minWidth: 150,
    position: 'absolute',
    top: 45,
    zIndex: 1,
  },
  menuItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  menuIcon: {
    marginRight: 8,
  },
  menuText: {
    color: '#00247d',
  },

  scrollViewContainer: {
    flex: 1,
  },
  scrollViewContentContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },

  dateComponentContainer: {
    marginTop: 10,
  },

  currentWeatherContainer: {
    marginTop: 30,
  },

  buttonsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 40,
  },
  selectedButton: {
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
  },
  notSelectedButton: {
    paddingHorizontal: 10,
    opacity: 0.5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
  },

  seriesWeatherContainer: {
    paddingTop: 30,
    paddingBottom: 60,
  },
  displaySeriesWeather: {
    marginRight: 15,
  },

  activityIndicatorContainer: {
    justifyContent: 'center',
  },
});

export default homePageStyle;
