/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
      id
      profile {
        id
        name
        age
        weight
        height
        gender
        fitnessGoal
        workoutDays
        updatedAt
        avatar
        user {
          id
          profileId
          lastUpdated
          createdAt
          updatedAt
          owner
        }
        createdAt
        owner
      }
      profileId
      lastUpdated
      exerciseLogs {
        items {
          id
          exerciseName
          date
          reps
          weights
          userId
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
      id
      profile {
        id
        name
        age
        weight
        height
        gender
        fitnessGoal
        workoutDays
        updatedAt
        avatar
        user {
          id
          profileId
          lastUpdated
          createdAt
          updatedAt
          owner
        }
        createdAt
        owner
      }
      profileId
      lastUpdated
      exerciseLogs {
        items {
          id
          exerciseName
          date
          reps
          weights
          userId
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
      id
      profile {
        id
        name
        age
        weight
        height
        gender
        fitnessGoal
        workoutDays
        updatedAt
        avatar
        user {
          id
          profileId
          lastUpdated
          createdAt
          updatedAt
          owner
        }
        createdAt
        owner
      }
      profileId
      lastUpdated
      exerciseLogs {
        items {
          id
          exerciseName
          date
          reps
          weights
          userId
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const createUserProfile = /* GraphQL */ `
  mutation CreateUserProfile(
    $input: CreateUserProfileInput!
    $condition: ModelUserProfileConditionInput
  ) {
    createUserProfile(input: $input, condition: $condition) {
      id
      name
      age
      weight
      height
      gender
      fitnessGoal
      workoutDays
      updatedAt
      avatar
      user {
        id
        profile {
          id
          name
          age
          weight
          height
          gender
          fitnessGoal
          workoutDays
          updatedAt
          avatar
          createdAt
          owner
        }
        profileId
        lastUpdated
        exerciseLogs {
          nextToken
        }
        createdAt
        updatedAt
        owner
      }
      createdAt
      owner
    }
  }
`;
export const updateUserProfile = /* GraphQL */ `
  mutation UpdateUserProfile(
    $input: UpdateUserProfileInput!
    $condition: ModelUserProfileConditionInput
  ) {
    updateUserProfile(input: $input, condition: $condition) {
      id
      name
      age
      weight
      height
      gender
      fitnessGoal
      workoutDays
      updatedAt
      avatar
      user {
        id
        profile {
          id
          name
          age
          weight
          height
          gender
          fitnessGoal
          workoutDays
          updatedAt
          avatar
          createdAt
          owner
        }
        profileId
        lastUpdated
        exerciseLogs {
          nextToken
        }
        createdAt
        updatedAt
        owner
      }
      createdAt
      owner
    }
  }
`;
export const deleteUserProfile = /* GraphQL */ `
  mutation DeleteUserProfile(
    $input: DeleteUserProfileInput!
    $condition: ModelUserProfileConditionInput
  ) {
    deleteUserProfile(input: $input, condition: $condition) {
      id
      name
      age
      weight
      height
      gender
      fitnessGoal
      workoutDays
      updatedAt
      avatar
      user {
        id
        profile {
          id
          name
          age
          weight
          height
          gender
          fitnessGoal
          workoutDays
          updatedAt
          avatar
          createdAt
          owner
        }
        profileId
        lastUpdated
        exerciseLogs {
          nextToken
        }
        createdAt
        updatedAt
        owner
      }
      createdAt
      owner
    }
  }
`;
export const createExerciseLog = /* GraphQL */ `
  mutation CreateExerciseLog(
    $input: CreateExerciseLogInput!
    $condition: ModelExerciseLogConditionInput
  ) {
    createExerciseLog(input: $input, condition: $condition) {
      id
      exerciseName
      date
      reps
      weights
      user {
        id
        profile {
          id
          name
          age
          weight
          height
          gender
          fitnessGoal
          workoutDays
          updatedAt
          avatar
          createdAt
          owner
        }
        profileId
        lastUpdated
        exerciseLogs {
          nextToken
        }
        createdAt
        updatedAt
        owner
      }
      userId
      createdAt
      updatedAt
      owner
    }
  }
`;
export const updateExerciseLog = /* GraphQL */ `
  mutation UpdateExerciseLog(
    $input: UpdateExerciseLogInput!
    $condition: ModelExerciseLogConditionInput
  ) {
    updateExerciseLog(input: $input, condition: $condition) {
      id
      exerciseName
      date
      reps
      weights
      user {
        id
        profile {
          id
          name
          age
          weight
          height
          gender
          fitnessGoal
          workoutDays
          updatedAt
          avatar
          createdAt
          owner
        }
        profileId
        lastUpdated
        exerciseLogs {
          nextToken
        }
        createdAt
        updatedAt
        owner
      }
      userId
      createdAt
      updatedAt
      owner
    }
  }
`;
export const deleteExerciseLog = /* GraphQL */ `
  mutation DeleteExerciseLog(
    $input: DeleteExerciseLogInput!
    $condition: ModelExerciseLogConditionInput
  ) {
    deleteExerciseLog(input: $input, condition: $condition) {
      id
      exerciseName
      date
      reps
      weights
      user {
        id
        profile {
          id
          name
          age
          weight
          height
          gender
          fitnessGoal
          workoutDays
          updatedAt
          avatar
          createdAt
          owner
        }
        profileId
        lastUpdated
        exerciseLogs {
          nextToken
        }
        createdAt
        updatedAt
        owner
      }
      userId
      createdAt
      updatedAt
      owner
    }
  }
`;
