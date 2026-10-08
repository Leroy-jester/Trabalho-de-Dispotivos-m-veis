import Button from "@/components/button";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function Dev() {
  const [imagem, setImagem] = useState<string | null>(null);

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [idade, setIdade] = useState("");
  const [localizacao, setLocalizacao] = useState("");
  const [sobreMim, setSobreMim] = useState("");

  const [formacao, setFormacao] = useState("");
  const [formacaoInicio, setFormacaoInicio] = useState("");
  const [formacaoFim, setFormacaoFim] = useState("");

  const [experiencia, setExperiencia] = useState("");
  const [experienciaInicio, setExperienciaInicio] = useState("");
  const [experienciaFim, setExperienciaFim] = useState("");

  const [linguagens, setLinguagens] = useState("");
  const [projetos, setProjetos] = useState("");
  const [pretensaoSalarial, setPretensaoSalarial] = useState("");
  const [redesSociais, setRedesSociais] = useState("");

  async function selecionarImagem() {
    const resultado = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!resultado.canceled) {
      setImagem(resultado.assets[0].uri);
    }
  }

  function finalizarCadastro() {
    if (!nome || !email || !idade || !localizacao) {
      Alert.alert(
        "Campos obrigatórios",
        "Preencha Nome, Email, Idade e Localização.",
      );
      return;
    }

    Alert.alert(
      "Cadastro finalizado!",
      "Seu cadastro foi preenchido com sucesso.",
    );
  }

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        style={styles.scroll}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.titulo}>Preencha seus dados</Text>

          <Pressable style={styles.imageContainer} onPress={selecionarImagem}>
            {imagem ? (
              <Image source={{ uri: imagem }} style={styles.image} />
            ) : (
              <>
                <MaterialCommunityIcons
                  name="image-plus"
                  size={60}
                  color="#fff"
                />

                <Text style={styles.imageText}>Adicionar imagem</Text>
              </>
            )}
          </Pressable>

          <View style={styles.cadastro}>
            <View style={styles.cadastroInput}>
              <Text style={styles.cadastroText}>Nome</Text>

              <TextInput
                placeholder="Adicione seu nome"
                placeholderTextColor="#999"
                value={nome}
                onChangeText={setNome}
                style={styles.textInput}
              />
            </View>

            <View style={styles.cadastroInput}>
              <Text style={styles.cadastroText}>Email</Text>

              <TextInput
                placeholder="Adicione seu email"
                placeholderTextColor="#999"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                style={styles.textInput}
              />
            </View>

            <View style={styles.cadastroInput}>
              <Text style={styles.cadastroText}>Idade</Text>

              <TextInput
                placeholder="Adicione sua idade"
                placeholderTextColor="#999"
                value={idade}
                onChangeText={setIdade}
                keyboardType="numeric"
                style={styles.textInput}
              />
            </View>

            <View style={styles.cadastroInput}>
              <Text style={styles.cadastroText}>Localização</Text>

              <TextInput
                placeholder="Adicione sua localização"
                placeholderTextColor="#999"
                value={localizacao}
                onChangeText={setLocalizacao}
                style={styles.textInput}
              />
            </View>

            <View style={styles.cadastroInput}>
              <Text style={styles.cadastroText}>Sobre mim</Text>

              <TextInput
                placeholder="Fale um pouco sobre você"
                placeholderTextColor="#999"
                value={sobreMim}
                onChangeText={setSobreMim}
                multiline
                numberOfLines={5}
                textAlignVertical="top"
                style={[styles.textInput, styles.textArea]}
              />
            </View>

            <View style={styles.cadastroInput}>
              <Text style={styles.cadastroText}>Formação</Text>

              <TextInput
                placeholder="Ex.: Análise e Desenvolvimento de Sistemas"
                placeholderTextColor="#999"
                value={formacao}
                onChangeText={setFormacao}
                style={styles.textInput}
              />

              <View style={styles.datas}>
                <TextInput
                  placeholder="Início"
                  placeholderTextColor="#999"
                  value={formacaoInicio}
                  onChangeText={setFormacaoInicio}
                  style={[styles.textInput, styles.dataInput]}
                />

                <TextInput
                  placeholder="Fim"
                  placeholderTextColor="#999"
                  value={formacaoFim}
                  onChangeText={setFormacaoFim}
                  style={[styles.textInput, styles.dataInput]}
                />
              </View>
            </View>

            <View style={styles.cadastroInput}>
              <Text style={styles.cadastroText}>Experiência</Text>

              <TextInput
                placeholder="Ex.: Desenvolvedor Front-end"
                placeholderTextColor="#999"
                value={experiencia}
                onChangeText={setExperiencia}
                style={styles.textInput}
              />

              <View style={styles.datas}>
                <TextInput
                  placeholder="Início"
                  placeholderTextColor="#999"
                  value={experienciaInicio}
                  onChangeText={setExperienciaInicio}
                  style={[styles.textInput, styles.dataInput]}
                />

                <TextInput
                  placeholder="Fim"
                  placeholderTextColor="#999"
                  value={experienciaFim}
                  onChangeText={setExperienciaFim}
                  style={[styles.textInput, styles.dataInput]}
                />
              </View>
            </View>

            <View style={styles.cadastroInput}>
              <Text style={styles.cadastroText}>Linguagens</Text>

              <TextInput
                placeholder="Ex.: JavaScript, React, Python..."
                placeholderTextColor="#999"
                value={linguagens}
                onChangeText={setLinguagens}
                style={styles.textInput}
              />
            </View>

            <View style={styles.cadastroInput}>
              <Text style={styles.cadastroText}>Projetos</Text>

              <TextInput
                placeholder="Adicione seus projetos"
                placeholderTextColor="#999"
                value={projetos}
                onChangeText={setProjetos}
                multiline
                style={[styles.textInput, styles.textAreaSmall]}
              />
            </View>

            <View style={styles.cadastroInput}>
              <Text style={styles.cadastroText}>Pretensão Salarial</Text>

              <TextInput
                placeholder="Ex.: R$ 4.000,00"
                placeholderTextColor="#999"
                value={pretensaoSalarial}
                onChangeText={setPretensaoSalarial}
                keyboardType="numeric"
                style={styles.textInput}
              />
            </View>

            <View style={styles.cadastroInput}>
              <Text style={styles.cadastroText}>Redes sociais</Text>

              <TextInput
                placeholder="LinkedIn, GitHub, Instagram..."
                placeholderTextColor="#999"
                value={redesSociais}
                onChangeText={setRedesSociais}
                style={styles.textInput}
              />
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <Button
              label="Finalizar cadastro"
              color="#7C3DE8"
              onPress={finalizarCadastro}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#070707",
  },

  scroll: {
    width: "100%",
    flex: 1,
  },

  content: {
    width: "100%",
    maxWidth: 600,
    alignSelf: "center",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 30,
    paddingBottom: 50,
  },

  titulo: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 25,
    textAlign: "center",
  },

  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#fff",
    borderWidth: 1,
    borderStyle: "dashed",
    width: 180,
    height: 180,
    alignSelf: "center",
    marginBottom: 10,
    overflow: "hidden",
  },

  image: {
    width: "100%",
    height: "100%",
  },

  imageText: {
    color: "#fff",
    fontSize: 14,
    marginTop: 8,
  },

  cadastro: {
    width: "100%",
    marginTop: 25,
    marginBottom: 10,
  },

  cadastroInput: {
    width: "100%",
    marginBottom: 16,
  },

  cadastroText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 7,
  },

  textInput: {
    borderColor: "#777",
    borderWidth: 1,
    borderRadius: 4,
    color: "#fff",
    paddingHorizontal: 12,
    height: 44,
    width: "100%",
  },

  textArea: {
    height: 110,
    paddingTop: 12,
  },

  textAreaSmall: {
    height: 80,
    paddingTop: 12,
  },

  datas: {
    flexDirection: "row",
    gap: 10,
    marginTop: 10,
  },

  dataInput: {
    flex: 1,
  },

  buttonContainer: {
    width: "100%",
    maxWidth: 300,
    marginTop: 10,
  },
});
