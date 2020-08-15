import React from 'react';
import { View, StyleSheet,TextInput, TouchableOpacity,Button, Text  } from 'react-native';

export const Inputs = ({ values, action,textplaceholder,autoCompleteType="default", entryType='default', secureText=false,disabledInput=false }) => {
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
      <TouchableOpacity style={styles.buttonContainer} disabled={disabledButton} id={buttonID} onPress={action}>
        <Text>{titles}</Text>
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
		width:300
	},
  buttonText:{
    textAlign:'center',
    lineHeight:40,
    fontWeight:"700",
    fontSize:14,
    color:'#fff'
	},
	buttonView:{
	 display:'flex',
	 alignItems:'center',
	 justifyContent:'center'
  },
  buttonContainer: {
		borderRadius: '50%',
		backgroundColor: '#4C7450',
		width:'100%'
	}
});
export default Inputs;