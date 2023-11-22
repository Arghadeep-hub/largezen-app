import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import React from 'react';
import {Button, StatusBar, Text, View} from 'react-native';
import {RootStackParamList} from '../App';
import Colors from '../components/Colors';
import MenuHeader from '../models/MenuHeader';
import {dashboard_styles} from '../styles/dashboard_styles';

type HomeProps = BottomTabScreenProps<RootStackParamList, 'Home'>;

function Home({navigation}: HomeProps) {
  return (
    <View>
      <StatusBar backgroundColor={Colors.yellow} />
      <View style={dashboard_styles.LoginHead}>
        <MenuHeader title="Dashboard" />
        <Text style={dashboard_styles.paragrapg}>Welcome to dashboard</Text>
      </View>
      {/* <Button
          title="Go to leads"
          onPress={() => navigation.navigate('Leads', {productId: '89'})}
        /> */}
    </View>
  );
}

export default Home;
