import React, { createContext, Dispatch, SetStateAction, useMemo, useState } from 'react';

interface ErrorContextProps {
  error: boolean;
  errorText: string;
  setError: Dispatch<SetStateAction<boolean>>;
  setErrorText: (text: string) => void;
}

export const ErrorContext = createContext<ErrorContextProps>({
  error: false,
  errorText: '',
  setError: () => {},
  setErrorText: () => {},
});

const ErrorContextProvider: React.FC<React.ReactNode> = ({ children }) => {
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState('');

  const value = useMemo(() => ({ error, setError, errorText, setErrorText }), [error, setError, errorText, setErrorText]);
  return <ErrorContext.Provider value={value}>{children}</ErrorContext.Provider>;
};
export default ErrorContextProvider;
