import React, { useState, useEffect, useRef } from 'react';
import { View, Text, ScrollView, StyleSheet, Animated } from 'react-native';
import { API, graphqlOperation, Auth } from 'aws-amplify';
import { listExerciseLogs } from '../graphql/queries';
import { Card, Title } from 'react-native-paper';
import moment from 'moment';
import * as Animatable from 'react-native-animatable';
import { PieChart } from 'react-native-chart-kit';
import axios from 'axios';
import { ProgressBar, Colors } from 'react-native-paper';
import Svg, { Circle } from 'react-native-svg';
import { ProgressCircle } from 'react-native-svg-charts';
import { Text as RNText } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useFocusEffect } from '@react-navigation/native';









const WorkoutStreak = ({ exerciseLogs }) => {
  if (exerciseLogs.length === 0) {
    return (
      <Card style={progressStyles.card}>
        <Card.Content style={progressStyles.workoutStreakContent}>
          <View>
            <Title style={progressStyles.cardTitle}>Current Workout Streak</Title>
            <Text style={[progressStyles.streakText, { color: 'white' }]}>{streak} days</Text>
          </View>
          <View>
            <CircularProgress
              progress={(streak % 30 === 0 ? 1 : streak % 30 / 30) * 100}
              hotStreak={hotStreak}
              textColor="#FFFFFF"
            />
            {hotStreak && (
              <Text style={[progressStyles.hotStreakText, { color: 'white' }]}>Hot Streak!</Text>
            )}
          </View>
        </Card.Content>
      </Card>
    );
}
    const sortedLogs = exerciseLogs.slice().sort((a, b) => new Date(b.date) - new Date(a.date));

  let streak = 0;
  let currentDay = moment(sortedLogs[0].date).startOf('day');
  let workoutDays = new Set();

  for (let i = 0; i < sortedLogs.length; i++) {
    const logDay = moment(sortedLogs[i].date).startOf('day');
    if (logDay.isSame(currentDay, 'day')) {
      workoutDays.add(logDay.format('YYYY-MM-DD'));
    } else {
      const daysDifference = currentDay.diff(logDay, 'days');
      if (daysDifference === 1) {
        workoutDays.add(logDay.format('YYYY-MM-DD'));
        currentDay = logDay;
      } else {
        break;
      }
    }
  }

  streak = workoutDays.size;

  const hotStreak = streak >= 30;

  return (
    <Card style={progressStyles.card}>
      <Card.Content style={progressStyles.workoutStreakContent}>
        <View style={{ flex: 1 }}>
          <Title style={[progressStyles.cardTitle, { textAlign: 'center' }]}>Current Workout Streak</Title>
          <Text style={[progressStyles.streakText, { color: 'white', textAlign: 'center', fontSize: 24 }]}>{streak} days</Text>
        </View>
        <View style={{ flex: 1, alignItems: 'center' }}>
          {/* Add a View with height as padding */}
          <View style={{ height: 30  }} />
          <CircularProgress
            progress={(streak % 30 === 0 ? 1 : streak % 30 / 30) * 100}
            hotStreak={hotStreak}
            textColor="#FFFFFF"
          />
          {hotStreak && (
            <Text style={[progressStyles.hotStreakText, { color: 'white', textAlign: 'center' }]}>Hot Streak!</Text>
          )}
        </View>
      </Card.Content>
    </Card>
  );
};

const QuoteOfTheDay = ({ quote }) => {
  if (!quote) return null;

  return (
    <Animatable.View
      style={progressStyles.quoteContainer}
      animation="fadeIn"
      duration={1000}
    >
      <MaterialCommunityIcons
        name="format-quote-open"
        size={24}
        color="#FFFFFF"
        style={progressStyles.quoteIcon}
      />
      <Text style={progressStyles.quoteText}>"{quote.text}"</Text>
      <Text style={progressStyles.quoteAuthor}>- {quote.author}</Text>
    </Animatable.View>
  );
};

const ExerciseTypeDistribution = () => {
  const data = [
    { name: 'Cardio', population: 50, color: '#F00', legendFontColor: 'white' },
    { name: 'Strength', population: 30, color: '#0F0', legendFontColor: 'white' },
    { name: 'Flexibility', population: 20, color: '#00F', legendFontColor: 'white' },
  ];

  const labels = data.map((item) => ({name: `${item.name}: ${item.population}%`, legendFontColor: 'white'}));

  return (
    <Card style={progressStyles.card}>
      <Card.Content>
        <Title style={[progressStyles.cardTitle, { color: 'white' }]}>Exercise Type Distribution</Title>
        <Animatable.View animation="fadeIn" duration={1000}>
          <PieChart
            data={data}
            width={350}
            height={220}
            chartConfig={{
              ...progressStyles.pieChartConfig,
              backgroundColor: '#22223B', 
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              propsForLabels: {
                fontFamily: 'System',
                fontSize: 12,
                fontWeight: 'bold',
                fill: 'white',
              },
              labelStyle: {
                color: 'white',
              },
            }}
            accessor="population"
            paddingLeft="15"
            absolute
            labels={labels}
          />
        </Animatable.View>
      </Card.Content>
    </Card>
  );
};


const HeartIcon = () => {
  return (
    <Animatable.View
      animation={{
        0: { scale: 1 },
        0.5: { scale: 1.1 },
        1: { scale: 1 },
      }}
      duration={1000}
      iterationCount="infinite"
    >
      <Icon name="favorite" size={60} color="#FF6B6B" />
    </Animatable.View>
  );
};



const CircularProgress = ({ progress, hotStreak, textColor }) => {
  const strokeWidth = 10;
  const radius = 50 - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;
  const dashoffset = circumference - (progress / 100) * circumference;

  return (
    <Svg width="100" height="100" viewBox="0 0 100 100" style={progressStyles.circularProgress}>
      <Circle
        cx="50"
        cy="50"
        r={radius}
        strokeWidth={strokeWidth}
        stroke="#333"
        fill="none"
      />
      <Circle
        cx="50"
        cy="50"
        r={radius}
        strokeWidth={strokeWidth}
        stroke={hotStreak ? "#FFD700" : "#F00"}
        fill="none"
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={dashoffset}
      />
      <RNText
        x="50"
        y="50"
        textAnchor="middle"
        dy="0.3em"
        fontWeight="bold"
        fontSize="16"
        fill="white"
        fontFamily="System"
      >
        {Math.round(progress)}%
      </RNText>
    </Svg>
  );
};







const WeeklyGoalProgress = ({ exerciseLogs }) => {
  const weeklyGoal = 5;
  const currentWeekLogs = exerciseLogs.filter((log) => {
    return moment(log.date).isSame(moment(), 'week');
  });

  const completed = progress >= 100;
  const progress = (currentWeekLogs.length / weeklyGoal) * 100;

   return (
    <Card style={progressStyles.card}>
      <Card.Content>
        <Title style={[progressStyles.cardTitle, {color: 'white'}]}>Weekly Goal Progress</Title>
        <ProgressBar
          progress={progress / 100}
          color={"#f44336"} 
          style={progressStyles.progressBar}
        />
        <Text style={[progressStyles.progressBarText, {color: 'white'}]}>
          {currentWeekLogs.length} / {weeklyGoal} workouts this week
        </Text>
      </Card.Content>
    </Card>
  );
};



const TotalRepsSetsProgress = ({ exerciseLogs }) => {
  const [progress] = useState(new Animated.Value(0));
  const currentWeekLogs = exerciseLogs.filter((log) => {
    return moment(log.date).isSame(moment(), 'week');
  });

  const totalRepsSets = currentWeekLogs.reduce(
    (acc, log) => acc + log.reps * log.sets,
    0
  );

  useEffect(() => {
    Animated.timing(progress, {
      toValue: totalRepsSets,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, [totalRepsSets]);

  const width = progress.interpolate({
    inputRange: [0, 500],
    outputRange: ["0%", "100%"],
    extrapolate: "clamp",
  });

  return (
    <Card style={progressStyles.card}>
      <Card.Content>
        <Title style={[progressStyles.cardTitle, { color: "white" }]}>
          Total Reps and Sets Progress
        </Title>
        <View style={progressStyles.totalRepsSetsBar}>
          <Animated.View
            style={[
              progressStyles.totalRepsSetsProgress,
              {
                width,
              },
            ]}
          />
        </View>
        <Text style={[progressStyles.progressBarText, { color: "white" }]}>
          {totalRepsSets} reps and sets this week
        </Text>
      </Card.Content>
    </Card>
  );
};








const HeartRateProgress = () => {
  const dummyProgress = 60; 

  return (
  <Card style={progressStyles.card}>
    <Card.Content>
      <Title style={[progressStyles.cardTitle, { textAlign: 'center' }]}>Average Heart Rate Progress</Title>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
        <View style={{ marginRight: 0 }}>
          <HeartIcon style={progressStyles.heartIcon} />
        </View>
        <View style={{ marginLeft: -80 }}>
          <CircularProgress
            progress={dummyProgress}
            hotStreak={dummyProgress >= 80}
            textColor="#FFFFFF"
          />
        </View>
      </View>
    </Card.Content>
  </Card>
);
};








const ProgressScreen = () => {
  const [exerciseLogs, setExerciseLogs] = useState([]);
  const [quote, setQuote] = useState(null);
  const fadeInAnim = useRef(new Animated.Value(0)).current;
  const fadeInDelays = [0, 100, 200, 300, 400, 500];



   useFocusEffect(
  React.useCallback(() => {
    const fetchExerciseLogs = async () => {
      try {
        const user = await Auth.currentAuthenticatedUser();
        const exerciseLogsData = await API.graphql(
          graphqlOperation(listExerciseLogs, {
            filter: { userId: { eq: user.username } },
          }),
        );
        setExerciseLogs(exerciseLogsData.data.listExerciseLogs.items);
      } catch (error) {
        console.error('Error fetching exercise logs:', error);
      }
    };

    const playAnimations = () => {
      fadeInAnim.setValue(0); // Reset the fadeInAnim value to 0
      fadeInDelays.forEach((delay, index) => {
        Animated.timing(fadeInAnim, {
          toValue: index + 1,
          duration: 1000,
          delay,
          useNativeDriver: true,
        }).start();
      });
    };

    const fetchQuoteOfTheDay = async () => {
      try {
        const options = {
          method: 'GET',
          url: 'https://quotes-inspirational-quotes-motivational-quotes.p.rapidapi.com/quote',
          params: {
            token: 'ipworld.info',
          },
          headers: {
            'content-type': 'application/octet-stream',
            'X-RapidAPI-Key': 'YOUR_RAPID_API_KEY',
            'X-RapidAPI-Host': 'quotes-inspirational-quotes-motivational-quotes.p.rapidapi.com',
          },
        };

        const response = await axios.request(options);
        setQuote(response.data);
      } catch (error) {
        console.error('Error fetching quote of the day:', error);
      }
    };

    fetchExerciseLogs();
    fetchQuoteOfTheDay();
    playAnimations();
  }, [])
);




    return (
    <ScrollView style={progressStyles.container}>
      <Animated.View style={{ opacity: fadeInAnim.interpolate({ inputRange: [0, 1], outputRange: [0, 1] }) }}>
        <QuoteOfTheDay quote={quote} />
      </Animated.View>
      <Animated.View style={{ opacity: fadeInAnim.interpolate({ inputRange: [0, 2], outputRange: [0, 1] }) }}>
        <WorkoutStreak exerciseLogs={exerciseLogs} />
      </Animated.View>
      <Animated.View style={{ opacity: fadeInAnim.interpolate({ inputRange: [0, 3], outputRange: [0, 1] }) }}>
        <WeeklyGoalProgress exerciseLogs={exerciseLogs} />
      </Animated.View>
      <Animated.View style={{ opacity: fadeInAnim.interpolate({ inputRange: [0, 4], outputRange: [0, 1] }) }}>
        <TotalRepsSetsProgress exerciseLogs={exerciseLogs} />
      </Animated.View>
      <Animated.View style={{ opacity: fadeInAnim.interpolate({ inputRange: [0, 5], outputRange: [0, 1] }) }}>
        <ExerciseTypeDistribution />
      </Animated.View>
      <Animated.View style={{ opacity: fadeInAnim.interpolate({ inputRange: [0, 6], outputRange: [0, 1] }) }}>
        <HeartRateProgress />
      </Animated.View>
    </ScrollView>
  );
};

const progressStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1D',
  },
  card: {
    backgroundColor: '#22223B',
    borderRadius: 15,
    margin: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardTitle: {
    color: '#FFFFFF',
  },
  noDataText: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
  },
  streakText: {
    color: '#FFFFFF',
    fontSize: 36,
    textAlign: 'center',
  },
  quoteContainer: {
    paddingHorizontal: 20,
    paddingTop: 100, 
    paddingBottom: 10,
    flexDirection: 'row', 
    alignItems: 'center', 
  },
  quoteIcon: {
    marginRight: 8, 
  },
  quoteText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontStyle: 'italic',
  },
  quoteAuthor: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'right',
    flex: 1, 
  },
  pieChartConfig: {
    backgroundColor: '#22223B',
    backgroundGradientFrom: '#22223B',
    backgroundGradientTo: '#22223B',
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    propsForLabels: {
      fontSize: 16,
    },
  },
  hotStreakText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  progressBar: {
    marginTop: 10,
    marginBottom: 10,
  },
  progressBarText: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
  },
  totalRepsSetsBar: {
    backgroundColor: '#33333',
flex: 1,
flexDirection: 'row',
justifyContent: 'space-between',
alignItems: 'center',
paddingHorizontal: 20,
paddingVertical: 10,
},
totalRepsSetsText: {
color: '#FFFFFF',
fontSize: 16,
},
buttonContainer: {
paddingHorizontal: 20,
paddingVertical: 10,
},
button: {
backgroundColor: '#1E90FF',
justifyContent: 'center',
alignItems: 'center',
borderRadius: 5,
paddingVertical: 10,
},
buttonText: {
color: '#FFFFFF',
fontSize: 18,
fontWeight: 'bold',
},
});

export default ProgressScreen;
