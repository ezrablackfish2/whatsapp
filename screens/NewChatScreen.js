import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { HeaderButtons, Item  } from "react-navigation-header-buttons";
import CustomHeaderButton from "../components/CustomHeaderButton";

const NewChatScreen = props => {
    

	    useEffect(() => {
		    	props.navigation.setOptions({
			headerLeft: () => {
     	 return (
        		<HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        		  <Item 
            		title="Close"
            		onPress={() => props.navigation.goBack()}	
          		/>
        		</HeaderButtons>
      		);
    			},
			headerTitle: "New Chat"
  		});
	}, []);
    
	return (

	<View style={styles.container}>
        <Text >New Chat Screen</Text>

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

export default NewChatScreen;
