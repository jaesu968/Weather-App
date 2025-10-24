import React from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  GestureResponderEvent, 
  Pressable
} from 'react-native';

type NativeButtonProps = {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
};

function NativeButton(props: NativeButtonProps) {
  const { title, onPress } = props;

  return (
    <Pressable onPress={onPress} style={({ pressed }) => [
      styles.button, // base button styles
      { opacity: pressed ? 0.7 : 1 } 
    ]}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#29ffbbff',
    paddingVertical: 12, // Vertical padding
    paddingHorizontal: 16, // Horizontal padding
    borderRadius: 8, // Rounded corners
    alignItems: 'center', // Center the text horizontally
    justifyContent: 'center', // Center the text vertically
  },
  text: {
    fontSize: 17,
    fontWeight: '600',
    letterSpacing: 0.2,
    color: '#fff',
  },
});

export default NativeButton;
