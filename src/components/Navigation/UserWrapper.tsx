import React from 'react';
import Colors from '../Colors';
import {RootStackParamList} from '../../models/common';
// Navigation
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// Screens
import Home from '../../view/Home';
import Leads from '../../view/Leads';
import Icons from '../../components/Icons';
import Meetings from '../../view/Meetings';
import Task from '../../view/Task';

const Tab = createBottomTabNavigator<RootStackParamList>();

const UserWrapper = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.violate,
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          title: '',
          tabBarIcon: ({color}) => <Icons name="home" color={color} />,
        }}
      />
      <Tab.Screen
        name="Leads"
        component={Leads}
        options={{
          title: '',
          tabBarIcon: ({color}) => <Icons name="addusergroup" color={color} />,
        }}
      />
      <Tab.Screen
        name="Meetings"
        component={Meetings}
        options={{
          title: '',
          tabBarIcon: ({color}) => <Icons name="calendar" color={color} />,
        }}
      />
      <Tab.Screen
        name="Task"
        component={Task}
        options={{
          title: '',
          tabBarIcon: ({color}) => <Icons name="profile" color={color} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default UserWrapper;
