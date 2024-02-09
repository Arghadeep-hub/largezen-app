import * as React from 'react';
import {Provider} from 'react-redux';
import {store} from './redux/store';
import {NavigationContainer} from '@react-navigation/native';
import {StatusBar} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserWrapper from './components/Navigation/UserWrapper';
import Colors from './components/Colors';
import AuthWrapper from './components/Navigation/AuthWrapper';
import {LocalUserDataProps} from './models/common';

function App(): JSX.Element {
  const [config, setConfig] = React.useState<LocalUserDataProps>();
  React.useEffect(() => {
    AsyncStorage.getItem('auth-data')
      .then(data => setConfig(data !== null ? JSON.parse(data) : ''))
      .catch(err => console.log(err));
  }, [config]);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar
          backgroundColor={
            config?.token && config?.user_id !== '' ? Colors.blue : Colors.white
          }
          barStyle={
            config?.token && config?.user_id !== ''
              ? 'light-content'
              : 'dark-content'
          }
        />
        {config?.token && config?.user_id !== '' ? (
          <UserWrapper
            token={config?.token || ''}
            user_id={config?.user_id || ''}
            user_role={config?.role || 0}
            user_name={config?.name || ''}
          />
        ) : (
          <AuthWrapper />
        )}
      </NavigationContainer>
    </Provider>
  );
}

export default React.memo(App);
