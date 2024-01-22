import React from 'react';
import {Provider} from 'react-redux';
import {store} from './redux/store';
import ProfileProvider, {ProfileContext} from './context/ProfileContext';
import AppWrapper from './components/Navigation/AppWrapper';
import AuthWrapper from './components/Navigation/AuthWrapper';

function App(): JSX.Element {
  const {token} = React.useContext(ProfileContext);

  return (
    <ProfileProvider>
      <Provider store={store}>
        {token === '' ? <AppWrapper /> : <AuthWrapper />}
      </Provider>
    </ProfileProvider>
  );
}

export default App;
