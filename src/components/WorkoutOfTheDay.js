import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  FlatList,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import Loading from '../components/Loading';
import { useFocusEffect } from '@react-navigation/native';





const challenges = [
  {
    id: '1',
    title: 'Full Body Strength',
    image: require('../../assets/Dashboard_photo_1.jpeg'),
    description: 'A balanced full-body workout to improve your overall strength.',
    duration: 45, // in minutes
    completed: false,
  },
  {
    id: '2',
    title: 'Core Stability',
    image: require('../../assets/core_stability_photo.jpg'),
    description: 'Focus on strengthening your core and improving stability.',
    duration: 30, // in minutes
    completed: false,
  },
  {
    id: '3',
    title: 'Cardio Blast',
    image: require('../../assets/cardio_2_photo.jpg'),
    description: 'A high-intensity cardio workout to get your heart pumping.',
    duration: 25, // in minutes
    completed: false,
  },
  {
    id: '4',
    title: 'Upper Body Power',
    image: require('../../assets/upper_body_power_photo.jpg'),
    description: 'Build strength and power in your upper body with this workout.',
    duration: 35, // in minutes
    completed: false,
  },
  {
    id: '5',
    title: 'Lower Body Burn',
    image: require('../../assets/lower_body_burn_photo.jpg'),
    description: 'Feel the burn in your lower body with this challenging workout.',
    duration: 40, // in minutes
    completed: false,
  },
  {
    id: '6',
    title: 'Stretch & Relax',
    image: require('../../assets/stretch_relax_photo.jpg'),
    description: 'Stretch and relax your muscles with this calming workout.',
    duration: 20, // in minutes
    completed: false,
  },
  // More challenges here...
];



const ChallengeCard = ({ item, onCompletionToggle, animation }) => {
  const completionIcon = item.completed
    ? 'checkmark-circle'
    : 'checkmark-circle-outline';

  return (
    <View style={styles.card}>
      <Image style={styles.workoutImage} source={item.image} />
      <View style={styles.textContainer}>
        <Text style={styles.workoutTitle}>{item.title}</Text>
        <Text style={styles.workoutDescription}>{item.description}</Text>
        <Text style={styles.workoutDuration}>Duration: {item.duration} minutes</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.startWorkoutButton}
            onPress={() => console.log('Start workout')}
          >
            <LinearGradient
              colors={['#0E7C7B', '#00A896']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.gradientBackground}
            >
              <Text style={styles.startWorkoutText}>Start Workout</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.completionButton}
            onPress={() => onCompletionToggle(item.id)}
          >
            <Icon name={completionIcon} size={30} color="#00A896" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const WorkoutOfTheDay = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [challengeList, setChallengeList] = useState([]);
  const fadeInAnim = useRef(new Animated.Value(0)).current;

  const animateItems = () => {
    fadeInAnim.setValue(0);
    Animated.timing(fadeInAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };


  useFocusEffect(
    React.useCallback(() => {
      fadeInAnim.setValue(0);
      Animated.timing(fadeInAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }, [fadeInAnim]),
  );

  useEffect(() => {
    fetchWorkouts().then((workouts) => {
      setChallengeList(workouts);
      setLoading(false);
      animateItems();
    });
  }, []);

const fetchWorkouts = async () => {
    // Add your actual data fetching logic here
    await new Promise((resolve) => setTimeout(resolve, 3000));
    return challenges;
  };


  const toggleCompletion = (id) => {
    setChallengeList((prevList) =>
      prevList.map((challenge) =>
        challenge.id === id
                    ? { ...challenge, completed: !challenge.completed }
          : challenge,
      ),
    );
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Text style={styles.title}>Workout of the Day</Text>
          <FlatList
            data={challengeList}
            renderItem={({ item }) => (
              <Animated.View
                style={{ opacity: fadeInAnim, transform: [{ scale: fadeInAnim }] }}
              >
                <ChallengeCard item={item} onCompletionToggle={toggleCompletion} />
              </Animated.View>
            )}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.challengeList}
          />
        </>
      )}
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1D',
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
    paddingTop: 40,
    textAlign: 'center',
  },
  challengeList: {
    paddingBottom: 10,
  },
  card: {
    flexDirection: 'row',
    borderRadius: 10,
    backgroundColor: '#252525',
    overflow: 'hidden',
    elevation: 5,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  workoutImage: {
    width: Dimensions.get('window').width * 0.3,
    height: Dimensions.get('window').width * 0.3,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  textContainer: {
    flex: 1,
    padding: 10,
  },
  workoutTitle: {
    fontSize: 18,
    color: '#FFFFFF',
    marginBottom: 5,
  },
  workoutDescription: {
    fontSize: 14,
    color: '#FFFFFF',
    marginBottom: 5,
  },
  workoutDuration: {
    fontSize: 14,
    color: '#FFFFFF',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  startWorkoutButton: {
    borderRadius: 5,
    overflow: 'hidden',
  },
  gradientBackground: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  startWorkoutText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  completionButton: {
    marginLeft: 10,
  },
});

export default WorkoutOfTheDay;

