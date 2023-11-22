import React from 'react';
import {StatusBar, Text, View} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {dashboard_styles} from '../styles/dashboard_styles';
import MenuHeader from '../models/MenuHeader';

function Task() {
  return (
    <View>
      <StatusBar backgroundColor={Colors.yellow} />
      <View style={dashboard_styles.LoginHead}>
        <MenuHeader title="Tasks" />
        <Text style={dashboard_styles.paragrapg}>Welcome to your Tasks</Text>
      </View>
    </View>
  );
}

export default Task;
