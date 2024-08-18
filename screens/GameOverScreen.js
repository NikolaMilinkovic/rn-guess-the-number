import { View, Text, StyleSheet, Image } from "react-native";
import Colors from "../constants/colors";
import PrimaryButton from "../components/PrimaryButton";

function GameOverScreen( props ){


  return(
    <View style={styles.page}>

      {/* Title */}
      <Text style={styles.title}>
        GAME OVER!
      </Text>

      {/* Image */}
      <View style={styles.image_container}>
        <Image source={require('../assets/images/success.png')} style={styles.image}/>
      </View>

      {/* Summary */}
      <View>
        <Text style={styles.text}>Your phone needed <Text style={styles.highlight}>{props.numOfTries}</Text> rounds to guess the number <Text style={styles.highlight}>{props.selectedNumber}</Text>.</Text>
      </View>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <PrimaryButton btnText='Play Again?' color={Colors.darkPlum} onPress={props.resetGame} />
      </View>
    </View>
  )
}

const styles = new StyleSheet.create({
  page: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    padding: 32,
    paddingTop: '20%'
  },
  title: {
    color: '#ffffff',
    fontFamily: 'open-sans-bold',
    fontSize: 36,
  },
  image_container: {
    overflow: 'hidden',
    height: 300,
    width: 300,
    borderRadius: 150,
    borderWidth: 3,
    borderColor: Colors.darkPlum,
    margin: 30,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  text: {
    color: '#ffffff',
    textAlign: 'center',
    fontFamily: 'open-sans',
    fontSize: 16,
  },
  highlight: {
    fontFamily: 'open-sans-bold'
  },
  buttonContainer: {
    marginTop: 10
  }
})

export default GameOverScreen