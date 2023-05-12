/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser(
    $filter: ModelSubscriptionUserFilterInput
    $owner: String
  ) {
    onCreateUser(filter: $filter, owner: $owner) {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser(
    $filter: ModelSubscriptionUserFilterInput
    $owner: String
  ) {
    onUpdateUser(filter: $filter, owner: $owner) {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser(
    $filter: ModelSubscriptionUserFilterInput
    $owner: String
  ) {
    onDeleteUser(filter: $filter, owner: $owner) {
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
export const onCreateUserProfile = /* GraphQL */ `
  subscription OnCreateUserProfile(
    $filter: ModelSubscriptionUserProfileFilterInput
    $owner: String
  ) {
    onCreateUserProfile(filter: $filter, owner: $owner) {
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
export const onUpdateUserProfile = /* GraphQL */ `
  subscription OnUpdateUserProfile(
    $filter: ModelSubscriptionUserProfileFilterInput
    $owner: String
  ) {
    onUpdateUserProfile(filter: $filter, owner: $owner) {
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
export const onDeleteUserProfile = /* GraphQL */ `
  subscription OnDeleteUserProfile(
    $filter: ModelSubscriptionUserProfileFilterInput
    $owner: String
  ) {
    onDeleteUserProfile(filter: $filter, owner: $owner) {
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
export const onCreateExerciseLog = /* GraphQL */ `
  subscription OnCreateExerciseLog(
    $filter: ModelSubscriptionExerciseLogFilterInput
    $owner: String
  ) {
    onCreateExerciseLog(filter: $filter, owner: $owner) {
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
export const onUpdateExerciseLog = /* GraphQL */ `
  subscription OnUpdateExerciseLog(
    $filter: ModelSubscriptionExerciseLogFilterInput
    $owner: String
  ) {
    onUpdateExerciseLog(filter: $filter, owner: $owner) {
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
export const onDeleteExerciseLog = /* GraphQL */ `
  subscription OnDeleteExerciseLog(
    $filter: ModelSubscriptionExerciseLogFilterInput
    $owner: String
  ) {
    onDeleteExerciseLog(filter: $filter, owner: $owner) {
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
