import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import React from 'react';
import {Button, Text, View} from 'react-native';
import MenuHeader from '../components/MenuHeader';
import {dashboard_styles} from '../styles/dashboard_styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from '../components/Colors';
import {useAppSelector} from '../redux/store';
import {RootStackParamList} from '../models/common';

type HomeProps = BottomTabScreenProps<RootStackParamList, 'Home'>;

function Home({navigation}: HomeProps): React.JSX.Element {
  const name = useAppSelector(state => state.config.user_name);
  const handleLogout = async () => {
    try {
      const jsonValue = JSON.stringify({
        user_id: '',
        token: '',
        name: '',
        role: '',
      });
      await AsyncStorage.setItem('auth-data', jsonValue);
    } catch (e) {
      // saving error
      console.log(e);
    }
  };

  return (
    <View style={dashboard_styles.container}>
      <View style={dashboard_styles.LoginHead}>
        <MenuHeader title="dashboard" />
        <Text style={dashboard_styles.paragrapg}>Welcomes {name}</Text>
      </View>
      {/* <Button
          title="Go to leads"
          onPress={() => navigation.navigate('Leads', {productId: '89'})}
        /> */}
      <View style={dashboard_styles.buttonLog}>
        <Button title="Log Out" onPress={handleLogout} color={Colors.blue} />
      </View>
    </View>
  );
}

export default Home;
