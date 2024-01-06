import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useState, useEffect, useCallback } from "react";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";


SplashScreen.preventAutoHideAsync();

export default function App() {


	const [appIsLoaded, setAppIsLoaded] = useState(false);


	useEffect(() => {
		
		const prepare = async() => {
			try {
			await Font.loadAsync({	
				"regular": require("./assets/fonts/Bellota-Regular.ttf")
			})
			}
			catch (error) {
				console.log(error);
			}
			finally {
				setAppIsLoaded(true);
			}
		};

		prepare();
	}, [])

	useEffect(() => {
		setTimeout(() => {
			setAppIsLoaded(true)
		}, 2000);
	}, [])

	const onLayout = useCallback(async () => {
		if (appIsLoaded) {
			await SplashScreen.hideAsync();
		}
		
	}, [appIsLoaded]);


	if (!appIsLoaded) {
		return null;
	}
  return (
    <SafeAreaProvider 
	  style={styles.container} 
	  onLayout={onLayout}>
	<SafeAreaView>


      <Text style={styles.label}> Hi everyone !!</Text>




	</SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: "regular",
  },
  label: {
	color: '#000000',
	fontSize: 18,
	fontFamily: "regular",
  }
});
