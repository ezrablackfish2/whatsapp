import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import ChatListScreen from './screens/ChatListScreen';
import ChatSettingsScreen from './screens/ChatSettingsScreen';
import SettingsScreen from './screens/SettingsScreen';

SplashScreen.preventAutoHideAsync();

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
	return (
	<Tab.Navigator 
		screenOptions={{
			headerTitle: '',
		}}>
      		<Tab.Screen name="ChatList" component={ChatListScreen} options={{tabBarLabel: "Chats"}} />
      		<Tab.Screen name="Settings" component={SettingsScreen} options={{tabBarLabel: "Settings"}}  />
    	</Tab.Navigator>
	)
}


export default function App() {
  const [appIsLoaded, setAppIsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      try {
        await Font.loadAsync({
				"Bellota": require("./assets/fonts/Bellota-Regular.ttf"),
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
	  
        });
      } catch (error) {
        console.log(error);
      } finally {
        setAppIsLoaded(true);
      }
    }
    loadFonts();
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
    <SafeAreaProvider style={styles.container} onLayout={onLayout}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={TabNavigator} options={{ headerShown: false }}/>
            <Stack.Screen name="ChatSettings" component={ChatSettingsScreen} options={{
		    	headerTitle: "",
		    	gestureEnabled: true,
			animationEnabled: true,
			presentation: "modal",
			headerBackTitle: "Go Back",
			headerShadowVisible: true,
		    }} />
          </Stack.Navigator>
        </NavigationContainer>
	<Text style = {styles.label}>Hi everyone</Text>
    </SafeAreaProvider>
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

