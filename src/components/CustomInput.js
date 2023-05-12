import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import CommonStyles from '../styles/GlobalStyles';



const CustomInput = ({ style, ...props }) => {
  return (
    <TextInput
      style={[styles.input, style]}
      placeholderTextColor="#ffffff"
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    width: '100%',
    marginBottom: 16,
  },
  input: {
    height: 48, // increase the height
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 15, // adjust the border-radius
    paddingLeft: 16, // adjust the padding
    paddingRight: 16, // adjust the padding
    marginBottom: 10,
    backgroundColor: '#2C2C2E',
    color: '#E6E6E6',
    fontSize: 16,
    width: '75%',
    minWidth: 300,
  },
});

export default CustomInput;
