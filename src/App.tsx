import React from 'react';
import {Provider, useSelector} from 'react-redux';
import {store} from './redux/store';
// Navigation
import {NavigationContainer} from '@react-navigation/native';
// Screens
import Home from './view/Home';
import Leads from './view/Leads';
import Icons from './components/Icons';
import Meetings from './view/Meetings';
import Task from './view/Task';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Colors from './components/Colors';

export type RootStackParamList = {
  Home: undefined;
  Leads: {productId: string};
  Meetings: undefined;
  Task: undefined;
};

const Tab = createMaterialBottomTabNavigator<RootStackParamList>();

function AppWrapper() {
  const config = useSelector<any>(state => state.config);
  console.log(config);

  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Home" activeColor="#e91e63">
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
