import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const ChatListScreen = props => {
    
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
