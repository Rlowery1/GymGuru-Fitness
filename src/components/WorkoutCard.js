import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const WorkoutCard = ({ exercise }) => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/cover_photo_1.png')} // Replace with your own image
        style={styles.image}
      />
      <View style={styles.textContainer}>
        <Text style={styles.exerciseName}>{exercise}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 5,
    marginVertical: 5,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  textContainer: {
    marginLeft: 15,
  },
  exerciseName: {
    fontSize: 18,
    fontWeight: '500',
  },
});

export default WorkoutCard;
