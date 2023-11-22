import React from 'react';
import {StatusBar, Text, View} from 'react-native';
import MenuHeader from '../models/MenuHeader';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {dashboard_styles} from '../styles/dashboard_styles';

function Meetings() {
  return (
    <View>
      <StatusBar backgroundColor={Colors.yellow} />
      <View style={dashboard_styles.LoginHead}>
        <MenuHeader title="Meetings" />
        <Text style={dashboard_styles.paragrapg}>Welcome to Meetings</Text>
      </View>
    </View>
  );
}

export default Meetings;
