import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Colors from './Colors';
import Icon from 'react-native-vector-icons/Feather';
import {dashboard_styles} from '../styles/dashboard_styles';
import {Avatar} from 'react-native-paper';

interface MenuHeaderProps {
  title: string;
}

export default function MenuHeader({title}: MenuHeaderProps) {
  return (
    <View style={styles.headerDesign}>
      <Text style={dashboard_styles.heading}>{title}</Text>

      <View style={styles.rightSide}>
        <View style={styles.bellContainer}>
          <Icon name="bell" size={28} color={Colors.white} />
          <View style={styles.absolutePos}>
            <Text style={styles.bellPillText}>1</Text>
          </View>
        </View>

        <Avatar.Text
          size={45}
          label="AM"
          color={Colors.blue}
          style={styles.avatarContainer}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerDesign: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rightSide: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bellContainer: {
    position: 'absolute',
    top: -6,
    right: 65,
  },
  bellPillText: {
    fontWeight: '600',
    fontSize: 10,
  },
  absolutePos: {
    position: 'absolute',
    top: -2,
    right: 0,
    backgroundColor: Colors.orange,
    width: 15,
    height: 15,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'absolute',
    backgroundColor: Colors.white,
    right: 0,
    top: -16,
  },
});
