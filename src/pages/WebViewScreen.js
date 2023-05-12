import React from 'react';
import { WebView } from 'react-native-webview';

const YoutubeVideoScreen = ({ route }) => {
  const { videoId } = route.params;

  return (
    <WebView
      source={{ uri: `https://www.youtube.com/embed/${videoId}` }}
      style={{ flex: 1 }}
    />
  );
};

export default YoutubeVideoScreen;
