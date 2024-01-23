import * as React from 'react';
import {createContext} from 'react';

interface profileProps {
  children: React.ReactNode;
}

interface profileContextProps {
  token?: string;
  setToken?: React.Dispatch<React.SetStateAction<string>>;
  isLoading?: boolean;
  setIsLoading?: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ProfileContext = createContext<profileContextProps>({});

const ProfileProvider = ({children}: profileProps): React.JSX.Element => {
  const [token, setToken] = React.useState<string>('');
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  return (
    <ProfileContext.Provider value={{token, setToken, isLoading, setIsLoading}}>
      {children}
    </ProfileContext.Provider>
  );
};

export default ProfileProvider;
