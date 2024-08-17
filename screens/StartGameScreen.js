import { TextInput, Text, View, StyleSheet, StatusBar } from "react-native";
import PrimaryButton from "../components/PrimaryButton";
import { useEffect, useState, useRef } from "react";


function StartGameScreen(){
  const [inputData, setInputData] = useState('');
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const inputRef = useRef(null);
  // useEffect(() => {
  //   console.log(inputData)
  // },[inputData])

  function resetInput(){
    setInputData('')
  }
  function confirm(){
    if(!inputData){
      setErrorMessage('Please provide a number!');
      setIsAlertVisible(true);
      return;
    }
    if(inputData <= 0 || inputData > 99){
      setErrorMessage('Number must be in range from 1 to 99!');
      setIsAlertVisible(true);
    }

    inputRef.current.blur();
    console.log('DATA IS GUCCI')
  }
  function resetModal(){
    setIsAlertVisible(false);
    setErrorMessage('')
  }

  return (
    <View style={styles.StartGameScreen_page}>
      <StatusBar style="light" />
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


        <Text style={styles.header_text_1}>Guess The</Text>
        <Text style={styles.header_text_2}>Number</Text>
      <View style={styles.inputs_container}>
        <TextInput
          ref={inputRef}
          style={styles.text_input}
          placeholder="1-99"
          placeholderTextColor='#ddb52f'
          maxLength={2}
          keyboardType="number-pad"
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={(text) => setInputData(text)}
          value={inputData}
        />
        <View style={styles.buttons_container}>
          {/* Input */}
          <PrimaryButton
            btnText={'Reset'}
            onPress={resetInput}
          />
          <PrimaryButton
            btnText={'Confirm'}
            onPress={confirm}
          />
          {/* Buttons */}
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
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
    fontSize: 35,
    marginBottom: 0,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  header_text_2: {
    color: 'white',
    fontSize: 62,
    marginBottom: 30,
    fontWeight: 'bold',
    textAlign: 'center',
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
    paddingVertical: '8%',
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
    marginBottom: 100.
  },
  buttons_container: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
  },
  text_input: {
    borderBottomColor: '#ddb52f',
    color: '#ddb52f',
    borderBottomWidth: 2,
    padding: 8,
    height: 50,
    fontSize: 32,
    fontWeight: 'bold',
    width: 100,
    textAlign: 'center',
  }
})

export default StartGameScreen;