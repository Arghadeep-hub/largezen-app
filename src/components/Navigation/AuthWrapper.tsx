import React from 'react';
import {RootAuthParamList} from '../../models/common';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

// Screens
import Login from '../../view/Login';
import Signup from '../../view/Signup';

const Tab = createBottomTabNavigator<RootAuthParamList>();

const AuthWrapper = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {display: 'none'},
      }}>
      <Tab.Screen name="Login" component={Login} />
      <Tab.Screen name="Signup" component={Signup} />
    </Tab.Navigator>
  );
};

export default AuthWrapper;
