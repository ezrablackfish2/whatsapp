import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SettingsScreen = props => {
    
    return (

	<View style={styles.container}>
        <Text> Settings screen</Text>
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

export default SettingsScreen;
