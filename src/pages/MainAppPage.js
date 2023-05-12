// src/pages/MainAppPage.js
import React, { useState, useEffect, useCallback } from 'react';
import {
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {
  createStackNavigator,
} from '@react-navigation/stack';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image,
  ScrollView,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  FlatList,
  Dimensions,
  Linking,
} from 'react-native';
import ProfileEditScreen from './ProfileEditScreen';
import ProfileScreen from './ProfileScreen';
import { API, graphqlOperation, Auth } from 'aws-amplify';
import { getUserProfile } from '../graphql/queries';
import { useFocusEffect } from '@react-navigation/native';
import WorkoutScreen from './WorkoutScreen';
import WorkoutDay from '../components/WorkoutDay';
import ProgressScreen from './ProgressScreen';
import { listExerciseLogs } from '../graphql/queries';
import CommonStyles from '../styles/GlobalStyles';
import yourLogo from '../../assets/gymguru-high-resolution-logo-color-on-transparent-background.png';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DailyNutritionTips from '../components/DailyNutritionTips';
import SocialFeed from '../components/SocialFeed';
import FeaturedChallenges from '../components/FeaturedChallenges';
import WorkoutOfTheDay from '../components/WorkoutOfTheDay';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import YoutubePlayerScreen from '../components/YoutubePlayerScreen';
import { Animated, Easing } from 'react-native';










const LoadingScreen = ({ isLoading, children }) => {
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0E7C7B" />
      </View>
    );
  }
  return children;
};


const API_KEY = 'AIzaSyCrpCL8JdtQaUXYnmA9wNQezOrN4YZwle4';

const HomeScreen = ({ navigation }) => {
  const [userData, setUserData] = useState(null);
  const [lastUpdated, setLastUpdated] = useState('');
  const [exerciseLogs, setExerciseLogs] = useState([]);
  const [userId, setUserId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredExercises, setFilteredExercises] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const YOUTUBE_API_KEY = 'AIzaSyCrpCL8JdtQaUXYnmA9wNQezOrN4YZwle4';
  const [searchText, setSearchText] = useState('');
  const [logoAnimation] = useState(new Animated.Value(0));














  const handleNavigation = async (screen) => {
    setIsLoading(true);
    await navigation.navigate(screen);
    setIsLoading(false);
  };


  const startLogoAnimation = () => {
  logoAnimation.setValue(0);
  Animated.timing(logoAnimation, {
    toValue: 1,
    duration: 1000,
    easing: Easing.linear,
    useNativeDriver: false,
  }).start();
};


  useFocusEffect(
  React.useCallback(() => {
    startLogoAnimation();
  }, [])
);



  const openYouTubeVideo = (videoId) => {
  const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
  Linking.canOpenURL(videoUrl).then((supported) => {
    if (supported) {
      Linking.openURL(videoUrl);
    } else {
      console.log(`Don't know how to open this URL: ${videoUrl}`);
    }
  });
};


  const handleYoutubeSearch = async (searchText) => {
    setSearchQuery(searchText);
    searchYoutubeVideos(searchText);
  };

  const searchYoutubeVideos = useCallback(async (searchText) => {
    try {
      const options = {
        method: 'GET',
        url: 'https://www.googleapis.com/youtube/v3/search',
        params: {
          part: 'snippet',
          maxResults: 5,
          q: searchText,
          type: 'video',
          key: YOUTUBE_API_KEY,
        },
      };

    const response = await axios.request(options);
      const videos = response.data.items
        .filter((item) => item.snippet && item.snippet.title && item.id && item.id.videoId)
        .map((item) => {
          return {
            title: item.snippet.title,
            videoId: item.id.videoId,
            thumbnail: item.snippet.thumbnails.high.url,
          };
        });
      setFilteredExercises(videos);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  }, [searchText]);











  useFocusEffect(
    React.useCallback(() => {
      const fetchUserData = async () => {
        try {
          const currentUser = await Auth.currentAuthenticatedUser();
          const ownerId = currentUser.attributes.sub;
          const userProfileData = await API.graphql(
            graphqlOperation(getUserProfile, { id: ownerId }),
          );
          const userProfile = userProfileData.data.getUserProfile;

          if (userProfile) {
            setUserData({
              name: userProfile.name,
              workoutsCompleted: userProfile.workoutsCompleted,
              totalTimeSpent: userProfile.totalTimeSpent,
              avatarUrl: userProfile.avatarUrl,
            });
            setLastUpdated(userProfile.updatedAt);
          }
        } catch (error) {
          console.error('Error fetching user profile:', error);
        }
      };

      const fetchExerciseLogs = async () => {
        try {
          const currentUser = await Auth.currentAuthenticatedUser();
          const ownerId = currentUser.attributes.sub;
          setUserId(ownerId);
          const exerciseLogData = await API.graphql(
            graphqlOperation(listExerciseLogs, {
              filter: { userId: { eq: ownerId } },
            })
          );
          const fetchedExerciseLogs = exerciseLogData.data.listExerciseLogs.items;
          fetchedExerciseLogs.sort((a, b) => {
            return new Date(b.date) - new Date(a.date);
          });
          setExerciseLogs(fetchedExerciseLogs);
        } catch (error) {
          console.error('Error fetching exercise logs:', error);
        }
      };

      fetchUserData();
      fetchExerciseLogs();

    }, [userId])
  );
     const getWelcomeMessage = () => {
    if (userData && userData.name) {
      const currentHour = new Date().getHours();
      if (currentHour >= 5 && currentHour < 12) {
        return `Good morning, ${userData.name}!`;
      } else if (currentHour >= 12 && currentHour < 18) {
        return `Good afternoon, ${userData.name}!`;
      } else {
        return `Good evening, ${userData.name}!`;
      }
    } else {
      return 'Welcome!';
    }
  };


  if (!userData) {
    return (
      <View style={styles.homeContainer}>
        <TouchableOpacity
          style={styles.profileButton}
          onPress={() => navigation.navigate('Profile', { screen: 'ProfileEdit' })}
        >
          <Text style={styles.profileButtonText}>Create your profile</Text>
        </TouchableOpacity>
      </View>
    );
  }

 return (
  <SafeAreaView style={styles.container}>
    <Text style={styles.welcomeMessage}>{getWelcomeMessage()}</Text>
    <LoadingScreen isLoading={isLoading}>
      <ScrollView
        contentContainerStyle={styles.scrollViewContentContainer}
        style={styles.scrollView}
      >
        <View style={styles.logoContainer}>
        <Animated.Image
        source={yourLogo}
        style={[
          styles.logo,
          {
            opacity: logoAnimation.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 1],
            }),
          },
        ]}
        resizeMode="contain"
      />
      </View>
      <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchBar}
              placeholder="Search for exercises or workouts"
              placeholderTextColor="#1A1A1A" // Add this line to change the color of the placeholder text
              onChangeText={text => setSearchText(text)}
              value={searchText}
              returnKeyType="search"
              onSubmitEditing={() => searchYoutubeVideos(searchText)}
            />
            <Ionicons
              name="ios-search"
              size={24}
              color="#1A1A1A"
              style={styles.searchIcon}
              onPress={() => searchYoutubeVideos(searchText)}
            />
          </View>
      <View style={styles.cardsContainer}>
        <TouchableOpacity
          style={[styles.card, styles.dailyNutritionCard]}
          onPress={() => handleNavigation('DailyNutritionTipsScreen')}
        >
          <Text style={styles.cardText}>Daily Nutrition Ideas</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.card, styles.socialFeedCard]}
          onPress={() => handleNavigation('SocialFeedScreen')}
        >
          <Text style={styles.cardText}>Social Feed</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.card, styles.featuredChallengesCard]}
          onPress={() => handleNavigation('FeaturedChallengesScreen')}
        >
          <Text style={styles.cardText}>Featured Challenges</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.card, styles.workoutOfTheDayCard]}
          onPress={() => handleNavigation('WorkoutOfTheDayScreen')}
        >
          <Text style={styles.cardText}>Workout Of The Day</Text>
        </TouchableOpacity>
      </View>
       <View style={styles.exercisesContainer}>
            {filteredExercises.length > 0 && (
              <Text style={styles.exercisesTitle}>Search Results:</Text>
            )}
        <ScrollView
              contentContainerStyle={{
                flexGrow: 1,
                justifyContent: 'center',
                paddingHorizontal: 20,
              }}
              style={{ backgroundColor: "#1A1A1D" }}
            >
          {filteredExercises.map((exercise, index) => (
              <TouchableOpacity
                key={index}
              style={styles.exerciseItem}
              onPress={() => openYouTubeVideo(exercise.videoId)}
              >
              <Image
              source={{ uri: exercise.thumbnail }}
              style={styles.exerciseImage}
              />
              <View style={styles.exerciseDetails}>
              <Text style={styles.exerciseTitle}>{exercise.title}</Text>
              <Text style={styles.exerciseChannel}>
              {exercise.channelTitle}
              </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
          </View>
        </ScrollView>
      </LoadingScreen>
    </SafeAreaView>
  );
};

  const ProfileStack = createStackNavigator();

const ProfileStackNavigator = () => {
return (
<ProfileStack.Navigator>
<ProfileStack.Screen
name="Profile"
component={ProfileScreen} // Use the imported ProfileScreen
options={{ headerShown: false }}
/>
<ProfileStack.Screen name="ProfileEdit" component={ProfileEditScreen} options={{ headerShown: false }} />
</ProfileStack.Navigator>
);
};
const WorkoutStack = createStackNavigator();

const WorkoutStackNavigator = () => {
  return (
    <WorkoutStack.Navigator>
      <WorkoutStack.Screen
        name="Workout"
        component={WorkoutScreen}
        options={{ headerShown: false }}
      />
      <WorkoutStack.Screen name="WorkoutDay" component={WorkoutDay} options={{ headerShown: false }} />
      <WorkoutStack.Screen name="ExerciseDetails" component={YoutubePlayerScreen} />
    </WorkoutStack.Navigator>
  );
};


const Tab = createBottomTabNavigator();

const MainAppPage = ({ navigation }) => {
const [username, setUsername] = useState('');
const [searchQuery, setSearchQuery] = useState('');
const [videoResults, setVideoResults] = useState([]);

useEffect(() => {
const fetchUser = async () => {
try {
const user = await Auth.currentAuthenticatedUser();
            setUsername(user.username);
  } catch (error) {
    console.error('Error fetching user:', error);
  }
};

fetchUser();
  }, []);

useEffect(() => {
    if (searchQuery.length > 0) {
      const fetchData = async () => {
        const response = await axios.get(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=${searchQuery}&type=video&key=${API_KEY}`,
        );
        setVideoResults(response.data.items);
      };
      fetchData();
    } else {
      setVideoResults([]);
    }
  }, [searchQuery]);

  const renderItem = ({ item }) => {
  const videoId = item.id && item.id.videoId ? item.id.videoId : null;
  return (
    <TouchableOpacity
      style={styles.resultItem}
      onPress={() =>
        navigation.navigate('VideoPlayer', { videoId: videoId })
      }>
      <Image
        style={styles.thumbnail}
        source={{ uri: item.snippet.thumbnails.default.url }}
      />
      <Text style={styles.resultTitle}>{item.snippet.title}</Text>
    </TouchableOpacity>
  );
};

      return (
  <>
    <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Home') {
          iconName = focused ? 'ios-home' : 'ios-home-outline';
        } else if (route.name === 'Workout') {
          iconName = focused ? 'ios-fitness' : 'ios-fitness-outline';
        } else if (route.name === 'Progress') {
          iconName = focused ? 'ios-stats-chart' : 'ios-stats-chart-outline';
        } else if (route.name === 'Profile') {
          iconName = focused ? 'ios-person' : 'ios-person-outline';
        }

        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: '#0E7C7B',
      tabBarInactiveTintColor: '#E6E6E6',
      tabBarStyle: { backgroundColor: '#1A1A1D' },
      tabBarShowLabel: true, // Show labels for all screens
      headerShown: false // Hide header for all screens
    })}
  >
    <Tab.Screen
      name="Home"
      component={HomeScreen}
      options={{ tabBarLabel: 'Home' }}
    />
    <Tab.Screen
      name="Workout"
      component={WorkoutStackNavigator}
      options={{ tabBarLabel: 'Workout' }}
    />
    <Tab.Screen
      name="Progress"
      component={ProgressScreen}
      options={{ tabBarLabel: 'Progress' }}
    />
    <Tab.Screen
      name="Profile"
      component={ProfileStackNavigator}
      options={{ tabBarLabel: 'Profile' }}
    />
    <Tab.Screen
      name="DailyNutritionTipsScreen"
      component={DailyNutritionTips}
      options={{ tabBarButton: () => null, tabBarLabel: 'Tips' }}
    />
    <Tab.Screen
      name="SocialFeedScreen"
      component={SocialFeed}
      options={{ tabBarButton: () => null, tabBarLabel: 'Social' }}
    />
    <Tab.Screen
      name="FeaturedChallengesScreen"
      component={FeaturedChallenges}
      options={{ tabBarButton: () => null, tabBarLabel: 'Challenges' }}
    />
    <Tab.Screen
      name="WorkoutOfTheDayScreen"
      component={WorkoutOfTheDay}
      options={{ tabBarButton: () => null, tabBarLabel: 'Workout of the Day' }}
    />
  </Tab.Navigator>
  </>
);

};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1D', // Change the background color
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    paddingTop: 40,
  },
  logo: {
    width: Dimensions.get('window').width * 0.7, // Increase logo size
    height: Dimensions.get('window').height * 0.37, // Increase logo size
    marginBottom: 20, // Add space below the logo
  },
  searchBarContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  paddingHorizontal: 10,
  backgroundColor: '#FFF',
  borderRadius: 25,
  margin: 15,
  },
  exercisesContainer: {
  paddingHorizontal: 10,
  },
  exerciseItem: {
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: '#FFF',
  borderRadius: 10,
  marginBottom: 10,
  padding: 10,
  },
  exerciseName: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  cardsContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  card: {
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    marginBottom: 15,
    width: '100%',
    backgroundColor: '#0E7C7B',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  cardText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  searchIcon: {
    marginRight: 16,
  },
  dashboardContainer: {
    marginTop: 20,

  },
  dashboardCard: {
    backgroundColor: '#2A2A2D',
    borderRadius: 10,
    width: '30%',
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  dashboardTitle: {
    color: '#E6E6E6',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,

  },
  dashboardNumber: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  profileButton: {
    backgroundColor: '#0E7C7B',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    width: 205,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    overflow: 'hidden',
  },
  profileButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 18,
  },
  footerContainer: {
    borderTopWidth: 1,
    borderTopColor: '#444444',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#1A1A1D',
  },
  footerItem: {
    alignItems: 'center',
  },
  footerIcon: {
    color: '#E6E6E6',
    fontSize: 24,
  },
  footerText: {
    color: '#E6E6E6',
    fontSize: 12,
    marginTop: 5,
  },

  avatarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#E6E6E6',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#E6E6E6',
  },
  progressContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  homeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1A1A1D', // Change the background color
  },
  dailyNutritionCard: {
    backgroundColor: '#0E7C7B',
  },
  socialFeedCard: {
    backgroundColor: '#0E7C7B',
  },
  featuredChallengesCard: {
    backgroundColor: '#0E7C7B',
  },
  workoutOfTheDayCard: {
    backgroundColor: '#0E7C7B',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1A1A1D',
  },
  exercisesTitle: {
  fontSize: 18,
  fontWeight: 'bold',
  color: '#1A1A1A',
  marginTop: 10,
  marginBottom: 10,
  },
 exercisesGrid: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    maxHeight: Dimensions.get('window').height * 0.4, // Set a fixed height for the ScrollView
  },
  searchBar: {
    flex: 1,
    padding: 8,
    paddingLeft: 16,
    fontSize: 18,
    fontWeight: '500',
  },
  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  resultTitle: {
    marginLeft: 10,
    fontSize: 16,
    flexShrink: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: 30,
  },

  thumbnailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  thumbnail: {
    width: 90,
    height: 60,
    marginRight: 10,
  },
  thumbnailTitle: {
    fontSize: 14,
    color: '#E6E6E6',
  },
  exercisesGridContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  exerciseImage: {
  width: 50,
  height: 50,
  borderRadius: 25,
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#1A1A1D',
  },
  exerciseTitle: {
  fontSize: 16,
  fontWeight: 'bold',
  color: '#1A1A1A',
  },
  exerciseDetails: {
  marginLeft: 10,
  },
  exerciseChannel: {
  fontSize: 12,
  color: '#1A1A1A',
  },
  scrollViewContentContainer: {
    flexGrow: 1,

  },
   welcomeMessage: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#FFFFFF',
  },



});

export default MainAppPage;




