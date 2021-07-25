import React from 'react';
import {View, Text} from 'react-native';

import homePageStyle from './style';

const HomePage: React.FC = () => {
  return (
    <View style={homePageStyle.body}>
      <Text>Hello World!!</Text>
    </View>
  );
};

export default HomePage;
