import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  Animated,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import pushUpPhoto from '../../assets/push_up_photo.jpg';
import cardioPhoto from '../../assets/cardio_photo.jpg';
import yogaPhoto from '../../assets/yoga_photo.jpg';
import absPhoto from '../../assets/abs_photo.jpg';
import Loading from '../components/Loading';
import { useFocusEffect } from '@react-navigation/native';
import fullBodyPhoto from '../../assets/full_body_photo.jpg'
import flexibilityPhoto from '../../assets/flexibility_photo.jpg'





const challenges = [
  { id: 1, title: '30-Day Push-up Challenge', difficulty: 'Intermediate', image: pushUpPhoto },
  { id: 2, title: '7-Day Cardio Challenge', difficulty: 'Beginner', image: cardioPhoto },
  { id: 3, title: '10-Day Yoga Challenge', difficulty: 'Beginner', image: yogaPhoto },
  { id: 4, title: '14-Day Abs Challenge', difficulty: 'Advanced', image: absPhoto },
  { id: 5, title: '21-Day Full Body Challenge', difficulty: 'Intermediate', image: fullBodyPhoto }, // Add this line
  { id: 6, title: '30-Day Flexibility Challenge', difficulty: 'Beginner', image: flexibilityPhoto }, // Add this line
  // Add more challenges or fetch them from an API
];

const fadeIn = {
  0: {
    opacity: 0,
  },
  1: {
    opacity: 1,
  },
};

const FeaturedChallenges = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const fadeInAnim = useRef(new Animated.Value(0)).current;
  const CHALLENGE_ITEM_HEIGHT = 100;
  const styles = getStyles(CHALLENGE_ITEM_HEIGHT);




  const animateItems = () => {
    fadeInAnim.setValue(0);
    Animated.timing(fadeInAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    // Replace this with your actual data fetching function
    fetchChallenges().then(() => {
      setLoading(false);
      animateItems(); // Add this line to animate items after fetching
    });
  }, []);

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

  const fetchChallenges = async () => {
    // Add your actual data fetching logic here
    await new Promise((resolve) => setTimeout(resolve, 3000));
  };

  const renderItem = ({ item, index }) => (
    <Animated.View
      style={{ opacity: fadeInAnim }}
    >
      <TouchableOpacity
        style={styles.challengeItem}
        onPress={() => console.log('Challenge pressed')}
      >
        <Image style={styles.challengeImage} source={item.image} />
        <View style={styles.challengeTextContainer}>
          <Text style={styles.challengeTitle}>{item.title}</Text>
          <Text style={styles.challengeDifficulty}>{item.difficulty}</Text>
        </View>
        <Icon
          style={styles.arrowIcon}
          name="chevron-forward"
          size={30}
          color="#FFFFFF"
        />
      </TouchableOpacity>
    </Animated.View>
  );

  return (
  <View style={styles.container}>
    {loading ? (
      <Loading />
    ) : (
      <>
        <Animated.Text
          style={[styles.title, { opacity: fadeInAnim }]}
        >
          Featured Challenges
        </Animated.Text>
        <FlatList
          data={challenges}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          decelerationRate={"fast"}
          snapToAlignment={"start"}
          snapToInterval={CHALLENGE_ITEM_HEIGHT + 15}
          contentContainerStyle={styles.flatListContainer}
        />
      </>
    )}
  </View>
);
};

const getStyles = (CHALLENGE_ITEM_HEIGHT) => StyleSheet.create({
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
    paddingTop: 40, // Add this line
    textAlign: 'center', // Add this line
  },
  challengeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 5,
    backgroundColor: '#252525',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    height: CHALLENGE_ITEM_HEIGHT,
  },
  challengeImage: {
    width: 100,
    height: 100,
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
  },
  challengeTextContainer: {
    padding: 10,
    flex: 1,
  },
  challengeTitle: {
    fontSize: 18,
    color: '#FFFFFF',
    marginBottom: 5,
  },
  challengeDifficulty: {
    fontSize: 14,
    color: '#FFFFFF',
  },
  arrowIcon: {
    marginLeft: 'auto',
    marginRight: 10,
  },
  flatListContainer: {
    paddingBottom: 15,
  },
});

export default FeaturedChallenges;

