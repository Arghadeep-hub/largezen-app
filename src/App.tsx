import * as React from 'react';
import {Provider} from 'react-redux';
import {store} from './redux/store';
import {NavigationContainer} from '@react-navigation/native';
import ProviderWrapper from './components/Navigation/ProviderWrapper';
import AuthProvider from './context/AuthProvider';

function App(): JSX.Element {
  return (
    <AuthProvider>
      <Provider store={store}>
        <NavigationContainer>
          <ProviderWrapper />
        </NavigationContainer>
      </Provider>
    </AuthProvider>
  );
}

export default React.memo(App);
