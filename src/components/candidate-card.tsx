import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import { Gesture, GestureDetector } from "react-native-gesture-handler";

import Animated, {
    Extrapolation,
    interpolate,
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withSequence,
    withSpring,
    withTiming,
} from "react-native-reanimated";

import { scheduleOnRN } from "react-native-worklets";

import { useEffect, useState } from "react";
import {
    Pressable,
    StyleSheet,
    Text,
    useWindowDimensions,
    View,
} from "react-native";

type Candidato = {
  id: string;
  nome: string;
  idade: number;
  localizacao: string;
  sobre: string;
  linguagens: string;
  fotos?: string[];
  foto?: string;
};

type Props = {
  candidato: Candidato;
  fotoIndex: number;
  onFotoChange: (index: number) => void;
  onShowDetails: () => void;
  onReject: () => void;
  onApprove: () => void;
  onFire: () => void;
  canFire: boolean;
  onUndo: () => void;
  isPro: boolean;
};

export default function CandidateCard({
  candidato,
  fotoIndex,
  onFotoChange,
  onShowDetails,
  onReject,
  onApprove,
  onFire,
  canFire,
  onUndo,
  isPro,
}: Props) {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const destaqueProgress = useSharedValue(0);
  const destaqueAtivo = useSharedValue(false);
  const { width } = useWindowDimensions();
  const [zoomAtivo, setZoomAtivo] = useState(false);
  const infoOculta = useSharedValue(false);
  const scale = useSharedValue(1);
  const savedScale = useSharedValue(1);

  useEffect(() => {
    scale.value = 1;
    savedScale.value = 1;
    infoOculta.value = false;
    setZoomAtivo(false);
    translateX.value = 0;
    translateY.value = 0;
  }, [candidato.id, fotoIndex]);

  const destaqueStyle = useAnimatedStyle(() => {
    const escala = interpolate(
      destaqueProgress.value,
      [0, 0.5, 1],
      [0.4, 1.2, 1],
      Extrapolation.CLAMP,
    );

    const opacidade = interpolate(
      destaqueProgress.value,
      [0, 0.2, 1],
      [0, 1, 1],
      Extrapolation.CLAMP,
    );

    return {
      opacity: opacidade,
      transform: [{ scale: escala }],
    };
  });

  function handleFire() {
    // Se o limite Free acabou, abre a modal sem mostrar um falso destaque.
    if (!canFire) {
      onFire();
      return;
    }

    // Evita disparar mais de uma vez durante a animação.
    if (destaqueAtivo.value) {
      return;
    }

    destaqueAtivo.value = true;
    destaqueProgress.value = 0;

    destaqueProgress.value = withSequence(
      withTiming(1, { duration: 220 }),
      withDelay(
        300,
        withTiming(0, { duration: 200 }, (finished) => {
          destaqueAtivo.value = false;

          if (finished) {
            scheduleOnRN(onFire);
          }
        }),
      ),
    );
  }
  const animatedImageStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const panGesture = Gesture.Pan()
    .maxPointers(1)
    .activeOffsetX([-10, 10])
    .activeOffsetY([-15, 15])
    .onUpdate((event) => {
      translateX.value = event.translationX;
      translateY.value =
        event.translationY < 0
          ? event.translationY
          : event.translationY * 0.2;
    })
    .onEnd((event) => {
      const passouDoLimite = Math.abs(event.translationX) > width * 0.25;
      const movimentoRapido = Math.abs(event.velocityX) > 900;
      const isHorizontal = passouDoLimite || movimentoRapido;

      const swipeParaCima =
        (event.translationY < -80 ||
          (event.translationY < -40 && event.velocityY < -600)) &&
        Math.abs(event.translationY) > Math.abs(event.translationX);

      // Prioridade absoluta para swipe horizontal (aprovar/descartar) quando dominante
      if (
        isHorizontal &&
        Math.abs(event.translationX) >= Math.abs(event.translationY)
      ) {
        translateY.value = withSpring(0);
        const direcao =
          event.translationX !== 0
            ? event.translationX > 0
              ? 1
              : -1
            : event.velocityX > 0
              ? 1
              : -1;

        translateX.value = withTiming(
          direcao * (width + 100),
          { duration: 220 },
          (finished) => {
            if (finished) {
              if (direcao > 0) {
                scheduleOnRN(onApprove);
              } else {
                scheduleOnRN(onReject);
              }
            }
          },
        );
      } else if (swipeParaCima) {
        // Swipe para cima abre a Bottom Sheet sem aprovar ou descartar
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
        scheduleOnRN(onShowDetails);
      } else {
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
      }
    });

  const pinchGesture = Gesture.Pinch()
    .onUpdate((event) => {
      const novoZoom = Math.max(1, Math.min(savedScale.value * event.scale, 3));

      scale.value = novoZoom;

      if (novoZoom > 1.08 && !infoOculta.value) {
        infoOculta.value = true;
        scheduleOnRN(setZoomAtivo, true);
      } else if (novoZoom <= 1.08 && infoOculta.value) {
        infoOculta.value = false;
        scheduleOnRN(setZoomAtivo, false);
      }
    })
    .onEnd(() => {
      savedScale.value = scale.value;
    });

  const fotos =
    candidato.fotos && candidato.fotos.length > 0
      ? candidato.fotos
      : candidato.foto
        ? [candidato.foto]
        : [];
  const fotoAtual = fotos[fotoIndex] || fotos[0] || "";
  const temMultiplasFotos = fotos.length > 1;

  const doubleTapGesture = Gesture.Tap()
    .numberOfTaps(2)
    .maxDuration(300)
    .maxDelay(250)
    .onEnd((_event, success) => {
      if (success) {
        scheduleOnRN(handleFire);
      }
    });

  const cardGesture = Gesture.Race(panGesture, doubleTapGesture);
  const animatedCardStyle = useAnimatedStyle(() => {
    const rotacao = interpolate(
      translateX.value,
      [-width, 0, width],
      [-12, 0, 12],
      Extrapolation.CLAMP,
    );

    const opacidade = interpolate(
      Math.abs(translateX.value),
      [0, width],
      [1, 0.75],
      Extrapolation.CLAMP,
    );

    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { rotate: `${rotacao}deg` },
      ],
      opacity: opacidade,
    };
  });
  const combinedGesture = Gesture.Simultaneous(cardGesture, pinchGesture);

  return (
    <View style={styles.wrapper}>
      <GestureDetector gesture={combinedGesture}>
        <Animated.View style={[styles.card, animatedCardStyle]}>
          <View style={styles.foto}>
            {fotoAtual ? (
              <Animated.Image
                key={`${candidato.id}-${fotoIndex}`}
                source={{ uri: fotoAtual }}
                style={[styles.imagem, animatedImageStyle]}
                resizeMode="cover"
              />
            ) : null}

            {temMultiplasFotos && (
              <View pointerEvents="box-none" style={styles.fotoIndicadores}>
                {fotos.map((_, index) => (
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
            )}

            {temMultiplasFotos && (
              <View pointerEvents="box-none" style={styles.navegacaoFotos}>
                <Pressable
                  accessibilityLabel="Foto anterior"
                  style={[styles.controleFoto, styles.controleFotoEsquerda]}
                  onPress={() => {
                    if (fotoIndex > 0) {
                      onFotoChange(fotoIndex - 1);
                    }
                  }}
                />

                <Pressable
                  accessibilityLabel="Próxima foto"
                  style={[styles.controleFoto, styles.controleFotoDireita]}
                  onPress={() => {
                    if (fotoIndex < fotos.length - 1) {
                      onFotoChange(fotoIndex + 1);
                    }
                  }}
                />
              </View>
            )}

            {!zoomAtivo && (
              <View style={styles.informacoes}>
                <View style={styles.cabecalhoInfo}>
                  <Text style={styles.nome} numberOfLines={1}>
                    {candidato.nome}, {candidato.idade}
                  </Text>
                  <Pressable
                    accessibilityLabel="Informações do candidato"
                    accessibilityRole="button"
                    style={styles.botaoInfo}
                    onPress={onShowDetails}
                  >
                    <MaterialCommunityIcons
                      name="information-outline"
                      size={24}
                      color="#FFFFFF"
                    />
                  </Pressable>
                </View>

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
            )}
          </View>
          <Animated.View
            pointerEvents="none"
            style={[styles.destaqueOverlay, destaqueStyle]}
          >
            <View style={styles.destaqueBadge}>
              <MaterialCommunityIcons
                name="star-four-points"
                size={64}
                color="#F6C453"
              />

              <Text style={styles.destaqueTexto}>DESTACADO!</Text>
            </View>
          </Animated.View>
        </Animated.View>
      </GestureDetector>

      <View style={styles.acoes}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={
            isPro
              ? "Desfazer último descarte"
              : "Desfazer último descarte (PRO)"
          }
          style={[styles.botaoAcao, styles.botaoRevert]}
          onPress={onUndo}
        >
          <MaterialCommunityIcons
            name="undo-variant"
            size={26}
            color={isPro ? "#B99AFF" : "#888888"}
          />
        </Pressable>

        <Pressable
          accessibilityLabel="Rejeitar candidato"
          style={[styles.botaoAcao, styles.botaoRejeitar]}
          onPress={onReject}
        >
          <MaterialCommunityIcons name="close" size={32} color="#FF5252" />
        </Pressable>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Destacar candidato"
          style={[styles.botaoAcao, styles.botaoDestaque]}
          onPress={handleFire}
        >
          <MaterialCommunityIcons
            name="star-four-points"
            size={26}
            color="#F6C453"
          />
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
    justifyContent: "flex-end",
  },
  imagem: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    borderRadius: 18,
  },
  fotoIndicadores: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    gap: 4,
    paddingHorizontal: 10,
    paddingTop: 12,
    zIndex: 5,
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
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 2,
  },

  controleFoto: {
    width: "45%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  controleFotoEsquerda: {
    left: 0,
  },
  controleFotoDireita: {
    right: 0,
  },
  areaFoto: {
    flex: 1,
  },
  informacoes: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 18,
    paddingTop: 50,
    paddingBottom: 8,
    backgroundColor: "rgba(0,0,0,0.64)",
    zIndex: 4,
  },
  cabecalhoInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  botaoInfo: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
  },
  nome: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "bold",
    flex: 1,
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
    gap: 14,
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
  botaoDestaque: {
    borderWidth: 1.5,
    borderColor: "#F6C453",
  },

  destaqueOverlay: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  destaqueBadge: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(25, 20, 35, 0.95)",
    borderWidth: 2,
    borderColor: "#F6C453",
    borderRadius: 24,
    paddingVertical: 22,
    paddingHorizontal: 32,
  },

  destaqueTexto: {
    color: "#F6C453",
    fontSize: 21,
    fontWeight: "900",
    letterSpacing: 2,
    marginTop: 8,
  },
  botaoRevert: {
    borderWidth: 1.5,
    borderColor: "#777777",
  },
});
