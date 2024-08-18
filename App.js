import { StyleSheet, View, ImageBackground, SafeAreaView } from 'react-native';
import StartGameScreen from './screens/StartGameScreen';
import { LinearGradient } from 'expo-linear-gradient';
import GameScreen from './screens/GameScreen';
import { useState } from 'react';
import Colors from './constants/colors';
import GameOverScreen from './screens/GameOverScreen';

export default function App() {
  const [userNumber, setUserNumber] = useState(null);
  const [gameOver, setGameIsOver] = useState(false);
  function pickedNumberHandler(num){
    setUserNumber(num)
  }
  function gameOverHandler(){
    setGameIsOver(!gameOver)
  }
  let screen = <StartGameScreen onPickNumber={pickedNumberHandler} />
  if(userNumber) {
    screen = <GameScreen pickedNumber={userNumber} setGameIsOver={gameOverHandler} />;
  }
  if(gameOver){
    screen = <GameOverScreen />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient style={styles.backgroundGradient} colors={['rgba(59, 2, 31, 0.8)','transparent']}/>
      <ImageBackground 
        source={require('./assets/images/yellow.jpg')} 
        style={styles.backgroundImage} 
        resizeMode='cover' 
        imageStyle={styles.imageStyle} 
      />

      {/* Start Game Screen */}
      <View style={styles.content}>
        {screen}
      </View>
    </SafeAreaView>
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
  }
});
