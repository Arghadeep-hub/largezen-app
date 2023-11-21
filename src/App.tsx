import React from 'react';
import {Provider, useSelector} from 'react-redux';
import {store} from './redux/store';
// Navigation
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// Screens
import Home from './view/Home';
import Leads from './view/Leads';
import Icons from './components/Icons';
import Meetings from './view/Meetings';
import Task from './view/Task';

export type RootStackParamList = {
  Home: undefined;
  Leads: {productId: string};
  Meetings: undefined;
  Task: undefined;
};

const Tab = createBottomTabNavigator<RootStackParamList>();

function AppWrapper() {
  const config = useSelector<any>(state => state.config);
  console.log(config);

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
        }}>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            title: '',
            tabBarIcon: () => <Icons name="home" />,
          }}
        />
        <Tab.Screen
          name="Leads"
          component={Leads}
          options={{
            title: '',
            tabBarIcon: () => <Icons name="addusergroup" />,
          }}
        />
        <Tab.Screen
          name="Meetings"
          component={Meetings}
          options={{
            title: '',
            tabBarIcon: () => <Icons name="calendar" />,
          }}
        />
        <Tab.Screen
          name="Task"
          component={Task}
          options={{
            title: '',
            tabBarIcon: () => <Icons name="profile" />,
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
