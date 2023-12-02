import {StatusBar, StyleSheet} from 'react-native';
import Colors from '../components/Colors';

export const leads_styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  buttonStyle: {
    fontSize: 16,
    color: Colors.gray,
  },
  buttonStyleActive: {
    fontSize: 16,
    borderWidth: 1,
    borderColor: Colors.blue,
    borderRadius: 20,
    color: Colors.blue,
    paddingHorizontal: 10,
  },
  floatingBtn: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: Colors.blue,
    position: 'absolute',
    bottom: 10,
    right: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemBody: {
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 0,
    minHeight: 50,
    borderRadius: 10,
    backgroundColor: '#2c2c2c10',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleFont: {
    fontSize: 16,
  },
});
