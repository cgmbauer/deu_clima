import 'react-native-gesture-handler';
import React from 'react';
import {StatusBar, View, LogBox} from 'react-native';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import moment from 'moment';

import {ROUTES} from './config/routes';
import store from './store';
import GlobalStyle from './globalStyle';

import HomePage from './pages/home';

const Stack = createStackNavigator();
LogBox.ignoreAllLogs();

moment.locale('pt-br');

const App = () => {
  return (
    <View style={GlobalStyle.body}>
      <Provider store={store}>
        <StatusBar hidden />
        <NavigationContainer>
          <Stack.Navigator initialRouteName={ROUTES.HomePage}>
            <Stack.Screen
              name={ROUTES.HomePage}
              component={HomePage}
              options={{headerShown: false}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </View>
  );
};

export default App;
