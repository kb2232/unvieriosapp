import React, {  } from 'react';
import { View, StyleSheet,Text } from 'react-native';

const PasswordRecoveryPage =()=>{
  return (
    <>
      <View style={styles.container}>
        <Text>PasswordRecovery page Screen</Text>
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

export default PasswordRecoveryPage;