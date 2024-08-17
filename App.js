import { StyleSheet, View, ImageBackground } from 'react-native';
import StartGameScreen from './screens/StartGameScreen';
import { LinearGradient } from 'expo-linear-gradient';

export default function App() {

  return (
    <View style={styles.container}>
      <LinearGradient style={styles.backgroundGradient} colors={['rgba(59, 2, 31, 0.8)','transparent']}/>
      <ImageBackground 
        source={require('./assets/images/yellow.jpg')} 
        style={styles.backgroundImage} 
        resizeMode='cover' 
        imageStyle={styles.imageStyle} 
      />

      {/* Start Game Screen */}
      <View style={styles.content}>
        <StartGameScreen/>
      </View>
    </View>
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
    backgroundColor: '#ddb52f',
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
