import React from 'react';
import {Text, View} from 'react-native';
import MenuHeader from '../models/MenuHeader';
import {dashboard_styles} from '../styles/dashboard_styles';

function Meetings() {
  return (
    <View>
      <View style={dashboard_styles.LoginHead}>
        <MenuHeader title="Meetings" />
        <Text style={dashboard_styles.paragrapg}>Welcome to Meetings</Text>
      </View>
    </View>
  );
}

export default Meetings;
