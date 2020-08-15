import React from 'react';
import { View, StyleSheet } from 'react-native';

const SpacerScreen = ({ children }) => {
  return <View style={styles.container}>{children}</View>;
};

export const SmallSpacer = ({ children }) => {
  return <View style={styles.smallcontainer}>{children}</View>;
};

export const SmallestSpacer = ({ children }) => {
  return <View style={styles.smallestcontainer}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
  smallcontainer: {
    margin: 5,
  },
  smallestcontainer: {
    margin: 2,
  }
});

export default SpacerScreen;