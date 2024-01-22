import React, { useCallback, useReducer, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FontAwesome, Feather } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { Alert, ActivityIndicator  } from "react-native";


import PageTitle from "../components/PageTitle";
import PageContainer from "../components/PageContainer";
import { validateInput } from "../utils/actions/formActions";
import { reducer } from "../utils/reducers/formReducers";
import Input from "../components/Input";
import colors from "../constants/colors";
import SubmitButton from "../components/SubmitButton";
import { updateSignedInUserData, userLogout } from "../utils/actions/authAction";
import { updateLoggedInUserData } from "../store/authSlice";


const SettingsScreen = props => {

	const dispatch = useDispatch();

	const [isLoading, setIsLoading] = useState(false);
	const [showSuccessMessage, setShowSuccessMessagge] = useState(false);
	const userData = useSelector(state => state.auth.userData);
	console.log(userData);

	const initialState = {
	inputValues: {
		firstName: userData.firstName || "",
		lastName: userData.lastName || "",
		email: userData.email || "",
		about: userData.about || "",	
	},
	inputValidities: {
		firstName: undefined,
		lastName: undefined,
		email: undefined,
		about: undefined,
	},
	formIsValid: false,
}



	const [formState, dispatchFormState] = useReducer(reducer, initialState);


	const inputChangeHandler = useCallback((inputId, inputValue) => {
		const result = validateInput(inputId, inputValue);
		dispatchFormState({ inputId, validationResult: result, inputValue })
	}, [dispatchFormState]);

	const saveHandler = async () => {
		const updatedValues = formState.inputValues;

		try {
			setIsLoading(true);
			await updateSignedInUserData(userData.userId, updatedValues);
			dispatch(updateLoggedInUserData({newData: updatedValues}));
			setShowSuccessMessagge(true);

			setTimeout(() => {
				setShowSuccessMessagge(false);
			}, 3000);
		} catch (error) {
			console.error(error);
		}
		finally {
			setIsLoading(false);
		}
	}

    
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

	    <View style={{ marginTop: 20 }}>

	    {
		showSuccessMessage && <Text style={{ fontFamily: "Bellota"}}>Saved</Text>
	    }

	
	{
		isLoading ?
		<ActivityIndicator size={"small"} color={colors.primary} style={{ marginTop: 10 }}/> :
		<SubmitButton 
	   	 	title="Save"
	   	 	onPress={saveHandler}
	   	 	style={{ marginTop: 20 }}
	 	 	disabled={!formState.formIsValid}
		/>
	}
	    </View>

	<SubmitButton 
		title="Logout"
	   	onPress={() => dispatch(userLogout()) }
	   	style={{ marginTop: 20 }}
	    	color={colors.red}
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
