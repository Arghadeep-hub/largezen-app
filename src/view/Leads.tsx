import {
  BottomTabScreenProps,
  BottomTabNavigationProp,
} from '@react-navigation/bottom-tabs';
import React from 'react';
import {Button, StatusBar, Text, View} from 'react-native';
import {RootStackParamList} from '../App';
import {useNavigation} from '@react-navigation/native';
import Colors from '../components/Colors';
import MenuHeader from '../models/MenuHeader';
import {dashboard_styles} from '../styles/dashboard_styles';

type DetailsProps = BottomTabScreenProps<RootStackParamList, 'Leads'>;

function Leads({route}: DetailsProps) {
  const navigation =
    useNavigation<BottomTabNavigationProp<RootStackParamList>>();
  return (
    <View>
      <StatusBar backgroundColor={Colors.yellow} />
      <View style={dashboard_styles.LoginHead}>
        <MenuHeader title="Leads" />
        <Text style={dashboard_styles.paragrapg}>Welcome to Leads</Text>
      </View>

      {/* <Text>Details:{route?.params?.productId}</Text>
      <Button title="Go to Back" onPress={() => navigation.goBack()} />
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} /> */}
    </View>
  );
}

export default Leads;
