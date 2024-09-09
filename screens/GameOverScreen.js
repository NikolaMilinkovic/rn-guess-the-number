import { View, Text, StyleSheet, Image, useWindowDimensions, ScrollView } from "react-native";
import Colors from "../constants/colors";
import PrimaryButton from "../components/PrimaryButton";

function GameOverScreen( props ){
  const {width, height} = useWindowDimensions();

  let imageSize = 300;
  if(width < 380) imageSize = 150;
  if(height < 500) imageSize = 120;

  const imageStyle = {
    width: imageSize,
    height: imageSize,
    borderRadius: imageSize / 2,
  }

  return(
    <ScrollView style={styles.screen}>
      <View style={styles.page}>

        {/* Title */}
        <Text style={styles.title}>
          GAME OVER!
        </Text>

        {/* Image */}
        <View style={[styles.image_container, imageStyle]}>
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
    </ScrollView>
  )
}


const styles = new StyleSheet.create({
  screen: {
    flex: 1
  },
  page: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
    padding: 32,
    // paddingTop: '20%'
  },
  title: {
    color: '#ffffff',
    fontFamily: 'open-sans-bold',
    fontSize: 36,
  },
  image_container: {
    overflow: 'hidden',
    // height: deviceWidth < 380 ? 150 : 260,
    // width: deviceWidth < 380 ? 150 : 260,
    // borderRadius: 150,
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
    marginTop: 10,
  }
})

export default GameOverScreen