import React, { useCallback, useReducer, useState, useEffect} from "react";
import { Feather } from "@expo/vector-icons";
import { Alert, ActivityIndicator  } from "react-native";
import { useDispatch, useSelector } from "react-redux";


import Input from "../components/Input";
import SubmitButton from "../components/SubmitButton";

import { validateInput } from "../utils/actions/formActions";
import { reducer } from "../utils/reducers/formReducers";
import { signIn } from "../utils/actions/authAction";



const initialState = {
	inputValues: {
		email: "",
		password: "",	
	},	
	inputValidities: {
		email: false,
		password: false,
	},
	formIsValid: false,
}


const SignInForm = props => {

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

		const action = signIn(
			formState.inputValues.email,
			formState.inputValues.password,
		); 
		setError(null);
		await dispatch(action);
		} catch (error) {
			setError(error.message);
			setIsLoading(false);
		}
	}, [formState, dispatch, setIsLoading, setError] );


	return (
	<>
	<Input
	    id="email"
	    label="Email" 
	    icon="mail" 
	    iconPack={Feather}
	    autoCapitalize="none"
	    keyboardType="email-address"
	    onInputChanged={inputChangeHandler}
	    errorText={formState.inputValidities["email"]}
	    />
	<Input 
	    id="password"
	    label="Password" 
	    icon="lock" 
	    iconPack={Feather}
	    autoCapitalize="none"
	    secureTextEntry
	    onInputChanged={inputChangeHandler}
	    errorText={formState.inputValidities["password"]}
	    />

	<SubmitButton 
	    title="Sign In"
	    onPress={authHandler}
	    style={{ marginTop: 20 }}
	    disabled={!formState.formIsValid}
	    />
	</>
 
	);
};

export default SignInForm;
