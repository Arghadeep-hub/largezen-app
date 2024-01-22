import React from 'react';
import {Text, View} from 'react-native';
import {dashboard_styles} from '../styles/dashboard_styles';
import MenuHeader from '../components/MenuHeader';

function Task() {
  return (
    <View>
      <View style={dashboard_styles.LoginHead}>
        <MenuHeader title="Tasks" />
        <Text style={dashboard_styles.paragrapg}>Welcome to your Tasks</Text>
      </View>
    </View>
  );
}

export default Task;
