import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import AsyncStorage from
  "@react-native-async-storage/async-storage";
const STORAGE_KEY = "@recrutadev:candidatos";

export type Candidate = {
  id: string;
  nome: string;
  idade: number;
  localizacao: string;
  sobre: string;
  linguagens: string;
  formacao: string;
  experiencia: string;
  projetos: string;
  pretensaoSalarial: string;
  fotos: string[];
  email?: string;
  formacaoInicio?: string;
  formacaoFim?: string;
  experienciaInicio?: string;
  experienciaFim?: string;
  redesSociais?: string;
};

const candidatosIniciais: Candidate[] = [
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

type RecruitmentContextData = {
  candidatos: Candidate[];
  aprovadosIds: string[];
  descartadosIds: string[];
  prioritariosIds: string[];
  disparos: number;
  isPro: boolean;
  togglePro: () => void;
  aprovar: (id: string) => void;
  descartar: (id: string) => void;
  disparar: (id: string) => boolean;
  ultimoDescartadoId: string | null;
  desfazerDescarte: () => string | null;
  adicionarCandidato: (dados: Omit<Candidate, "id">) => Candidate;
  atualizarCandidato: (  id: string,  dados: Omit<Candidate, "id">) => void;
  excluirCandidato: (id: string) => void;
  perfilAtualId: string | null;
  sairDoPerfil: () => Promise<void>;
};

const RecruitmentContext = createContext<RecruitmentContextData | undefined>(
  undefined,
);

export function RecruitmentProvider({ children }: { children: ReactNode }) {
  const [perfilAtualId, setPerfilAtualId] = useState<string | null>(null);
  const [carregado, setCarregado] = useState(false);
  const [candidatos, setCandidatos] = useState<Candidate[]>(candidatosIniciais);
  const [aprovadosIds, setAprovadosIds] = useState<string[]>([]);
  const [descartadosIds, setDescartadosIds] = useState<string[]>([]);
  const [prioritariosIds, setPrioritariosIds] = useState<string[]>([]);
  const [disparos, setDisparos] = useState(0);
  const [isPro, setIsPro] = useState(false);
  const [ultimoDescartadoId, setUltimoDescartadoId] = useState<string | null>(
    null,
  );

  const togglePro = () => {
    setIsPro((atual) => !atual);
  };

  useEffect(() => {
    async function carregar() {
      try {
        const dados = await AsyncStorage.getItem(STORAGE_KEY);

        if (dados !== null) {
          const candidatosSalvos: Candidate[] = JSON.parse(dados);
          setCandidatos(candidatosSalvos);
        }
      } catch (erro) {
        console.error("Erro ao carregar candidatos:", erro);
      } finally {
        setCarregado(true);
      }
    }

    carregar();
  }, []);

  useEffect(() => {
    if (!carregado) return;

    AsyncStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(candidatos),
    ).catch((erro) => {
      console.error("Erro ao salvar candidatos:", erro);
    });
  }, [candidatos, carregado]);

  useEffect(() => {
    AsyncStorage.getItem("@recrutadev:perfil-atual")
      .then((id) => setPerfilAtualId(id))
      .catch((erro) => {
        console.error("Erro ao carregar perfil atual:", erro);
      });
  }, []);

  const sairDoPerfil = async () => {
    try {
      await AsyncStorage.removeItem("@recrutadev:perfil-atual");
      setPerfilAtualId(null);
    } catch (erro) {
      console.error("Erro ao sair do perfil:", erro);
    }
  };

  

  const adicionarCandidato = (dados: Omit<Candidate, "id">) => {
    const novoCandidato: Candidate = {
      ...dados,
      id: String(Date.now()),
    };

    setCandidatos((atuais) => [...atuais, novoCandidato]);
    setPerfilAtualId(novoCandidato.id);

    AsyncStorage.setItem("@recrutadev:perfil-atual", novoCandidato.id)
      .catch((erro) => {
        console.error("Erro ao salvar perfil atual:", erro);
      });

    return novoCandidato;
  };

  const atualizarCandidato = (
    id: string,
    dados: Omit<Candidate, "id">
  ) => {
    setCandidatos((atuais) =>
      atuais.map((candidato) =>
        candidato.id === id
          ? { ...candidato, ...dados, id }
          : candidato
      )
    );
  };

  const excluirCandidato = (id: string) => {
    setCandidatos((atuais) =>
      atuais.filter((candidato) => candidato.id !== id)
    );

    setAprovadosIds((atuais) =>
      atuais.filter((candidatoId) => candidatoId !== id)
    );

    setDescartadosIds((atuais) =>
      atuais.filter((candidatoId) => candidatoId !== id)
    );

    setPrioritariosIds((atuais) =>
      atuais.filter((candidatoId) => candidatoId !== id)
    );

    setUltimoDescartadoId((atual) => (atual === id ? null : atual));

    if (perfilAtualId === id) {
      setPerfilAtualId(null);

      AsyncStorage.removeItem("@recrutadev:perfil-atual").catch((erro) => {
        console.error("Erro ao limpar perfil excluído:", erro);
      });
    }
  };

  

  function aprovar(id: string) {
    setAprovadosIds((atuais) =>
      atuais.includes(id) ? atuais : [...atuais, id],
    );

    setDescartadosIds((atuais) => atuais.filter((item) => item !== id));

    setUltimoDescartadoId((atual) => (atual === id ? null : atual));
  }

  function descartar(id: string) {
    setDescartadosIds((atuais) =>
      atuais.includes(id) ? atuais : [...atuais, id],
    );

    setAprovadosIds((atuais) => atuais.filter((item) => item !== id));

    setPrioritariosIds((atuais) => atuais.filter((item) => item !== id));

    setUltimoDescartadoId(id);
  }

  function desfazerDescarte(): string | null {
    const id = ultimoDescartadoId;

    if (!id) {
      return null;
    }

    setDescartadosIds((atuais) => atuais.filter((item) => item !== id));

    setUltimoDescartadoId(null);

    return id;
  }

  function disparar(id: string): boolean {
    if (!isPro && disparos >= 3) {
      return false;
    }

    setDisparos((atual) => atual + 1);

    aprovar(id);

    setPrioritariosIds((atuais) => [
      id,
      ...atuais.filter((item) => item !== id),
    ]);

    return true;
  }

  return (
    <RecruitmentContext.Provider
      value={{
        candidatos: candidatos,
        aprovadosIds,
        descartadosIds,
        prioritariosIds,
        disparos,
        isPro,
        togglePro,
        ultimoDescartadoId,
        aprovar,
        descartar,
        disparar,
        desfazerDescarte,
        adicionarCandidato,
        atualizarCandidato,
        excluirCandidato,
        perfilAtualId,
        sairDoPerfil,
      }}
    >
      {children}
    </RecruitmentContext.Provider>
  );
}

export function useRecruitment() {
  const context = useContext(RecruitmentContext);

  if (!context) {
    throw new Error(
      "useRecruitment precisa estar dentro de RecruitmentProvider.",
    );
  }

  return context;
}
