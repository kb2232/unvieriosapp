import React from 'react';
import { View, StyleSheet,TextInput, TouchableOpacity,Button, Text, Dimensions  } from 'react-native';
const windowWidth = Dimensions.get('window').width;
export const Inputs = ({ values, action,textplaceholder,entryType='default', secureText=false,disabledInput=false }) => {
	return (
		<View style={styles.buttonView}>
			<TextInput
				secureTextEntry={secureText}
				style={styles.container}
        autoCapitalize="none"
        placeholder={textplaceholder}
				value={values}
        onChangeText={action}
				disabled={disabledInput}
				keyboardType={entryType}
			/>
		</View>
	);
};
export const Buttons = ({ titles, action, disabledButton=false, buttonColor='#4C7450',buttonID=`${titles}-${buttonColor}`}) => {
	return (
		<View style={styles.buttonView}>
			<Button disabled={disabledButton} id={buttonID} title={titles} onPress={action} />
		</View>
	);
};
export const TouchableOpacityButtons = ({ titles, action, disabledButton=false, buttonColor='#4C7450',buttonID=`${titles}-${buttonColor}`}) => {
	return (
		<View style={styles.buttonView}>
      <TouchableOpacity style={[styles.buttonContainer,styles.buttonView,{backgroundColor:buttonColor}]} disabled={disabledButton} id={buttonID} onPress={action}>
        <Text style={styles.buttonText}>{titles}</Text>
      </TouchableOpacity>
		</View>
	);
};
const styles = StyleSheet.create({
	container: {
		borderRadius: 30,
		borderColor: 'gray',
		borderStyle: 'solid',
		borderWidth: 1,
		paddingLeft: 10,
		paddingVertical: 5,
		backgroundColor: '#F5F5F5',
    marginTop: 10,
		height: 40,
		width:windowWidth-windowWidth/3
	},
  buttonText:{
    textAlign:'center',
    lineHeight:40,
    fontWeight:"700",
    fontSize:16,
    color:'#fff'
	},
	buttonView:{
	 display:'flex',
	 alignItems:'center',
	 justifyContent:'center'
  },
  buttonContainer: {
		borderRadius: 30,
		width:windowWidth-windowWidth/3,
		height:40
	}
});
export default Inputs;