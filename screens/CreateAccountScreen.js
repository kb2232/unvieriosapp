import React, {  } from 'react';
import { View, StyleSheet,Text } from 'react-native';

const CreateAccountPage =()=>{
  return (
    <>
      <View style={styles.container}>
        <Text>Create account page Screen</Text>
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

export default CreateAccountPage;