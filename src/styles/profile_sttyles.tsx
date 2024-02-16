import {StyleSheet} from 'react-native';
import Colors from '../components/Colors';

export const profile_styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },

  inputBody: {
    paddingHorizontal: 12,
    paddingTop: 24,
    rowGap: 18,
  },
  inputWrapper: {
    margin: 0,
    paddingHorizontal: 12,
    paddingBottom: 0,
  },
  inputText: {
    fontSize: 16,
    fontWeight: '600',
    padding: 0,
    color: Colors.gray,
  },
  inputFiled: {
    color: Colors.black,
    borderBottomWidth: 2,
    borderBottomColor: Colors.gray,
    padding: 0,
    margin: 0,
    fontSize: 18,
  },

  saveButton: {
    position: 'absolute',
    width: '50%',
    bottom: 50,
    left: 50,
    transform: [{translateX: 50}, {translateY: 25}],
  },
  saveButtonBody: {
    alignItems: 'center',
    paddingVertical: 6,
    backgroundColor: 'transparent',
    borderRadius: 15,
    borderWidth: 2,
  },
  saveButtonBodyBlue: {
    borderColor: Colors.blue,
  },
  saveButtonBodyGray: {
    borderBlockColor: Colors.gray,
  },
  saveButtonText: {
    fontSize: 20,
    fontWeight: '600',
  },
  saveButtonTextBlue: {
    color: Colors.blue,
  },
  saveButtonTextGray: {
    color: Colors.gray,
  },
});
