import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { StyleSheet, Text, View } from "react-native";

export default function Lista() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Candidatos aprovados</Text>

      <MaterialCommunityIcons
        name="account-group-outline"
        size={56}
        color="#8E53F4"
      />

      <Text style={styles.descricao}>
        Seus candidatos aprovados aparecerão aqui.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#070707",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  titulo: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
  },
  descricao: {
    color: "#AAAAAA",
    fontSize: 15,
    textAlign: "center",
    marginTop: 16,
  },
});
