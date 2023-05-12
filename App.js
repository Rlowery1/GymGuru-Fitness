import React from 'react';
import { AppRegistry } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { Amplify } from 'aws-amplify';
import awsconfig from './src/aws-exports';
import AppNavigator from './src/navigation/AppNavigator';
import config from './src/aws-exports';

Amplify.configure(awsconfig);

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#1A1A1D',
  },
};

function App() {
  return (
    <NavigationContainer theme={MyTheme}>
      <AppNavigator />
    </NavigationContainer>
  );
}

AppRegistry.registerComponent('main', () => App);
export default App;
