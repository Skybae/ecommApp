import React, { useEffect, useState } from "react";
import NetInfo from "@react-native-community/netinfo";
import { StyleSheet, Text, View } from "react-native-web";

const withNetworkConnectivity = (WrappedComponent) => {
  return (props) => {
    const [isConnected, setIsConnected] = useState(true); 

    useEffect(() => {
      const unsubscribe = NetInfo.addEventListener((state) => {
        setIsConnected(state.isConnected);
      });

      return () => {
        unsubscribe();
      };
    }, []);

    if (!isConnected) {
      
      return <NoInternet />;
    }

    
    return <WrappedComponent {...props} />;
  };
};

const NoInternet = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Sorry, no internet connection available</Text>
    </View>
  );
};

export default withNetworkConnectivity;

const styles = StyleSheet.create({
  container: {
    marginRight: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 30,
    color: 'red',
  },
});


