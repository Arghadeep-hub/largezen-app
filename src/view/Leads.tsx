import {
  BottomTabScreenProps,
  BottomTabNavigationProp,
} from '@react-navigation/bottom-tabs';
import React from 'react';
import {Button, Text, View} from 'react-native';
import {RootStackParamList} from '../App';
import {useNavigation} from '@react-navigation/native';

type DetailsProps = BottomTabScreenProps<RootStackParamList, 'Leads'>;

function Leads({route}: DetailsProps) {
  const {productId} = route.params;
  const navigation =
    useNavigation<BottomTabNavigationProp<RootStackParamList>>();
  return (
    <View>
      <Text>Details:{productId}</Text>
      <Button title="Go to Back" onPress={() => navigation.goBack()} />
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
    </View>
  );
}

export default Leads;
