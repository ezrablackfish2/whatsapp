import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome } from "@expo/vector-icons";

import PageContainer from "../components/PageContainer";
import Input from "../components/Input";

const AuthScreen = props => {
    
    return (

	<SafeAreaView style={{ flex: 1 }}>
        <PageContainer>
	    <Input 
	    label="First Name" 
	    icon="user-o" 
	    iconPack={FontAwesome} 
	    />
	</PageContainer>
    </SafeAreaView>

    );
};

const styles = StyleSheet.create({
});

export default AuthScreen;
