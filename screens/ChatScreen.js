import React from 'react';
import { View, Text, StyleSheet, Button, ImageBackground } from 'react-native';
import backgroundImage from "../assets/images/droplet.jpeg";

const ChatScreen = props => {
    
    return (
	    <View style={styles.container}>
		<ImageBackground source={backgroundImage} style={styles.backgroundImage}>

	    	</ImageBackground>
	    </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
	flexDirection: 'column',
  },
	label : {
		fontFamily: "Bellota",
		fontSize: 20,
	},
	backgroundImage: {
		flex: 1,
	},
});

export default ChatScreen;
