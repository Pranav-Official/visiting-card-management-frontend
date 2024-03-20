import React, { ReactNode, createContext, useState } from 'react';

export const NetworkContext = createContext({
  isConnected: false,
  setIsConnected: (() => null) as React.Dispatch<React.SetStateAction<boolean>>, // Correct type
});
type propType = {
  children: ReactNode;
};
export const NetworkProvider = ({ children }: propType) => {
  const [isConnected, setIsConnected] = useState(false);
  const value = { isConnected, setIsConnected };

  return (
    <NetworkContext.Provider value={value}>{children}</NetworkContext.Provider>
  );
};
