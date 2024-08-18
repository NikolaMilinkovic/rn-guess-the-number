import { View, Text, StyleSheet, ScrollView, Alert } from "react-native";
import PrimaryButton from "../components/PrimaryButton";
import { useEffect, useState } from "react";
import Colors from "../constants/colors";
import AntDesign from '@expo/vector-icons/AntDesign';

function GameScreen({ pickedNumber, setGameIsOver, addTry }){
  const [guess, setGuess] = useState(null);
  const [guessedNums, setGuessedNums] = useState([]);
  const [high, setHigh] = useState(100);
  const [low, setLow] = useState(0)
  const [numOfGuesses, setNumOfGuesses] = useState(0);

  // Firt computer pick
  useEffect(() => {
    setNumber(pickedNumber);
    playRound(low, high, high);
  }, [pickedNumber, high, low]);

  // Set and cache picked number
  const [number, setNumber] = useState(null);

  // Random number generator
  function generateRandomBetween(min, max) {
    let rand;
    do{
      rand = Math.floor(Math.random() * (max - min)) + min;
    } while (rand === low || rand === high);
    return rand;
  }
  
  // On click handlers
  function playRound(min, max){
    addTry();
    const rand = generateRandomBetween(min, max);

    // Game over condition
    if(rand === pickedNumber){

      // Reset all states for next game
      setGuess(null)
      setGuessedNums([])
      setHigh(100)
      setLow(0)
      setNumOfGuesses(0)
      // Go to game over screen
      return setGameIsOver(); 
    } else {
      setNumOfGuesses(numOfGuesses + 1);
      setGuess(rand);
      setGuessedNums((prev) => [...prev, rand]);
    }

  }

  // Lying alert message
  const alert = () => {
    console.log('Tell me lies, tell me sweet little lies!');
    Alert.alert('No lying!', 'You know this is wrong...', [{ text: 'Sorry mate, its the dog in me!', style: 'cancel' }]);
  }

  useEffect(() => {
    console.log('=== GUESS IS ===')
    console.log(guess)
  }, [guess])
  useEffect(() => {
    console.log('=== HIGH IS ===')
    console.log(high)
  },[high])
  useEffect(() => {
    console.log('=== LOW IS ===')
    console.log(low)
  },[low])

  // LOWER / HIGHER BUTTONS

  // HIGHER
  function handleHigher(){

    // Handle lying
    if(guess > pickedNumber){
      alert();
      return;
    }
    setLow(guess);
  }

  // LOWER
  function handleLower(){

    // Handle lying
    if(guess < pickedNumber){
      alert();
      return;
    }
    setHigh(guess);
  }





  return(
    <View style={styles.container}>
      <View style={styles.gameContainer}>

        {/* Picked Number */}
        <View>
          <Text style={styles.text}>
            You picked number 
          </Text>
          <Text style={styles.text}>
            {number}
          </Text>
        </View>

        {/* Opponents Guess */}
        <Text style={styles.title}>
          Opponent's Guess: 
        </Text>
        <Text style={styles.guessedNumberText}>
          {guess}
        </Text>

        {/* Higher / Lower Controls */}
        <View style={styles.controlsContainer}>
          <Text style={styles.text}>Higher / Lower ?</Text>

          <View style={styles.buttonsContainer}>
            <PrimaryButton 
              // btnText={'Higher +'}
              btnIcon={<AntDesign name="plus" size={24} color="white" />}
              onPress={handleHigher}
            />
            <PrimaryButton 
              btnIcon={<AntDesign name="minus" size={24} color="white" />}
              onPress={handleLower}
            />
          </View>
        </View>
      </View>
      <ScrollView style={styles.computerGuessContainer}>
          {guessedNums && guessedNums.map((num, index) => {
            return <Text key={`${index}_guess_number_${num}`} style={styles.computerGuess}>{index + 1} - Computer guessed {num}</Text>
          })}
          {/* Rounds Log */}
      </ScrollView>
    </View>
  )
}

const styles = new StyleSheet.create({

  // Main Container
  container: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: Colors.darkPlum,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'open-sans-bold'
  },
  title: {
    fontSize: 20,
    color: Colors.darkPlum,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'open-sans'
  },
  guessedNumberText: {
    fontSize: 20,
    color: Colors.primaryOrange,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'open-sans-bold'
  },


  gameContainer: {
    borderColor: '#333333',
    borderWidth: 0.5,
    paddingHorizontal: '10%',
    paddingVertical: '8%',
    borderRadius: 8,
    backgroundColor: 'whitesmoke',
    alignItems: 'center',
    // Shadow on Android
    elevation: 4,
    // Shadow on iOS
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    shadowOpacity: 0.3,
    marginBottom: 20
  },
  // Buttons Controls
  controlsContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  buttonsContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10
  },

  // Computer guess
  computerGuessContainer: {
    maxHeight: '40%'
  },
  computerGuess: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'white',
    fontFamily: 'open-sans-bold'
  }

})

export default GameScreen;