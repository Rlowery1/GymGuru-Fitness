import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import ExerciseCardWrapper from './ExerciseCard';
import { API, graphqlOperation } from 'aws-amplify';
import { getUserProfile } from '../graphql/queries';
import { Auth } from 'aws-amplify';
import axios from 'axios';
import {getExercisesByEquipment, getExercisesByTarget, getExercisesByBodyPart} from "./exerciseAPI";
import { useFocusEffect } from '@react-navigation/native';








const fetchUserProfile = async () => {
  try {
    const currentUser = await Auth.currentAuthenticatedUser();
    const ownerId = currentUser.attributes.sub;

    const userProfileData = await API.graphql(
      graphqlOperation(getUserProfile, { id: ownerId }),
    );
    return userProfileData.data.getUserProfile;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};

const WorkoutDay = ({ route }) => {
  const { week, day, days: daysPerWeek, workoutSessionId } = route.params;
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const rapidApiKey = 'YOUR_RAPID_API_KEY';
  const [userProfile, setUserProfile] = useState(null);




  const LoadingScreen = () => {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#0E7C7B" />
      <Text style={styles.loadingText}>Loading...</Text>
    </View>
  );
};

  const swapExercise = async (exerciseId) => {
    try {
      setLoading(true);

      const currentExercise = exercises.find((exercise) => exercise.id === exerciseId);
      const target = currentExercise.target.replace(' ', '%20');
      const bodyPart = currentExercise.bodyPart;

      const targetExercises = await axios.get(`https://justin-WFnsXH_t6.p.rapidapi.com/exercises/target/${target}`, {
        headers: {
          'X-RapidAPI-Host': 'justin-WFnsXH_t6.p.rapidapi.com',
          'X-RapidAPI-Key': rapidApiKey
        }
      });

      const filteredExercises = targetExercises.data.filter((exercise) => {
        return (
          exercise.bodyPart === bodyPart &&
          (exercise.equipment === 'barbell' || exercise.equipment === 'dumbbell')
        );
      });

      const randomIndex = Math.floor(Math.random() * filteredExercises.length);
      const newExercise = filteredExercises[randomIndex];

      setExercises((prevExercises) => {
        return prevExercises.map((exercise) => {
          if (exercise.id === exerciseId) {
            return newExercise;
          }
          return exercise;
        });
      });
    } catch (error) {
      console.error('Error swapping exercise:', error);
    } finally {
      setLoading(false);
    }
  };

  const assignSetsAndReps = (exercises, sets, reps) => {
    return exercises.map((exercise) => {
      return { ...exercise, sets, reps };
    });
  };

    const getThreeDaySplitGain = async (day) => {
      let exercises;

      switch (day) {
        case 1:
          exercises = [
            ...(await getExercisesByEquipment('barbell', 4)),
            ...(await getExercisesByEquipment('dumbbell', 2)),
            ...(await getExercisesByEquipment('cable', 2)),
          ];
          exercises = assignSetsAndReps(exercises, 4, [12, 10, 8, 8]);
          break;
        case 2:
          exercises = [
            ...(await getExercisesByBodyPart('back', 3)),
            ...(await getExercisesByEquipment('dumbbell', 3)),
            ...(await getExercisesByTarget('lats', 2)),
          ];
          exercises = assignSetsAndReps(exercises, 4, [12, 10, 8, 8]);
          break;
        case 3:
          exercises = [
            ...(await getExercisesByEquipment('barbell', 3)),
            ...(await getExercisesByEquipment('dumbbell', 3)),
            ...(await getExercisesByTarget('abs', 2)),
          ];
          exercises = assignSetsAndReps(exercises, 4, [12, 10, 8, 8]);
          break;
      }

      return exercises;
    };

    const getThreeDaySplitCut = async (day) => {
      let exercises;
      switch (day) {
        case 1:
          exercises = [
            ...(await getExercisesByEquipment('cable', 4)),
            ...(await getExercisesByEquipment('dumbbell', 3)),
            ...(await getExercisesByEquipment('elliptical machine', 1)),
          ];
          exercises = assignSetsAndReps(exercises, 4, [15, 15, 12, 12]);
          break;
        case 2:
          exercises = [
            ...(await getExercisesByEquipment('dumbbell', 3)),
            ...(await getExercisesByEquipment('cable', 3)),
            ...(await getExercisesByEquipment('elliptical machine', 1)),
          ];
          exercises = assignSetsAndReps(exercises, 4, [15, 15, 12, 12]);
          break;
        case 3:
          exercises = [
            ...(await getExercisesByBodyPart('cardio', 5)),
            ...(await getExercisesByTarget('abs', 2)),
            ...(await getExercisesByEquipment('elliptical machine', 1)),
          ];
          exercises = assignSetsAndReps(exercises, 4, [15, 15, 12, 12]);
          break;
    }

        return exercises;
        };

    const getThreeDaySplitStrength = async (day) => {
      let exercises;

      switch (day) {
      case 1:
      exercises = [
      ...(await getExercisesByBodyPart('chest', 3)),
      ...(await getExercisesByBodyPart('shoulders', 2)),
      ...(await getExercisesByTarget('abs', 2)),
      ];
      exercises = assignSetsAndReps(exercises, 5, [5, 5, 5, 4]);
      break;
      case 2:
      exercises = [
      ...(await getExercisesByBodyPart('back', 3)),
      ...(await getExercisesByTarget('biceps', 2)),
      ...(await getExercisesByTarget('triceps', 2)),
      ];
      exercises = assignSetsAndReps(exercises, 5, [5, 5, 5, 4]);
      break;
      case 3:
      exercises = [
      ...(await getExercisesByEquipment('barbell', 3)),
      ...(await getExercisesByEquipment('dumbbell', 2)),
      ...(await getExercisesByEquipment('olympic barbell', 2)),
      ];
      exercises = assignSetsAndReps(exercises, 5, [5, 5, 5, 4]);
      break;
      }

      return exercises;
    };

    const getFourDaySplitGain = async (day) => {
    let exercises;

    switch (day) {
      case 1:
        exercises = [
          ...(await getExercisesByBodyPart('chest', 3)),
          ...(await getExercisesByTarget('triceps', 2)),
          ...(await getExercisesByTarget('abs', 2)),
        ];
        exercises = assignSetsAndReps(exercises, 4, [12, 10, 8, 8]);
        break;
      case 2:
        exercises = [
          ...(await getExercisesByBodyPart('back', 3)),
          ...(await getExercisesByTarget('biceps', 2)),
          ...(await getExercisesByTarget('forearms', 2)),
        ];
        exercises = assignSetsAndReps(exercises, 4, [12, 10, 8, 8]);
        break;
      case 3:
        exercises = [
          ...(await getExercisesByBodyPart('shoulders', 3)),
          ...(await getExercisesByTarget('traps', 2)),
          ...(await getExercisesByTarget('abs', 2)),
        ];
        exercises = assignSetsAndReps(exercises, 4, [12, 10, 8, 8]);
        break;
      case 4:
        exercises = [
          ...(await getExercisesByTarget('quads', 4)),
          ...(await getExercisesByTarget('calves', 2)),
          ...(await getExercisesByTarget('glutes', 2)),
        ];
        exercises = assignSetsAndReps(exercises, 4, [12, 10, 8, 8]);
        break;
    }

    return exercises;
    };

    const getFourDaySplitCut = async (day) => {
    let exercises;

    switch (day) {
      case 1:
        exercises = [
          ...(await getExercisesByBodyPart('chest', 3)),
          ...(await getExercisesByTarget('triceps', 2)),
          ...(await getExercisesByTarget('abs', 2)),
          ...(await getExercisesByEquipment('elliptical machine', 1)),
        ];
        exercises = assignSetsAndReps(exercises, 4, [15, 15, 12, 12]);
        break;
      case 2:
        exercises = [
          ...(await getExercisesByBodyPart('back', 3)),
          ...(await getExercisesByTarget('biceps', 2)),
          ...(await getExercisesByBodyPart('cardio', 2)),
        ];
        exercises = assignSetsAndReps(exercises, 4, [15, 15, 12, 12]);
        break;
      case 3:
        exercises = [
          ...(await getExercisesByBodyPart('shoulders', 3)),
          ...(await getExercisesByTarget('traps', 2)),
          ...(await getExercisesByBodyPart('cardio', 2)),
        ];
        exercises = assignSetsAndReps(exercises, 4, [15, 15, 12, 12]);
        break;
      case 4:
        exercises = [
          ...(await getExercisesByTarget('quads', 4)),
          ...(await getExercisesByTarget('calves', 2)),
          ...(await getExercisesByTarget('glutes', 2)),
        ];
        exercises = assignSetsAndReps(exercises, 4, [15, 15, 12, 12]);
        break;
    }

    return exercises;
    };

    const getFourDaySplitStrength = async (day) => {
          let exercises;

          switch (day) {
          case 1:
          exercises = [
          ...(await getExercisesByBodyPart('chest', 3)),
          ...(await getExercisesByTarget('triceps', 2)),
          ...(await getExercisesByTarget('abs', 2)),
          ];
          exercises = assignSetsAndReps(exercises, 5, [5, 5, 5, 4]);
          break;
          case 2:
          exercises = [
          ...(await getExercisesByBodyPart('back', 3)),
          ...(await getExercisesByTarget('biceps', 2)),
          ...(await getExercisesByTarget('forearms', 2)),
          ];
          exercises = assignSetsAndReps(exercises, 5, [5, 5, 5, 4]);
          break;
          case 3:
          exercises = [
          ...(await getExercisesByBodyPart('shoulders', 3)),
          ...(await getExercisesByTarget('traps', 2)),
          ...(await getExercisesByTarget('abs', 2)),
          ];
          exercises = assignSetsAndReps(exercises, 5, [5, 5, 5, 4]);
          break;
          case 4:
          exercises = [
          ...(await getExercisesByTarget('quads', 4)),
          ...(await getExercisesByTarget('calves', 2)),
          ...(await getExercisesByTarget('glutes', 2)),
          ];
          exercises = assignSetsAndReps(exercises, 5, [5, 5, 5, 4]);
          break;
          }

            return exercises;
          };

    const getFiveDaySplitGain = async (day) => {
    let exercises;

    switch (day) {
      case 1:
        exercises = [
          ...(await getExercisesByBodyPart('chest', 5)),
          ...(await getExercisesByTarget('triceps', 3)),
        ];
        exercises = assignSetsAndReps(exercises, 4, [12, 10, 8, 8]);
        break;
      case 2:
        exercises = [
          ...(await getExercisesByBodyPart('back', 5)),
          ...(await getExercisesByTarget('biceps', 3)),
        ];
        exercises = assignSetsAndReps(exercises, 4, [12, 10, 8, 8]);
        break;
      case 3:
        exercises = [
          ...(await getExercisesByBodyPart('shoulders', 5)),
          ...(await getExercisesByTarget('traps', 3)),
        ];
        exercises = assignSetsAndReps(exercises, 4, [12, 10, 8, 8]);
        break;
      case 4:
        exercises = [
          ...(await getExercisesByTarget('quads', 5)),
          ...(await getExercisesByTarget('calves', 3)),
        ];
        exercises = assignSetsAndReps(exercises, 4, [12, 10, 8, 8]);
        break;
      case 5:
        exercises = [
          ...(await getExercisesByTarget('abs', 4)),
          ...(await getExercisesByBodyPart('cardio', 4)),
        ];
        exercises = assignSetsAndReps(exercises, 4, [15, 15, 12, 12]);
        break;
    }

    return exercises;
    };

    const getFiveDaySplitCut = async (day) => {
    let exercises;

    switch (day) {
      case 1:
        exercises = [
          ...(await getExercisesByBodyPart('chest', 3)),
          ...(await getExercisesByTarget('triceps', 2)),
          ...(await getExercisesByTarget('abs', 2)),
          ...(await getExercisesByEquipment('elliptical machine', 1)),
        ];
        exercises = assignSetsAndReps(exercises, 4, [15, 15, 12, 12]);
        break;
      case 2:
        exercises = [
          ...(await getExercisesByBodyPart('back', 3)),
          ...(await getExercisesByTarget('biceps', 2)),
          ...(await getExercisesByTarget('abs', 2)),
          ...(await getExercisesByEquipment('elliptical machine', 1)),
        ];
        exercises = assignSetsAndReps(exercises, 4, [15, 15, 12, 12]);
        break;
      case 3:
        exercises = [
          ...(await getExercisesByBodyPart('shoulders', 3)),
          ...(await getExercisesByTarget('traps', 2)),
          ...(await getExercisesByTarget('abs', 2)),
          ...(await getExercisesByEquipment('elliptical machine', 1)),
        ];
        exercises = assignSetsAndReps(exercises, 4, [15, 15, 12, 12]);
        break;
      case 4:
        exercises = [
          ...(await getExercisesByTarget('quads', 3)),
          ...(await getExercisesByTarget('calves', 2)),
          ...(await getExercisesByTarget('abs', 2)),
        ];
        exercises = assignSetsAndReps(exercises, 4, [15, 15, 12, 12]);
        break;
      case 5:
    exercises = [
      ...(await getExercisesByBodyPart('cardio', 5)),
      ...(await getExercisesByTarget('abs', 3)),
    ];
    exercises = assignSetsAndReps(exercises, 4, [15, 15, 12, 12]);
    break;
    }
    return exercises;
    };
    const getFiveDaySplitStrength = async (day) => {
    let exercises;

          switch (day) {
          case 1:
          exercises = [
          ...(await getExercisesByBodyPart('chest', 4)),
          ...(await getExercisesByTarget('triceps', 2)),
          ];
          exercises = assignSetsAndReps(exercises, 5, [5, 5, 5, 5]);
          break;
          case 2:
          exercises = [
          ...(await getExercisesByBodyPart('back', 4)),
          ...(await getExercisesByTarget('biceps', 2)),
          ];
          exercises = assignSetsAndReps(exercises, 5, [5, 5, 5, 5]);
          break;
          case 3:
          exercises = [
          ...(await getExercisesByBodyPart('shoulders', 4)),
          ...(await getExercisesByTarget('traps', 2)),
          ];
          exercises = assignSetsAndReps(exercises, 5, [5, 5, 5, 5]);
          break;
          case 4:
          exercises = [
          ...(await getExercisesByTarget('quads', 4)),
          ...(await getExercisesByTarget('calves', 2)),
          ];
          exercises = assignSetsAndReps(exercises, 5, [5, 5, 5, 5]);
          break;
          case 5:
          exercises = [
          ...(await getExercisesByTarget('abs', 4)),
          ...(await getExercisesByBodyPart('back', 2)),
          ];
          exercises = assignSetsAndReps(exercises, 5, [5, 5, 5, 5]);
          break;
          }

          return exercises;
          };


    const getSixDaySplitGain = async (day) => {
    let exercises;

    switch (day) {
      case 1:
        exercises = [
          ...(await getExercisesByBodyPart('chest', 4)),
          ...(await getExercisesByTarget('triceps', 2)),
        ];
        exercises = assignSetsAndReps(exercises, 4, [12, 10, 8, 8]);
        break;
      case 2:
        exercises = [
          ...(await getExercisesByBodyPart('back', 4)),
          ...(await getExercisesByTarget('biceps', 2)),
        ];
        exercises = assignSetsAndReps(exercises, 4, [12, 10, 8, 8]);
        break;
      case 3:
        exercises = [
          ...(await getExercisesByTarget('quads', 4)),
          ...(await getExercisesByTarget('calves', 2)),
        ];
        exercises = assignSetsAndReps(exercises, 4, [12, 10, 8, 8]);
        break;
      case 4:
        exercises = [
          ...(await getExercisesByBodyPart('shoulders', 4)),
          ...(await getExercisesByTarget('traps', 2)),
        ];
        exercises = assignSetsAndReps(exercises, 4, [12, 10, 8, 8]);
        break;
      case 5:
        exercises = [
          ...(await getExercisesByBodyPart('chest', 2)),
          ...(await getExercisesByBodyPart('back', 2)),
          ...(await getExercisesByTarget('abs', 2)),
        ];
        exercises = assignSetsAndReps(exercises, 4, [12, 10, 8, 8]);
        break;
      case 6:
        exercises = [
          ...(await getExercisesByTarget('quads', 2)),
          ...(await getExercisesByBodyPart('shoulders', 2)),
          ...(await getExercisesByTarget('calves', 2)),
        ];
        exercises = assignSetsAndReps(exercises, 4, [12, 10, 8, 8]);
        break;
    }

    return exercises;
    };

    const getSixDaySplitCut = async (day) => {
    let exercises;

    switch (day) {
      case 1:
        exercises = [
          ...(await getExercisesByEquipment('cable', 3)),
          ...(await getExercisesByEquipment('dumbbell', 3)),
          ...(await getExercisesByEquipment('elliptical machine', 1)),
        ];
        exercises = assignSetsAndReps(exercises, 4, [15, 15, 12, 12]);
        break;
      case 2:
        exercises = [
          ...(await getExercisesByTarget('quads', 4)),
          ...(await getExercisesByTarget('calves', 2)),
          ...(await getExercisesByEquipment('elliptical machine', 1)),
        ];
        exercises = assignSetsAndReps(exercises, 4, [15, 15, 12, 12]);
        break;
      case 3:
        exercises = [
          ...(await getExercisesByBodyPart('back', 3)),
          ...(await getExercisesByTarget('biceps', 2)),
          ...(await getExercisesByEquipment('elliptical machine', 1)),
        ];
        exercises =assignSetsAndReps(exercises, 4, [15, 15, 12, 12]);
          break;
          case 4:
          exercises = [
          ...(await getExercisesByBodyPart('chest', 3)),
          ...(await getExercisesByTarget('triceps', 2)),
          ...(await getExercisesByEquipment('elliptical machine', 1)),
          ];
          exercises = assignSetsAndReps(exercises, 4, [15, 15, 12, 12]);
          break;
          case 5:
          exercises = [
          ...(await getExercisesByBodyPart('shoulders', 3)),
          ...(await getExercisesByTarget('traps', 1)),
          ...(await getExercisesByEquipment('elliptical machine', 1)),
          ];
          exercises = assignSetsAndReps(exercises, 4, [15, 15, 12, 12]);
          break;
          case 6:
          exercises = [
          ...(await getExercisesByTarget('quads', 4)),
          ...(await getExercisesByTarget('calves', 2)),
          ...(await getExercisesByEquipment('elliptical machine', 1)),
          ];
          exercises = assignSetsAndReps(exercises, 4, [15, 15, 12, 12]);
          break;
          }

          return exercises;
          };

    const getSixDaySplitStrength = async (day) => {
          let exercises;

          switch (day) {
          case 1:
          exercises = [
          ...(await getExercisesByBodyPart('chest', 3)),
          ...(await getExercisesByTarget('triceps', 2)),
          ];
          exercises = assignSetsAndReps(exercises, 5, [5, 5, 3, 3, 1]);
          break;
          case 2:
          exercises = [
          ...(await getExercisesByBodyPart('back', 3)),
          ...(await getExercisesByTarget('biceps', 2)),
          ];
          exercises = assignSetsAndReps(exercises, 5, [5, 5, 3, 3, 1]);
          break;
          case 3:
          exercises = [
          ...(await getExercisesByTarget('quads', 3)),
          ...(await getExercisesByTarget('calves', 2)),
          ];
          exercises = assignSetsAndReps(exercises, 5, [5, 5, 3, 3, 1]);
          break;
          case 4:
          exercises = [
          ...(await getExercisesByBodyPart('shoulders', 3)),
          ...(await getExercisesByTarget('traps', 2)),
          ];
          exercises = assignSetsAndReps(exercises, 5, [5, 5, 3, 3, 1]);
          break;
          case 5:
          exercises = [
          ...(await getExercisesByBodyPart('chest', 1)),
          ...(await getExercisesByBodyPart('back', 1)),
          ...(await getExercisesByTarget('abs', 3)),
          ];
          exercises = assignSetsAndReps(exercises, 5, [5, 5, 3, 3, 1]);
          break;
          case 6:
          exercises = [
          ...(await getExercisesByTarget('quads', 2)),
          ...(await getExercisesByBodyPart('shoulders', 1)),
          ...(await getExercisesByTarget('calves', 2)),
          ...(await getExercisesByTarget('abs', 1)),
                ];
            exercises = assignSetsAndReps(exercises, 5, [5, 5, 3, 3, 1]);
            break;
            }
            return exercises;
          };

    const getSevenDaySplitGain = async (day) => {
    let exercises;

    switch (day) {
      case 1:
        exercises = [
          ...(await getExercisesByBodyPart('chest', 3)),
          ...(await getExercisesByTarget('triceps', 3)),
          ...(await getExercisesByEquipment('dumbbell', 2)),
        ];
        exercises = assignSetsAndReps(exercises, 4, [12, 10, 8, 8]);
        break;
      case 2:
        exercises = [
          ...(await getExercisesByBodyPart('back', 3)),
          ...(await getExercisesByTarget('biceps', 3)),
          ...(await getExercisesByEquipment('cable', 2)),
        ];
        exercises = assignSetsAndReps(exercises, 4, [12, 10, 8, 8]);
        break;
      case 3:
        exercises = [
          ...(await getExercisesByTarget('quads', 4)),
          ...(await getExercisesByTarget('calves', 2)),
          ...(await getExercisesByEquipment('barbell', 2)),
        ];
        exercises = assignSetsAndReps(exercises, 4, [12, 10, 8, 8]);
        break;
      case 4:
        exercises = [
          ...(await getExercisesByBodyPart('shoulders', 3)),
          ...(await getExercisesByTarget('abs', 3)),
          ...(await getExercisesByEquipment('dumbbell', 2)),
        ];
        exercises = assignSetsAndReps(exercises, 4, [12, 10, 8, 8]);
        break;
      case 5:
      case 6:
      case 7:
        exercises = [
          ...(await getExercisesByBodyPart('cardio', 4)),
          ...(await getExercisesByTarget('quads', 2)),
          ...(await getExercisesByBodyPart('chest', 1)),
          ...(await getExercisesByBodyPart('back', 1)),
        ];
        exercises = assignSetsAndReps(exercises, 4, [15, 12, 12, 10]);
        break;
    }

    return exercises;
    };

    const getSevenDaySplitCut = async (day) => {
    let exercises;

    switch (day) {
      case 1:
        exercises = [
          ...(await getExercisesByBodyPart('chest', 3)),
          ...(await getExercisesByTarget('triceps', 3)),
          ...(await getExercisesByEquipment('dumbbell', 2)),
          ...(await getExercisesByEquipment('elliptical machine', 1)),
        ];
        exercises = assignSetsAndReps(exercises, 4, [15, 12, 12, 10]);
        break;
      case 2:
        exercises = [
          ...(await getExercisesByBodyPart('back', 3)),
          ...(await getExercisesByTarget('biceps', 3)),
          ...(await getExercisesByEquipment('cable', 2)),
          ...(await getExercisesByEquipment('elliptical machine', 1)),
        ];
        exercises = assignSetsAndReps(exercises, 4, [15, 12, 12, 10]);
        break;
      case 3:
        exercises = [
          ...(await getExercisesByBodyPart('upper%20legs', 2)),
          ...(await getExercisesByBodyPart('lower%20legs', 2)),
          ...(await getExercisesByTarget('calves', 2)),
          ...(await getExercisesByEquipment('barbell', 2)),
        ];
        exercises = assignSetsAndReps(exercises, 4, [15, 12, 12, 10]);
        break;
      case 4:
        exercises = [
          ...(await getExercisesByBodyPart('shoulders', 3)),
          ...(await getExercisesByTarget('abs', 3)),
          ...(await getExercisesByEquipment('dumbbell', 2)),
          ...(await getExercisesByEquipment('elliptical machine', 1)),
          ];
          exercises = assignSetsAndReps(exercises, 4, [15, 12, 12, 10]);
          break;
          case 5:
          case 6:
          case 7:
          exercises = [
          ...(await getExercisesByBodyPart('cardio', 4)),
          ...(await getExercisesByBodyPart('cardio', 2)),
          ];
          exercises = assignSetsAndReps(exercises, 4, [20, 15, 15, 12]);
          break;
          }

          return exercises;
          };

    const getSevenDaySplitStrength = async (day) => {
          let exercises;

          switch (day) {
          case 1:
          exercises = [
          ...(await getExercisesByBodyPart('chest', 3)),
          ...(await getExercisesByTarget('triceps', 3)),
          ...(await getExercisesByEquipment('dumbbell', 2)),
          ];
          exercises = assignSetsAndReps(exercises, 5, [5, 5, 5, 5, 5]);
          break;
          case 2:
          exercises = [
          ...(await getExercisesByBodyPart('back', 3)),
          ...(await getExercisesByTarget('biceps', 3)),
          ...(await getExercisesByEquipment('cable', 2)),
          ];
          exercises = assignSetsAndReps(exercises, 5, [5, 5, 5, 5, 5]);
          break;
          case 3:
          exercises = [
          ...(await getExercisesByBodyPart('upper%20legs', 2)),
          ...(await getExercisesByBodyPart('lower%20legs', 2)),
          ...(await getExercisesByTarget('calves', 2)),
          ...(await getExercisesByEquipment('barbell', 2)),
          ];
          exercises = assignSetsAndReps(exercises, 5, [5, 5, 5, 5, 5]);
          break;
          case 4:
          exercises = [
          ...(await getExercisesByBodyPart('shoulders', 3)),
          ...(await getExercisesByTarget('abs', 3)),
          ...(await getExercisesByEquipment('dumbbell', 2)),
          ];
          exercises = assignSetsAndReps(exercises, 5, [5, 5, 5, 5, 5]);
          break;
          case 5:
          case 6:
          case 7:
          exercises = [
          ...(await getExercisesByBodyPart('cardio', 4)),
          ...(await getExercisesByBodyPart('upper%20legs', 1)),
          ...(await getExercisesByBodyPart('lower%20legs', 1)),
          ...(await getExercisesByBodyPart('chest', 1)),
          ...(await getExercisesByBodyPart('back', 1)),
          ];
          exercises = assignSetsAndReps(exercises, 5, [8, 8, 8, 8, 8]);
          break;
          }

          return exercises;
          };

  const fetchExercises = async (day, workoutDays) => {
  try {
    const userProfile = await fetchUserProfile();
    const fitnessGoal = userProfile.fitnessGoal;

    let dayExercises;

    // Adjust exercises based on the fitness goal
    switch (fitnessGoal) {
      case 'Gain':
        switch (workoutDays) {
          case 3:
            dayExercises = await getThreeDaySplitGain(day);
            break;
          case 4:
            dayExercises = await getFourDaySplitGain(day);
            break;
          case 5:
            dayExercises = await getFiveDaySplitGain(day);
            break;
          case 6:
            dayExercises = await getSixDaySplitGain(day);
            break;
          case 7:
            dayExercises = await getSevenDaySplitGain(day);
            break;
        }
        break;
      case 'Cut':
        switch (workoutDays) {
          case 3:
            dayExercises = await getThreeDaySplitCut(day);
            break;
          case 4:
            dayExercises = await getFourDaySplitCut(day);
            break;
          case 5:
            dayExercises = await getFiveDaySplitCut(day);
            break;
          case 6:
            dayExercises = await getSixDaySplitCut(day);
            break;
          case 7:
            dayExercises = await getSevenDaySplitCut(day);
            break;
        }
        break;
      case 'Strength':
        switch (workoutDays) {
          case 3:
            dayExercises = await getThreeDaySplitStrength(day);
            break;
          case 4:
            dayExercises = await getFourDaySplitStrength(day);
            break;
          case 5:
            dayExercises = await getFiveDaySplitStrength(day);
            break;
          case 6:
            dayExercises = await getSixDaySplitStrength(day);
            break;
          case 7:
            dayExercises = await getSevenDaySplitStrength(day);
            break;
        }
        break;
    }

    setExercises(dayExercises);
    setLoading(false);
  } catch (error) {
    console.error('Error fetching exercises:', error);
  }
};




useFocusEffect(
    useCallback(() => {
      const fetchProfile = async () => {
        const profile = await fetchUserProfile();
        setUserProfile(profile);
      };
      fetchProfile();
    }, [])
  );

  useFocusEffect(
    useCallback(() => {
      const refetchExercises = async () => {
        if (userProfile) {
          await fetchExercises(day, userProfile.workoutDays);
        }
      };
      refetchExercises();
    }, [day, userProfile])
  );

const renderItem = ({ item }) => {
  return (
    <View>
      <ExerciseCardWrapper
        exercise={item}
        workoutSessionId={workoutSessionId}
        swapExercise={swapExercise}
      />
    </View>
  );
};

return (
  <View style={styles.container}>
    <Text style={styles.headerText}>
      Week {week} - Day {day}
    </Text>
    <FlatList
      data={exercises}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      contentContainerStyle={styles.contentContainer}
    />
    {loading && <LoadingScreen />}
  </View>
);
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 20,
      paddingTop: 20,
      backgroundColor: '#1A1A1D',
    },
    headerText: {
      fontSize: 24,
      fontWeight: '500',
      marginBottom: 20,
      color: '#FFFFFF',
      marginTop: 45,
    },
    contentContainer: {
      paddingBottom: 20,
    },
    loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(26, 26, 29, 0.8)',
  },
  loadingText: {
    marginTop: 10,
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '500',
  },
  });
export default WorkoutDay;
