/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {SafeAreaView, StatusBar, useColorScheme} from 'react-native';
import ImageViewer from './src/ZoomImageViewer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? 'black' : 'white',
  };

  const image = [
    'https://img.freepik.com/premium-vector/online-learning-concept-with-cartoon-character_29937-6233.jpg?w=2000',
    'https://img.freepik.com/premium-vector/online-learning-concept-with-cartoon-character_29937-6233.jpg?w=2000',
    'https://img.freepik.com/premium-vector/online-learning-concept-with-cartoon-character_29937-6233.jpg?w=2000',
  ];

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ImageViewer image={image} />
    </GestureHandlerRootView>
  );
}

export default App;
