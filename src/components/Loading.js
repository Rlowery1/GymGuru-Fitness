// components/Loading.js
import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

const Loading = () => {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#0E7C7B" />
      <Text style={styles.loadingMessage}>Loading...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1A1A1D',
  },
  loadingMessage: {
    color: '#FFFFFF',
    fontSize: 18,
    marginTop: 10,
  },
});

export default Loading;
