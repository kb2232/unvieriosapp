import React, { useCallback, useContext } from 'react';
import { View, StyleSheet,Text, Dimensions } from 'react-native';
import {Context} from '../context/AuthContext'
import Spacer,{} from '../components/Spacer'
import {TouchableOpacityButtons} from '../components/FormField'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const HomePage =(props)=>{
  const {data:{token,successMessages}} = useContext(Context);

  const renderDestination=useCallback((destination)=>{
    const {navigation:{navigate}} = props;
    navigate(destination)
  });
  if(!token){
    const {navigation:{navigate}} = props;
    return (
      <>
        {navigate('landingpage')}
      </>
    )
  }
  const renderMessage=(message)=>{
    return(
      <Text style={[styles.rowItems2,{color:'green'}]}>
        {message}
      </Text>
    )
  }
  return (
    <>
      <View style={styles.container}>
        {renderMessage(successMessages)}
        <Text>This is main profile</Text>
        <Spacer>
        <TouchableOpacityButtons titles="Settings" buttonColor='lightblue' action={()=>renderDestination('settingspage')} />
        </Spacer>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowItems2: {
		backgroundColor: '#F5F5F5',
		width: windowWidth,
		borderWidth: 1,
		borderColor: '#F5F5F5',
		borderStyle: 'solid',
		height: 40,
  }
});

export default HomePage;