import React, { useContext, useCallback } from 'react';
import { SafeAreaView } from 'react-navigation';
import { View, StyleSheet, Image, TouchableOpacity, Text, Dimensions } from 'react-native';
import {TouchableOpacityButtons} from './components/FormField';
import { Context } from './context/AuthContext';
import { FontAwesome } from '@expo/vector-icons';
import Spacer, {SmallSpacer, SmallestSpacer} from './components/Spacer';
const windowWidth = Dimensions.get('window').width;
function AuthScreen(props) {
  const { } = useContext(Context);
  const renderLogo = () => {
    return (
      <Image style={styles.imageStyle} source={require('../assets/logo.png')} />
    );
  };
  const renderDestination=useCallback((destination)=>{
    const {navigation:{navigate}} = props;
    navigate(destination)
  })

  return (
    <SafeAreaView forceInset={{ top: 'always' }} style={styles.container}>
        {renderLogo()}
        <Spacer />
        <Spacer>
          <TouchableOpacityButtons titles="Log In" action={()=>console.log("log in pressed")} />
        </Spacer>
        <View style={[styles.rowItems2, styles.rowItems]}>
          <Text>Don't have an account? </Text>
          <TouchableOpacity style={styles.rowItems} onPress={() => console.log('createaccountpage')}>
            <Text style={{ color: '#29B6F6' }}>Sign up</Text>
          </TouchableOpacity>
			  </View>
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
    justifyContent: 'center',
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

export default AuthScreen;