import React, { useEffect, useState } from 'react';
import { Animated, Easing } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const AnimatedDumbbell = ({ size }) => {
  const rotation = useState(new Animated.Value(0))[0];

  const startRotation = () => {
    Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  };

  useEffect(() => {
    startRotation();
  }, []);

  const rotationDeg = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Animated.View style={{ transform: [{ rotate: rotationDeg }] }}>
      <Ionicons name="md-dumbbell" size={size} color="#FFFFFF" />
    </Animated.View>
  );
};

export default AnimatedDumbbell;
