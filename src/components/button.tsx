import { Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
  label: string;
  color: string;
  onPress?: () => void;
};

export default function Button({ label, color, onPress }: Props) {
  return (
    <View style={styles.buttonContainer}>
      <Pressable
        style={[styles.button, { backgroundColor: color }]}
        onPress={onPress}
      >
        <Text style={styles.buttonLabel}>{label}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: "100%",
  },

  button: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    borderRadius: 4,
  },

  buttonLabel: {
    color: "#fff",
    fontWeight: "600",
  },
});
