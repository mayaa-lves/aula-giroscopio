# 🎮 Jogo Colete o Orbe

Um jogo mobile desenvolvido com **React Native**, **Expo** e **Expo Sensors**, no qual o jogador utiliza o **giroscópio do celular** para controlar um personagem, coletar orbes e evitar bombas.

O projeto foi desenvolvido com o objetivo de aplicar conceitos de desenvolvimento mobile, gerenciamento de estados, sensores do dispositivo, movimentação de elementos na tela, colisões e criação de uma experiência interativa.

---

## 📱 Sobre o projeto

**Colete o Orbe** é um jogo simples e dinâmico baseado no movimento do dispositivo.

O jogador controla uma esfera utilizando a inclinação do celular. O objetivo principal é coletar os **orbes azuis**, acumulando pontos e avançando pelas fases.

Conforme o jogador progride, o jogo fica mais difícil. A partir de determinadas fases, **bombas** aparecem na tela e passam a se movimentar. Caso o jogador colida com uma bomba, a partida termina.

Ao final da partida, é apresentada a pontuação obtida, a fase alcançada e uma opção para começar novamente.

---

## 🎯 Objetivo

O principal objetivo do projeto é desenvolver uma aplicação mobile interativa utilizando o sensor de movimento do dispositivo.

Durante o desenvolvimento foram trabalhados conceitos como:

* Utilização do giroscópio;
* Gerenciamento de estados com React;
* Componentização com React Native;
* Movimentação de elementos na tela;
* Detecção de colisões;
* Sistema de pontuação;
* Sistema de fases;
* Criação e movimentação de obstáculos;
* Reinicialização do estado do jogo;
* Estilização utilizando `StyleSheet`.

---

## 🕹️ Como jogar

### 1. Movimente o personagem

Incline o celular para movimentar o jogador.

O movimento é controlado pelo **giroscópio**:

* Inclinação para os lados → movimenta horizontalmente;
* Inclinação para frente ou para trás → movimenta verticalmente.

### 2. Colete os orbes

O objetivo inicial é encontrar e tocar nos **orbes azuis**.

Cada orbe coletado:

* Adiciona **10 pontos**;
* Faz o orbe aparecer em uma nova posição aleatória.

### 3. Avance pelas fases

A cada **3 orbes coletados**, o jogador avança uma fase.

Além disso, a velocidade de movimentação do personagem aumenta conforme a fase.

### 4. Cuidado com as bombas! 💣

A partir da **fase 3**, bombas começam a aparecer.

Na **fase 4**, elas passam a se movimentar pela tela.

A quantidade de bombas também aumenta conforme o jogador avança:

* Fase 3 → 1 bomba;
* Fase 4 → 2 bombas;
* Fase 5 → 3 bombas;
* E assim por diante, até o limite de 6 bombas.

Se o jogador tocar em uma bomba, ocorre o **Game Over**.

---

## ⭐ Sistema de pontuação

O sistema de pontuação é baseado na coleta dos orbes.

| Ação            |               Pontos |
| --------------- | -------------------: |
| Coletar 1 orbe  |                  +10 |
| Coletar 3 orbes | +30 + avanço de fase |
| Coletar 6 orbes | +60 + avanço de fase |
| Coletar 9 orbes | +90 + avanço de fase |

Não existe uma pontuação negativa. A partida termina somente quando ocorre uma colisão com uma bomba.

---

## 🚀 Tecnologias utilizadas

### React Native

Framework utilizado para o desenvolvimento da interface e funcionamento do aplicativo mobile.

### Expo

Plataforma utilizada para facilitar o desenvolvimento, execução e testes do aplicativo.

### Expo Sensors

Biblioteca utilizada para acessar os sensores do dispositivo, especialmente o **giroscópio**.

### TypeScript

Utilizado para adicionar tipagem ao código e facilitar a organização e manutenção do projeto.

---

## 📦 Principais recursos utilizados

O projeto utiliza alguns recursos importantes do React e React Native:

```tsx
useState
useEffect
StyleSheet
View
Text
Pressable
Dimensions
```

Também é utilizado o sensor:

```tsx
Gyroscope
```

---

## ⚙️ Funcionamento do giroscópio

O giroscópio fornece informações sobre a movimentação e inclinação do dispositivo.

No projeto, o sensor é atualizado em um intervalo de aproximadamente **8 milissegundos**:

```tsx
Gyroscope.setUpdateInterval(8);
```

Os dados recebidos são armazenados no estado:

```tsx
const [data, setData] = useState({
  x: 0,
  y: 0,
  z: 0,
});
```

Essas informações são utilizadas para calcular a nova posição do jogador.

A velocidade também aumenta de acordo com a fase:

```tsx
4 + level * 0.5
```

Dessa forma, quanto maior a fase, mais rápido o personagem se movimenta.

---

## 💥 Sistema de colisões

O jogo possui dois tipos principais de colisão:

### 🟦 Colisão com o orbe

Quando o jogador se aproxima do orbe, a distância entre os dois objetos é calculada.

Se a distância for menor que a soma dos seus raios, o jogo considera que houve uma colisão.

Quando isso acontece:

1. O orbe é reposicionado;
2. A pontuação aumenta em 10 pontos;
3. O contador de orbes aumenta;
4. A cada 3 orbes, uma nova fase é iniciada.

### 💣 Colisão com a bomba

O mesmo princípio é utilizado para verificar se o jogador encostou em uma bomba.

Quando ocorre a colisão:

```tsx
setGameOver(true);
```

O jogo é encerrado e a tela de Game Over é apresentada.

---

## 🛠️ Como executar o projeto

### Pré-requisitos

É necessário ter instalado:

* **Node.js**
* **npm**
* **Expo**
* Um celular físico ou emulador compatível

Como o projeto utiliza o giroscópio, é recomendado testar em um **dispositivo físico**, pois o funcionamento do sensor pode variar em emuladores.

### Instalação

Clone o repositório:

```bash
git clone URL_DO_REPOSITORIO
```

Entre na pasta:

```bash
cd nome-do-projeto
```

Instale as dependências:

```bash
npm install
```

Instale o pacote de sensores:

```bash
npx expo install expo-sensors
```

Inicie o projeto:

```bash
npx expo start
```

Depois, escaneie o QR Code utilizando o **Expo Go** ou execute o projeto em um ambiente compatível.

---

## 📲 Requisitos para jogar

Para aproveitar completamente a experiência, recomenda-se:

* Smartphone com giroscópio;
* Expo Go instalado;
* Conexão com a mesma rede durante o desenvolvimento;
* Dispositivo com suporte aos sensores utilizados pelo aplicativo.

---

## 🎨 Interface

A interface foi desenvolvida com uma proposta simples e focada na experiência do jogador.

O jogo utiliza:

* Fundo escuro;
* Personagem em destaque;
* Orbe azul;
* Bombas vermelhas;
* HUD com pontuação e fase;
* Tela de Game Over;
* Botão para reiniciar a partida.

A interface também foi desenvolvida utilizando componentes nativos do React Native e `StyleSheet`.

---

## 🔄 Fluxo do jogo

```text
          INÍCIO
             │
             ▼
      Jogador aparece
             │
             ▼
       Orbe é criado
             │
             ▼
       Jogador se move
        pelo giroscópio
             │
             ▼
      ┌───────────────┐
      │ Coletou orbe? │
      └───────┬───────┘
              │
          ┌───┴───┐
         NÃO     SIM
          │       │
          │       ▼
          │   +10 pontos
          │       │
          │       ▼
          │  Conta +1 orbe
          │       │
          │       ▼
          │  A cada 3 orbes
          │  aumenta a fase
          │       │
          └───────┤
                  ▼
          Bombas aparecem
                  │
                  ▼
          ┌───────────────┐
          │ Colidiu com   │
          │ uma bomba?    │
          └───────┬───────┘
                  │
             ┌────┴────┐
            NÃO       SIM
             │         │
             │         ▼
             │      GAME OVER
             │         │
             │         ▼
             │       Reiniciar
             │
             └──► Continua
```

---

## 📚 Conceitos aprendidos

O desenvolvimento deste projeto permitiu praticar conceitos importantes de desenvolvimento mobile, principalmente:

* Desenvolvimento com React Native;
* Uso do Expo;
* TypeScript;
* Hooks do React;
* `useState`;
* `useEffect`;
* Sensores de dispositivos móveis;
* Manipulação de posições;
* Eventos e atualizações em tempo real;
* Cálculos matemáticos para colisão;
* Geração de posições aleatórias;
* Temporizadores com `setInterval`;
* Renderização dinâmica com `.map()`;
* Controle de fluxo;
* Organização de estilos;
* Criação de interfaces interativas.

---

## 🔮 Possíveis melhorias

O projeto pode ser expandido futuramente com novas funcionalidades, como:

* 🏆 Ranking de melhores pontuações;
* ❤️ Sistema de vidas;
* 🔊 Efeitos sonoros;
* 🎵 Música durante a partida;
* 💫 Animações;
* 🎨 Diferentes personagens;
* 🌌 Diferentes cenários;
* 💣 Novos tipos de obstáculos;
* 🥇 Sistema de recorde;
* ⏱️ Sistema de tempo;
* 🎯 Missões e objetivos;
* 📳 Vibração ao coletar orbes ou sofrer uma colisão;
* 🏅 Sistema de conquistas.

---

## 👩‍💻 Desenvolvimento

Projeto desenvolvido como atividade prática de desenvolvimento mobile, com foco na utilização de sensores do dispositivo e na aplicação de conceitos de React Native.

---

## 📄 Licença

Este projeto foi desenvolvido para fins **educacionais e acadêmicos**.
