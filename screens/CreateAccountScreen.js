import React, { useContext, useCallback, useState, useEffect } from 'react';
import { SafeAreaView } from 'react-navigation';
import { View, StyleSheet, Image, TouchableOpacity, Text, Dimensions } from 'react-native';
import {Inputs,TouchableOpacityButtons} from './components/FormField';
import { Context } from './context/AuthContext';
import { FontAwesome } from '@expo/vector-icons';
import Spacer, {SmallSpacer, SmallestSpacer} from './components/Spacer';
const windowWidth = Dimensions.get('window').width;

function CreatAccountScreen(props) {
  const { data:{token},clearErrorMessage} = useContext(Context);
  const [email,setEmail] = useState("")
  useEffect(() => {
		props.navigation.addListener('blur', () => clearErrorMessage());
		props.navigation.addListener('focus', () => clearErrorMessage());
  }, []);
  const renderLogo = () => {
    return (
      <View>
        <Text style={{textAlign:'center', fontSize:20, fontWeight:'bold'}}>
        {'\n'}{'\n'}{'\n'}Create Account{'\n'}{'\n'}
        </Text >
        <Text style={{textAlign:'center', fontSize:16}}>
          Enter your email below and a link will be sent in order to set up your password
        </Text>
      </View>
    );
  };
  const renderDestination=useCallback((destination)=>{
    const {navigation:{navigate}} = props;
    navigate(destination)
  })
  if(token){
    const {navigation:{navigate}} = props;
    return (
    <View>
      {navigate('mainprofilepage')}
    </View>
    )
  }
  return (
    <SafeAreaView forceInset={{ top: 'always' }} style={styles.container}>
        {renderLogo()}
        <Spacer>
          <Inputs values={email} textplaceholder="Email" action={(text)=>setEmail(text)} />
          <SmallestSpacer />
          <SmallSpacer /><SmallSpacer />
          <TouchableOpacityButtons titles="Next" disabledButton={!email.includes('@')||!email.includes('.com')} buttonColor={(!email.includes('@')||!email.includes('.com'))?'lightgray':'#4C7450'} action={()=>renderDestination('loginpage')} />
        </Spacer>
        <View style={[styles.rowItems2, styles.rowItems]}>
          <Text>Already have an account? Click </Text>
          <TouchableOpacity style={styles.rowItems} onPress={() => renderDestination('loginpage')}>
            <Text style={{ color: '#29B6F6' }}>here</Text>
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
    width: 300,
    height: 100,
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

export default CreatAccountScreen;