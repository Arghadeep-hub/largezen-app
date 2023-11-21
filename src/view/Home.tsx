import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import React from 'react';
import {Button, Text, View} from 'react-native';
import {RootStackParamList} from '../App';

type HomeProps = BottomTabScreenProps<RootStackParamList, 'Home'>;

function Home({navigation}: HomeProps) {
  return (
    <View>
      <Text>Home</Text>
      <Button
        title="Go to leads"
        onPress={() => navigation.navigate('Leads', {productId: '89'})}
      />
    </View>
  );
}

export default Home;
