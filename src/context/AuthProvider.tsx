import * as React from 'react';

interface AuthContextType {
  isLoggedIn: boolean;
  login: () => void;
}

// Define the AuthContext
export const AuthContext = React.createContext<AuthContextType | undefined>(
  undefined,
);

// Define the AuthProvider component
function AuthProvider({children}: {children: React.JSX.Element}) {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  const login = () => {
    // Perform login logic, set isLoggedIn to true upon successful login
    setIsLoggedIn(true);
  };

  return (
    <AuthContext.Provider value={{isLoggedIn, login}}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
