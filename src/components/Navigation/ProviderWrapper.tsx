import * as React from 'react';
import {StatusBar} from 'react-native';
import UserWrapper from './UserWrapper';
import AuthWrapper from './AuthWrapper';
import Colors from '../Colors';
import {AuthContext} from '../../context/AuthProvider';

const ProviderWrapper = () => {
  const {config} = React.useContext(AuthContext);
  return (
    <React.Fragment>
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
    </React.Fragment>
  );
};

export default React.memo(ProviderWrapper);
