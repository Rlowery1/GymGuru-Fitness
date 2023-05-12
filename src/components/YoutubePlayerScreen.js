import React from 'react';
import { View, StyleSheet } from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';

const YoutubePlayerScreen = ({ route }) => {
  const { videoId } = route.params;

  return (
    <View style={styles.container}>
      <YoutubePlayer
        height='100%'
        width='100%'
        videoId={videoId}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default YoutubePlayerScreen;
