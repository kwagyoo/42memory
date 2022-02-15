import React, { createContext, Dispatch, SetStateAction, useMemo, useState } from 'react';

interface LoginContextProps {
  login: boolean;
  setLogin: Dispatch<SetStateAction<boolean>>;
}

export const LoginContext = createContext<LoginContextProps>({
  login: false,
  setLogin: () => {},
});

const LoginContextProvider: React.FC<React.ReactNode> = ({ children }) => {
  const [login, setLogin] = useState(false);

  const value = useMemo(() => ({ login, setLogin }), [login, setLogin]);
  return <LoginContext.Provider value={value}>{children}</LoginContext.Provider>;
};
export default LoginContextProvider;
