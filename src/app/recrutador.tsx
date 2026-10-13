import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useState } from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";

const candidatos = [
  {
    id: "1",
    nome: "Ana Silva",
    idade: 22,
    localizacao: "Campo Grande, MS",
    sobre: "Desenvolvedora Front-end apaixonada por interfaces.",
    linguagens: "React, JavaScript, TypeScript",
  },
  {
    id: "2",
    nome: "Lucas Santos",
    idade: 24,
    localizacao: "Aquidauana, MS",
    sobre: "Desenvolvedor interessado em aplicações mobile.",
    linguagens: "React Native, Node.js, SQL",
  },
  {
    id: "3",
    nome: "Marina Costa",
    idade: 21,
    localizacao: "Dourados, MS",
    sobre: "Estudante de tecnologia e desenvolvedora iniciante.",
    linguagens: "Python, JavaScript, Git",
  },
];

export default function Recrutador() {
  const [indice, setIndice] = useState(0);
  const [aprovados, setAprovados] = useState<string[]>([]);
  const [descartados, setDescartados] = useState<string[]>([]);

  const candidato = candidatos[indice];

  function avaliar(aprovado: boolean) {
    if (!candidato) return;

    if (aprovado) {
      setAprovados((atual) => [...atual, candidato.id]);
    } else {
      setDescartados((atual) => [...atual, candidato.id]);
    }

    setIndice((atual) => atual + 1);
  }

  if (!candidato) {
    return (
      <View style={styles.container}>
        <MaterialCommunityIcons
          name="check-circle-outline"
          size={64}
          color="#8E53F4"
        />

        <Text style={styles.titulo}>Você viu todos!</Text>

        <Text style={styles.descricao}>
          {aprovados.length} aprovados · {descartados.length} descartados
        </Text>

        <Pressable style={styles.botao} onPress={() => setIndice(0)}>
          <Text style={styles.textoBotao}>Ver novamente</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>Devinder</Text>

        <Text style={styles.contador}>
          Candidato {indice + 1} de {candidatos.length}
        </Text>
      </View>

      <View style={styles.card}>
        <View style={styles.fotoContainer}>
          <MaterialCommunityIcons
            name="account-circle"
            size={130}
            color="#8E53F4"
          />
        </View>

        <View style={styles.informacoes}>
          <Text style={styles.nome}>
            {candidato.nome}, {candidato.idade}
          </Text>

          <Text style={styles.localizacao}>
            <MaterialCommunityIcons name="map-marker" size={16} />{" "}
            {candidato.localizacao}
          </Text>

          <Text style={styles.subtitulo}>Sobre mim</Text>
          <Text style={styles.descricao}>{candidato.sobre}</Text>

          <Text style={styles.subtitulo}>Linguagens</Text>
          <Text style={styles.descricao}>{candidato.linguagens}</Text>
        </View>

        <View style={styles.acoes}>
          <Pressable
            accessibilityLabel="Descartar candidato"
            style={[styles.acao, styles.rejeitar]}
            onPress={() => avaliar(false)}
          >
            <MaterialCommunityIcons name="close" size={30} color="#FF5252" />
          </Pressable>

          <Pressable
            accessibilityLabel="Ver detalhes do candidato"
            style={[styles.acao, styles.detalhes]}
            onPress={() =>
              Alert.alert(
                candidato.nome,
                `${candidato.sobre}\n\nLinguagens: ${candidato.linguagens}`,
              )
            }
          >
            <MaterialCommunityIcons
              name="account-details-outline"
              size={26}
              color="#FFFFFF"
            />
          </Pressable>

          <Pressable
            accessibilityLabel="Aprovar candidato"
            style={[styles.acao, styles.aprovar]}
            onPress={() => avaliar(true)}
          >
            <MaterialCommunityIcons name="heart" size={28} color="#8E53F4" />
          </Pressable>
        </View>
      </View>

      <Text style={styles.rodape}>
        {aprovados.length} aprovados · {descartados.length} descartados
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#070707",
    padding: 20,
    justifyContent: "center",
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    color: "#8E53F4",
    fontSize: 28,
    fontWeight: "bold",
  },
  contador: {
    color: "#AAAAAA",
    marginTop: 8,
  },
  card: {
    backgroundColor: "#202020",
    borderRadius: 16,
    overflow: "hidden",
    width: "100%",
    maxWidth: 420,
    alignSelf: "center",
  },
  fotoContainer: {
    height: 220,
    backgroundColor: "#151515",
    alignItems: "center",
    justifyContent: "center",
  },
  informacoes: {
    padding: 18,
  },
  nome: {
    color: "#FFFFFF",
    fontSize: 25,
    fontWeight: "bold",
  },
  localizacao: {
    color: "#BBBBBB",
    marginTop: 8,
  },
  subtitulo: {
    color: "#8E53F4",
    fontWeight: "bold",
    marginTop: 18,
    marginBottom: 6,
  },
  descricao: {
    color: "#EEEEEE",
    lineHeight: 21,
  },
  acoes: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 22,
    padding: 16,
  },
  acao: {
    width: 52,
    height: 52,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#303030",
  },
  rejeitar: {
    borderWidth: 1,
    borderColor: "#FF5252",
  },
  detalhes: {
    borderWidth: 1,
    borderColor: "#555555",
  },
  aprovar: {
    borderWidth: 1,
    borderColor: "#8E53F4",
  },
  botao: {
    backgroundColor: "#7C3DE8",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 24,
  },
  textoBotao: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  rodape: {
    textAlign: "center",
    color: "#AAAAAA",
    marginTop: 20,
  },
});
