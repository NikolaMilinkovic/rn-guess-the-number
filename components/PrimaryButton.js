import { Text, Pressable, Animated, StyleSheet } from "react-native";

function PrimaryButton({ color = '#fc984c', btnText, btnIcon, onPress }) {
  const backgroundRef = new Animated.Value(0);

  // Handlers
  const handlePress = () => {
    Animated.timing(backgroundRef, {
      toValue: 1,
      duration: 60,
      useNativeDriver: false,
    }).start();
  }

  const handleRelease = () => {
    Animated.timing(backgroundRef, {
      toValue: 0,
      duration: 60,
      useNativeDriver: false,
    }).start();
  }

  // Interpolate the background color
  const backgroundColor = backgroundRef.interpolate({
    inputRange: [0, 1],
    outputRange: [color, color],
  });

  return (
    <Animated.View style={[styles.btnContainer, { backgroundColor }]}>
      <Pressable
        style={styles.pressable}
        onPress={onPress}
        onPressIn={handlePress}
        onPressOut={handleRelease}
        android_ripple={{ color: '#d66915' }}
      >
        <Text style={styles.btnText}>
          {btnText}
          {btnIcon}
        </Text>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  btnText: {
    color: '#ffffff',
    display: 'flex',
    padding: 8,
    minWidth: 80,
    textAlign: 'center',
    fontFamily: 'open-sans'
  },
  btnContainer: {
    display: 'flex',
    backgroundColor: '#fc984c',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  pressable: {
    display: 'flex',
    alignItems: 'center',
    width: '100%'
  }
})

export default PrimaryButton;
