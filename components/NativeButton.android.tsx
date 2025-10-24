import React from 'react';
import {
  Text,
  View,
  TouchableNativeFeedback,
  StyleSheet,
  GestureResponderEvent,
  Pressable
} from 'react-native';

interface NativeButtonProps {
  title: string;
  onPress: (event?: GestureResponderEvent) => void;
  style?: any;
}

function NativeButton(props: NativeButtonProps) {
  const { title, onPress, style } = props;

  return (
    <View style={styles.wrapper}>
      <Pressable onPress={onPress} android_ripple={{ color: '#fff', borderless: false}}
      style={({ pressed }) => [
        styles.button,
        pressed && styles.pressed,
        style
      ]}>
        <Text style={styles.text}>{title}</Text>
      </Pressable> 
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 12,
    overflow: 'hidden',
    marginVertical: 8,
  },
  button: {
    backgroundColor: '#a943cbff', // android typical color
    paddingVertical: 12, // Vertical padding
    paddingHorizontal: 16, // Horizontal padding
    alignItems: 'center', // Center the text horizontally
    justifyContent: 'center', // Center the text vertically
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
    letterSpacing: 0.5,
    color: '#fff',
  },
  pressed: {
    opacity: 0.8,
  },
});

export default NativeButton;
