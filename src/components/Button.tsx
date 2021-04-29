import React from "react";
import { StyleSheet, Text } from "react-native";
import { RectButton, RectButtonProps } from "react-native-gesture-handler";

interface ButtonProps extends RectButtonProps {
  text: string;
}

export function Button({ text, style, ...props }: ButtonProps) {
  return (
    <RectButton style={[styles.container, style]} {...props}>
      <Text style={styles.text}>{text}</Text>
    </RectButton>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 3,
    width: 150,
    height: 50,
    backgroundColor: "#21d188",
  },
  text: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
