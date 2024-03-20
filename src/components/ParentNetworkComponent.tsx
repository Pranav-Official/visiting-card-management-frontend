import React, { useState, useContext, useEffect, ReactNode } from 'react';
import { View } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import { NetworkContext } from '../context/networkContext'; //importing the NetworkContext
import NoInternet from './NoInternetComponent';
type propType = {
  children: ReactNode;
};
const ParentNetworkComponent = ({ children }: propType) => {
  const [isOffline, setOfflineStatus] = useState(false);
  const { setIsConnected } = useContext(NetworkContext); //using the createContext to access the setIsConnected state

  useEffect(() => {
    const removeNetInfoSubscription = NetInfo.addEventListener((state) => {
      const offline = !(state.isConnected && state.isInternetReachable);
      setOfflineStatus(offline);
      setIsConnected(offline);
    });
    return () => removeNetInfoSubscription();
  }, []);

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      {isOffline && <NoInternet />}
      {children}
    </View>
  );
};

export default ParentNetworkComponent;
