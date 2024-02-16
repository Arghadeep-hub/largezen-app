import {View, Text, TouchableOpacity} from 'react-native';
import * as React from 'react';
import {login_styles} from '../styles/login_styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {RootAuthParamList} from '../models/common';
import Colors from '../components/Colors';
import FeatherIcon from 'react-native-vector-icons/Feather';
import InputField from '../components/Login/InputField';
import {Alert} from 'react-native';
import {AuthContext} from '../context/AuthProvider';

type SignupProps = BottomTabScreenProps<RootAuthParamList, 'Signup'>;

const Signup = ({navigation}: SignupProps) => {
  const {signUp, isClicked} = React.useContext(AuthContext);
  const [name, setName] = React.useState<string>('');
  const [email, setEmail] = React.useState<string>('');
  const [phone, setPhone] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [cPass, setCPass] = React.useState<string>('');

  const handleSubmit = () => {
    if (password !== cPass) {
      Alert.alert('Password', 'Both the  password are not same', [
        {text: 'OK', onPress: () => console.log(password, cPass)},
      ]);
      return;
    }
    signUp({
      first_name: name.split(' ')[0],
      last_name: name.split(' ')[1],
      email,
      phone,
      password,
    });
  };

  return (
    <SafeAreaView style={login_styles.container}>
      <View style={login_styles.boxContainer}>
        {/* <View style={{alignItems: 'center'}}></View> */}

        <Text style={login_styles.heading}>Sign-up</Text>

        <InputField
          label="Full Name"
          placeholder="Arghadeep Mallick"
          left={<FeatherIcon name="user" size={20} color={Colors.gray} />}
          changeFn={setName}
        />

        <InputField
          label="Email"
          key="email-address"
          placeholder="arghadeep@gmail.com"
          left={<FeatherIcon name="at-sign" size={20} color={Colors.gray} />}
          changeFn={setEmail}
        />

        <InputField
          label="Phone"
          type="number-pad"
          placeholder="8250889828"
          left={<FeatherIcon name="smartphone" size={20} color={Colors.gray} />}
          changeFn={setPhone}
        />

        <InputField
          label="Password"
          isPassword={true}
          // type="visible-password"
          placeholder="********"
          left={<FeatherIcon name="lock" size={20} color={Colors.gray} />}
          changeFn={setPassword}
        />

        <InputField
          label="confirm password"
          isPassword={true}
          placeholder="********"
          type="visible-password"
          left={<FeatherIcon name="lock" size={20} color={Colors.gray} />}
          changeFn={setCPass}
        />

        <InputField
          label="Reffer ID"
          placeholder="zq1uis"
          left={<FeatherIcon name="zap" size={20} color={Colors.gray} />}
        />

        {!isClicked ? (
          <TouchableOpacity
            style={login_styles.loginButton}
            onPress={handleSubmit}>
            <Text style={login_styles.loginBtnText}>Sign-up</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={login_styles.loginButton}>
            <Text style={login_styles.loginBtnText}>Sign-up</Text>
          </TouchableOpacity>
        )}

        <View style={login_styles.bottomDiv}>
          <Text>Already have an account? &nbsp;</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={{color: Colors.blue, fontWeight: '700'}}>Log-in</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Signup;
