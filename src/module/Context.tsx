import { createContext, useState } from 'react';

export const ZindexContext = createContext({
  zIndex: 0,
  addIndex: () => {},
});

const ZindexProvider: React.FC = ({ children }: { children?: React.ReactNode }) => {
  const [zIndex, setzIndex] = useState(0);

  const addIndex = (): void => setzIndex(zIndex + 1);

  const value = { zIndex, addIndex };
  return <ZindexContext.Provider value={value}>{children}</ZindexContext.Provider>;
};

export default ZindexProvider;
