import 'react-native-gesture-handler';
import React from 'react';
import {StatusBar, View, LogBox} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {ROUTES} from './config/routes';
import GlobalStyle from './globalStyle';

import HomePage from './pages/home';

const Stack = createStackNavigator();
LogBox.ignoreAllLogs();

const App = () => {
  return (
    <View style={GlobalStyle.body}>
      <StatusBar backgroundColor="blue" barStyle="light-content" />
      <NavigationContainer>
        <Stack.Navigator initialRouteName={ROUTES.HomePage}>
          <Stack.Screen
            name={ROUTES.HomePage}
            component={HomePage}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};

export default App;
