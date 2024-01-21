import React, { useCallback, useReducer, useState, useEffect} from "react";
import { FontAwesome, Feather } from "@expo/vector-icons";
import { validate } from "validate.js";
import { Alert, ActivityIndicator  } from "react-native";
import { useDispatch, useSelector } from "react-redux";


import { validateInput } from "../utils/actions/formActions";
import Input from "../components/Input";
import SubmitButton from "../components/SubmitButton";
import { reducer } from "../utils/reducers/formReducers";
import { signUp } from "../utils/actions/authAction"; 
import colors from "../constants/colors";


const initialState = {
	inputValues: {
		firstName: "",
		lastName: "",
		email: "",
		password: "",	
	},
	inputValidities: {
		firstName: false,
		lastName: false,
		email: false,
		password: false,
	},
	formIsValid: false,
}

const SignUpForm = props => {

	const dispatch = useDispatch();
	
	const [error, setError] = useState();
	const [isLoading, setIsLoading] = useState(false);
	const [formState, dispatchFormState] = useReducer(reducer, initialState);

	const inputChangeHandler = useCallback((inputId, inputValue) => {
		const result = validateInput(inputId, inputValue);
		dispatchFormState({ inputId, validationResult: result, inputValue })
	}, [dispatchFormState]);

	useEffect(() => {
		if (error) {
			Alert.alert("an error occured", error, [{ text: "Okay", }]);
		}
	}, [error])


	const authHandler = useCallback(async () => {
		try {
		setIsLoading(true);

		const action = signUp(
			formState.inputValues.firstName,
			formState.inputValues.lastName,
			formState.inputValues.email,
			formState.inputValues.password,
		); 
		setError(null);
		await dispatch(action);
		} catch (error) {
			setError(error.message);
			setIsLoading(false);
		}
	}, [formState, dispatch, setIsLoading, setError]);

	return (
	<>
	<Input
		id="firstName"
	    label="First Name" 
	    icon="user-o" 
	    iconPack={FontAwesome}
	    onInputChanged={inputChangeHandler}
	    autoCapitalize="none"
	    errorText={formState.inputValidities["firstName"]}
	    />
	<Input 
		id="lastName"
	    label="Last Name" 
	    icon="user-o" 
	    iconPack={FontAwesome}
	    onInputChanged={inputChangeHandler}
	    autoCapitalize="none"
	    errorText={formState.inputValidities["lastName"]}
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
	    />
	<Input 
		id="password"
	    label="Password" 
	    icon="lock"
	    autoCapitalize="none"
	    secureTextEntry
	    iconPack={Feather}
	    onInputChanged={inputChangeHandler}
	    errorText={formState.inputValidities["password"]}
	    />

		{
			isLoading ?
			<ActivityIndicator size={"small"} color={colors.primary} style={{ marginTop: 10 }}/> :
		<SubmitButton 
	   	 	title="Sign Up"
	   	 	onPress={authHandler}
	   	 	style={{ marginTop: 20 }}
	   	 	disabled={!formState.formIsValid}
	    	/>
		}
	</>
 
	);
};

export default SignUpForm;
