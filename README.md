# Devinder

Aplicativo mobile desenvolvido com React Native e Expo, com foco na apresentação de perfis de desenvolvedores e na avaliação de candidatos por recrutadores.

## 1. Tecnologias utilizadas

- **React Native:** construção da interface do aplicativo.
- **Expo:** ambiente e ferramentas de desenvolvimento.
- **Expo Router:** navegação entre telas.
- **TypeScript:** tipagem do código.
- **AsyncStorage:** armazenamento local dos candidatos cadastrados.
- **Expo Image Picker:** seleção de imagens da galeria e captura de fotos.
- **React Native Gesture Handler, React Native Reanimated e React Native Worklets:** suporte a gestos e animações nos cartões de candidatos.
- **MaterialCommunityIcons (`@expo/vector-icons`):** ícones da interface.

As dependências e os scripts estão declarados em `package.json`.

## 2. Como executar o projeto

### Pré-requisitos

- Node.js instalado.
- npm instalado.
- Expo Go ou ambiente de execução compatível com o projeto.

### Instalação

```bash
git clone https://github.com/Leroy-jester/Trabalho-de-Dispotivos-m-veis.git
cd Trabalho-de-Dispotivos-m-veis
npm install
```

### Inicialização

```bash
npx expo start
```

O projeto também declara os seguintes scripts:

```bash
npm run android
npm run ios
npm run web
```

A disponibilidade de cada opção depende do ambiente configurado.

## 3. Estrutura do projeto

```text
src/
├── app/
│   ├── index.tsx
│   ├── dev-cadastro.tsx
│   ├── _layout.tsx
│   └── recrutador/
│       ├── index.tsx
│       ├── lista.tsx
│       └── _layout.tsx
├── components/
│   ├── button.tsx
│   ├── candidate-card.tsx
│   └── pro-modal.tsx
└── contexts/
    └── recruitment-context.tsx

assets/
└── images/
```

### Principais arquivos

- `src/app/index.tsx`: tela inicial com opções para acessar o cadastro de desenvolvedor ou a área de recrutador.
- `src/app/dev-cadastro.tsx`: formulário de cadastro de desenvolvedor.
- `src/app/recrutador/index.tsx`: tela de descoberta e avaliação de candidatos.
- `src/app/recrutador/lista.tsx`: lista de candidatos aprovados.
- `src/app/recrutador/_layout.tsx`: navegação por abas da área de recrutador.
- `src/components/button.tsx`: componente reutilizável de botão.
- `src/components/candidate-card.tsx`: cartão de candidato com imagens, gestos e ações de avaliação.
- `src/contexts/recruitment-context.tsx`: estado compartilhado dos candidatos, aprovações, descartes, prioridades e disparos.
- `package.json`: dependências e comandos do projeto.
- `app.json`: configurações do aplicativo Expo.

## 4. Funcionalidades implementadas

### 4.1. Tela inicial

A tela inicial apresenta a marca Devinder e duas opções de acesso:

- **Entrar como dev:** direciona ao formulário de cadastro.
- **Entrar como recrutador:** direciona à área de descoberta de candidatos.

### 4.2. Cadastro de desenvolvedor

O formulário está organizado em cinco etapas:

1. **Fotos e dados pessoais:** nome, e-mail, idade, localização e seleção de fotos.
2. **Sobre você:** descrição pessoal do desenvolvedor.
3. **Formação e experiência:** informações de formação e experiência profissional, incluindo campos de período.
4. **Tecnologias e projetos:** linguagens/tecnologias e projetos.
5. **Informações finais:** pretensão salarial, redes sociais e finalização do cadastro.

O formulário permite selecionar imagens da galeria e tirar fotos, limita o cadastro a três fotos e oferece ações para navegar entre as etapas. Ao finalizar, os dados são enviados ao contexto compartilhado.

**Validação dos campos:**  
Esta seção será detalhada após a implementação e validação das regras de preenchimento e dos cenários de erro.

### 4.3. Descoberta e avaliação de candidatos

A área de recrutador apresenta os perfis em cartões e oferece:

- Visualização de imagens do perfil e navegação entre fotos.
- Gesto horizontal para avaliar o candidato: um movimento aprova e o movimento oposto descarta.
- Ações de aprovação e descarte ligadas ao estado compartilhado.
- Abertura de uma área com detalhes do perfil.
- Contadores de candidatos aprovados, descartados e disparos.
- Mensagem ao chegar ao fim dos perfis, com opção de reiniciar a visualização.

**Validação dos gestos e animações:**  
Esta seção será detalhada após a execução e validação do comportamento em dispositivos ou emuladores.

### 4.4. Detalhes do candidato

A área de detalhes apresenta informações do perfil, incluindo:

- Nome, idade e localização.
- Descrição pessoal.
- Formação.
- Experiência.
- Linguagens e tecnologias.
- Projetos.

A pretensão salarial aparece bloqueada na interface e direciona para a apresentação do plano PRO.

**Regras de acesso às informações restritas:**  
Esta seção será detalhada após a implementação e validação das regras de acesso.

### 4.5. Lista de candidatos aprovados

A aba **Lista** exibe os candidatos aprovados. Os candidatos marcados como prioritários aparecem antes dos demais aprovados, e os prioritários recebem um indicador visual.

Quando não existem candidatos aprovados, a tela exibe uma mensagem de lista vazia.

**Persistência e validação da ordenação:**  
Esta seção será detalhada após a implementação e os testes do comportamento esperado.

### 4.6. Persistência local

O contexto `recruitment-context.tsx` utiliza AsyncStorage, com a chave `@recrutadev:candidatos`, para carregar e salvar localmente a lista de candidatos.

O código contém perfis iniciais de demonstração e salva a coleção de candidatos quando ela é alterada.

O armazenamento identificado grava a lista de candidatos. A persistência de aprovações, descartes, prioridades e disparos após fechar e reabrir o aplicativo ainda não está demonstrada pela implementação atual.

**Persistência dos demais dados de recrutamento:**  
Esta seção será detalhada após a implementação e validação do armazenamento dessas informações.

## 5. Funcionalidades premium

Esta seção descreve os recursos PRO presentes na interface e o estado atual de sua implementação.

### 5.1. Limite de disparos no plano Free

O código permite até três disparos por sessão no estado atual. Quando o limite é atingido, a ação não é executada e a janela de apresentação do PRO é exibida.

O contador de disparos é mantido em memória e não é persistido no AsyncStorage. O valor de `isPro` está definido como `false` no contexto.

**Ativação e regras definitivas dos planos:**  
Esta seção será detalhada após a implementação das regras de assinatura e da ativação do plano PRO.

### 5.2. Acesso à pretensão salarial

A pretensão salarial é apresentada como informação restrita na área de detalhes do candidato. Ao tocar no campo bloqueado, a tela abre a janela de apresentação do RecrutaDEV PRO.

**Acesso para usuários PRO:**  
Esta seção será detalhada após a implementação e validação das regras de acesso à informação.

### 5.3. Desfazer o último descarte

Existe uma função de desfazer o último descarte no contexto e uma verificação de plano na tela de recrutador. Como `isPro` está definido como `false`, a ação abre a janela PRO em vez de desfazer o descarte.

**Funcionamento para usuários PRO:**  
Esta seção será detalhada após a implementação e os testes do fluxo de desfazer, incluindo a atualização dos contadores e da lista de candidatos.

### 5.4. Análise do candidato

A janela PRO menciona a análise do candidato como um recurso exclusivo. A funcionalidade específica de análise ainda precisa ser implementada.

**Descrição da funcionalidade:**  
Será detalhada após a implementação do recurso, incluindo seu objetivo, informações apresentadas e forma de utilização.

### 5.5. Janela de apresentação do PRO

A tela de recrutador contém uma janela com o título RecrutaDEV PRO, texto explicativo dos benefícios e botão **Entendi**, que fecha a janela.

A janela é informativa. Não há fluxo de compra, cobrança, gerenciamento de assinatura ou ativação de conta PRO identificado na implementação atual.

**Fluxo de assinatura e ativação do PRO:**  
Será detalhado após a implementação.

## 6. Dados do perfil de desenvolvedor

O tipo `Candidate`, definido no contexto, contempla os seguintes campos:

- `id`
- `nome`
- `idade`
- `localizacao`
- `sobre`
- `linguagens`
- `formacao`
- `experiencia`
- `projetos`
- `pretensaoSalarial`
- `fotos`
- `email` (opcional)
- `formacaoInicio` e `formacaoFim` (opcionais)
- `experienciaInicio` e `experienciaFim` (opcionais)
- `redesSociais` (opcional)

A lista de candidatos inicia com três perfis de demonstração definidos no próprio contexto. As fotos desses perfis usam URLs externas, e sua exibição depende de acesso à internet.

## 7. Especificações do trabalho

O projeto possui uma tela inicial, cadastro de desenvolvedor, área de recrutador, avaliação de candidatos, lista de aprovados e apresentação de funcionalidades PRO, conforme descrito nas seções anteriores.

A documentação de todos os requisitos acadêmicos deve acompanhar o enunciado oficial do trabalho. Os itens abaixo ficam reservados para registrar requisitos adicionais ou critérios específicos solicitados pelo professor.

### 7.1. Requisitos adicionais do enunciado

**Requisito:** [Adicionar o requisito conforme o enunciado.]

**Implementação:**  
Será descrita após a implementação ou confirmação do requisito.

**Arquivos relacionados:**  
[Preencher após identificar os arquivos correspondentes.]

**Validação:**  
Será descrita após a realização dos testes.

### 7.2. Funcionalidades incompletas ou ainda não implementadas

#### Ativação real do plano PRO

**Descrição da implementação:**  
Será detalhada após a implementação.

#### Compra, pagamento ou gerenciamento de assinatura

**Descrição da implementação:**  
Será detalhada após a implementação.

#### Análise do candidato

**Descrição da implementação:**  
Será detalhada após a implementação.

#### Persistência de aprovações, descartes, prioridades e disparos

**Descrição da implementação:**  
Será detalhada após a implementação.

#### Validação dos campos do cadastro e tratamento de erros

**Descrição da implementação:**  
Será detalhada após a implementação e os testes.

#### Testes em dispositivo ou emulador

**Resultados dos testes:**  
Serão descritos após a execução dos testes.

## 8. Testes

Marcar os itens após a realização dos testes correspondentes.

- [ ] Instalar as dependências com `npm install`.
- [ ] Iniciar o projeto com `npx expo start`.
- [ ] Verificar a navegação entre a tela inicial, cadastro e área do recrutador.
- [ ] Preencher e finalizar um cadastro.
- [ ] Testar a seleção de fotos da galeria e o uso da câmera, quando disponível.
- [ ] Verificar o limite de três fotos.
- [ ] Testar os gestos de aprovação e descarte.
- [ ] Conferir a lista de aprovados e a ordenação dos prioritários.
- [ ] Verificar o comportamento após fechar e reabrir o aplicativo.
- [ ] Testar o limite de três disparos no estado Free.
- [ ] Conferir as ações bloqueadas e a abertura e o fechamento da janela PRO.
- [ ] Comparar os requisitos com o enunciado oficial do trabalho.

## 9. Limitações e observações

- O plano PRO está simulado e não há implementação identificada de compra ou assinatura real.
- Os dados dos candidatos são armazenados localmente; não foi identificada uma API remota.
- A lista de perfis inclui dados de demonstração definidos no código.
- A persistência de aprovações, descartes, prioridades e disparos precisa ser implementada ou validada.
- A funcionalidade de análise do candidato precisa ser implementada.
- As regras de validação do cadastro e os resultados de testes serão documentados após sua implementação ou execução.

## 10. Integrantes

- George Lucas, Josef, Gabriel Rangel e Lucas Silva

## 11. Repositório

https://github.com/Leroy-jester/Trabalho-de-Dispotivos-m-veis
