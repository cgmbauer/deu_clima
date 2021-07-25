import React, {useEffect, useState} from 'react';
import {View, ScrollView, Platform, ActivityIndicator} from 'react-native';
import {connect, ConnectedProps} from 'react-redux';
import {bindActionCreators} from 'redux';

import Geolocation from 'react-native-geolocation-service';
import 'moment/locale/pt-br';

import * as GetWeatherActions from '../../store/actions/getWeather';
import {RootState} from '../../store/reducers';

import homePageStyle from './style';
import {DateComponent, CurrentWeather} from '../../components';

const HomePage: React.FC<PropsFromRedux> = ({
  getWeatherActions,
  getWeatherState,
}) => {
  const [weatherData, setWeatherData] = useState(
    {} as GetWeatherActions.GetWeather['data'],
  );
  useEffect(() => {
    Geolocation.getCurrentPosition(
      (position) => {
        console.log(position);
        getWeatherActions.getWeather(
          position.coords.latitude,
          position.coords.longitude,
        );
      },
      (error) => {
        // See error code charts below.

        // chamar Geolocation de novo.

        console.log(error.code, error.message);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
        accuracy: {
          android: 'high',
          ios: 'best',
        },
      },
    );
  }, []);

  useEffect(() => {
    if (getWeatherState.status === 200) {
      console.log(getWeatherState);
      setWeatherData(getWeatherState);
    }
  }, [getWeatherState]);

  return (
    <>
      {getWeatherState.status === 200 ? (
        <View
          style={[
            homePageStyle.body,
            {
              backgroundColor:
                getWeatherState.data.current.weather[0].icon.includes('d')
                  ? '#38B6FF'
                  : '#004aad',
            },
          ]}>
          <ScrollView style={homePageStyle.scrollContainer}>
            <View style={{marginTop: 70}}>
              <DateComponent />
            </View>

            <View style={{marginTop: 30}}>
              {Object.entries(weatherData).length > 0 && (
                <CurrentWeather
                  timezone={weatherData.data.timeZone}
                  weatherToday={weatherData.data.current}
                />
              )}
            </View>
          </ScrollView>
        </View>
      ) : (
        <View style={[homePageStyle.body, {justifyContent: 'center'}]}>
          <ActivityIndicator
            animating
            size={Platform.OS === 'android' ? 40 : 'large'}
            color="blue"
          />
        </View>
      )}
    </>
  );
};

const mapStateToProps = (state: RootState) => ({
  getWeatherState: state.getWeather,
});

const mapDispatchToProps = (dispatch: any) => ({
  getWeatherActions: bindActionCreators(GetWeatherActions, dispatch),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(HomePage);
