import React from 'react';
import RNPickerSelect from 'react-native-picker-select';
import { View, Text, StyleSheet } from 'react-native';

const WorkoutDaysSelector = ({ daysPerWeek }) => {
  const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
      color: 'white',
    },
    inputAndroid: {
      color: 'white',
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Workout Days: </Text>
      <RNPickerSelect
        disabled={true}
        onValueChange={() => {}}
        items={[
          { label: '3 Days', value: '3' },
          { label: '4 Days', value: '4' },
          { label: '5 Days', value: '5' },
          { label: '6 Days', value: '6' },
          { label: '7 Days', value: '7' },
        ]}
        value={daysPerWeek.toString()}
        style={pickerSelectStyles}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 18,
    fontWeight: '500',
    color: '#ffffff',
  },
});

export default WorkoutDaysSelector;
