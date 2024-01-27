import React, { useEffect, useState} from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChatListScreen from '../screens/ChatListScreen';
import ChatSettingsScreen from '../screens/ChatSettingsScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { useSelector, useDispatch } from "react-redux";
import { ref, getDatabase, child, onValue, off, get  } from "firebase/database";
import { ActivityIndicator, View } from "react-native";


import ChatScreen from "../screens/ChatScreen.js";
import NewChatScreen from "../screens/NewChatScreen";
import { getFirebaseApp } from "../utils/firebaseHelper";
import { setChatsData } from "../store/chatSlice";
import colors from "../constants/colors";
import commonStyles from "../constants/commonStyles";
import { setStoredUsers } from "../store/userSlice";
import { setChatMessages, setStarredMessages } from "../store/messagesSlice";

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

const StackNavigator = () => {
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
	
	)
}


const MainNavigator = (props) => {


	const dispatch = useDispatch();

	const [isLoading, setIsLoading] = useState(true);



	const userData = useSelector(state => state.auth.userData);
	const storedUsers = useSelector(state => state.users.storedUsers);


	useEffect(() => {
		console.log("Subscribing to firebase listners");

		const app = getFirebaseApp();
		const dbRef = ref(getDatabase(app));
		const userChatsRef = child(dbRef, `userChats/${userData.userId}`);
		const refs = [userChatsRef];
		
		onValue(userChatsRef, (querySnapshot) => {
			const chatIdsData = querySnapshot.val() || {};
			const chatIds = Object.values(chatIdsData);


			const chatsData = {};
			let chatsFoundCount = 0;

			for (let i = 0; i < chatIds.length; i++) {
				const chatId = chatIds[i];
				const chatRef = child(dbRef, `chats/${chatId}`);
				refs.push(chatRef);


				onValue(chatRef, (chatSnapshot) => {
					chatsFoundCount++;
				 	
					const data = chatSnapshot.val();

					if (data) {
						data.key = chatSnapshot.key;

						data.users.forEach(userId => {
						if ( storedUsers[userId]) return;

							const userRef = child(dbRef, `users/${userId}`);


							get(userRef)
							.then(userSnapshot => {
							const userSnapshotData = userSnapshot.val();
								dispatch(setStoredUsers({
									newUsers:{ userSnapshotData }
								}));
								
							})

							refs.push(userRef);
						})


						chatsData[chatSnapshot.key] = data;

					}

					if (chatsFoundCount >= chatIds.length ) {

					dispatch(setChatsData({ chatsData }));
					setIsLoading(false);
					}
				})

				const messagesRef = child(dbRef, `messages/${chatId}`);
				refs.push(messagesRef);

				onValue(messagesRef, messagesSnaphshot => {
  				const messagesData = messagesSnaphshot.val();
					dispatch(setChatMessages({ chatId, messagesData }));
				})

				if (chatsFoundCount == 0) {
					setIsLoading(false);
				}

			}

		})

		const userStarredMessagesRef = child(dbRef, `userStarredMessages/${userData.userId}`);
		refs.push(userStarredMessagesRef);
		onValue(userStarredMessagesRef, querySnapshot => {
			const starredMessages = querySnapshot.val() ?? {};
			dispatch(setStarredMessages({ starredMessages }));
		})

		return () => {
		console.log("Unsubscribing firebase listners");
			refs.forEach(ref => off(ref));
		}
	}, []);


	if (isLoading) {
		<View style={commonStyles.center}>
			<ActivityIndicator 
				size={"alrge"} 
				color={colors.primary} />
		</View>
	}

	return (
          	<StackNavigator />	
	);
};

export default MainNavigator;
