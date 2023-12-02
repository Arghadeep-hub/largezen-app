import {Dimensions, StyleSheet} from 'react-native';
import Colors from '../components/Colors';
const {width} = Dimensions.get('window');

export const dashboard_styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    flex: 1,
  },
  textStyle: {
    textAlign: 'center',
    marginBottom: 8,
    color: '#000',
  },
  heading: {
    color: Colors.white,
    fontSize: 26,
    fontWeight: '600',
  },
  paragrapg: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: '400',
  },
  LoginHead: {
    width: width,
    paddingHorizontal: 20,
    paddingTop: 0,
    paddingBottom: 9,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: Colors.blue,
  },
});
