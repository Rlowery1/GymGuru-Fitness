import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomePage from '../pages/HomePage';
import SignInPage from '../pages/SignInPage';
import SignUpPage from '../pages/SignUpPage';
import ForgotPasswordPage from '../pages/ForgotPasswordPage';
import ResetPasswordPage from '../pages/ResetPasswordPage';
import MainAppPage from '../pages/MainAppPage';
import ExerciseDetailsScreen from '../pages/ExerciseDetailsScreen';
import WebViewScreen from '../pages/WebViewScreen';
import YoutubeVideoScreen from '../pages/WebViewScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomePage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignIn"
        component={SignInPage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUpPage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPasswordPage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ResetPassword"
        component={ResetPasswordPage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MainApp"
        component={MainAppPage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ExerciseDetails"
        component={ExerciseDetailsScreen}
        options={{
          headerTitle: 'Exercise Details',
          headerStyle: { backgroundColor: '#1A1A1D' },
          headerTintColor: '#FFFFFF',
        }}
      />
      <Stack.Screen
        name="WebView"
        component={WebViewScreen}
        options={{
          headerTitle: 'WebView',
          headerStyle: { backgroundColor: '#1A1A1D' },
          headerTintColor: '#FFFFFF',
        }}
      />
      <Stack.Screen
        name="YoutubeVideo"
        component={YoutubeVideoScreen}
        options={{
          headerStyle: { backgroundColor: '#1A1A1D' },
          headerTintColor: '#FFFFFF',
        }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
