import { TextInput, Text, View, StyleSheet, StatusBar, useWindowDimensions, KeyboardAvoidingView, ScrollView } from "react-native";
import PrimaryButton from "../components/PrimaryButton";
import { useState, useRef } from "react";
import Colors from "../constants/colors";


function StartGameScreen({ onPickNumber }){
  const [inputData, setInputData] = useState('');
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const inputRef = useRef(null);

  // Dynamic values for responsive design
  const {width, height} = useWindowDimensions();
  const styles = dynamicStyle(height, width);


  // Method for reseting the input
  function resetInput(){
    setInputData('');
    inputRef.current.focus();
  }

  // Method for confirming the number input
  function confirm(){

    // Handle errors:
    const number = parseInt(inputData);
    function showAlert(){
      setIsAlertVisible(true);
      return;
    }
    if(!number){
      setErrorMessage('Please provide a number!');
      showAlert();
    }
    if(number <= 0 || number > 99){
      setErrorMessage('Number must be in range from 1 to 99!');
      showAlert();
    }
    if(isNaN(parseInt(number))){
      setErrorMessage('Please enter a valid number..');
      showAlert();
    }
    // End of handling errors

    inputRef.current.blur();
    onPickNumber(number)
  }

  // Method for Error Modal reset
  function resetModal(){
    setIsAlertVisible(false);
    setErrorMessage('')
    resetInput();
  }

  return (
    <ScrollView contentContainerStyle={styles.StartGameScreen_page}>
      <KeyboardAvoidingView behavior="position" style={styles.StartGameScreen_page}>
        <View style={styles.StartGameScreen_page}>
          {/* Status bar */}
          <StatusBar style="light" />

          {/* Error modal */}
            {isAlertVisible && (
              <View style={styles.alertModal}>
                <View style={styles.alertModalContent}>
                  <Text>
                    {errorMessage}
                  </Text>
                  <PrimaryButton
                  btnText={'Whoopsies, got it.'}
                  onPress={resetModal}
                />
                </View>
              </View>
            )}

            {/* Header text */}
            <Text style={styles.header_text_1}>Guess The</Text>
            <Text style={styles.header_text_2}>Number</Text>

            {/* Inputs / Buttons */}
          <View style={styles.inputs_container}>
            <TextInput
              ref={inputRef}
              style={styles.text_input}
              placeholder="1-99"
              placeholderTextColor= {Colors.primaryOrange}
              maxLength={2}
              keyboardType="number-pad"
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={(text) => setInputData(text)}
              value={inputData}
            />
            <View style={styles.buttons_container}>
              {/* Buttons */}
              <PrimaryButton
                btnText={'Reset'}
                onPress={resetInput}
              />
              <PrimaryButton
                btnText={'Confirm'}
                onPress={confirm}
              />
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  )
}

const dynamicStyle = (height, width) => {
  const heightUnder500 = height < 500;

  return StyleSheet.create({
    screen: {
      display: 'flex',
      flex: 1,
      position: 'relative'
    },
    alertModal: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 2,
      backgroundColor: 'rgba(0,0,0,0.80)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    alertModalContent: {
      display: 'flex',
      backgroundColor: 'whitesmoke',
      width: '80%',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: 150,
      borderRadius: 8,
      gap: 10,
    },
    header_text_1: {
      color: 'white',
      fontSize: heightUnder500 ? 22 : 35,
      marginBottom: 0,
      marginTop: 0,
      fontWeight: 'bold',
      textAlign: 'center',
      fontFamily: 'open-sans-bold'
    },
    header_text_2: {
      color: 'white',
      fontSize: heightUnder500 ? 40 : 62,
      marginBottom: heightUnder500 ? 15 : 30,
      fontWeight: 'bold',
      textAlign: 'center',
      fontFamily: 'open-sans'
    },
    StartGameScreen_page: {
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputs_container: {
      borderColor: '#333333',
      borderWidth: 0.5,
      paddingHorizontal: '10%',
      paddingVertical: heightUnder500 ? '5%' : '8%',
      gap: 20,
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
      marginBottom: heightUnder500 ? 20 : 100
    },
    buttons_container: {
      display: 'flex',
      flexDirection: 'row',
      gap: 10,
    },
    text_input: {
      borderBottomColor:  Colors.primaryOrange,
      color:  Colors.primaryOrange,
      borderBottomWidth: 2,
      padding: 8,
      height: 50,
      fontSize: 32,
      fontWeight: 'bold',
      width: 100,
      textAlign: 'center',
      fontFamily: 'open-sans-bold'
    }
  })
}


export default StartGameScreen;