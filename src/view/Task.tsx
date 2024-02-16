import * as React from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import {dashboard_styles} from '../styles/dashboard_styles';
import MenuHeader from '../components/MenuHeader';

function Task() {
  return (
    <SafeAreaView>
      <View style={dashboard_styles.LoginHead}>
        <MenuHeader title="Tasks" />
        <Text style={dashboard_styles.paragrapg}>Welcome to your Tasks</Text>
      </View>
    </SafeAreaView>
  );
}

export default Task;
