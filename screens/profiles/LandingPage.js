import React, { useCallback, useContext } from 'react';
import { View, StyleSheet,Text } from 'react-native';
import {Context} from '../context/AuthContext'
import Spacer,{} from '../components/Spacer'
import {TouchableOpacityButtons} from '../components/FormField'

const HomePage =(props)=>{
  const {data:{token}} = useContext(Context);

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
  return (
    <>
      <View style={styles.container}>
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
});

export default HomePage;