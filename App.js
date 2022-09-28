import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './src/navigation/TabNavigator';
import NoInternet from './src/components/NoInternet';
import { useNetInfo } from "@react-native-community/netinfo";
const App = () => {
  const [nointernet, setNointernet] = useState(false);
  const netInfo = useNetInfo();

  const fetchNetInfo = () => {
   // console.log(netInfo);
    const { isConnected, isInternetReachable } = netInfo;
    if (isConnected === false && isInternetReachable === false) 
    setNointernet(true)
    else
    setNointernet(false);
   
  };
  useEffect(() => {
    fetchNetInfo();
  }, [netInfo])

  if (nointernet) return <NoInternet onRefreshPress={fetchNetInfo} />
  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>

  )

}

export default App