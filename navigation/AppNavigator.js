import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import ChatListScreen from '../screens/ChatListScreen';
import ChatSettingsScreen from '../screens/ChatSettingsScreen';
import SettingsScreen from '../screens/SettingsScreen';



const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
	return (
	<Tab.Navigator 
		screenOptions={{
			headerTitle: '',
		}}>
      		<Tab.Screen name="ChatList" component={ChatListScreen} options={{
			tabBarLabel: "Chats",
			tabBarIcon: ( { color, size }) => (
				<Ionicons name="chatbubble-outline" size={ size } color={ color } />
			)
		}} />
      		<Tab.Screen name="Settings" component={SettingsScreen} options={{
		tabBarLabel: "Settings",
		tabBarIcon: ({ color, size}) => (
			<Ionicons name="settings-outline" size={ size } color={ color } />
			)
		}}  />
    	</Tab.Navigator>
	)
}


const AppNavigator = (props) => {
	return (
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
	);
};


export default AppNavigator;
