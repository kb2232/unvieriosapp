import React, { useReducer, useEffect } from 'react';
import * as Facebook from 'expo-facebook';
import firebase from 'firebase';
import { FacebookAPI } from '../api/Auth';

// -- context to access all data
export const Context = React.createContext();

// -- reducer to process actions
const stateReducer = (state, action) => {
	const { type, payload } = action;
	switch (type) {
		case 'add_error':
			return { ...state, errorMessages: payload };
		case 'sign_up':
			return { errorMessages: '', token: payload };
		case 'sign_in':
			return { ...state, token: payload };
		case 'clear_error':
			return { errorMessages: '' };
		case 'sign_out':
			return { ...state, token: null, errorMessages: '' };
		default:
			return state;
	}
};

//-- provider from the context system
export const AuthProvider = (props) => {
	const DEFAULTSTATE = {
		token: null,
		errorMessages: '',
	};
	//-- state varable
	const [state, dispatch] = useReducer(stateReducer, DEFAULTSTATE);
	
	// set firebase
	const firebaseInitializer = () => {
		// Initialize Firebase
		firebase.initializeApp({
			apiKey: 'AIzaSyACGu0wnob6ITREptiOL_ZbwDtTphgiU6s',
			authDomain: 'unvieronelife.firebaseapp.com',
			databaseURL: 'https://unvieronelife.firebaseio.com',
			projectId: 'unvieronelife',
			storageBucket: 'unvieronelife.appspot.com',
			messagingSenderId: '736150402588',
			appId: '1:736150402588:web:d770fc01fa10c0138bd1d9',
			measurementId: 'G-QX36PF3KB4',
		});
		function getToken() {
			firebase.auth().onAuthStateChanged(function (user) {
				if (user) {
					user.getIdToken().then(function (data) {
						return dispatch({ type: 'sign_in', payload: data });
					});
				}
			});
		}
		return getToken();
	};

	useEffect(() => {
		return firebaseInitializer();
	}, []);
	/**----------ACTIONS AND ACTION CREATORS--------------------- */

	// -----sign up with facebook - updated 7/31/20
	const fblogIn = async (props) => {
		try {
			await Facebook.initializeAsync(FacebookAPI);
			const {
				type,
				token,
				expires,
				permissions,
				declinedPermissions,
			} = await Facebook.logInWithReadPermissionsAsync({
				permissions: ['public_profile', 'email'],
			});
			if (type === 'success') {
				// Get the user's name using Facebook's Graph API
				const response = await fetch(
					`https://graph.facebook.com/me?fields=id,name,email,birthday&access_token=${token}`
				);
				const { name, id, email } = await response.json();
				await getToken().promise();
				dispatch({ type: 'sign_in', payload: email });
				return props.navigation.dispatch(CommonActions.navigate({ name: 'mainprofilepage' }));
			} else {
				dispatch({
					type: 'add_error',
					payload: 'window closed',
				});
			}
		} catch ({ message }) {
			console.log(message);
			dispatch({
				type: 'add_error',
				payload: 'Unable to authenticate with facebook',
			});
		}
	};

	// -- signin with email password - updated 8/11/20
	const signin = (props, email, password) => {
		const {navigation: { navigate }} = props;
		email = email.toLowerCase();
		firebase
			.auth()
			.signInWithEmailAndPassword(email, password)
			.then(async () => {
				return navigate('mainprofilepage');
			})
			.catch((err) => {
				dispatch({
					type: 'add_error',
					payload: 'please check email/password',
				});
			});
	};
		/* sign out  ---updated 8/19/20--- */
		const signout = async (props) => {
			const {navigation: { navigate }} = props;
			dispatch({ type: 'sign_out'})
			firebase.auth().signOut();
			navigate('landingpage');
		};
	//----------forget password link - updated 8/11/20
	const forgetPasswordEmailLink = (props, email) => {
		
		const {navigation: { navigate }} = props;
		firebase
			.auth()
			.sendPasswordResetEmail(email)
			.then((res) => {
				dispatch({
					type: 'add_error',
					payload: 'An email was sent to reset your password',
				});
				navigate('passwordrecoverypage');
			})
			.catch((err) => {
				dispatch({
					type: 'add_error',
					payload: 'email not in our system',
				});
			});
	};

	/** Email confirmation - updated 7/31/20 */
	const EmailConfirmationProcess = (props, email) => {
		firebase
			.auth()
			.createUserWithEmailAndPassword(email, 'defaultpassword')
			.then(async () => {
				await signout(props);
				await firebase
					.auth()
					.sendPasswordResetEmail(email)
					.then((res) => {
						dispatch({
							type: 'add_error',
							payload: 'Please check your email',
						});
						props.navigation.dispatch(
							CommonActions.navigate({
								name: 'Logins',
							})
						);
					})
					.catch((err) => {
						dispatch({
							type: 'add_error',
							payload: 'invalid email',
						});
					});
			})
			.catch((err) => {
				console.log({ errorM: err.message });
				if (err.message === 'The email address is already in use by another account.') {
					return dispatch({
						type: 'add_error',
						payload: 'email is already registered',
					});
				}
				return dispatch({
					type: 'add_error',
					payload: 'email was not created',
				});
			});
		const user = firebase.auth().currentUser;
		console.log(user);
	};
	/* clear error */
	const clearErrorMessage = () => {
		dispatch({
			type: 'clear_error',
		});
	};

	return (
		<Context.Provider
			value={{data: state,EmailConfirmationProcess,clearErrorMessage,fblogIn,forgetPasswordEmailLink,signin,signout}}
		>
			{props.children}
		</Context.Provider>
	);
};