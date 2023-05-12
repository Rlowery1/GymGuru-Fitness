import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, TextInput, Image, Animated, Linking, ImageBackground } from 'react-native';
import { getWorkout } from '../data/workouts';
import WorkoutCard from '../components/WorkoutCard';
import WorkoutDaysSelector from '../components/WorkoutDaysSelector';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useFocusEffect, useIsFocused } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import * as Notifications from 'expo-notifications';
import { LinearGradient } from 'expo-linear-gradient';
import { Easing } from 'react-native';
import AnimatedDumbbell from '../components/AnimatedDumbbell';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';


















const WorkoutScreen = ({ onDaysChange }) => {
  const navigation = useNavigation();
  const [week, setWeek] = useState(1);
  const [days, setDays] = useState(3);
  const [daysPerWeek, setDaysPerWeek] = useState(3);
  const [fitnessGoal, setFitnessGoal] = useState(null);
  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const fadeAnim = useState(new Animated.Value(0))[0];
  const headerTextRef = React.useRef(null);
  const [animatedValue] = useState(new Animated.Value(0));
  const YOUTUBE_API_KEY = "AIzaSyCrpCL8JdtQaUXYnmA9wNQezOrN4YZwle4";
  const rotation = useState(new Animated.Value(0))[0];
  const [buttonOpacity] = useState(new Animated.Value(0));
  const isFocused = useIsFocused();
  const [workoutTip, setWorkoutTip] = useState('');
  const [quoteIndex, setQuoteIndex] = useState(0);
  const translateY = useState(new Animated.Value(0))[0];
  const [buttonsAnimated, setButtonsAnimated] = useState(false);
  const fadeAnimText = useState(new Animated.Value(0))[0];
  const [firstRender, setFirstRender] = useState(true);
  const [buttonFadeAnimations] = useState(
  Array.from({ length: 7 }, () => new Animated.Value(0))
);












   const fadeIn = (delay = 0) => {
  // Reset the animated values
  fadeAnim.setValue(0);

  Animated.timing(fadeAnim, {
    toValue: 1,
    duration: 200,
    delay: delay,
    useNativeDriver: true,
  }).start();
};


    const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    fadeIn();
  }, []);


useEffect(() => {
  if (isFocused) {
    setButtonsAnimated(true);
    fadeButtonIn();
  }
}, [isFocused]);





    const fadeInBox = () => {
  fadeAnim.setValue(0);

  Animated.timing(fadeAnim, {
    toValue: 1,
    duration: 200,
    useNativeDriver: true,
  }).start();
};

    const fadeInText = () => {
      fadeAnimText.setValue(0);

      Animated.timing(fadeAnimText, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    };


    const fadeButtonIn = () => {
  buttonFadeAnimations.forEach((animation, index) => {
    // Reset the initial value of the button's opacity to 0
    animation.setValue(0);

    Animated.timing(animation, {
      toValue: 1,
      duration: 1500,
      delay: 200 * index,
      useNativeDriver: true,
    }).start();
  });
};








  const startRotation = () => {
    Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }; // Add a comma here


  useEffect(() => {
    startRotation();
  }, []);

  useEffect(() => {
  if (isFocused) {
    fadeIn(3000); // Add a 3-second delay for every render when the screen is focused
  }
}, [isFocused]);





  const rotationDeg = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });





  const scheduleNotification = async () => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Workout Reminder',
      body: 'Time for your daily workout!',
    },
    trigger: {
      seconds: 60 * 60 * 24, // Schedule a notification 24 hours from now
      repeats: true,
    },
  });
};


useFocusEffect(
  React.useCallback(() => {
    const fetchWorkoutSettings = async () => {
      const savedWorkoutDays = await AsyncStorage.getItem('workoutDays');
      const savedFitnessGoal = await AsyncStorage.getItem('fitnessGoal');

      if (savedWorkoutDays) {
        setDaysPerWeek(parseInt(savedWorkoutDays, 10));
      }

      if (savedFitnessGoal) {
        setFitnessGoal(savedFitnessGoal);
      }

      // Call the scheduleNotification function here
      await scheduleNotification();
    };

    fetchWorkoutSettings();

    fadeIn(); // Move this line here to run the animation every time the screen is focused

    // Reset rotation value and start the rotation animation
    rotation.setValue(0);
    startRotation();
    fadeButtonIn();
  }, [])
);




  const handleWeekChange = (change) => {
  const newWeek = week + change;
  if (newWeek >= 1 && newWeek <= 4) {
    setWeek(newWeek);
  } else if (newWeek > 4) {
    setWeek(1);
  } else if (newWeek < 1) {
    setWeek(4);
  }
};

  const handleDayPress = (day) => {
    navigation.navigate('WorkoutDay', { week, day, days: daysPerWeek });
  };

  const searchYouTube = async () => {
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${encodeURIComponent(
    searchInput
  )}&key=${YOUTUBE_API_KEY}&maxResults=10`;

  try {
    const response = await axios.get(url);
    setSearchResults(
      response.data.items.slice(0, 3).map((item) => ({
        id: item.id.videoId,
        thumbnail: item.snippet.thumbnails.default.url,
        title: item.snippet.title,
        channelTitle: item.snippet.channelTitle,
      }))
    );
  } catch (error) {
    console.error(error);
  }
};


  const renderItem = ({ item, index }) => {
  return (
    <TouchableOpacity
      style={styles.resultCard}
      onPress={() => {
        Linking.openURL(`https://www.youtube.com/watch?v=${item.id}`);
      }}
    >
      <ImageBackground
        style={styles.resultImage}
        source={{ uri: item.thumbnail }}
        imageStyle={{ borderRadius: 5 }}
      >
        <View
          style={[
            styles.resultTextContainer,
            { backgroundColor: 'rgba(0, 0, 0, 0.6)', borderRadius: 5 },
          ]}
        >
          <Text style={styles.resultTitle}>{item.title}</Text>
          <Text style={styles.resultChannel}>{item.channelTitle}</Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};


  useEffect(() => {
    if (searchInput.length > 0) {
      searchYouTube();
    } else {
      setSearchResults([]);
    }
  }, [searchInput]);


  const translateYAnim = translateY.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -30],
  });



    const generateWorkoutTip = () => {
  // Fade out both the colored box and the text simultaneously
  Animated.parallel([
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500,
      easing: Easing.out(Easing.cubic), // Add easing function
      useNativeDriver: true,
    }),
    Animated.timing(fadeAnimText, {
      toValue: 0,
      duration: 500,
      easing: Easing.out(Easing.cubic), // Add easing function
      useNativeDriver: true,
    }),
  ]).start(() => {
      const tips = [
        'Remember to stretch before and after your workout.',
        'Stay hydrated during your workout.',
        'Aim for a balanced diet with a good mix of carbs, protein, and fats.',
        'Consistency is key for long-term success.',
        'Set realistic goals and track your progress.',
        // Add more tips and quotes here
      ];

      const newIndex = (quoteIndex + 1) % tips.length;
      setQuoteIndex(newIndex);
      setWorkoutTip(tips[newIndex]);

      translateY.setValue(0);
      Animated.timing(translateY, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();

      // Fade in both the colored box and the text simultaneously
      Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        easing: Easing.out(Easing.cubic), // Add easing function
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnimText, {
        toValue: 1,
        duration: 500,
        easing: Easing.out(Easing.cubic), // Add easing function
        useNativeDriver: true,
      }),
    ]).start();
  });
};



  useEffect(() => {
    generateWorkoutTip();
  }, []);

  useEffect(() => {
  const interval = setInterval(() => {
    generateWorkoutTip();
    fadeIn(); // Fade in the new tip
  }, 10000); // Change quotes every 10 seconds

  return () => clearInterval(interval);
}, [quoteIndex]);





 return (
  <SafeAreaView style={styles.container}>
    <View style={styles.header}>
      <TextInput
        style={styles.searchInput}
        onChangeText={setSearchInput}
        value={searchInput}
        placeholder="Search for exercises on YouTube"
        placeholderTextColor="#FFFFFF"
      />
    </View>
    {searchInput.length > 0 ? (
      <FlatList
        data={searchResults}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.resultsContainer}
      />
    ) : (
      <View style={styles.background}>
        <View style={styles.centered}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => handleWeekChange(-1)}>
              <Text style={styles.buttonText}>{'<'}</Text>
            </TouchableOpacity>
            <Text style={styles.headerText}>
              Week {week} - {daysPerWeek} Days
            </Text>
            <TouchableOpacity onPress={() => handleWeekChange(1)}>
              <Text style={styles.buttonText}>{'>'}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.daysContainer}>
            {Array.from({ length: daysPerWeek }, (_, i) => (
              <TouchableOpacity key={i} onPress={() => handleDayPress(i + 1)}>
                <Animated.View
                  style={[
                    styles.dayButton,
                    {
                      opacity: buttonFadeAnimations[i], // Use the corresponding button fade animation
                    },
                  ]}
                >
                  <Ionicons name="md-calendar" size={24} color="#FFFFFF" />
                  <Text style={styles.dayText}>Day {i + 1}</Text>
                </Animated.View>
              </TouchableOpacity>
            ))}
          </View>
          <WorkoutDaysSelector daysPerWeek={daysPerWeek} />
          <Animated.View
            style={[
              styles.workoutTipContainer,
              {
                opacity: fadeAnim, // Use fadeAnim for the blue box's opacity
              },
            ]}
          >
            <Animated.Text
              style={[
                styles.workoutTipText,
                {
                  opacity: fadeAnimText, // Use fadeAnimText for the text's opacity
                },
              ]}
            >
              {workoutTip}
            </Animated.Text>
          </Animated.View>
        </View>
      </View>
    )}
  </SafeAreaView>
);
};

const styles = StyleSheet.create({
  container: {
  flex: 1,
  backgroundColor: '#1A1A1D',
  },
   background: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  centered: {
  alignItems: 'center',
  justifyContent: 'center',
  },
  searchInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 16,
    color: '#FFFFFF',
    height: 50,
  },
  resultsContainer: {
    paddingBottom: 20,
  },
  header: {
    backgroundColor: '#1A1A1D',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
  buttonText: {
    fontSize: 24,
    color: '#FFFFFF',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  daysContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  dayButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0E7C7B',
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 10,
    width: '90%',
    minHeight: 80,
  },
  dayText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  workoutTipContainer: {
    backgroundColor: '#0E7C7B',
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginTop: 10,
    marginBottom: 20,
    opacity: 0,
  },
  workoutTipText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    fontStyle: 'italic',
    textAlign: 'center',
    opacity: 0,
  },
  headerBackground: {
    width: '100%',
    height: 150,
    paddingTop: 20,
    paddingBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0E7C7B',
  },
  headerImageStyle: {
    resizeMode: 'contain',
    position: 'absolute',
  },
  appTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    zIndex: 1,
    marginBottom: 10,
  },
  resultImage: {
  width: '100%',
  height: 150,
  justifyContent: 'flex-end',
  borderRadius: 5,
  resizeMode: 'cover',
},

  resultTextContainer: {
    padding: 5,
  },
  resultTitle: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  resultChannel: {
    color: '#FFFFFF',
  },


  });




export default WorkoutScreen;
