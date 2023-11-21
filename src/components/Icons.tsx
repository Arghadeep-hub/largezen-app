import React from 'react';
import type {PropsWithChildren} from 'react';
import Icon from 'react-native-vector-icons/AntDesign';

type IconsProps = PropsWithChildren<{
  name: string;
}>;

function Icons({name}: IconsProps) {
  return <Icon name={name} size={28} />;
}

export default Icons;
