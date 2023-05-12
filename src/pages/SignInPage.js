import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Animated,
  ScrollView,
  ImageBackground,
} from 'react-native';
import { Auth } from 'aws-amplify';
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';
import { validateEmail, validatePassword } from '../utils/validate';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useFocusEffect } from '@react-navigation/native';

const SignInPage = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const titleOpacity = useRef(new Animated.Value(0)).current;
  const formTranslateY = useRef(new Animated.Value(50)).current;

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

  const signIn = async () => {
  setLoading(true);
  setError('');

  if (email.trim() === '') {
    setError('Email is required');
    setLoading(false);
    return;
  }

  if (!validateEmail(email)) {
    setError('Invalid email format');
    setLoading(false);
    return;
  }

  if (password.trim() === '') {
    setError('Password is required');
    setLoading(false);
    return;
  }

  if (!validatePassword(password)) {
    setError('Password must be at least 8 characters');
    setLoading(false);
    return;
  }

  try {
    await Auth.signIn(email, password);
    console.log('Sign in successful!');
    navigation.replace('MainApp'); // Replace with your main app screen
    } catch (error) {
    console.error('Error signing in:', error);

    if (error.code === 'UserNotFoundException') {
      setError('No account found with this email. Please sign up.');
    } else if (error.code === 'NotAuthorizedException') {
      setError('Invalid password.');
    } else if (error.code === 'UserNotConfirmedException') {
      setError('Account not confirmed. Please check your email');
    } else if (error.code === 'PasswordResetRequiredException') {
      setError('Password reset required. Please check your email');
    } else if (error.code === 'NetworkError') {
      setError('Network error. Please check your connection');
    } else {
      setError('An error occurred. Please try again');
    }

    setLoading(false);
  }

};


  return (
    <ImageBackground
      source={require('../../assets/sign_in_photo.jpg')}
      style={styles.container}
      resizeMode="cover"
    >
      <View style={styles.overlay}></View>
      <ScrollView contentContainerStyle={styles.innerContainer}>
      {loading ? (
        <ActivityIndicator size="large" color="#0E7C7B" />
      ) : (
        <>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Icon name="arrow-left" size={30} color="#E6E6E6" />
          </TouchableOpacity>
          <Animated.Text style={[styles.title, { opacity: titleOpacity }]}>
            GymGuru
          </Animated.Text>
          <View style={styles.formContainer}>
            <Animated.View
              style={{ transform: [{ translateY: formTranslateY }], alignItems: 'center' }} // Add alignItems: 'center' here
            >
              <CustomInput
                containerStyle={styles.input}
                onChangeText={setEmail}
                value={email}
                placeholder="Email"
                keyboardType="email-address"
                textContentType="emailAddress"
              />
              <CustomInput
                containerStyle={styles.input}
                onChangeText={setPassword}
                value={password}
                placeholder="Password"
                secureTextEntry
                textContentType="password"
              />
              {error ? <Text style={styles.error}>{error}</Text> : null}
              <CustomButton
                title="Sign In"
                onPress={signIn}
                backgroundColor="#0E7C7B"
              />
              <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
                <Text style={styles.textWhite}>Forgot Password?</Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </>
      )}
    </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: 'rgba(26, 26, 29, 0.7)',
    paddingHorizontal: 16,
  },
  innerContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#E6E6E6',
    fontFamily: 'Arial',
  },
  input: {
    width: '100%',
  },
  error: {
    color: '#E6E6E6',
    marginBottom: 10,
    fontSize: 14,
  },
  textWhite: {
    color: '#ffffff',
    textDecorationLine: 'underline',
    fontSize: 16,
    marginTop: 10,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 16,
  },
  formContainer: {
    width: '80%',
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

export default SignInPage;

