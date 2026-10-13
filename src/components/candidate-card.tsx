import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

type Candidato = {
  id: string;
  nome: string;
  idade: number;
  localizacao: string;
  sobre: string;
  linguagens: string;
  fotos: string[];
};

type Props = {
  candidato: Candidato;
  fotoIndex: number;
  onFotoChange: (index: number) => void;
  onShowDetails: () => void;
  onReject: () => void;
  onApprove: () => void;
};

export default function CandidateCard({
  candidato,
  fotoIndex,
  onFotoChange,
  onShowDetails,
  onReject,
  onApprove,
}: Props) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.card}>
        <ImageBackground
          key={`${candidato.id}-${fotoIndex}`}
          source={{ uri: candidato.fotos[fotoIndex] }}
          style={styles.foto}
          imageStyle={styles.imagem}
          resizeMode="cover"
        >
          <View style={styles.fotoIndicadores}>
            {candidato.fotos.map((_, index) => (
              <Pressable
                key={index}
                style={styles.areaIndicador}
                onPress={() => onFotoChange(index)}
              >
                <View
                  style={[
                    styles.indicador,
                    {
                      backgroundColor:
                        index === fotoIndex
                          ? "#FFFFFF"
                          : "rgba(255,255,255,0.45)",
                    },
                  ]}
                />
              </Pressable>
            ))}
          </View>

          <View style={styles.navegacaoFotos}>
            <Pressable
              accessibilityLabel="Foto anterior"
              style={styles.areaFoto}
              onPress={() =>
                onFotoChange(
                  fotoIndex === 0 ? candidato.fotos.length - 1 : fotoIndex - 1,
                )
              }
            />

            <Pressable
              accessibilityLabel="Próxima foto"
              style={styles.areaFoto}
              onPress={() =>
                onFotoChange((fotoIndex + 1) % candidato.fotos.length)
              }
            />
          </View>

          <View style={styles.informacoes}>
            <Text style={styles.nome}>
              {candidato.nome}, {candidato.idade}
            </Text>

            <Text style={styles.localizacao}>
              <MaterialCommunityIcons
                name="map-marker"
                size={16}
                color="#FFFFFF"
              />{" "}
              {candidato.localizacao}
            </Text>

            <Text style={styles.resumo} numberOfLines={2}>
              {candidato.sobre}
            </Text>

            <View style={styles.tags}>
              {candidato.linguagens.split(", ").map((linguagem) => (
                <View key={linguagem} style={styles.tag}>
                  <Text style={styles.textoTag}>{linguagem}</Text>
                </View>
              ))}
            </View>

            <Pressable
              accessibilityLabel="Ver perfil completo"
              style={styles.botaoDetalhes}
              onPress={onShowDetails}
            >
              <MaterialCommunityIcons
                name="chevron-up"
                size={30}
                color="#FFFFFF"
              />
              <Text style={styles.textoDetalhes}>Ver perfil completo</Text>
            </Pressable>
          </View>
        </ImageBackground>
      </View>

      <View style={styles.acoes}>
        <Pressable
          accessibilityLabel="Descartar candidato"
          style={[styles.botaoAcao, styles.botaoRejeitar]}
          onPress={onReject}
        >
          <MaterialCommunityIcons name="close" size={32} color="#FF5252" />
        </Pressable>

        <Pressable
          accessibilityLabel="Aprovar candidato"
          style={[styles.botaoAcao, styles.botaoAprovar]}
          onPress={onApprove}
        >
          <MaterialCommunityIcons name="heart" size={30} color="#8E53F4" />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    width: "100%",
    maxWidth: 500,
    alignSelf: "center",
  },
  card: {
    flex: 1,
    minHeight: 0,
    borderRadius: 18,
    overflow: "hidden",
    backgroundColor: "#202020",
    marginBottom: 8,
  },
  foto: {
    flex: 1,
    justifyContent: "space-between",
  },
  imagem: {
    borderRadius: 18,
  },
  fotoIndicadores: {
    flexDirection: "row",
    gap: 4,
    paddingHorizontal: 10,
    paddingTop: 12,
    zIndex: 3,
  },
  areaIndicador: {
    flex: 1,
    paddingVertical: 6,
  },
  indicador: {
    height: 3,
    borderRadius: 4,
  },
  navegacaoFotos: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    flexDirection: "row",
    zIndex: 1,
  },
  areaFoto: {
    flex: 1,
  },
  informacoes: {
    paddingHorizontal: 18,
    paddingTop: 50,
    paddingBottom: 8,
    backgroundColor: "rgba(0,0,0,0.64)",
    zIndex: 2,
  },
  nome: {
    color: "#FFFFFF",
    fontSize: 29,
    fontWeight: "bold",
  },
  localizacao: {
    color: "#FFFFFF",
    fontSize: 14,
    marginTop: 5,
  },
  resumo: {
    color: "#F1F1F1",
    fontSize: 14,
    lineHeight: 20,
    marginTop: 10,
  },
  tags: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    marginTop: 10,
  },
  tag: {
    backgroundColor: "rgba(124,61,232,0.85)",
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  textoTag: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
  },
  botaoDetalhes: {
    alignSelf: "center",
    alignItems: "center",
    paddingTop: 6,
    paddingHorizontal: 12,
  },
  textoDetalhes: {
    color: "#FFFFFF",
    fontSize: 12,
    marginTop: -4,
  },
  acoes: {
    height: 66,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 34,
  },
  botaoAcao: {
    width: 54,
    height: 54,
    borderRadius: 28,
    backgroundColor: "#202020",
    alignItems: "center",
    justifyContent: "center",
  },
  botaoRejeitar: {
    borderWidth: 1.5,
    borderColor: "#FF5252",
  },
  botaoAprovar: {
    borderWidth: 1.5,
    borderColor: "#8E53F4",
  },
});
