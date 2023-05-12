import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";

const PreciseCountdownTimer = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState(Math.floor((targetDate - new Date()) / 1000));

  useEffect(() => {
    const timerId = setInterval(() => {
      setTimeLeft(t => {
        if (t > 0) {
          return t - 1;
        } else {
          clearInterval(timerId);
          return 0;
        }
      });
    }, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, []);

  const seconds = timeLeft % 60;

  return (
    <View style={styles.container}>
      <Text style={styles.timerText}>
        {seconds}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  timerText: {
    fontSize: 24,  // increase size
    color: '#ffffff',  // change color to white
  },
});

export default PreciseCountdownTimer;
