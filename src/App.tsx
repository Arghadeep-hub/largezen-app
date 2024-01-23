import * as React from 'react';
import {Provider} from 'react-redux';
import {store} from './redux/store';
import {NavigationContainer} from '@react-navigation/native';
import {StatusBar} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserWrapper from './components/Navigation/UserWrapper';
import Colors from './components/Colors';
import AuthWrapper from './components/Navigation/AuthWrapper';

function App(): JSX.Element {
  const [token, setToken] = React.useState<string>('');
  React.useEffect(() => {
    AsyncStorage.getItem('auth-key')
      .then(data => setToken(data !== null ? data : ''))
      .catch(err => console.log(err));
  }, [token]);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar
          backgroundColor={token === '' ? Colors.white : Colors.blue}
          barStyle={token === '' ? 'dark-content' : 'light-content'}
        />
        {token === '' ? <AuthWrapper /> : <UserWrapper />}
      </NavigationContainer>
    </Provider>
  );
}

export default App;
