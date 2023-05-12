const workouts = [
  {
    id: '1',
    week: 1,
    day: 1,
    exercise: 'Squats',
  },
  {
    id: '2',
    week: 1,
    day: 1,
    exercise: 'Bench Press',
  },
  {
    id: '3',
    week: 1,
    day: 1,
    exercise: 'Deadlift',
  },
  // Add more exercises and days as needed
];

export const getWorkout = (week, day) => {
  return workouts.filter((workout) => workout.week === week && workout.day === day);
};
