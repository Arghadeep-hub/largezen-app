import {StyleSheet} from 'react-native';
import Colors from '../components/Colors';

export const login_styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    justifyContent: 'center',
    backgroundColor: Colors.white,
    marginBottom: 20,
  },
  boxContainer: {
    paddingHorizontal: 25,
  },
  heading: {
    fontSize: 28,
    fontWeight: '500',
    color: '#333',
    marginBottom: 30,
  },
  inputDiv: {
    marginBottom: 10,
  },
  inputText: {
    margin: 0,
    padding: 0,
    fontSize: 14,
    fontWeight: '500',
    textTransform: 'capitalize',
  },
  inputBox: {
    borderBottomWidth: 1,
    columnGap: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: Colors.gray,
  },
  inputStyle: {
    paddingVertical: 0,
    paddingHorizontal: 0,
    fontSize: 14,
    width: '80%',
  },
  loginButton: {
    marginVertical: 10,
    paddingVertical: 10,
    backgroundColor: Colors.yellow,
    flexDirection: 'row',
    columnGap: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  loginBtnText: {
    color: Colors.black,
    fontSize: 16,
    fontWeight: '500',
    letterSpacing: 1,
  },
  bottomDiv: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
});
