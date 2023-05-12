//styles/GlobalStyles.js
import { StyleSheet } from 'react-native';

const GlobalStyles = StyleSheet.create({
  // Add other global styles if needed
  container: {
    flex: 1,
    backgroundColor: '#1A1A1D',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  button: {
    backgroundColor: '#0E7C7B',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    width: 205,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 18,
  },
  customButton: {
    backgroundColor: '#0E7C7B',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  customInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 6,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default GlobalStyles;

