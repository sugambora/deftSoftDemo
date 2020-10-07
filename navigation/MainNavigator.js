import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import TimerScreen from '../screens/TimerScreen';

const StackNavigator = createStackNavigator();

const MainNavigator = (props) => {
  // console.log('MainNavigator');
  return (
    <NavigationContainer>
      <StackNavigator.Navigator
        initialRouteName="TimerScreen"
        headerMode="none">
        <StackNavigator.Screen name="TimerScreen" component={TimerScreen} />
      </StackNavigator.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;
