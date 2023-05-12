// src/pages/SignUpPage.js
import React, {useState, useRef, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  Animated,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { Auth } from 'aws-amplify';
import CommonStyles from '../styles/GlobalStyles';
import CustomInput from '../components/CustomInput';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useFocusEffect } from '@react-navigation/native';
import { validateEmail, validatePassword } from '../utils/validate';
import { ImageBackground } from 'react-native';
import sign_up_photo from '../../assets/Sign_Up_Photo.jpeg';
import PreciseCountdownTimer from '../components/PreciseCountdownTimer';





const SignUpPage = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');
  const [confirmation, setConfirmation] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const titleOpacity = useRef(new Animated.Value(0)).current;
  const formTranslateY = useRef(new Animated.Value(50)).current;
  const [resendTimer, setResendTimer] = useState(0);

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
    let timerId;
    if (resendTimer > 0) {
      timerId = setInterval(() => {
        setResendTimer((t) => t - 1);
      }, 1000);
    }
    return () => {
      if (timerId) {
        clearInterval(timerId);
      }
    };
  }, [resendTimer]);




  const validateFields = () => {
  let errorMessage = '';

  if (!email || !validateEmail(email)) {
    errorMessage += 'Invalid email format.\n';
  }

  if (!name) {
    errorMessage += 'Name is missing.\n';
  }

  if (!phoneNumber) {
    errorMessage += 'Phone number is missing.\n';
  }

  if (!password || !validatePassword(password)) {
    errorMessage += 'Password must be at least 8 characters.\n';
  }

  if (errorMessage) {
    Alert.alert('Please fix the following errors:', errorMessage.trim());
    return false;
  }

  return true;
};


  const signUp = async () => {
    if (!validateFields()) {
      return;
    }

    setLoading(true);

    try {
    const { user } = await Auth.signUp({
      username: email,
      password: password,
      attributes: {
        email: email,
        name: name,
        phone_number: phoneNumber,
      },
    });
    console.log(user);
    setConfirmation(true);
    Alert.alert('Sign up successful!', 'Please check your email for the confirmation code.');
  } catch (err) {
    console.error('Error signing up:', err);
    Alert.alert('Error signing up', err.message);
  } finally {
    setLoading(false);
  }
  };

  const confirmSignUp = async () => {
    try {
      await Auth.confirmSignUp(email, confirmationCode);
      Alert.alert('Confirmation successful!', 'Your account has been confirmed. You can now sign in.');
      navigation.navigate('SignIn');
    } catch (err) {
      console.error('Error confirming sign up:', err);
      Alert.alert('Error confirming sign up', err.message);
    }
  };

  const resendConfirmationCode = async () => {
    try {
        await Auth.resendSignUp(email);
        console.log('Confirmation code resent successfully');
        setResendTimer(30);
    } catch (error) {
        console.error('Error resending confirmation code: ', error);
    }
};




  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0E7C7B" />
      </View>
    );
  }

  return (
  <ImageBackground source={sign_up_photo} style={styles.imageBackground}>
    <View style={styles.overlay} />
    <ScrollView contentContainerStyle={styles.container}>
      <>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-left" size={30} color="#E6E6E6" />
        </TouchableOpacity>
        <Animated.Text style={[styles.title, { opacity: titleOpacity }]}>
          Sign Up for GymGuru
        </Animated.Text>
        <Animated.View
          style={{
            transform: [{ translateY: formTranslateY }],
            alignItems: 'center',
            width: '100%', // Add this line to set a specific width
          }}
        >
          {!confirmation ? (
            <>
              {error ? <Text style={styles.error}>{error}</Text> : null}
              <View style={styles.inputWrapper}>
                <CustomInput
                  onChangeText={(text) => {
                    setEmail(text);
                    setError('');
                  }}
                  value={email}
                  placeholder="Email"
                  keyboardType="email-address"
                  textContentType="emailAddress"
                  style={styles.sameWidthInput} // Add this line
                />
                </View>
                <View style={styles.inputWrapper}>
                <CustomInput
                  onChangeText={setName}
                  value={name}
                  placeholder="Name"
                  textContentType="name"
                  style={styles.sameWidthInput} // Add this line
                />
                </View>
                <View style={styles.inputWrapper}>
                  <CustomInput
                    onChangeText={setPhoneNumber}
                    value={phoneNumber}
                    placeholder="Phone Number (+1234567890)"
                    keyboardType="phone-pad"
                    textContentType="telephoneNumber"
                    style={styles.sameWidthInput} // Add this line
                  />
                </View>
                <View style={styles.inputWrapper}>
                  <CustomInput
                    onChangeText={setPassword}
                    value={password}
                    placeholder="Password (StrongPassword123)"
                    secureTextEntry={!showPassword}
                    textContentType="password"
                    style={styles.sameWidthInput} // Add this line
                  />
                </View>
                <View style={styles.buttonContainer}>
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  style={styles.showPassword}
                >
                  <Text style={styles.textWhite}>
                    {showPassword ? 'Hide Password' : 'Show Password'}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={signUp}>
                  <Text style={styles.buttonText}>Sign Up</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
                  <Text style={styles.textWhite}>
                    Already have an account? Sign In
                  </Text>
                </TouchableOpacity>
              </View>
              </>
            ) : (
              <>
                <Text style={styles.title}>Confirm Sign Up</Text>
                {error ? <Text style={styles.error}>{error}</Text> : null}
                <CustomInput
                  onChangeText={setConfirmationCode}
                  value={confirmationCode}
                  placeholder="Confirmation Code"
                  keyboardType="numeric"
                  textContentType="oneTimeCode"
                  style={styles.confirmationInput} // Add this line
                />
                <TouchableOpacity
                  style={[styles.button, styles.confirmationButton]} // Modify this line
                  onPress={confirmSignUp}
                >
                  <Text style={styles.buttonText}>Confirm Sign Up</Text>
                </TouchableOpacity>

                {resendTimer > 0 ? (
                <PreciseCountdownTimer targetDate={new Date(Date.now() + resendTimer * 1000)} />
              ) : (
                <TouchableOpacity onPress={resendConfirmationCode}>
                  <Text style={[styles.textWhite, styles.resendCode]}>Resend Code</Text>
                </TouchableOpacity>
                )}
              </>
            )}
        </Animated.View>
      </>
    </ScrollView>
  </ImageBackground>
);
};




const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 28, // Increased font size
    fontWeight: 'bold',
    marginBottom: 40, // Increased margin bottom
    color: '#ffffff',
  },
  textWhite: {
    color: '#ffffff',
  },
  error: {
    color: '#E63946',
    marginBottom: 10,
    fontSize: 16, // Increased font size
    fontWeight: '600', // Adjusted font weight
  },
  showPassword: {
    marginBottom: 10,
    color: '#E6E6E6',
  },
  button: {
    backgroundColor: '#0E7C7B',
    padding: 12,
    borderRadius: 30,
    width: '80%',
    alignItems: 'center',
    marginBottom: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#1A1A1D',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 16,
  },
  buttonContainer: {
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,
  },
  inputWrapper: {
    marginBottom: 20, // Added margin bottom to input fields
  },
  confirmationInput: {
    width: '100%',
    paddingHorizontal: 16, // Adjust the padding as needed
    height: 48, // Add the height property
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 15,
    paddingLeft: 16,
    paddingRight: 16,
    marginBottom: 10,
    backgroundColor: '#2C2C2E',
    color: '#E6E6E6',
    fontSize: 16,
    shadowColor: '#000', // added shadow
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  confirmationButton: {
  backgroundColor: '#0E7C7B',
  padding: 12,
  borderRadius: 30,
  width: '100%',
  alignItems: 'center',
  marginBottom: 10,
  elevation: 3,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.3,
  shadowRadius: 2,
},


  input: {
    height: 48, // increased the height
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 15, // adjusted the border-radius
    paddingLeft: 16, // adjusted the padding
    paddingRight: 16, // adjusted the padding
    marginBottom: 10,
    backgroundColor: '#2C2C2E',
    color: '#E6E6E6',
    fontSize: 16,
    width: '100%',
    shadowColor: '#000', // added shadow
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  sameWidthInput: {
    width: '100%',
  },
  imageBackground: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(26, 26, 29, 0.8)',
  },
  resendCode: {
  fontSize: 18, // increase size
},




});

export default SignUpPage;



