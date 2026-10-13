import { useRecruitment, type Candidate } from "@/contexts/recruitment-context";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { FlatList, StyleSheet, Text, View } from "react-native";

export default function Lista() {
  const { candidatos, aprovadosIds, prioritariosIds } = useRecruitment();

  const prioritarios = prioritariosIds
    .map((id) => candidatos.find((c) => c.id === id))
    .filter((c): c is Candidate => c !== undefined);

  const outrosIds = aprovadosIds.filter((id) => !prioritariosIds.includes(id));

  const outrosAprovados = outrosIds
    .map((id) => candidatos.find((c) => c.id === id))
    .filter((c): c is Candidate => c !== undefined);

  const lista = [...prioritarios, ...outrosAprovados];

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Candidatos aprovados</Text>

      <Text style={styles.subtitulo}>
        {lista.length} candidatos · {prioritarios.length} prioritários
      </Text>

      <FlatList
        data={lista}
        keyExtractor={(item) => item.id}
        contentContainerStyle={[
          styles.lista,
          lista.length === 0 && styles.listaVazia,
        ]}
        ListEmptyComponent={
          <View style={styles.vazio}>
            <MaterialCommunityIcons
              name="account-group-outline"
              size={58}
              color="#8E53F4"
            />

            <Text style={styles.textoVazio}>
              Nenhum candidato aprovado ainda.
            </Text>

            <Text style={styles.descricaoVazio}>
              Volte para Descobrir e encontre novos talentos.
            </Text>
          </View>
        }
        renderItem={({ item }) => {
          const prioritario = prioritariosIds.includes(item.id);

          return (
            <View style={styles.card}>
              <View style={styles.avatar}>
                <MaterialCommunityIcons
                  name="account-circle"
                  size={46}
                  color="#8E53F4"
                />
              </View>

              <View style={styles.informacoes}>
                <Text style={styles.nome}>
                  {item.nome}, {item.idade}
                </Text>

                <Text style={styles.localizacao}>{item.localizacao}</Text>

                <Text style={styles.linguagens} numberOfLines={2}>
                  {item.linguagens}
                </Text>

                {prioritario && (
                  <View style={styles.selo}>
                    <MaterialCommunityIcons
                      name="star"
                      size={15}
                      color="#C5A5FF"
                    />

                    <Text style={styles.textoSelo}>Prioridade</Text>
                  </View>
                )}
              </View>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#070707",
    paddingTop: 24,
    paddingHorizontal: 18,
  },
  titulo: {
    color: "#FFFFFF",
    fontSize: 25,
    fontWeight: "bold",
  },
  subtitulo: {
    color: "#AAAAAA",
    fontSize: 13,
    marginTop: 8,
    marginBottom: 20,
  },
  lista: {
    paddingBottom: 20,
    gap: 12,
  },
  listaVazia: {
    flexGrow: 1,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#202020",
    borderRadius: 12,
    padding: 14,
    gap: 12,
  },
  avatar: {
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  informacoes: {
    flex: 1,
  },
  nome: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "bold",
  },
  localizacao: {
    color: "#AAAAAA",
    marginTop: 4,
    fontSize: 13,
  },
  linguagens: {
    color: "#DDDDDD",
    fontSize: 13,
    marginTop: 6,
  },
  selo: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    gap: 4,
    marginTop: 8,
    backgroundColor: "#392752",
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 20,
  },
  textoSelo: {
    color: "#D8C2FF",
    fontSize: 12,
    fontWeight: "600",
  },
  vazio: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  textoVazio: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 18,
  },
  descricaoVazio: {
    color: "#AAAAAA",
    textAlign: "center",
    marginTop: 8,
    lineHeight: 20,
  },
});
