import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import WeatherScreen from './components/WeatherScreen';

// https://docs.expo.dev/tutorial/create-your-first-app/
// npx expo start --tunnel

// using upsplash
// remeber only 50 api calls /hr for images


export default function App() {

  return (
    <SafeAreaView style={styles.container}>
      <WeatherScreen />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3498db', // background color for the entire screen
  },
});