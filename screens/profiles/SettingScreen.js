import React, { useCallback, useContext } from 'react';
import { View, StyleSheet,Text, RefreshControl } from 'react-native';
import {Context} from '../context/AuthContext'
import Spacer,{} from '../components/Spacer'
import {TouchableOpacityButtons} from '../components/FormField'

const wait = (timeout) => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

const SettingsPage =(props)=>{
  const {data:{token},signout} = useContext(Context)
  const renderDestination=useCallback((destination)=>{
    const {navigation:{navigate}} = props;
    navigate(destination)
  });
  if(!token){
    const {navigation:{navigate}} = props;
    return(
      <>
        {navigate('landingpage')}
      </>
    )
  }
  return (
    <>
      <View style={styles.container}>
        <Text>Click button to log out</Text>
        <Spacer>
        <TouchableOpacityButtons titles="Log out" disabledButton={!token} buttonColor={(!token)?'lightgray':'red'} action={()=>signout(props)} />
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
});

export default SettingsPage;