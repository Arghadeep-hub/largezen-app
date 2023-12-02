import React from 'react';
import {Provider} from 'react-redux';
import {store} from './redux/store';
// Navigation
import {NavigationContainer} from '@react-navigation/native';
// Screens
import Home from './view/Home';
import Leads from './view/Leads';
import Icons from './components/Icons';
import Meetings from './view/Meetings';
import Task from './view/Task';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Colors from './components/Colors';
import {StatusBar} from 'react-native';

export type RootStackParamList = {
  Home: undefined;
  Leads: undefined;
  Meetings: undefined;
  Task: undefined;
};

const Tab = createBottomTabNavigator<RootStackParamList>();

function AppWrapper() {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor={Colors.blue} />
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
            tabBarIcon: ({color}) => (
              <Icons name="addusergroup" color={color} />
            ),
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
    </NavigationContainer>
  );
}

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <AppWrapper />
    </Provider>
  );
}

export default App;
