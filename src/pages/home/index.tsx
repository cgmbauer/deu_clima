import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import {connect, ConnectedProps} from 'react-redux';
import {bindActionCreators} from 'redux';

import Geolocation from 'react-native-geolocation-service';

import * as GetWeatherActions from '../../store/actions/getWeather';
import {RootState} from '../../store/reducers';

import homePageStyle from './style';

const HomePage: React.FC<PropsFromRedux> = () => {
  useEffect(() => {
    Geolocation.getCurrentPosition(
      (position) => {
        console.log(position);
      },
      (error) => {
        // See error code charts below.
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
  return (
    <View style={homePageStyle.body}>
      <Text>Hello World!!</Text>
    </View>
  );
};

const mapStateToProps = (state: RootState) => ({
  // associatedInfoState: state.associatedInfo
});

const mapDispatchToProps = (dispatch: any) => ({
  // associatedInfoActions: bindActionCreators(GetWeatherActions, dispatch),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default HomePage;
