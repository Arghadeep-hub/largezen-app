import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {login_styles} from '../styles/login_styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {RootAuthParamList} from '../models/common';
import Colors from '../components/Colors';
import FeatherIcon from 'react-native-vector-icons/Feather';
import InputField from '../components/Login/InputField';

type SignupProps = BottomTabScreenProps<RootAuthParamList, 'Signup'>;

const Signup = ({navigation}: SignupProps) => {
  return (
    <SafeAreaView style={login_styles.container}>
      <View style={login_styles.boxContainer}>
        {/* <View style={{alignItems: 'center'}}></View> */}

        <Text style={login_styles.heading}>Sign-up</Text>

        <InputField
          label="Full Name"
          placeholder="Arghadeep Mallick"
          left={<FeatherIcon name="user" size={20} color={Colors.gray} />}
        />

        <InputField
          label="Email"
          key="email-address"
          placeholder="arghadeep@gmail.com"
          left={<FeatherIcon name="at-sign" size={20} color={Colors.gray} />}
        />

        <InputField
          label="Phone"
          type="number-pad"
          placeholder="arghadeep@gmail.com"
          left={<FeatherIcon name="smartphone" size={20} color={Colors.gray} />}
        />

        <InputField
          label="Password"
          isPassword={true}
          type="visible-password"
          placeholder="********"
          left={<FeatherIcon name="lock" size={20} color={Colors.gray} />}
        />

        <InputField
          label="confirm password"
          isPassword={true}
          placeholder="********"
          // type="visible-password"
          left={<FeatherIcon name="lock" size={20} color={Colors.gray} />}
        />

        <InputField
          label="Reffer ID"
          placeholder="zq1uis"
          left={<FeatherIcon name="zap" size={20} color={Colors.gray} />}
        />
        <TouchableOpacity style={login_styles.loginButton}>
          <Text style={login_styles.loginBtnText}>Log-in</Text>
        </TouchableOpacity>

        <View style={login_styles.bottomDiv}>
          <Text>Already have an account? &nbsp;</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={{color: Colors.blue, fontWeight: '700'}}>Sign-in</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Signup;
