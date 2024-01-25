import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { HeaderButtons, Item  } from "react-navigation-header-buttons";
import CustomHeaderButton from "../components/CustomHeaderButton";
import { useSelector, useDispatch } from "react-redux";


const ChatListScreen = props => {
    

	const selectedUser = props.route?.params?.selectedUserId;

	const userData = useSelector(state => state.auth.userData);

	    useEffect(() => {
		    	props.navigation.setOptions({
			headerRight: () => {
     	 return (
        		<HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        		  <Item 
            		title="New chat"
            		iconName="create"
            		onPress={() => props.navigation.navigate("NewChat")}	
          		/>
        		</HeaderButtons>
      		);
    			}
  		});
	}, []);

	
	useEffect(() => {
		
		if (! selectedUser) {
			return;
		}


		const chatUsers = [selectedUser, userData.userId];

		const navigationProps = {
			newChatData: {	users: chatUsers	} 
		}


		props.navigation.navigate("ChatScreen", navigationProps);
	}, [props.route?.params])


	return (

	<View style={styles.container}>
        <Text >Chat list screen</Text>

	    <Button title="go to chat screen" onPress={() => { props.navigation.navigate("ChatScreen") }}/>
    </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    fontFamily: "Bellota",
    justifyContent: "center",
    alignItems: "center"
  },
	label : {
		fontFamily: "Bellota",
		fontSize: 20,
	},
});

export default ChatListScreen;
