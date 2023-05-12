import React, { useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Animated,
  ImageBackground,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useFocusEffect } from '@react-navigation/native';

const HomePage = ({ navigation }) => {
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const buttonTranslateY = useRef(new Animated.Value(50)).current;

  useFocusEffect(
    React.useCallback(() => {
      Animated.parallel([
        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(buttonTranslateY, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        }),
      ]).start();

      return () => {
        logoOpacity.setValue(0);
        buttonTranslateY.setValue(50);
      };
    }, []),
  );

  return (
  <View style={styles.container}>
    <Image
      style={styles.backgroundImage}
      source={require('../../assets/Arnold_Pose.jpg')}
    />
    <View style={styles.overlay}></View>
    <View style={styles.content}>
      <Animated.Image
        style={[styles.logo, { opacity: logoOpacity }]}
        source={require('../../assets/gymguru-high-resolution-logo-color-on-transparent-background.png')}
        resizeMode="contain"
      />
      <Text style={styles.title}>Welcome to GymGuru!</Text>
      <Animated.View style={{ transform: [{ translateY: buttonTranslateY }] }}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('SignUp')}
        >
          <Icon name="user-plus" size={18} color="#FFFFFF" style={styles.icon} />
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('SignIn')}
        >
          <Icon name="sign-in" size={18} color="#FFFFFF" style={styles.icon} />
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  logo: {
    width: 300,
    height: 320,
    marginBottom: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 50,
    textAlign: 'center',
    color: '#FFFFFF',
    fontFamily: 'Arial',
  },
  icon: {
    marginRight: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#0E7C7B',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 30, // Updated for rounded corners
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    width: 205,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  imageBackground: {
  flex: 1,
  resizeMode: "cover",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#1A1A1D",
  paddingHorizontal: 16,
},
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  overlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: '#1A1A1D',
    opacity: 0.8,
  },
  content: {
    width: '100%',
    paddingHorizontal: 16,
    alignItems: 'center',
  },



});

export default HomePage;
