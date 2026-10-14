import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useRouter } from "expo-router";
import { useRecruitment } from "@/contexts/recruitment-context";
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function DevPerfil() {
  const router = useRouter();

  const {
    candidatos,
    perfilAtualId,
    sairDoPerfil,
    excluirCandidato,
  } = useRecruitment();

  const candidato = candidatos.find(
    (item) => item.id === perfilAtualId
  );

  async function logout() {
    await sairDoPerfil();
    router.replace("/");
  }

  function excluirPerfil() {
    if (!candidato) return;

    Alert.alert(
      "Excluir perfil",
      "Tem certeza de que deseja excluir seu perfil? Essa ação não pode ser desfeita.",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: () => {
            excluirCandidato(candidato.id);
            sairDoPerfil();
            router.replace("/");
          },
        },
      ]
    );
  }

  if (!candidato) {
    return (
      <View style={styles.container}>
        <MaterialCommunityIcons
          name="account-alert-outline"
          size={60}
          color="#B99AFF"
        />

        <Text style={styles.titulo}>Nenhum perfil selecionado</Text>

        <Pressable
          style={styles.botaoPrincipal}
          onPress={() => router.replace("/dev-cadastro")}
        >
          <Text style={styles.textoBotao}>Criar perfil</Text>
        </Pressable>

        <Pressable onPress={logout} style={styles.botaoSecundario}>
          <Text style={styles.textoBotao}>Voltar ao início</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.conteudo}
    >
      <View style={styles.header}>
        <Text style={styles.titulo}>Meu perfil</Text>

        <Pressable onPress={logout} accessibilityLabel="Sair da conta">
          <MaterialCommunityIcons
            name="logout"
            size={27}
            color="#FFFFFF"
          />
        </Pressable>
      </View>

      {candidato.fotos?.[0] && (
        <Image
          source={{ uri: candidato.fotos[0] }}
          style={styles.foto}
        />
      )}

      <Text style={styles.nome}>
        {candidato.nome}, {candidato.idade}
      </Text>

      <Text style={styles.localizacao}>
        {candidato.localizacao}
      </Text>

      <View style={styles.secao}>
        <Text style={styles.rotulo}>Sobre mim</Text>
        <Text style={styles.valor}>
          {candidato.sobre || "Não informado"}
        </Text>

        <Text style={styles.rotulo}>E-mail</Text>
        <Text style={styles.valor}>
          {candidato.email || "Não informado"}
        </Text>

        <Text style={styles.rotulo}>Formação</Text>
        <Text style={styles.valor}>
          {candidato.formacao || "Não informado"}
        </Text>

        <Text style={styles.rotulo}>Experiência</Text>
        <Text style={styles.valor}>
          {candidato.experiencia || "Não informado"}
        </Text>

        <Text style={styles.rotulo}>Tecnologias</Text>
        <Text style={styles.valor}>
          {candidato.linguagens || "Não informado"}
        </Text>

        <Text style={styles.rotulo}>Projetos</Text>
        <Text style={styles.valor}>
          {candidato.projetos || "Não informado"}
        </Text>

        <Text style={styles.rotulo}>Pretensão salarial</Text>
        <Text style={styles.valor}>
          {candidato.pretensaoSalarial || "Não informado"}
        </Text>

        <Text style={styles.rotulo}>Redes sociais</Text>
        <Text style={styles.valor}>
          {candidato.redesSociais || "Não informado"}
        </Text>
      </View>

      <Pressable
        style={styles.botaoPrincipal}
        onPress={() =>
          router.push({
            pathname: "/dev-cadastro",
            params: { editarId: candidato.id },
          })
        }
      >
        <MaterialCommunityIcons
          name="account-edit-outline"
          size={21}
          color="#FFFFFF"
        />
        <Text style={styles.textoBotao}>Editar perfil</Text>
      </Pressable>

      <Pressable
        style={styles.botaoExcluir}
        onPress={excluirPerfil}
      >
        <MaterialCommunityIcons
          name="trash-can-outline"
          size={21}
          color="#FF7070"
        />
        <Text style={styles.textoExcluir}>Excluir perfil</Text>
      </Pressable>

      <Pressable style={styles.botaoSecundario} onPress={logout}>
        <MaterialCommunityIcons
          name="logout"
          size={20}
          color="#FFFFFF"
        />
        <Text style={styles.textoBotao}>Sair</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#070707",
  },
  conteudo: {
    padding: 22,
    paddingBottom: 40,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  titulo: {
    color: "#FFFFFF",
    fontSize: 26,
    fontWeight: "bold",
  },
  foto: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignSelf: "center",
    marginBottom: 18,
    backgroundColor: "#202020",
  },
  nome: {
    color: "#FFFFFF",
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
  },
  localizacao: {
    color: "#AAAAAA",
    fontSize: 14,
    textAlign: "center",
    marginTop: 7,
    marginBottom: 25,
  },
  secao: {
    backgroundColor: "#171717",
    borderRadius: 12,
    padding: 17,
    marginBottom: 20,
  },
  rotulo: {
    color: "#B99AFF",
    fontWeight: "bold",
    fontSize: 14,
    marginTop: 12,
    marginBottom: 5,
  },
  valor: {
    color: "#EEEEEE",
    fontSize: 15,
    lineHeight: 22,
  },
  botaoPrincipal: {
    backgroundColor: "#7C3DE8",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 9,
    padding: 15,
    borderRadius: 9,
    marginBottom: 12,
  },
  botaoExcluir: {
    borderWidth: 1,
    borderColor: "#8D3030",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 9,
    padding: 15,
    borderRadius: 9,
    marginBottom: 12,
  },
  botaoSecundario: {
    backgroundColor: "#252525",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 9,
    padding: 15,
    borderRadius: 9,
  },
  textoBotao: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  textoExcluir: {
    color: "#FF7070",
    fontWeight: "bold",
  },
});