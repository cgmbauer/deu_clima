import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  ScrollView,
  Text,
  Platform,
  ActivityIndicator,
  TouchableHighlight,
  TouchableOpacity,
  Image,
} from 'react-native';
import {connect, ConnectedProps} from 'react-redux';
import {bindActionCreators} from 'redux';

import Geolocation from 'react-native-geolocation-service';
import 'moment/locale/pt-br';

import * as GetWeatherActions from '../../store/actions/getWeather';
import * as GetGeoLocationActions from '../../store/actions/getGeoLocation';
import {RootState} from '../../store/reducers';

import homePageStyle from './style';
import {
  DateComponent,
  CurrentWeather,
  ImageAndTemperature,
} from '../../components';

import threeDotsIcon from '../../assets/img/threeDots.png';
import refreshIcon from '../../assets/img/refresh.png';

const HomePage: React.FC<PropsFromRedux> = ({
  getWeatherActions,
  getWeatherState,
  getGeoLocationActions,
  getGeoLocationState,
}) => {
  const [isLoading, setIsLoading] = useState(true);

  const [weatherData, setWeatherData] = useState(
    {} as GetWeatherActions.GetWeather['data'],
  );

  const [locationName, setLocationName] = useState(
    {} as GetGeoLocationActions.GetGeoLocation['data'],
  );

  const [isHourly, setIsHourly] = useState(true);

  const [openMenu, setOpenMenu] = useState(false);

  useEffect(() => {
    Geolocation.getCurrentPosition(
      (position) => {
        console.log(position);

        getGeoLocationActions.getGeoLocation(
          position.coords.latitude,
          position.coords.longitude,
        );

        getWeatherActions.getWeather(
          position.coords.latitude,
          position.coords.longitude,
        );
      },
      (error) => {
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
    if (getGeoLocationState.status === 200) {
      console.log(getGeoLocationState);
      setLocationName(getGeoLocationState);
    }

    if (getWeatherState.status === 200) {
      console.log(getWeatherState);
      setWeatherData(getWeatherState);
      setIsLoading(false);
    }
  }, [getWeatherState, getGeoLocationState]);

  const renderDailyWeather = useCallback(() => {
    const dailyWeatherArray = weatherData.data.daily.slice(1);

    return (
      <ScrollView horizontal style={homePageStyle.seriesWeatherContainer}>
        {dailyWeatherArray.map((dayWeather) => (
          <View
            key={`${dayWeather.dt}`}
            style={homePageStyle.displaySeriesWeather}>
            <ImageAndTemperature
              imageWidth={40}
              imageHeight={40}
              temperatureFontSize={12}
              weatherData={dayWeather}
              showWeekDay
            />
          </View>
        ))}
      </ScrollView>
    );
  }, [weatherData]);

  const renderHourlyWeather = useCallback(() => {
    const hourlyWeatherArray = weatherData.data.hourly.slice(1, 25);

    return (
      <ScrollView horizontal style={homePageStyle.seriesWeatherContainer}>
        {hourlyWeatherArray.map((dayWeather) => (
          <View
            key={`${dayWeather.dt}`}
            style={homePageStyle.displaySeriesWeather}>
            <ImageAndTemperature
              imageWidth={40}
              imageHeight={40}
              temperatureFontSize={12}
              weatherData={dayWeather}
              showHour
            />
          </View>
        ))}
      </ScrollView>
    );
  }, [weatherData]);

  const handleClick = useCallback(
    () => (openMenu ? setOpenMenu(false) : undefined),
    [openMenu],
  );

  const handleRefresh = useCallback(() => {
    setIsLoading(true);

    Geolocation.getCurrentPosition(
      (position) => {
        console.log(position);

        getGeoLocationActions.getGeoLocation(
          position.coords.latitude,
          position.coords.longitude,
        );

        getWeatherActions.getWeather(
          position.coords.latitude,
          position.coords.longitude,
        );
      },
      (error) => {
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

    setOpenMenu(false);
  }, []);

  return (
    <>
      {!isLoading ? (
        <View
          style={[
            homePageStyle.body,
            {
              backgroundColor:
                getWeatherState.data.current.weather[0].icon.includes('d')
                  ? homePageStyle.bodyBgDay.backgroundColor
                  : homePageStyle.bodyBgNight.backgroundColor,
            },
          ]}>
          <View style={homePageStyle.menuContainer}>
            <TouchableOpacity
              onPress={() => setOpenMenu(!openMenu)}
              style={homePageStyle.menuButton}>
              <Image source={threeDotsIcon} accessibilityLabel="menu" />
            </TouchableOpacity>

            {openMenu && (
              <View style={homePageStyle.menuItemContainer}>
                <TouchableHighlight
                  onPress={handleRefresh}
                  style={homePageStyle.menuItem}>
                  <>
                    <Image
                      source={refreshIcon}
                      style={homePageStyle.menuIcon}
                      accessibilityLabel="refresh icon"
                    />
                    <Text style={homePageStyle.menuText}>Atualizar</Text>
                  </>
                </TouchableHighlight>
              </View>
            )}
          </View>

          <View
            onStartShouldSetResponder={(evt) => true}
            onResponderGrant={handleClick}
            style={homePageStyle.scrollViewContainer}>
            <ScrollView
              contentContainerStyle={homePageStyle.scrollViewContentContainer}>
              <View>
                <View style={homePageStyle.dateComponentContainer}>
                  <DateComponent currentApiDay={weatherData.data.current.dt} />
                </View>

                <View style={homePageStyle.currentWeatherContainer}>
                  {Object.entries(weatherData).length > 0 && (
                    <CurrentWeather
                      locationName={locationName.data.locationName}
                      weatherToday={weatherData.data.current}
                    />
                  )}
                </View>
              </View>

              <View>
                <View style={homePageStyle.buttonsContainer}>
                  <TouchableHighlight
                    onPress={() => setIsHourly(true)}
                    underlayColor="#d3d3d3"
                    style={
                      isHourly
                        ? homePageStyle.selectedButton
                        : homePageStyle.notSelectedButton
                    }>
                    <Text style={homePageStyle.buttonText}>Hoje</Text>
                  </TouchableHighlight>

                  <TouchableHighlight
                    onPress={() => setIsHourly(false)}
                    underlayColor="#d3d3d3"
                    style={
                      !isHourly
                        ? homePageStyle.selectedButton
                        : homePageStyle.notSelectedButton
                    }>
                    <Text style={homePageStyle.buttonText}>Semana</Text>
                  </TouchableHighlight>
                </View>

                {isHourly ? renderHourlyWeather() : renderDailyWeather()}
              </View>
            </ScrollView>
          </View>
        </View>
      ) : (
        <View
          style={[
            homePageStyle.body,
            homePageStyle.activityIndicatorContainer,
          ]}>
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
  getGeoLocationState: state.getGeoLocation,
});

const mapDispatchToProps = (dispatch: any) => ({
  getWeatherActions: bindActionCreators(GetWeatherActions, dispatch),
  getGeoLocationActions: bindActionCreators(GetGeoLocationActions, dispatch),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(HomePage);
