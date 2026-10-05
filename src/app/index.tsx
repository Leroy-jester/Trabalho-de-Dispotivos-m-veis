import { Text, View, StyleSheet, Image } from "react-native";
import logoImg from '@/assets/images/logo.png'
import Button from "@/components/button";

export default function Index() {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
      <Image style={styles.logo} source={logoImg}></Image>

      </View>

      <View style={styles.buttonContainer}>
          <Button label="Entrar como dev" color="#7C3DE8"/> 
          <Button label="Entrar como recrutador" color="#9D1212"/> 
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#070707"
  },
  logoContainer: {
    marginBottom: 30
  },
  logo: {
    width: 300,
    height: 300,
  },
  buttonContainer: {
    gap: 30
  }

});
