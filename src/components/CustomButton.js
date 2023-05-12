// src/components/CustomButton.js
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import CommonStyles from '../styles/GlobalStyles';
const CustomButton = ({ title, onPress, style, ...props }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, style]} {...props}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};


const styles = StyleSheet.create({
   button: {
    backgroundColor: '#0E7C7B',
    padding: 10,
    borderRadius: 25,
    width: '80%',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CustomButton;
