import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { useState } from "react";
import { useRecruitment } from "@/contexts/recruitment-context";
import {
  Alert,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

const TOTAL_ETAPAS = 5;
const LIMITE_FOTOS = 3;

type CampoProps = {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (texto: string) => void;
  keyboardType?: "default" | "numeric" | "email-address";
  multiline?: boolean;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
};

function Campo({
  label,
  placeholder,
  value,
  onChangeText,
  keyboardType = "default",
  multiline = false,
  autoCapitalize = "sentences",
}: CampoProps) {
  return (
    <View style={styles.cadastroInput}>
      <Text style={styles.cadastroText}>{label}</Text>

      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#999"
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        multiline={multiline}
        textAlignVertical={multiline ? "top" : "center"}
        style={[styles.textInput, multiline && styles.textArea]}
      />
    </View>
  );
}

export default function Dev() {
  const [etapa, setEtapa] = useState(0);

  const [fotos, setFotos] = useState<string[]>([]);

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
  const { adicionarCandidato } = useRecruitment();
  const router = useRouter();

  const titulos = [
    "Fotos e dados pessoais",
    "Sobre você",
    "Formação e experiência",
    "Tecnologias e projetos",
    "Informações finais",
  ];

  const progresso = ((etapa + 1) / TOTAL_ETAPAS) * 100;

  async function selecionarDaGaleria() {
    const restantes = LIMITE_FOTOS - fotos.length;

    if (restantes <= 0) {
      Alert.alert(
        "Limite de fotos",
        "Você já adicionou as três fotos permitidas.",
      );
      return;
    }

    try {
      const resultado = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsMultipleSelection: true,
        selectionLimit: restantes,
        quality: 0.8,
      });

      if (!resultado.canceled && resultado.assets) {
        const novasFotos = resultado.assets
          .map((foto) => foto.uri)
          .filter(Boolean);

        setFotos((atuais) => {
          const semDuplicados = novasFotos.filter((uri) => !atuais.includes(uri));
          return [...atuais, ...semDuplicados].slice(0, LIMITE_FOTOS);
        });
      }
    } catch {
      Alert.alert(
        "Erro ao abrir a galeria",
        "Não foi possível selecionar as imagens. Tente novamente.",
      );
    }
  }

  async function tirarFoto() {
    if (fotos.length >= LIMITE_FOTOS) {
      Alert.alert("Limite de fotos", "Remova uma foto antes de tirar outra.");
      return;
    }

    try {
      // No navegador, o próprio browser gerencia a solicitação da câmera.
      if (Platform.OS !== "web") {
        const permissao = await ImagePicker.requestCameraPermissionsAsync();

        if (!permissao.granted) {
          Alert.alert(
            "Permissão necessária",
            "Permita o acesso à câmera para tirar uma foto.",
          );
          return;
        }
      }

      const resultado = await ImagePicker.launchCameraAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!resultado.canceled && resultado.assets?.[0]?.uri) {
        const novaFoto = resultado.assets[0].uri;

        setFotos((atuais) => {
          if (atuais.includes(novaFoto)) {
            return atuais;
          }
          return [...atuais, novaFoto].slice(0, LIMITE_FOTOS);
        });
      }
    } catch {
      Alert.alert(
        "Erro ao abrir a câmera",
        "Não foi possível tirar a foto. Confira as permissões e tente novamente.",
      );
    }
  }

  function removerFoto(indice: number) {
    setFotos((atuais) => atuais.filter((_, i) => i !== indice));
  }

  function validarDadosPessoais() {
    if (!nome.trim() || !email.trim() || !idade.trim() || !localizacao.trim()) {
      Alert.alert(
        "Campos obrigatórios",
        "Preencha nome, e-mail, idade e localização.",
      );
      return false;
    }

    if (!email.includes("@") || !email.includes(".")) {
      Alert.alert("E-mail inválido", "Digite um endereço de e-mail válido.");
      return false;
    }

    if (Number(idade) <= 0) {
      Alert.alert("Idade inválida", "Digite uma idade válida.");
      return false;
    }

    if (fotos.length === 0) {
      Alert.alert(
        "Adicione uma foto",
        "Escolha pelo menos uma foto para o seu perfil. Você pode adicionar até três.",
      );
      return false;
    }

    return true;
  }

  function proximaEtapa() {
    if (etapa === 0 && !validarDadosPessoais()) {
      return;
    }

    Keyboard.dismiss();
    setEtapa((atual) => Math.min(atual + 1, TOTAL_ETAPAS - 1));
  }

  function etapaAnterior() {
    Keyboard.dismiss();
    setEtapa((atual) => Math.max(atual - 1, 0));
  }


  function finalizarCadastro() {
    if (!validarDadosPessoais()) {
      setEtapa(0);
      return;
    }

    adicionarCandidato({
      nome: nome.trim(),
      idade: Number(idade),
      localizacao: localizacao.trim(),
      sobre: sobreMim.trim(),
      linguagens: linguagens.trim(),
      formacao: formacao.trim(),
      experiencia: experiencia.trim(),
      projetos: projetos.trim(),
      pretensaoSalarial: pretensaoSalarial.trim(),
      fotos,
    });

    Keyboard.dismiss();

    Alert.alert(
      "Cadastro realizado!",
      `Perfil de ${nome} cadastrado com sucesso.`,
      [
        {
          text: "OK",
          onPress: () => router.replace("/"),
        },
      ],
    );
  }


  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        style={styles.scroll}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        {/* Cabeçalho e progresso */}
        <View style={styles.header}>
          <Text style={styles.titulo}>Crie seu perfil</Text>

          <Text style={styles.contadorEtapas}>
            Etapa {etapa + 1} de {TOTAL_ETAPAS}
          </Text>

          <View style={styles.progressTrack}>
            <View
              style={[
                styles.progressFill,
                { width: `${progresso}%` as `${number}%` },
              ]}
            />
          </View>

          <Text style={styles.tituloEtapa}>{titulos[etapa]}</Text>
        </View>

        <ScrollView
          style={styles.stepScroll}
          contentContainerStyle={styles.stepContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* ETAPA 1: Fotos e dados pessoais */}
          {etapa === 0 && (
            <>
              <Text style={styles.instrucao}>
                Adicione até três fotos para que os recrutadores conheçam você.
              </Text>

              <View style={styles.fotosContainer}>
                {Array.from({ length: LIMITE_FOTOS }).map((_, indice) => {
                  const foto = fotos[indice];

                  return (
                    <View key={indice} style={styles.fotoSlot}>
                      {foto ? (
                        <>
                          <Image
                            source={{ uri: foto }}
                            style={styles.fotoPreview}
                            resizeMode="cover"
                          />

                          <Pressable
                            accessibilityLabel={`Remover foto ${indice + 1}`}
                            style={styles.removerFoto}
                            onPress={() => removerFoto(indice)}
                          >
                            <MaterialCommunityIcons
                              name="close"
                              size={18}
                              color="#FFFFFF"
                            />
                          </Pressable>
                        </>
                      ) : (
                        <Pressable
                          style={styles.adicionarFoto}
                          onPress={selecionarDaGaleria}
                        >
                          <MaterialCommunityIcons
                            name="image-plus"
                            size={27}
                            color="#B99AFF"
                          />
                          <Text style={styles.textoAdicionarFoto}>
                            Foto {indice + 1}
                          </Text>
                        </Pressable>
                      )}
                    </View>
                  );
                })}
              </View>

              <Text style={styles.contadorFotos}>
                {fotos.length} de {LIMITE_FOTOS} fotos adicionadas
              </Text>

              <View style={styles.botoesFotos}>
                <Pressable
                  style={styles.botaoFoto}
                  onPress={selecionarDaGaleria}
                >
                  <MaterialCommunityIcons
                    name="image-multiple"
                    size={21}
                    color="#FFFFFF"
                  />
                  <Text style={styles.textoBotaoFoto}>Galeria</Text>
                </Pressable>

                <Pressable style={styles.botaoFoto} onPress={tirarFoto}>
                  <MaterialCommunityIcons
                    name="camera"
                    size={21}
                    color="#FFFFFF"
                  />
                  <Text style={styles.textoBotaoFoto}>Câmera</Text>
                </Pressable>
              </View>

              <Campo
                label="Nome completo"
                placeholder="Adicione seu nome"
                value={nome}
                onChangeText={setNome}
              />

              <Campo
                label="E-mail"
                placeholder="Adicione seu e-mail"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />

              <Campo
                label="Idade"
                placeholder="Adicione sua idade"
                value={idade}
                onChangeText={setIdade}
                keyboardType="numeric"
              />

              <Campo
                label="Localização"
                placeholder="Ex.: Aquidauana, MS"
                value={localizacao}
                onChangeText={setLocalizacao}
              />
            </>
          )}

          {/* ETAPA 2: Sobre e formação */}
          {etapa === 1 && (
            <>
              <Text style={styles.instrucao}>
                Conte um pouco sobre você e sua trajetória acadêmica.
              </Text>

              <Campo
                label="Sobre mim"
                placeholder="Fale um pouco sobre você"
                value={sobreMim}
                onChangeText={setSobreMim}
                multiline
              />

              <Campo
                label="Formação"
                placeholder="Ex.: Sistemas para Internet"
                value={formacao}
                onChangeText={setFormacao}
              />

              <View style={styles.cadastroInput}>
                <Text style={styles.cadastroText}>Período da formação</Text>

                <View style={styles.datas}>
                  <View style={styles.campoData}>
                    <Campo
                      label="Início"
                      placeholder="Ex.: 2024"
                      value={formacaoInicio}
                      onChangeText={setFormacaoInicio}
                      keyboardType="numeric"
                    />
                  </View>

                  <View style={styles.campoData}>
                    <Campo
                      label="Fim"
                      placeholder="Ex.: 2027"
                      value={formacaoFim}
                      onChangeText={setFormacaoFim}
                      keyboardType="numeric"
                    />
                  </View>
                </View>
              </View>
            </>
          )}

          {/* ETAPA 3: Experiência */}
          {etapa === 2 && (
            <>
              <Text style={styles.instrucao}>
                Apresente sua experiência profissional, mesmo que seja um
                estágio ou sua primeira oportunidade.
              </Text>

              <Campo
                label="Experiência"
                placeholder="Ex.: Desenvolvedor Front-end"
                value={experiencia}
                onChangeText={setExperiencia}
              />

              <Text style={styles.cadastroText}>Período da experiência</Text>

              <View style={styles.datas}>
                <View style={styles.campoData}>
                  <Campo
                    label="Início"
                    placeholder="Ex.: 2025"
                    value={experienciaInicio}
                    onChangeText={setExperienciaInicio}
                    keyboardType="numeric"
                  />
                </View>

                <View style={styles.campoData}>
                  <Campo
                    label="Fim"
                    placeholder="Atual"
                    value={experienciaFim}
                    onChangeText={setExperienciaFim}
                  />
                </View>
              </View>
            </>
          )}

          {/* ETAPA 4: Tecnologias e projetos */}
          {etapa === 3 && (
            <>
              <Text style={styles.instrucao}>
                Mostre quais tecnologias conhece e os projetos que já
                desenvolveu.
              </Text>

              <Campo
                label="Linguagens e tecnologias"
                placeholder="Ex.: JavaScript, React Native, Python"
                value={linguagens}
                onChangeText={setLinguagens}
              />

              <Campo
                label="Projetos"
                placeholder="Descreva seus projetos ou coloque links"
                value={projetos}
                onChangeText={setProjetos}
                multiline
              />
            </>
          )}

          {/* ETAPA 5: Informações finais */}
          {etapa === 4 && (
            <>
              <Text style={styles.instrucao}>
                Finalize seu perfil com as informações que deseja compartilhar.
              </Text>

              <Campo
                label="Pretensão salarial"
                placeholder="Ex.: R$ 4.000,00"
                value={pretensaoSalarial}
                onChangeText={setPretensaoSalarial}
              />

              <Campo
                label="Redes sociais"
                placeholder="LinkedIn, GitHub ou portfólio"
                value={redesSociais}
                onChangeText={setRedesSociais}
              />

              <View style={styles.resumoCadastro}>
                <Text style={styles.resumoTitulo}>Resumo do perfil</Text>

                <Text style={styles.resumoTexto}>Nome: {nome}</Text>
                <Text style={styles.resumoTexto}>E-mail: {email}</Text>
                <Text style={styles.resumoTexto}>
                  Fotos adicionadas: {fotos.length}
                </Text>
                <Text style={styles.resumoTexto}>
                  Tecnologias: {linguagens || "Não preenchidas"}
                </Text>
              </View>
            </>
          )}
        </ScrollView>

        {/* Navegação entre as etapas */}
        <View style={styles.navegacao}>
          <Pressable
            disabled={etapa === 0}
            style={[
              styles.botaoNavegacao,
              styles.botaoVoltar,
              etapa === 0 && styles.botaoDesabilitado,
            ]}
            onPress={etapaAnterior}
          >
            <MaterialCommunityIcons
              name="arrow-left"
              size={20}
              color={etapa === 0 ? "#666666" : "#FFFFFF"}
            />
            <Text
              style={[
                styles.textoBotaoNavegacao,
                etapa === 0 && styles.textoDesabilitado,
              ]}
            >
              Voltar
            </Text>
          </Pressable>

          {etapa < TOTAL_ETAPAS - 1 ? (
            <Pressable
              style={[styles.botaoNavegacao, styles.botaoProximo]}
              onPress={proximaEtapa}
            >
              <Text style={styles.textoBotaoNavegacao}>Próximo</Text>
              <MaterialCommunityIcons
                name="arrow-right"
                size={20}
                color="#FFFFFF"
              />
            </Pressable>
          ) : (
            <Pressable
              style={[styles.botaoNavegacao, styles.botaoProximo]}
              onPress={finalizarCadastro}
            >
              <Text style={styles.textoBotaoNavegacao}>Finalizar</Text>
              <MaterialCommunityIcons name="check" size={20} color="#FFFFFF" />
            </Pressable>
          )}
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#070707",
  },
  scroll: {
    flex: 1,
    width: "100%",
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 22,
    paddingBottom: 12,
  },
  titulo: {
    color: "#FFFFFF",
    fontSize: 27,
    fontWeight: "700",
  },
  contadorEtapas: {
    color: "#AAAAAA",
    fontSize: 13,
    marginTop: 6,
  },
  progressTrack: {
    width: "100%",
    height: 7,
    backgroundColor: "#29232F",
    borderRadius: 8,
    overflow: "hidden",
    marginTop: 16,
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#8E53F4",
    borderRadius: 8,
  },
  tituloEtapa: {
    color: "#B99AFF",
    fontSize: 19,
    fontWeight: "700",
    marginTop: 17,
  },
  stepScroll: {
    flex: 1,
  },
  stepContent: {
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 20,
  },
  instrucao: {
    color: "#AAAAAA",
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 18,
  },
  fotosContainer: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 10,
  },
  fotoSlot: {
    flex: 1,
    height: 112,
    borderWidth: 1,
    borderColor: "#594574",
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#17131E",
  },
  fotoPreview: {
    width: "100%",
    height: "100%",
  },
  adicionarFoto: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 7,
  },
  textoAdicionarFoto: {
    color: "#D8C2FF",
    fontSize: 12,
  },
  removerFoto: {
    position: "absolute",
    top: 5,
    right: 5,
    width: 25,
    height: 25,
    borderRadius: 14,
    backgroundColor: "#9D1212",
    alignItems: "center",
    justifyContent: "center",
  },
  contadorFotos: {
    color: "#AAAAAA",
    fontSize: 12,
    marginBottom: 12,
  },
  botoesFotos: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 22,
  },
  botaoFoto: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "#29232F",
    borderWidth: 1,
    borderColor: "#594574",
    borderRadius: 8,
    paddingVertical: 11,
  },
  textoBotaoFoto: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
  cadastroInput: {
    width: "100%",
    marginBottom: 16,
  },
  cadastroText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 7,
  },
  textInput: {
    borderColor: "#555555",
    borderWidth: 1,
    borderRadius: 8,
    color: "#FFFFFF",
    backgroundColor: "#121212",
    paddingHorizontal: 12,
    height: 46,
    width: "100%",
  },
  textArea: {
    height: 120,
    paddingTop: 12,
  },
  datas: {
    flexDirection: "row",
    gap: 12,
  },
  campoData: {
    flex: 1,
  },
  navegacao: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: Platform.OS === "ios" ? 24 : 14,
    backgroundColor: "#070707",
    borderTopWidth: 1,
    borderTopColor: "#222222",
  },
  botaoNavegacao: {
    flex: 1,
    minHeight: 48,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 12,
  },
  botaoVoltar: {
    backgroundColor: "#202020",
    borderWidth: 1,
    borderColor: "#444444",
  },
  botaoProximo: {
    backgroundColor: "#7C3DE8",
  },
  botaoDesabilitado: {
    backgroundColor: "#151515",
    borderColor: "#292929",
  },
  textoBotaoNavegacao: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },
  textoDesabilitado: {
    color: "#666666",
  },
  resumoCadastro: {
    backgroundColor: "#17131E",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#49345F",
    padding: 16,
    marginTop: 12,
  },
  resumoTitulo: {
    color: "#B99AFF",
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 10,
  },
  resumoTexto: {
    color: "#DDDDDD",
    fontSize: 13,
    lineHeight: 22,
  },
});
