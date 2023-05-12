import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TextInput,  TouchableOpacity, Linking, Alert, SafeAreaView } from 'react-native';
import { API, graphqlOperation } from 'aws-amplify';
import { Auth } from 'aws-amplify';
import { createExerciseLog } from '../graphql/mutations';
import {getLatestExerciseLog, listExerciseLogs} from '../graphql/queries';
import { LinearGradient } from 'expo-linear-gradient';
import { rapidApiKey } from './WorkoutDay'
import axios from "axios";
import Icon from 'react-native-vector-icons/FontAwesome';



const ExerciseCardWrapper = ({ exercise, workoutSessionId, navigation }) => {
  const [isLogging, setIsLogging] = useState(false);
  const [lastSetInput, setLastSetInput] = useState('');
  const [lastWeightInput, setLastWeightInput] = useState('');
  const [isSwapping, setIsSwapping] = useState(false);
  const [swapExercises, setSwapExercises] = useState([]);


  const toggleLogging = () => {
    setIsLogging(!isLogging);
    if (!isLogging) {
      fetchLatestLoggedExerciseData(exercise.name);
    }
  };

  useEffect(() => {
    if (isLogging) {
      fetchLatestLoggedExerciseData(exercise.name)
    }
  }, [isLogging]);

  const fetchLatestLoggedExerciseData = async (exercise) => {
  try {
    const currentUser = await Auth.currentAuthenticatedUser();
    const userId = currentUser.attributes.sub;
    const exerciseName = exercise.name;

    const exerciseLogsData = await API.graphql(
      graphqlOperation(listExerciseLogs, {
        filter: { userId: { eq: userId } },
      }),
    );

    if (exerciseLogsData.data.getLatestExerciseLog) {
      const latestLog = exerciseLogsData.data.getLatestExerciseLog;
      setLastSetInput(latestLog.reps[latestLog.reps.length - 1]);
      setLastWeightInput(latestLog.weights[latestLog.weights.length - 1]);
    }
  } catch (error) {
    console.error('Error fetching latest logged exercise data:', error);
  }
};



  return (
  <>
    {isLogging ? (
      <LoggedExerciseCard
        exercise={exercise}
        onStopLogging={toggleLogging}
        workoutSessionId={workoutSessionId}
        lastSetInput={lastSetInput}
        lastWeightInput={lastWeightInput}
        setLastSetInput={setLastSetInput}
        setLastWeightInput={setLastWeightInput}
      />
    ) : (
      <ExerciseCard
        exercise={exercise}
        onStartLogging={toggleLogging}
        navigation={navigation}
        videoId={exercise.videoId}
        isSwapping={isSwapping}
        swapExercises={swapExercises}
        handleSelectExercise={handleSelectExercise}
      />
    )}
  </>
);
};

  const fetchRandomExercises = async (target) => {
    try {
      const options = {
        method: 'GET',
        url: `https://exercisedb.p.rapidapi.com/exercises/target/${target}`,
        headers: {
          'X-RapidAPI-Key': rapidApiKey,
          'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
        },
      };

      const response = await axios.request(options);
      const exercises = response.data;
      const shuffledExercises = exercises.sort(() => Math.random() - 0.5);
      const randomExercises = shuffledExercises.slice(0, 4);
      setSwapExercises(randomExercises);
    } catch (error) {
      console.error('Error fetching random exercises:', error);
    }
  };

  const handleSwapExercise = () => {
  Alert.alert(
    'Feature not available',
    'This feature will be available in version 2.',
    [
      {
        text: 'OK',
        onPress: () => console.log('OK Pressed'),
      },
    ],
    { cancelable: false },
  );
};


  const handleSelectExercise = (newExercise) => {
    swapExercise(exercise, newExercise);
    setIsSwapping(false);
  };

const ExerciseCard = ({
  exercise,
  onStartLogging,
  navigation,
  swapExercise,
  isSwapping,
  swapExercises,
  handleSelectExercise,
}) => {
  const openYoutubeVideo = () => {
    if (exercise.videoId) {
      Linking.openURL(`https://www.youtube.com/watch?v=${exercise.videoId}`);
    }
  };

  const handleSwapExercise = () => {
    Alert.alert(
      'Sorry!',
      'This is a Premium feature that will be added at a later date!',
      [
        {
          text: 'OK',
          onPress: () => console.log('OK Pressed'),
        },
      ],
      { cancelable: false },
    );
  };





    return (
    <TouchableOpacity activeOpacity={1} onPress={openYoutubeVideo}>
      <LinearGradient
        colors={['#1A1A1D', '#1A1A1D']}
        start={[0, 0]}
        end={[1, 0]}
        style={styles.card}
      >
        <Image style={styles.gif} source={{ uri: exercise.gifUrl }} />
        <View style={styles.cardContent}>
          <Text style={styles.name}>{exercise.name}</Text>
          <Text style={styles.info}>
            Equipment: {exercise.equipment}{'\n'}
            Target: {exercise.target}{'\n'}
            Body Part: {exercise.bodyPart}{'\n'}
            Sets: {exercise.sets}{'\n'}
            Reps: {exercise.reps.join('/')}
          </Text>
          <TouchableOpacity onPress={onStartLogging} style={styles.logButton} activeOpacity={0.8}>
            <Icon name="edit" size={20} color="#FFFFFF" style={styles.buttonIcon} />
            <Text style={styles.logButtonText}>Start Logging</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSwapExercise} style={styles.swapButton} activeOpacity={0.8}>
            <Icon name="exchange" size={20} color="#FFFFFF" style={styles.buttonIcon} />
            <Text style={styles.swapButtonText}>Swap Exercise</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};






const LoggedExerciseCard = ({
  exercise,
  onStopLogging,
  lastSetInput,
  lastWeightInput,
  setLastSetInput,
  setLastWeightInput,
  videoId,
}) => {
  const [sets, setSets] = useState(Array(exercise.sets).fill(''));
  const [weights, setWeights] = useState(Array(exercise.sets).fill(''));


  const updateSets = (index, value) => {
    const newSets = [...sets];
    newSets[index] = value;
    setSets(newSets);
    setLastSetInput(value);
  };

  const updateWeights = (index, value) => {
    const newWeights = [...weights];
    newWeights[index] = value;
    setWeights(newWeights);
    setLastWeightInput(value);
  };



  const saveLoggedExercise = async () => {
    try {
      const setsData = sets.map((set, index) => parseInt(set, 10));
      const weightsData = weights.map((weight) => parseFloat(weight));

      const currentUser = await Auth.currentAuthenticatedUser();
      const userId = currentUser.attributes.sub;

      const exerciseData = {
        exerciseName: exercise.name,
        date: new Date().toISOString(),
        reps: setsData,
        weights: weightsData,
        userId: userId,
      };

      console.log('exerciseData:', exerciseData);

      await API.graphql(graphqlOperation(createExerciseLog, { input: exerciseData }));
    } catch (error) {
      console.error('Error saving logged exercise:', error);
    }
  };









  return (
    <SafeAreaView style={styles.loggedExerciseCardContainer}>
      <Text style={styles.loggedExerciseName}>{exercise.name}</Text>
      {exercise.videoId && (
        <TouchableOpacity onPress={openYoutubeVideo} style={styles.videoLink}>
          <Text style={styles.videoLinkText}>Watch on YouTube</Text>
        </TouchableOpacity>
      )}
      {sets.map((_, index) => (
          <View key={`${exercise.name}-${index}`} style={styles.inputRow}>
          <Text style={[styles.setInputLabel, { color: '#FFFFFF' }]}>Set {index + 1}</Text>
          <TextInput
            style={styles.setInput}
            keyboardType="numeric"
            onChangeText={(value) => updateSets(index, value)}
            value={sets[index]}
            placeholder={lastSetInput || "Reps"}
          />
          <TextInput
            style={styles.setInput}
            keyboardType="numeric"
            onChangeText={(value) => updateWeights(index, value)}
            value={weights[index]}
            placeholder={lastWeightInput || "Weight"}
          />
        </View>
      ))}
      <TouchableOpacity
        onPress={async () => {
          await saveLoggedExercise();
          onStopLogging();
        }}
        style={styles.stopLoggingButton}
      >
        <Text style={styles.logButtonText}>Stop Logging</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    card: {
    borderRadius: 10,
    marginBottom: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5, // Add this line for Android devices
  },
  cardContent: {
    backgroundColor: '#1A1A1D',
    borderRadius: 10,
    padding: 20,
    marginTop: -25,
    width: '100%',
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  info: {
    fontSize: 14,
    color: '#FFFFFF',
  },
  gif: {
    width: '100%',
    height: 250, // Change height to make the urlGIFs look larger
    resizeMode: 'cover',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  logButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0E7C7B',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 15,
  },
  logButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 5,
  },
  videoLink: {
    backgroundColor: '#FF0000',
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 20,
    marginTop: 10,
  },
  videoLinkText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
   youtubeExplanationButton: {
    backgroundColor: '#FF0000',
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 20,
    marginTop: 10,
  },
  youtubeExplanationButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
  swapButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0E7C7B',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 10,
  },
swapButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 5,
  },
 setInput: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
    width: 80,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#222222',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginBottom: 10,
  },
  setInputLabel: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
    marginRight: 10,
  },
  stopLoggingButton: {
    backgroundColor: '#0E7C7B',
    borderRadius: 5,
    paddingVertical: 12,
    paddingHorizontal: 30,
    marginTop: 10,
    alignSelf: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: '500',
    marginBottom: 20,
    color: '#FFFFFF',
    paddingTop: 20,
  },
  loggedExerciseCardContainer: {
    backgroundColor: '#1A1A1D',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 40,
  },
  loggedExerciseName: {
    fontSize: 24,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 20,
  },

});

export default ExerciseCardWrapper;

