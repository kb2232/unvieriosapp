import React, { useContext, useCallback, useState, useEffect } from 'react';
import { SafeAreaView } from 'react-navigation';
import { View, StyleSheet, Image, TouchableOpacity, Text, Dimensions } from 'react-native';
import {Inputs, TouchableOpacityButtons,Buttons} from './components/FormField';
import { Context } from './context/AuthContext';
import { FontAwesome } from '@expo/vector-icons';
import Spacer, {SmallSpacer, SmallestSpacer} from './components/Spacer';
const windowWidth = Dimensions.get('window').width;

function PasswordRecoveryScreen(props) {
  const {data:{token,errorMessages},clearErrorMessage,forgetPasswordEmailLink } = useContext(Context);
  const [email,setEmail] = useState()
  useEffect(() => {
		props.navigation.addListener('blur', () => clearErrorMessage());
		props.navigation.addListener('focus', () => clearErrorMessage());
  }, []);
  const renderLogo = () => {
    return (
      <View>
        <Text>
          {'\n'} {'\n'}
        </Text>
        <Spacer>
        <Text style={{fontSize:20, fontWeight:'bold'}}>
          Enter your email to reset password
        </Text>
        </Spacer>
      </View>
    );
  };
  const renderError=()=>{
  return (errorMessages)?<Text style={{color:'red'}}>{errorMessages}</Text>:<Text>{""}</Text>;
  }
  const renderDestination=useCallback((destination)=>{
    const {navigation:{navigate}} = props;
    navigate(destination)
  })

  if(token){
    const {navigation:{navigate}} = props;
    return (
      <>
        {navigate('mainprofilepage')}
      </>
    )
  }
  
  return (
    <SafeAreaView forceInset={{ top: 'always' }} style={styles.container}>
        {renderLogo()}
        {renderError()}
        <Spacer>
          <Inputs values={email} textplaceholder="Email" action={(text)=>setEmail(text)} />
          <SmallSpacer />
          <TouchableOpacityButtons titles="Reset password" disabledButton={!email||!email.includes('@')||!email.includes('.com')} buttonColor={(!email||!email.includes('@')||!email.includes('.com'))?'lightgray':'#4C7450'} action={()=>forgetPasswordEmailLink(props,email)} />
        </Spacer>
        <View style={[styles.rowItems2, styles.rowItems]}>
          <Text>Don't have an account? </Text>
          <TouchableOpacity style={styles.rowItems} onPress={() => renderDestination('createaccountpage')}>
            <Text style={{ color: '#29B6F6' }}>Sign up</Text>
          </TouchableOpacity>
			  </View>
        <SmallSpacer />
        <Text style={{fontWeight: '800' }}>
          or connect using 
        </Text>
        <Spacer />
        <View style={styles.iconstyle}>
          <TouchableOpacity onPress={() => console.log("google was pressed")}>
            <Image
              style={styles.imageIconStyle}
              source={require('../assets/googleIcon.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={()=>console.log("fb was pressed")}
          >
            <Image
              style={styles.imageIconStyle}
              source={require('../assets/facebook.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => console.log('twitter sign-in pressed')}
          >
            <FontAwesome
              name="twitter"
              style={{ color: '#38A1F3' }}
              size={50}
            />
          </TouchableOpacity>
        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#E4E4E4',
  },
  imageStyle: {
    width: 250,
    height: 80,
  },
  imageIconStyle: {
    width: 50,
    height: 50,
  },
  rowItems2: {
		backgroundColor: '#F5F5F5',
		width: windowWidth,
		borderWidth: 1,
		borderColor: '#F5F5F5',
		borderStyle: 'solid',
		height: 40,
  },
  rowItems: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
  iconstyle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: 200,
  },
});

export default PasswordRecoveryScreen;