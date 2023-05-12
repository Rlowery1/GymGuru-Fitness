import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  Alert,
  ImageBackground,
} from 'react-native';
import { Auth } from 'aws-amplify';
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useFocusEffect } from '@react-navigation/native';


const ForgotPasswordPage = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [disableResetButton, setDisableResetButton] = useState(false);
  const [resetButtonTimeout, setResetButtonTimeout] = useState(null);
  const titleOpacity = useRef(new Animated.Value(0)).current;
  const formTranslateY = useRef(new Animated.Value(50)).current;
  const inputWidth = 300;

  useEffect(() => {
    return () => {
      if (resetButtonTimeout) {
        clearTimeout(resetButtonTimeout);
      }
    };
  }, [resetButtonTimeout]);

  useFocusEffect(
    React.useCallback(() => {
      Animated.parallel([
        Animated.timing(titleOpacity, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(formTranslateY, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        }),
      ]).start();

      return () => {
        titleOpacity.setValue(0);
        formTranslateY.setValue(50);
      };
    }, []),
  );

  const requestPasswordReset = async () => {
  setError('');

  try {
    await Auth.forgotPassword(email);
    console.log('Password reset request successful!');
    Alert.alert('Success', 'A password reset email has been sent. Please check your email for further instructions.', [
      { text: 'OK', onPress: () => navigation.navigate('ResetPassword', { email }) },
    ]);

    setDisableResetButton(true);
    setResetButtonTimeout(setTimeout(() => {
      setDisableResetButton(false);
    }, 60000)); // 60 seconds
  } catch (error) {
    console.error('Error requesting password reset:', error);
    setError('Invalid email');
    Alert.alert('Error', 'Invalid email. Please try again.');
  }
};


  return (
  <ImageBackground
    source={require('../../assets/abs_photo_2.jpg')}
    style={styles.container}
    resizeMode="cover"
  >
    <View style={styles.overlay}></View>
    <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
      <Icon name="arrow-left" size={30} color="#E6E6E6" />
    </TouchableOpacity>
    <Animated.Text style={[styles.title, { opacity: titleOpacity }]}>Forgot Password</Animated.Text>
    <Animated.View style={{ transform: [{ translateY: formTranslateY }] }}>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <CustomInput
        onChangeText={setEmail}
        value={email}
        placeholder="Email"
        keyboardType="email-address"
        textContentType="emailAddress"
        style={{ width: inputWidth }} // Apply the width to the CustomInput component
      />
      <CustomButton
        title="Request Password Reset"
        onPress={requestPasswordReset}
        disabled={disableResetButton}
        style={{ width: inputWidth }} // Apply the width to the CustomButton component
      />
      <Text style={styles.timerText}>{disableResetButton ? 'Please wait 60 seconds before requesting another password reset' : ''}</Text>
    </Animated.View>
  </ImageBackground>
);
};

const styles = StyleSheet.create({
  container: {
  flexGrow: 1,
  backgroundColor: 'rgba(26, 26, 29, 0.7)',
  alignItems: 'center',
  justifyContent: 'center',
  paddingHorizontal: 20,
  paddingTop: 40,
},
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#E6E6E6',
  },
  error: {
    color: '#E63946',
    marginBottom: 10,
  },
  timerText: {
    color: '#E6E6E6',
    marginTop: 10,
    textAlign: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 16,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(26, 26, 29, 0.7)',
  },
});

export default ForgotPasswordPage;

