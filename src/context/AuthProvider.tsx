import * as React from 'react';
import {LocalUserDataProps, LoginProps} from '../models/common';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNRestart from 'react-native-restart';

interface AuthContextType {
  isClicked?: boolean;
  config?: LocalUserDataProps;
  login?: ({username, password}: LoginProps) => Promise<any> | undefined;
}

// Define the AuthContext
export const AuthContext = React.createContext<AuthContextType>({
  isClicked: false,
  config: {user_id: '', name: '', role: 0, token: ''},
  login: async () => {
    throw new Error('login function not implemented');
  }, // Provide a default implementation
});

// Define the AuthProvider component
function AuthProvider({children}: {children: React.JSX.Element}) {
  const [isClicked, setIsClicked] = React.useState<boolean>(false);
  const [config, setConfig] = React.useState<LocalUserDataProps>({
    user_id: '',
    name: '',
    role: 0,
    token: '',
  });

  React.useEffect(() => {
    AsyncStorage.getItem('auth-data')
      .then(data => setConfig(data !== null ? JSON.parse(data) : ''))
      .catch(err => console.log(err));
  }, [config]);

  const login = React.useCallback(
    async ({username, password}: LoginProps): Promise<void> => {
      setIsClicked(true);
      if (username === '' || password === '') {
        Alert.alert('Missing Data', 'You have fill properly', [
          {text: 'OK', onPress: () => setIsClicked(false)},
        ]);
        return;
      }

      try {
        setIsClicked(false);
        const response = await fetch(
          'https://staging-largezen.up.railway.app/user/login',
          {
            method: 'POST',
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({email: username, password}),
          },
        );

        const fetchData = await response.json();
        if (response.status === 200) {
          await AsyncStorage.setItem(
            'auth-data',
            JSON.stringify({
              user_id: fetchData.id,
              name: fetchData.name,
              role: fetchData.role,
              token: fetchData.token,
            }),
          );
          setIsClicked(false);
          RNRestart.Restart();
          return;
        }

        throw fetchData?.error || 'Unable to login';
      } catch (error) {
        Alert.alert('Error', String(error), [
          {text: 'OK', onPress: () => console.log(error)},
        ]);
        setIsClicked(false);
      }
    },
    [],
  );

  return (
    <AuthContext.Provider value={{isClicked, config, login}}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;