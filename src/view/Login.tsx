import * as React from 'react';
import {
  ActivityIndicator,
  Alert,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {RootAuthParamList} from '../models/common';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {login_styles} from '../styles/login_styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import Colors from '../components/Colors';
import FeatherIcon from 'react-native-vector-icons/Feather';
import InputField from '../components/Login/InputField';
import {AuthContext} from '../context/AuthProvider';

type LoginProps = BottomTabScreenProps<RootAuthParamList, 'Login'>;

const Login = ({navigation}: LoginProps) => {
  const {login, isClicked} = React.useContext(AuthContext);
  const [visible, setVisible] = React.useState<boolean>(true);
  const [username, setUsername] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');

  return (
    <SafeAreaView style={login_styles.container}>
      <View style={login_styles.boxContainer}>
        {/* <View style={{alignItems: 'center'}}></View> */}

        <Text style={login_styles.heading}>Log-in</Text>

        <InputField
          label="e-mail address"
          placeholder="arghadeep@gmail.com"
          changeFn={setUsername}
          left={<FeatherIcon name="at-sign" size={20} color={Colors.gray} />}
        />
        <InputField
          label="Password"
          placeholder="********"
          isPassword={visible}
          changeFn={setPassword}
          left={<FeatherIcon name="lock" size={20} color={Colors.gray} />}
          right={
            <FeatherIcon
              name={visible ? 'eye' : 'eye-off'}
              size={20}
              color={Colors.gray}
              onPress={() => setVisible(!visible)}
            />
          }
        />

        {!isClicked ? (
          <TouchableOpacity
            style={login_styles.loginButton}
            onPress={() => login({username, password})}>
            <Text style={login_styles.loginBtnText}>Log-in</Text>
          </TouchableOpacity>
        ) : (
          <View style={login_styles.loginButton}>
            <Text style={login_styles.loginBtnText}>Loging-in</Text>
            <ActivityIndicator color={Colors.black} />
          </View>
        )}

        <View style={login_styles.bottomDiv}>
          <Text>Don't have an account? &nbsp;</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text style={{color: Colors.blue, fontWeight: '700'}}>Sign-up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default React.memo(Login);
