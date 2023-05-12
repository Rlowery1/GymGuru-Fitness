import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  Dimensions,
  SafeAreaView,
  Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import myImage from '../../assets/cover_photo_1.png'
import gymPhoto from '../../assets/gym_photo.jpg';
import runningPhoto from '../../assets/running_photo.jpg';
import Loading from '../components/Loading';
import { Easing } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { useFocusEffect } from '@react-navigation/native';







const PostItem = ({ item, onDelete, index }) => {
  const postImage = item.text === 'Great workout today!' ? gymPhoto : (item.text === 'New post added!' ? gymPhoto : runningPhoto);
  const fadeIn = new Animated.Value(0);

  useFocusEffect(
    React.useCallback(() => {
      fadeIn.setValue(0);
      Animated.timing(fadeIn, {
        toValue: 1,
        duration: 500,
        delay: 100 * index,
        easing: Easing.in(Easing.ease),
        useNativeDriver: true,
      }).start();
      return () => {}; // Return an empty cleanup function
    }, [])
  );


  return (
    <Animated.View style={[styles.postContainer, { opacity: fadeIn }]}>
      <LinearGradient
        colors={['#252525', '#1A1A1D']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <View style={styles.postHeader}>
          <Image style={styles.avatar} source={myImage} />
          <Text style={styles.username}>{item.username}</Text>
          <TouchableOpacity onPress={() => onDelete(item.id)} style={styles.deleteButton}>
            <Icon name="trash" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
        <Image style={styles.postImage} source={postImage} />
        <Text style={styles.postText}>{item.text}</Text>
      </LinearGradient>
    </Animated.View>
  );
};



const SocialFeed = () => {
  const [data, setData] = useState([
    {
      id: 1,
      username: 'User1',
      text: 'Great workout today!',
    },
    {
      id: 2,
      username: 'User2',
      text: 'Just finished a 5-mile run!',
    },
  ]);

  const [loading, setLoading] = useState(true);
  const [numPosts, setNumPosts] = useState(data.length);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const addNewPost = () => {
    const newPost = {
      id: data.length + 1,
      username: `User${data.length + 1}`,
      text: 'New post added!',
    };
    setData([...data, newPost]);
    setNumPosts(numPosts + 1); // Update the number of posts
  };

  const removePost = (id) => {
    setData(data.filter((post) => post.id !== id));
    setNumPosts(numPosts - 1); // Update the number of posts
  };

  const renderItem = ({ item, index }) => (
    <PostItem item={item} onDelete={removePost} index={index} />
  );

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.container}>
        {loading ? (
          <Loading />
        ) : (
          <>
            <View style={styles.header}>
              <Text style={styles.title}>Social Feed</Text>
              <TouchableOpacity onPress={addNewPost} style={styles.addButton}>
                <Icon name="add-circle" size={40} color="#0E7C7B" />
              </TouchableOpacity>
            </View>
            <FlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={(item, index) => `${item.id}-${index}`}
              key={numPosts} // Use the number of posts as the key
            />
          </>
        )}
      </View>
    </SafeAreaView>
  );
};



const styles = StyleSheet.create({

  safeAreaContainer: {
    flex: 1,
    backgroundColor: '#1A1A1D',
  },
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  postContainer: {
    backgroundColor: '#252525',
    marginBottom: 20,
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 5,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
    avatar: {
  width: 70,
  height: 70,
  borderRadius: 15,
  marginRight: 10,
  },
  username: {
    fontSize: 18,
    color: '#FFFFFF',
  },
  postImage: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  postText: {
    padding: 10,
    color: '#FFFFFF',
    fontSize: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    paddingTop: 15, // Add padding to the top of the header
  },
  deleteButton: {
    marginLeft: 'auto',
    marginRight: 10,
  },
  gradient: {
    flex: 1,
    borderRadius: 10,
  },



});

export default SocialFeed;

