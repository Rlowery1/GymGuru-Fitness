import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Animated, Alert } from 'react-native';
import { Auth } from 'aws-amplify';
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useFocusEffect } from '@react-navigation/native';
import { ImageBackground } from 'react-native';
import PreciseCountdownTimer from '../components/PreciseCountdownTimer';
import { validatePassword } from '../utils/validate';










const ResetPasswordPage = ({ route, navigation }) => {
  const { email } = route.params;
  const [confirmationCode, setConfirmationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [resendEnabled, setResendEnabled] = useState(true);
  const [targetDate, setTargetDate] = useState(new Date());
  const [resendTimer, setResendTimer] = useState(30);





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

   useEffect(() => {
    resendConfirmationCode();
  }, []);


  const resetPassword = async () => {
  setError('');

  console.log(`Resetting password with email: ${email}, code: ${confirmationCode}, password: ${newPassword}`)

  try {
    await Auth.forgotPasswordSubmit(email, confirmationCode, newPassword);
    console.log('Password reset successful!');
    Alert.alert('Success', 'Your password has been reset. Please sign in with your new password.', [
      { text: 'OK', onPress: () => navigation.navigate('SignIn') },
    ]);
  } catch (error) {
    console.error('Error resetting password:', error);
    setError('Invalid confirmation code or password');
    Alert.alert('Error', 'Invalid confirmation code or password. Please try again.');
  }
};


  const resendConfirmationCode = async () => {
    setResendEnabled(false);
    try {
      await Auth.forgotPassword(email);
      console.log('Confirmation code resent successfully');
      setResendTimer(30);
      startTimer();
    } catch (error) {
      console.error('Error resending confirmation code: ', error);
    }
  };

  const startTimer = () => {
    const interval = setInterval(() => {
      setResendTimer((prevTimer) => {
        if (prevTimer <= 1) {
          clearInterval(interval);
          setResendEnabled(true);
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    if (resendTimer <= 0) {
      setResendEnabled(true);
    }
  }, [resendTimer]);






  return (
    <ImageBackground
      source={require('../../assets/abs_photo_3.jpg')}
      style={styles.container}
      resizeMode="cover"
    >
      <View style={styles.overlay}></View>
      <View style={styles.innerContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-left" size={30} color="#FFFFFF" />
        </TouchableOpacity>
        <Animated.Text
          style={[styles.title, { opacity: titleOpacity }]}
        >
          Reset Password
        </Animated.Text>
        <Animated.View
          style={[
            styles.formContainer,
            { transform: [{ translateY: formTranslateY }] },
          ]}
        >
          {error ? <Text style={styles.error}>{error}</Text> : null}
          <CustomInput
            containerStyle={styles.input}
            onChangeText={setConfirmationCode}
            value={confirmationCode}
            placeholder="Confirmation Code"
            keyboardType="numeric"
            textContentType="oneTimeCode"
            placeholderTextColor="#FFFFFF"
          />
          <CustomInput
            containerStyle={styles.input}
            onChangeText={setNewPassword}
            value={newPassword}
            placeholder="New Password"
            secureTextEntry
            textContentType="password"
            placeholderTextColor="#FFFFFF"
          />
          {resendTimer > 0 ? (
            <Text style={styles.countdownText}>{`Resend Code (${resendTimer}s)`}</Text>
          ) : (
            <TouchableOpacity
              onPress={resendConfirmationCode}
              style={styles.resendButton}
              disabled={!resendEnabled}
            >
              <Text style={styles.textWhite}>Resend Code</Text>
            </TouchableOpacity>
          )}
          <CustomButton
            title="Reset Password"
            onPress={resetPassword}
            disabled={!validatePassword(newPassword) || confirmationCode.length === 0}
            style={styles.button}
          />
        </Animated.View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(26, 26, 29, 0.7)',
  },
  innerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#FFFFFF',
  },
  error: {
    color: '#E63946',
    marginBottom: 10,
  },
  formContainer: {
    width: '80%',
  },
  input: {
    width: '100%',
    marginBottom: 10,
  },
  button: {
    width: '100%',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(26, 26, 29, 0.7)',
  },
  resendButton: {
    width: '100%',
    backgroundColor: 'transparent',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 10,
  },
  textWhite: {
    color: 'white',
    fontSize: 18,
  },
  countdownText: {
    color: '#FFFFFF',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default ResetPasswordPage;
