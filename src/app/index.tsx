import logoImg from "@/assets/images/logo.png";
import Button from "@/components/button";
import { useRouter } from "expo-router";
import { Image, StyleSheet, View } from "react-native";

export default function Index() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={logoImg} resizeMode="contain" />
      </View>

      <View style={styles.buttonContainer}>
        <Button
          label="Entrar como dev"
          color="#7C3DE8"
          onPress={() => router.push("/dev-cadastro")}
        />

        <Button
          label="Entrar como recrutador"
          color="#9D1212"
          onPress={() => router.push("/recrutador")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#070707",

    paddingHorizontal: 24,
  },

  logoContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: 30,
  },

  logo: {
    width: "80%",
    maxWidth: 300,
    aspectRatio: 1,
  },

  buttonContainer: {
    width: "100%",
    maxWidth: 300,
    gap: 20,
  },
});
