import React from 'react';
import Colors from '../../components/Colors';
import {useAppSelector} from '../../redux/store';
import AuthWrapper from './AuthWrapper';
import UserWrapper from './UserWrapper';
import {StatusBar} from 'react-native';

function AppWrapper() {
  return (
    <React.Fragment>
      <StatusBar backgroundColor={Colors.blue} barStyle={'light-content'} />
      <UserWrapper />
    </React.Fragment>
  );
}

export default AppWrapper;
