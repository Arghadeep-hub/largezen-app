import {Text, TouchableOpacity} from 'react-native';
import React from 'react';

type buttonProps = {
  label: string;
  handleFn: () => void;
};

export default function CustomButton({label, handleFn}: buttonProps) {
  return (
    <TouchableOpacity
      onPress={handleFn}
      style={{
        backgroundColor: '#AD40AF',
        padding: 20,
        borderRadius: 10,
        marginBottom: 30,
      }}>
      <Text
        style={{
          textAlign: 'center',
          fontWeight: '700',
          fontSize: 16,
          color: '#fff',
        }}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}
