import React from 'react';
import type {PropsWithChildren} from 'react';
import Icon from 'react-native-vector-icons/AntDesign';

type IconsProps = PropsWithChildren<{
  name: string;
  color?: string;
}>;

function Icons({name, color}: IconsProps) {
  return <Icon name={name} size={26} color={color} />;
}

export default Icons;
