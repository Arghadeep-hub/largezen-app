import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import React from 'react';
import {Button, View} from 'react-native';
import MenuHeader from '../components/MenuHeader';
import {dashboard_styles} from '../styles/dashboard_styles';
import {RootStackParamList} from '../models/common';
import AsyncStorage from '@react-native-async-storage/async-storage';

type HomeProps = BottomTabScreenProps<RootStackParamList, 'Home'>;

function Home({navigation}: HomeProps): React.JSX.Element {
  const handleLogout = async () => {
    try {
      const jsonValue = JSON.stringify({token: '', user_id: ''});
      await AsyncStorage.setItem('auth-data', jsonValue);
    } catch (e) {
      // saving error
      console.log(e);
    }
  };

  return (
    <View>
      <View style={dashboard_styles.LoginHead}>
        <MenuHeader title="Dashboard" />
      </View>
      {/* <Button
          title="Go to leads"
          onPress={() => navigation.navigate('Leads', {productId: '89'})}
        /> */}
      <Button title="Log Out" onPress={handleLogout} />
    </View>
  );
}

export default Home;
