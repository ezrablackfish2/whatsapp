import React, { useCallback, useReducer } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FontAwesome, Feather } from "@expo/vector-icons";
import { useSelector } from "react-redux";


import PageTitle from "../components/PageTitle";
import PageContainer from "../components/PageContainer";
import { validateInput } from "../utils/actions/formActions";
import { reducer } from "../utils/reducers/formReducers";
import Input from "../components/Input";


const initialState = {
	inputValues: {
		firstName: "",
		lastName: "",
		email: "",
		about: "",	
	},
	inputValidities: {
		firstName: false,
		lastName: false,
		email: false,
		about: false,
	},
	formIsValid: false,
}


const SettingsScreen = props => {


	const userData = useSelector(state => state.auth.userData);



	const [formState, dispatchFormState] = useReducer(reducer, initialState);


	const inputChangeHandler = useCallback((inputId, inputValue) => {
		const result = validateInput(inputId, inputValue);
		dispatchFormState({ inputId, validationResult: result, inputValue })
	}, [dispatchFormState]);

    
    return (

	<PageContainer>
	    <PageTitle  text="Settings" />

	<Input
		id="firstName"
	    label="First Name" 
	    icon="user-o" 
	    iconPack={FontAwesome}
	    onInputChanged={inputChangeHandler}
	    autoCapitalize="none"
	    errorText={formState.inputValidities["firstName"]}
	    initialValue={userData.firstName}
	    />
	<Input 
		id="lastName"
	    label="Last Name" 
	    icon="user-o" 
	    iconPack={FontAwesome}
	    onInputChanged={inputChangeHandler}
	    autoCapitalize="none"
	    errorText={formState.inputValidities["lastName"]}
	    initialValue={userData.lastName}
	    />
	<Input 
		id="email"
	    label="Email" 
	    icon="mail" 
	    autoCapitalize="none"
	    iconPack={Feather}
	    onInputChanged={inputChangeHandler}
	    keyboardType="email-address"
	    errorText={formState.inputValidities["email"]}
	    initialValue={userData.email}
	    />
	<Input 
		id="about"
	    label="About" 
	    icon="user-o" 
	    iconPack={FontAwesome}
	    onInputChanged={inputChangeHandler}
	    autoCapitalize="none"
	    errorText={formState.inputValidities["about"]}
	    initialValue={userData.about}
	    />	
    </PageContainer>

    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
});

export default SettingsScreen;
