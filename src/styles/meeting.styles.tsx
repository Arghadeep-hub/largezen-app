import {StyleSheet} from 'react-native';
import Colors from '../components/Colors';

export const meeting_styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  buttonStyleActive: {
    borderWidth: 1,
    borderColor: Colors.pink,
    borderRadius: 20,
    color: Colors.pink,
    paddingHorizontal: 10,
  },
  buttonStyle: {
    fontSize: 16,
    color: Colors.gray,
  },
  itemInputBox: {
    borderWidth: 1,
    borderColor: Colors.gray,
    borderRadius: 8,
    height: 40,
    marginVertical: 5,
    paddingHorizontal: 10,
    paddingVertical: 0,
    color: Colors.gray,
  },
});
