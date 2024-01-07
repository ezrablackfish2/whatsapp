import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useState, useEffect, useCallback } from "react";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'


import ChatListScreen from "./screens/ChatListScreen";;

SplashScreen.preventAutoHideAsync();

const Stack = createStackNavigator();



export default function App() {


	const [appIsLoaded, setAppIsLoaded] = useState(false);


	useEffect(() => {
		
		const prepare = async() => {
			try {
			await Font.loadAsync({	
				"Bellota": require("./assets/fonts/Bellota-Regular.ttf"),
				"Adevent": require("./assets/fonts/AdventPro-VariableFont_wdth,wght.ttf"),
				"Aguafina": require("./assets/fonts/AguafinaScript-Regular.ttf"),
				"Barrio": require("./assets/fonts/Barrio-Regular.ttf"),
				"Amatic": require("./assets/fonts/AmaticSC-Regular.ttf"),
				"BlackOps": require("./assets/fonts/BlackOpsOne-Regular.ttf"),
				"Caveat": require("./assets/fonts/Caveat-VariableFont_wght.ttf"),
				"Chakra": require("./assets/fonts/ChakraPetch-Regular.ttf"),
				"Croissant": require("./assets/fonts/CroissantOne-Regular.ttf"),
				"Dancing": require("./assets/fonts/DancingScript-VariableFont_wght.ttf"),
				"Hammer": require("./assets/fonts/HammersmithOne-Regular.ttf"),
				"Itim": require("./assets/fonts/Itim-Regular.ttf"),
				"Lilita": require("./assets/fonts/LilitaOne-Regular.ttf"),
				"Montserrat": require("./assets/fonts/Montserrat-VariableFont_wght.ttf"),
				"Orbitron": require("./assets/fonts/Orbitron-VariableFont_wght.ttf"),
				"Rajdhani": require("./assets/fonts/Rajdhani-Regular.ttf"),
				"SedgwickAve": require("./assets/fonts/SedgwickAve-Regular.ttf"),
				"Shadows": require("./assets/fonts/ShadowsIntoLight-Regular.ttf"),
				"TiltNeon": require("./assets/fonts/TiltNeon-Regular-VariableFont_XROT,YROT.ttf"),
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

		<NavigationContainer>
	      <Stack.Navigator>
      		<Stack.Screen name="Home" component={ ChatListScreen } />
	  	</Stack.Navigator>

		</NavigationContainer>


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
    fontFamily: "Bellota",
  },
  label: {
	color: '#000000',
	fontSize: 18,
	fontFamily: "Bellota",
  }
});
