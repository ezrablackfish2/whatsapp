import React, { useState, useEffect, useCallback } from 'react';
import { LogBox, View, StyleSheet, Text } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Provider } from 'react-redux'

import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import AppNavigator from "./navigation/AppNavigator.js";
import { loadFonts } from './fonts/fonts';
import { store } from './store/store'
import AsyncStorage from "@react-native-async-storage/async-storage";

SplashScreen.preventAutoHideAsync();
// AsyncStorage.clear();






export default function App() {
  const [appIsLoaded, setAppIsLoaded] = useState(false);

  useEffect(() => {
	  loadFonts(setAppIsLoaded);
	  LogBox.ignoreLogs([
  '@firebase/auth: Auth (10.7.2): You are initializing Firebase Auth for React Native without providing AsyncStorage.',
]);
  }, []);

  const onLayout = useCallback(async () => {
    if (appIsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [appIsLoaded]);

  if (!appIsLoaded) {
    return null;
  }

  return (
	<Provider store={store}>
	    <SafeAreaProvider style={styles.container} onLayout={onLayout}>
		<AppNavigator />
	    </SafeAreaProvider>
	</Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    fontFamily: "Bellota",
  },
	label : {
		fontFamily: "Bellota",
		fontSize: 20,
	},
});

