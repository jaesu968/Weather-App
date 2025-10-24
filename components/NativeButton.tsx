import React from 'react';
import { Text, StyleSheet, ViewStyle, Pressable } from 'react-native';

interface ButtonProps {
  title: string;
  onPress: () => void;
  style?: ViewStyle;
}

export default function Button({ title, onPress, style }: ButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.button, // base button styles (always applied)
        pressed && styles.pressed, // Pressed styles (only when pressed is true)
        style, // custom styles from props (highest priority) ]}
      ]}>
          <Text style={styles.buttonText}>{title}</Text>
        </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#4297ff',
    paddingVertical: 12, // Vertical padding
    paddingHorizontal: 16, // Horizontal padding
    borderRadius: 8, // Rounded corners
    alignItems: 'center', // Center the text horizontally
    justifyContent: 'center', // Center the text vertically
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  pressed: {
    opacity: 0.8,
  },
});
