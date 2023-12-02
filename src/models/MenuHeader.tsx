import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Colors from '../components/Colors';
import Icon from 'react-native-vector-icons/Feather';
import {dashboard_styles} from '../styles/dashboard_styles';

interface MenuHeaderProps {
  title: string;
}

export default function MenuHeader({title}: MenuHeaderProps) {
  return (
    <View style={styles.headerDesign}>
      <Text style={dashboard_styles.heading}>{title}</Text>

      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={{marginEnd: 16}}>
          <Icon name="bell" size={28} color={Colors.yellow} />
          <View style={styles.absolutePos}>
            <Text style={{fontWeight: '600', fontSize: 10}}>1</Text>
          </View>
        </View>

        <View style={styles.userIcon}>
          <Text style={styles.textIcon}>T</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerDesign: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  userIcon: {
    width: 28,
    height: 28,
    borderColor: Colors.yellow,
    borderWidth: 2,
    borderStyle: 'solid',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center', // Center horizontally
  },
  textIcon: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.yellow,
  },
  absolutePos: {
    position: 'absolute',
    top: -2,
    right: 0,
    backgroundColor: Colors.yellow,
    width: 15,
    height: 15,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
