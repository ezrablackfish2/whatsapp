import { getFirebaseApp } from "../firebaseHelper";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getDatabase, set, child, ref } from "firebase/database";
import { authenticate } from "../../store/authSlice";
import AsyncStorage from "@react-native-async-storage/async-storage"; 
import { getUserData } from "./userActions"

export const signUp = (firstName, lastName, email, password) => {

	return async dispatch => {
		const app = getFirebaseApp();
		const auth = getAuth(app);
	
		try {
			const result = await createUserWithEmailAndPassword(auth, email, password);
			const { uid, stsTokenManager } = result.user;
			const { accessToken, expirationTime } = stsTokenManager;

			const expiryDate = new Date(expirationTime);

	
			const userData = await createUser(firstName, lastName, email, uid);
			dispatch(authenticate({ 
				token: accessToken, 
				userData
			}));
			saveDataToStorage(accessToken, uid, expiryDate);
		}
		catch (error) {
			const errorCode = error.code;
	
			let message = "Something wen wrong";
	
			if (error.code === "auth/email-already-in-use") {
				message = "This email is already taken";
			}
	
			throw new Error(message);
		}	
	}
	
}


export const signIn = (email, password) => {

	return async dispatch => {
		const app = getFirebaseApp();
		const auth = getAuth(app);
	
		try {
			const result = await signInWithEmailAndPassword(auth, email, password);
			const { uid, stsTokenManager } = result.user;
			const { accessToken, expirationTime } = stsTokenManager;

			const expiryDate = new Date(expirationTime);

	
			const userData = await getUserData(uid);
			dispatch(authenticate({ 
				token: accessToken, 
				userData
			}));
			saveDataToStorage(accessToken, uid, expiryDate);
		}
		catch (error) {
			const errorCode = error.code;
	
			let message = "Something wen wrong";
	
			if (error.code === "auth/wrong-password" || error.code === "auth/user-not-found" || error.code === "auth/invalid-credential") {
				message = "the username or password was incorrect";
			}
			else if (error.code === "auth/too-many-requests" ) {
				message = " too many requests";
			}

	
			throw new Error(message);
		}	
	}
	
}


const createUser = async (firstName, lastName, email, userId) => {
	const firstLast = `${firstName} ${lastName}`.toLowerCase();
	const userData = {
		firstName,
		lastName,
		firstLast,
		email,
		userId,
		signUpDate: new Date().toISOString()
	};


	const dbRef = ref(getDatabase());
	const childRef = child(dbRef, `users/${userId}`);
	await set(childRef, userData);
	return userData;
}

const saveDataToStorage = (token, userId, expiryDate) => {
	AsyncStorage.setItem("userData", JSON.stringify({
		token,
		userId,
		expiryDate: expiryDate.toISOString()
	}))
}
