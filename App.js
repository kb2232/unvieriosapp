import 'react-native-gesture-handler'; //must be at the top
import React, { } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import { AuthProvider, Context } from './screens/context/AuthContext';
import LandingScreen from './screens/LandingScreen';
import LogingScreen from './screens/LoginScreen';
import CreateAccountScreen from './screens/CreateAccountScreen';
import MainProfileScreen from './screens/profiles/LandingPage';
import PasswordRecPage from './screens/PasswordRecoveryScreen'

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const LoggedInScreens = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen options={{ headerShown: false }} name="mainprofilepage" component={MainProfileScreen} />
			<Stack.Screen
					options={{
						headerShown: true,
						title: '',
						headerTransparent: true,
						headerBackTitleVisible: false,
					}}
					name="loginpage"
					component={LogingScreen}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
};
const NotLoggedInScreens = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen options={{ headerShown: false }} name="landingpage" component={LandingScreen} />
				<Stack.Screen
					options={{
						headerShown: true,
						title: '',
						headerTransparent: true,
						headerBackTitleVisible: false,
					}}
					name="createaccountpage"
					component={CreateAccountScreen}
				/>
				<Stack.Screen
					options={{
						headerShown: true,
						title: '',
						headerTransparent: true,
						headerBackTitleVisible: false,
					}}
					name="loginpage"
					component={LogingScreen}
				/>
				<Stack.Screen options={{ headerShown: false }} name="mainprofilepage" component={MainProfileScreen} />
				<Stack.Screen options={{
						headerShown: true,
						title: '',
						headerTransparent: true,
						headerBackTitleVisible: false,
					}} name="passwordrecoverypage" component={PasswordRecPage} />
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default () => {
	return (
		<AuthProvider>
			<Context.Consumer>
				{({ data: { token } }) => token ? <LoggedInScreens /> : <NotLoggedInScreens />}
			</Context.Consumer>
		</AuthProvider>
	);
};