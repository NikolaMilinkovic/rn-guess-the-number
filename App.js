import { StyleSheet, View, ImageBackground, SafeAreaView, ActivityIndicator } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import StartGameScreen from './screens/StartGameScreen';
import { LinearGradient } from 'expo-linear-gradient';
import GameScreen from './screens/GameScreen';
import { useState, useEffect, useCallback } from 'react';
import Colors from './constants/colors';
import GameOverScreen from './screens/GameOverScreen';
import { StatusBar } from 'expo-status-bar';

// Keep the splash / loading screen visible while fonts are loading
// Ovo ce da mi sakrije loading komponentu, prikazace je samo dok loaduje fontove, sto znaci
// Da dok ulazimo u app necemo videti loading componentu, to nije ono sto zelimo u ovom slucaju!
// SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({ 
    'open-sans': require('./fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./fonts/OpenSans-Bold.ttf'),
   });
  const [appIsReady, setAppIsReady] = useState(false);
  const [userNumber, setUserNumber] = useState(null);
  const [numOfTries, setNumOfTries] = useState(0);
  const [gameOver, setGameIsOver] = useState(true);



   useEffect(() => {
    async function prepare() {
      if (fontsLoaded) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        // Hide the splash screen after fonts have loaded
        await SplashScreen.hideAsync();
        setAppIsReady(true);
      }
    }
    prepare();
  }, [fontsLoaded]);

  if (!appIsReady) {
    // Render loading circle as the fonts are loading
    return (
      <View style={[styles.loadingContainer, styles.horizontal]}>
        <ActivityIndicator size={80} color="#ffffff" />
      </View>
    );
  }

  function resetGame(){
    setUserNumber(null);
    setNumOfTries(0);
    setGameIsOver(false);
  }

  function gameOverHandler(){
    setGameIsOver(!gameOver)
  }
  function pickedNumberHandler(num){
    // gameOverHandler();
    console.log(num)
    setUserNumber(num);
  }
  function addTry(){
    setNumOfTries(numOfTries + 1);
  }

  let screen = <StartGameScreen onPickNumber={pickedNumberHandler} />
  if(userNumber) {
    screen = <GameScreen pickedNumber={userNumber} setGameIsOver={gameOverHandler} addTry={addTry}/>;
  }
  if(gameOver && userNumber){
    screen = <GameOverScreen numOfTries={numOfTries} selectedNumber={userNumber} resetGame={resetGame}/>;
  }

  return (
    <>
      <StatusBar style='light'/>
      <SafeAreaView style={styles.container}>
        <LinearGradient style={styles.backgroundGradient} colors={['rgba(59, 2, 31, 0.8)', 'transparent']} />
        <ImageBackground
          source={require('./assets/images/yellow.jpg')}
          style={styles.backgroundImage}
          resizeMode='cover'
          imageStyle={styles.imageStyle}
        />
        {/* Render the main content once the app is ready */}
        <View style={styles.content}>
          {screen}
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  imageStyle: {
    opacity: 0.65,
    zIndex: 1
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.primaryOrange,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  backgroundGradient: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 2
  },
  content: {
    flex: 1,
    zIndex: 3,
    minWidth: '100%',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    zIndex: 12
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});
