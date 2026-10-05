import { View, Text, StyleSheet, TextInput } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Button from "@/components/button";

export default function Dev() {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.titulo}>Preencha seus dados</Text>

        <View style={styles.imageContainer}>
          <MaterialCommunityIcons
            name="image-plus"
            size={80}
            color="#fff"
          />
        </View>

        <View style={styles.cadastro}>
          <View style={styles.cadastroInput}>
            <Text style={styles.cadastroText}>Nome</Text>

            <TextInput
              placeholder="Adicione seu nome"
              placeholderTextColor="#999"
              style={styles.textInput}
            />
          </View>

            <View style={styles.cadastroInput}>
            <Text style={styles.cadastroText}>Email</Text>

            <TextInput
              placeholder="Adicione seu email"
              placeholderTextColor="#999"
              style={styles.textInput}
            />
          </View>

            <View style={styles.cadastroInput}>
            <Text style={styles.cadastroText}>Idade</Text>

            <TextInput
              placeholder="Adicione sua idade"
              placeholderTextColor="#999"
              style={styles.textInput}
            />
          </View>

            <View style={styles.cadastroInput}>
            <Text style={styles.cadastroText}>Localização</Text>

            <TextInput
              placeholder="Adicione seu localização"
              placeholderTextColor="#999"
              style={styles.textInput}
            />
          </View>
          

           <View style={styles.cadastroInput}>
            <Text style={styles.cadastroText}>Linguagens</Text>

            <TextInput
              placeholder="Adicione suas linguagens"
              placeholderTextColor="#999"
              style={styles.textInput}
            />
          </View>

        </View>
        
      </View>
                <Button label="Próxima Etapa →" color="#7C3DE8"></Button>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#070707",
  },

  content: {
    justifyContent: "center",
    marginTop: 30,
    width: "100%",
    paddingHorizontal: 30,
  },

  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#fff",
    borderWidth: 1,
    borderStyle: "dashed",
    width: 250,
    height: 250,
    alignSelf: "center",
  },

  titulo: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "700",
    marginBottom: 30,
    textAlign: "center",
  },

  cadastro: {
    width: "100%",
    marginTop: 30,
    marginBottom: 30
  },

  cadastroInput: {
    width: "100%",
    marginBottom: 10
  },

  cadastroText: {
    fontSize: 18,
    color: "#fff",
    marginBottom: 8,
  },

  textInput: {
    borderColor: "#fff",
    borderWidth: 1,
    color: "#fff",
    padding: 12,
    width: "100%",
  },
});
