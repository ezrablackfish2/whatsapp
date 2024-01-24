import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChatListScreen from '../screens/ChatListScreen';
import ChatSettingsScreen from '../screens/ChatSettingsScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';


import ChatScreen from "../screens/ChatScreen.js";
import NewChatScreen from "../screens/NewChatScreen";



const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
	return (
	<Tab.Navigator 
		screenOptions={{
			headerTitle: '',
			headerShadowVisible: false,
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


const MainNavigator = (props) => {
	return (
          <Stack.Navigator>

		<Stack.Group>
            <Stack.Screen name="Home" component={TabNavigator} options={{ headerShown: false }}/>
            <Stack.Screen name="ChatScreen" component={ChatScreen} options={{
		    	headerTitle: "",
		    	gestureEnabled: true,
			animationEnabled: true,
			presentation: "modal",
			headerBackTitle: "Go Back",
			headerShadowVisible: true,
		    }} />
		<Stack.Screen name="ChatSettings" component={ChatSettingsScreen} options={{
		    	headerTitle: "",
		    	gestureEnabled: true,
			animationEnabled: true,
			presentation: "modal",
			headerBackTitle: "Go Back",
			headerShadowVisible: true,
		    }} />

		</Stack.Group>


		<Stack.Group screenOptions={{ presentation: "containedModal" }}>
		<Stack.Screen name="NewChat" 
		component={NewChatScreen} 
		/>


		</Stack.Group>
          </Stack.Navigator>
		
	);
};

export default MainNavigator;
