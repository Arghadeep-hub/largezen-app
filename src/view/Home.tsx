import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import React from 'react';
import {Button, Text, View} from 'react-native';
import MenuHeader from '../components/MenuHeader';
import {dashboard_styles} from '../styles/dashboard_styles';
import {RootStackParamList} from '../models/common';

type HomeProps = BottomTabScreenProps<RootStackParamList, 'Home'>;

function Home({navigation}: HomeProps): React.JSX.Element {
  return (
    <View>
      <View style={dashboard_styles.LoginHead}>
        <MenuHeader title="Dashboard" />
      </View>
      {/* <Button
          title="Go to leads"
          onPress={() => navigation.navigate('Leads', {productId: '89'})}
        /> */}
    </View>
  );
}

export default Home;
