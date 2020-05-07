import React from 'react';

import Details from '../Screens/Details';
import HomeScreen from '../Screens/HomeScreen';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

const Stack = createStackNavigator();

const StackNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          initialParams={{country: 'RUS'}}
          options={{
            title: 'Covid Tracker',
            color: 'white',
            headerStyle: {
              backgroundColor: '#2964df',
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              color: 'white',
              fontFamily: 'Quantico',
              fontSize: 30,
            },
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen name="Details" component={Details} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigation;
