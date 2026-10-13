import CandidateCard from "@/components/candidate-card";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

const candidatos = [
  {
    id: "1",
    nome: "Ana Silva",
    idade: 22,
    localizacao: "Campo Grande, MS",
    sobre:
      "Desenvolvedora Front-end apaixonada por interfaces e experiências digitais.",
    linguagens: "React, JavaScript, TypeScript",
    formacao: "Análise e Desenvolvimento de Sistemas",
    experiencia: "Desenvolvedora Front-end",
    projetos: "Portfólio pessoal e aplicações web.",
    pretensaoSalarial: "R$ 4.000,00",
    fotos: [
      "https://randomuser.me/api/portraits/women/44.jpg",
      "https://randomuser.me/api/portraits/women/68.jpg",
      "https://randomuser.me/api/portraits/women/65.jpg",
    ],
  },
  {
    id: "2",
    nome: "Lucas Santos",
    idade: 24,
    localizacao: "Aquidauana, MS",
    sobre:
      "Desenvolvedor interessado em aplicações mobile e soluções inovadoras.",
    linguagens: "React Native, Node.js, SQL",
    formacao: "Sistemas para Internet",
    experiencia: "Desenvolvedor Mobile",
    projetos: "Aplicativos mobile e APIs.",
    pretensaoSalarial: "R$ 5.000,00",
    fotos: [
      "https://randomuser.me/api/portraits/men/32.jpg",
      "https://randomuser.me/api/portraits/men/75.jpg",
      "https://randomuser.me/api/portraits/men/52.jpg",
    ],
  },
  {
    id: "3",
    nome: "Marina Costa",
    idade: 21,
    localizacao: "Dourados, MS",
    sobre: "Estudante de tecnologia que gosta de aprender novas ferramentas.",
    linguagens: "Python, JavaScript, Git",
    formacao: "Ciência da Computação",
    experiencia: "Desenvolvedora Júnior",
    projetos: "Projetos acadêmicos e aplicações Python.",
    pretensaoSalarial: "R$ 3.500,00",
    fotos: [
      "https://randomuser.me/api/portraits/women/49.jpg",
      "https://randomuser.me/api/portraits/women/33.jpg",
      "https://randomuser.me/api/portraits/women/21.jpg",
    ],
  },
];

export default function Recrutador() {
  const [indice, setIndice] = useState(0);
  const [fotoIndex, setFotoIndex] = useState(0);
  const [aprovados, setAprovados] = useState<string[]>([]);
  const [descartados, setDescartados] = useState<string[]>([]);
  const [bioAberta, setBioAberta] = useState(false);
  const [proAberto, setProAberto] = useState(false);
  const router = useRouter();

  const candidato = candidatos[indice];

  function avaliar(aprovado: boolean) {
    if (!candidato) return;

    if (aprovado) {
      setAprovados((atual) => [...atual, candidato.id]);
    } else {
      setDescartados((atual) => [...atual, candidato.id]);
    }

    setIndice((atual) => atual + 1);
    setFotoIndex(0);
  }

  function reiniciar() {
    setIndice(0);
    setFotoIndex(0);
    setAprovados([]);
    setDescartados([]);
  }

  if (!candidato) {
    return (
      <View style={[styles.container, styles.estadoVazio]}>
        <MaterialCommunityIcons
          name="check-circle-outline"
          size={64}
          color="#8E53F4"
        />

        <Text style={styles.titulo}>Você viu todos!</Text>

        <Text style={styles.textoSecundario}>
          {aprovados.length} aprovados · {descartados.length} descartados
        </Text>

        <Pressable style={styles.botaoReiniciar} onPress={reiniciar}>
          <Text style={styles.textoBotao}>Ver novamente</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <Text style={styles.logo} onPress={() => router.push("/")}>
          Devinder
        </Text>

        <Text style={styles.contador}>
          {indice + 1} de {candidatos.length}
        </Text>
      </View>

      {/* Card reutilizável */}
      <CandidateCard
        key={candidato.id}
        candidato={candidato}
        fotoIndex={fotoIndex}
        onFotoChange={setFotoIndex}
        onShowDetails={() => setBioAberta(true)}
        onReject={() => avaliar(false)}
        onApprove={() => avaliar(true)}
      />

      {/* Gaveta com os detalhes do candidato */}
      <Modal
        visible={bioAberta}
        transparent
        animationType="slide"
        onRequestClose={() => setBioAberta(false)}
      >
        <View style={styles.modalFundo}>
          <Pressable
            style={styles.areaFechar}
            onPress={() => setBioAberta(false)}
          />

          <View style={styles.gaveta}>
            <View style={styles.alca} />

            <View style={styles.gavetaCabecalho}>
              <Text style={styles.tituloGaveta}>Perfil do candidato</Text>

              <Pressable onPress={() => setBioAberta(false)}>
                <MaterialCommunityIcons
                  name="close"
                  size={26}
                  color="#FFFFFF"
                />
              </Pressable>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.nomeGaveta}>
                {candidato.nome}, {candidato.idade}
              </Text>

              <Text style={styles.textoSecundario}>
                {candidato.localizacao}
              </Text>

              <Text style={styles.subtitulo}>Sobre mim</Text>
              <Text style={styles.textoGaveta}>{candidato.sobre}</Text>

              <Text style={styles.subtitulo}>Formação</Text>
              <Text style={styles.textoGaveta}>{candidato.formacao}</Text>

              <Text style={styles.subtitulo}>Experiência</Text>
              <Text style={styles.textoGaveta}>{candidato.experiencia}</Text>

              <Text style={styles.subtitulo}>Linguagens e tecnologias</Text>
              <Text style={styles.textoGaveta}>{candidato.linguagens}</Text>

              <Text style={styles.subtitulo}>Projetos</Text>
              <Text style={styles.textoGaveta}>{candidato.projetos}</Text>

              <Text style={styles.subtitulo}>Pretensão salarial</Text>

              <Pressable
                style={styles.salarioBloqueado}
                onPress={() => {
                  setBioAberta(false);
                  setProAberto(true);
                }}
              >
                <MaterialCommunityIcons name="lock" color="#B99AFF" size={22} />

                <View style={styles.salarioInformacoes}>
                  <Text style={styles.salarioOculto}>R$ ••••••</Text>

                  <Text style={styles.textoBloqueado}>
                    Disponível no RecrutaDEV PRO
                  </Text>
                </View>

                <MaterialCommunityIcons
                  name="chevron-right"
                  color="#FFFFFF"
                  size={24}
                />
              </Pressable>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Modal de upgrade PRO */}
      <Modal
        visible={proAberto}
        transparent
        animationType="fade"
        onRequestClose={() => setProAberto(false)}
      >
        <View style={styles.modalProFundo}>
          <View style={styles.modalPro}>
            <MaterialCommunityIcons name="crown" size={48} color="#B99AFF" />

            <Text style={styles.tituloPro}>RecrutaDEV PRO</Text>

            <Text style={styles.textoPro}>
              Desbloqueie a pretensão salarial, a análise do candidato e
              recursos exclusivos de recrutamento.
            </Text>

            <Text style={styles.textoPro}>
              FREE: swipes ilimitados e até 3 disparos por sessão.
            </Text>

            <Text style={styles.textoPro}>
              PRO: disparos ilimitados e opção de desfazer o último swipe.
            </Text>

            <Pressable
              style={styles.botaoPro}
              onPress={() => setProAberto(false)}
            >
              <Text style={styles.textoBotao}>Entendi</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

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
    paddingHorizontal: 14,
    paddingTop: 8,
    paddingBottom: 4,
  },
  header: {
    height: 42,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 4,
  },
  logo: {
    color: "#8E53F4",
    fontSize: 23,
    fontWeight: "bold",
  },
  contador: {
    color: "#AAAAAA",
    fontSize: 13,
  },
  estadoVazio: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 0,
    paddingBottom: 0,
  },
  titulo: {
    color: "#FFFFFF",
    fontSize: 25,
    fontWeight: "bold",
    marginVertical: 20,
  },
  textoSecundario: {
    color: "#AAAAAA",
    fontSize: 14,
    marginTop: 6,
  },
  botaoReiniciar: {
    backgroundColor: "#7C3DE8",
    paddingVertical: 14,
    paddingHorizontal: 24,
    minWidth: 190,
    borderRadius: 8,
    alignItems: "center",
    alignSelf: "center",
    marginTop: 24,
  },
  textoBotao: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  rodape: {
    color: "#777777",
    fontSize: 11,
    textAlign: "center",
    paddingBottom: 2,
  },
  modalFundo: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.65)",
  },
  areaFechar: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  gaveta: {
    height: "78%",
    backgroundColor: "#171717",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 22,
    paddingTop: 12,
    paddingBottom: 24,
  },
  alca: {
    width: 42,
    height: 5,
    backgroundColor: "#666666",
    borderRadius: 5,
    alignSelf: "center",
    marginBottom: 18,
  },
  gavetaCabecalho: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 22,
  },
  tituloGaveta: {
    color: "#FFFFFF",
    fontSize: 19,
    fontWeight: "bold",
  },
  nomeGaveta: {
    color: "#FFFFFF",
    fontSize: 25,
    fontWeight: "bold",
  },
  subtitulo: {
    color: "#B99AFF",
    fontSize: 15,
    fontWeight: "bold",
    marginTop: 22,
    marginBottom: 7,
  },
  textoGaveta: {
    color: "#E5E5E5",
    fontSize: 14,
    lineHeight: 21,
  },
  salarioBloqueado: {
    backgroundColor: "#29232F",
    borderRadius: 10,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 25,
  },
  salarioInformacoes: {
    flex: 1,
  },
  salarioOculto: {
    color: "#D4C5F5",
    fontWeight: "bold",
    fontSize: 17,
  },
  textoBloqueado: {
    color: "#B99AFF",
    fontSize: 12,
    marginTop: 4,
  },
  modalProFundo: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: "rgba(0,0,0,0.8)",
  },
  modalPro: {
    width: "100%",
    maxWidth: 380,
    backgroundColor: "#202020",
    borderRadius: 20,
    padding: 24,
    alignItems: "center",
  },
  tituloPro: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 12,
    marginBottom: 16,
  },
  textoPro: {
    color: "#D1D1D1",
    fontSize: 14,
    lineHeight: 21,
    textAlign: "center",
    marginBottom: 12,
  },
  botaoPro: {
    backgroundColor: "#7C3DE8",
    paddingVertical: 14,
    paddingHorizontal: 36,
    borderRadius: 8,
    marginTop: 12,
  },
});
