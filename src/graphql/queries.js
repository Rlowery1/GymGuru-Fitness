/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getLatestExerciseLog = /* GraphQL */ `
  query GetLatestExerciseLog($exerciseName: String!, $userId: ID!) {
    getLatestExerciseLog(exerciseName: $exerciseName, userId: $userId) {
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
export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
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
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $id: ID
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listUsers(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
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
      nextToken
    }
  }
`;
export const getUserProfile = /* GraphQL */ `
  query GetUserProfile($id: ID!) {
    getUserProfile(id: $id) {
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
export const listUserProfiles = /* GraphQL */ `
  query ListUserProfiles(
    $id: ID
    $filter: ModelUserProfileFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listUserProfiles(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
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
      nextToken
    }
  }
`;
export const getExerciseLog = /* GraphQL */ `
  query GetExerciseLog($id: ID!) {
    getExerciseLog(id: $id) {
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
export const listExerciseLogs = /* GraphQL */ `
  query ListExerciseLogs(
    $id: ID
    $filter: ModelExerciseLogFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listExerciseLogs(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        exerciseName
        date
        reps
        weights
        user {
          id
          profileId
          lastUpdated
          createdAt
          updatedAt
          owner
        }
        userId
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const exerciseLogsByUserIdAndDate = /* GraphQL */ `
  query ExerciseLogsByUserIdAndDate(
    $userId: ID!
    $date: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelExerciseLogFilterInput
    $limit: Int
    $nextToken: String
  ) {
    exerciseLogsByUserIdAndDate(
      userId: $userId
      date: $date
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        exerciseName
        date
        reps
        weights
        user {
          id
          profileId
          lastUpdated
          createdAt
          updatedAt
          owner
        }
        userId
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
