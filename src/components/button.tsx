import { Text, Pressable, View, StyleSheet, Image } from "react-native";

type Props = {
    label: string;
    color: string;
}

export default function Button({label, color}: Props) {
  return (
    <View style={styles.buttonContainer}>
        <Pressable style={[styles.button, {backgroundColor: `${color}`}]}>
            <Text style={styles.buttonLabel}>
                {label}
            </Text>
        </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: 250,
  },

  button: {
    display: "flex",
    alignItems: "center",
    padding: 16,
    borderRadius: 4,
  },

  buttonLabel: {
    color: "#fff",
    fontWeight: "600"
  }
});
