import React from 'react';
import {View, Text, TextInput} from 'react-native';
import {login_styles} from '../../styles/login_styles';

type keyType =
  | 'default'
  | 'number-pad'
  | 'decimal-pad'
  | 'numeric'
  | 'email-address'
  | 'phone-pad'
  | 'url'
  | 'ascii-capable'
  | 'numbers-and-punctuation'
  | 'name-phone-pad'
  | 'twitter'
  | 'web-search'
  | 'visible-password';

interface InputProps {
  label?: string;
  placeholder?: string;
  type?: keyType;
  left?: React.JSX.Element;
  right?: React.JSX.Element;
  isPassword?: boolean;
  changeFn?: React.Dispatch<React.SetStateAction<string>>;
}

export default function InputField({
  label = '',
  placeholder = '',
  type = 'default',
  left,
  right,
  isPassword = false,
  changeFn,
}: InputProps) {
  return (
    <View style={login_styles.inputDiv}>
      <Text style={login_styles.inputText}>{label}</Text>

      <View style={login_styles.inputBox}>
        {left && left}

        <TextInput
          secureTextEntry={isPassword}
          keyboardType={type}
          placeholder={placeholder}
          style={login_styles.inputStyle}
          onChangeText={changeFn}
        />

        {right && right}
      </View>
    </View>
  );
}
