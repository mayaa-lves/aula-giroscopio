
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  Pressable,
} from 'react-native';
import { Gyroscope } from 'expo-sensors';

const { width, height } = Dimensions.get('window');

const PLAYER_SIZE = 50;
const ORB_SIZE = 30;
const BOMB_SIZE = 40;

type Position = {
  x: number;
  y: number;
};

type Bomb = {
  x: number;
  y: number;
  velocityX: number;
  velocityY: number;
};

const generateRandomPosition = (size: number): Position => {
  return {
    x: Math.random() * (width - size),
    y: Math.random() * (height - size),
  };
};

export default function JogoColete() {

  // =========================
  // ESTADOS
  // =========================

  const [data, setData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });

  const [playerPosition, setPlayerPosition] = useState<Position>({
    x: width / 2,
    y: height / 2,
  });

  const [orbPosition, setOrbPosition] = useState<Position>(
    generateRandomPosition(ORB_SIZE)
  );

  const [score, setScore] = useState(0);

  const [level, setLevel] = useState(1);

  const [orbsCollected, setOrbsCollected] = useState(0);

  const [bombs, setBombs] = useState<Bomb[]>([]);

  const [gameOver, setGameOver] = useState(false);

  // =========================
  // GIROSCÓPIO
  // =========================

  useEffect(() => {

    Gyroscope.setUpdateInterval(8);

    const subscription = Gyroscope.addListener(
      gyroscopeData => {
        setData(gyroscopeData);
      }
    );

    return () => subscription.remove();

  }, []);

  // =========================
  // MOVIMENTO DO JOGADOR
  // =========================

  useEffect(() => {

    if (gameOver) return;

    let newX =
      playerPosition.x + data.y * (4 + level * 0.5);

    let newY =
      playerPosition.y - data.x * (4 + level * 0.5);

    if (newX < 0) {
      newX = 0;
    }

    if (newX > width - PLAYER_SIZE) {
      newX = width - PLAYER_SIZE;
    }

    if (newY < 0) {
      newY = 0;
    }

    if (newY > height - PLAYER_SIZE) {
      newY = height - PLAYER_SIZE;
    }

    setPlayerPosition({
      x: newX,
      y: newY,
    });

  }, [data, level, gameOver]);

  // =========================
  // CRIAR BOMBAS
  // =========================

  useEffect(() => {

    if (gameOver) return;

    if (level < 3) {
      setBombs([]);
      return;
    }

    // A quantidade aumenta conforme a fase
    const quantidade = Math.min(
      1 + (level - 3),
      6
    );

    const novasBombas: Bomb[] = [];

    for (let i = 0; i < quantidade; i++) {

      const position = generateRandomPosition(BOMB_SIZE);

      novasBombas.push({
        x: position.x,
        y: position.y,

        // Velocidade inicial
        velocityX:
          (Math.random() > 0.5 ? 1 : -1) *
          (2 + level * 0.3),

        velocityY:
          (Math.random() > 0.5 ? 1 : -1) *
          (2 + level * 0.3),
      });
    }

    setBombs(novasBombas);

  }, [level, gameOver]);

  // =========================
  // MOVIMENTO DAS BOMBAS
  // =========================

  useEffect(() => {

    if (gameOver) return;

    // Bombas começam a andar na fase 4
    if (level < 4) return;

    const interval = setInterval(() => {

      setBombs(currentBombs => {

        return currentBombs.map(bomb => {

          let newX =
            bomb.x + bomb.velocityX;

          let newY =
            bomb.y + bomb.velocityY;

          let velocityX = bomb.velocityX;
          let velocityY = bomb.velocityY;

          // Bateu na parede horizontal
          if (
            newX <= 0 ||
            newX >= width - BOMB_SIZE
          ) {

            velocityX *= -1;

            newX = Math.max(
              0,
              Math.min(
                newX,
                width - BOMB_SIZE
              )
            );
          }

          // Bateu na parede vertical
          if (
            newY <= 0 ||
            newY >= height - BOMB_SIZE
          ) {

            velocityY *= -1;

            newY = Math.max(
              0,
              Math.min(
                newY,
                height - BOMB_SIZE
              )
            );
          }

          return {
            x: newX,
            y: newY,
            velocityX,
            velocityY,
          };
        });

      });

    }, 16);

    return () => clearInterval(interval);

  }, [level, gameOver]);

  // =========================
  // COLISÃO COM ORBE
  // =========================

  useEffect(() => {

    if (gameOver) return;

    const playerCenterX =
      playerPosition.x + PLAYER_SIZE / 2;

    const playerCenterY =
      playerPosition.y + PLAYER_SIZE / 2;

    const orbCenterX =
      orbPosition.x + ORB_SIZE / 2;

    const orbCenterY =
      orbPosition.y + ORB_SIZE / 2;

    const dx =
      playerCenterX - orbCenterX;

    const dy =
      playerCenterY - orbCenterY;

    const distance =
      Math.sqrt(dx * dx + dy * dy);

    if (
      distance <
      PLAYER_SIZE / 2 + ORB_SIZE / 2
    ) {

      setOrbPosition(
        generateRandomPosition(ORB_SIZE)
      );

      setScore(prev => prev + 10);

      setOrbsCollected(prev => {

        const total = prev + 1;

        // A cada 3 orbes sobe de fase
        if (total % 3 === 0) {

          setLevel(prevLevel =>
            prevLevel + 1
          );

        }

        return total;

      });

    }

  }, [playerPosition, gameOver]);

  // =========================
  // COLISÃO COM BOMBA
  // =========================

  useEffect(() => {

    if (gameOver) return;

    if (level < 3) return;

    const playerCenterX =
      playerPosition.x + PLAYER_SIZE / 2;

    const playerCenterY =
      playerPosition.y + PLAYER_SIZE / 2;

    bombs.forEach(bomb => {

      const bombCenterX =
        bomb.x + BOMB_SIZE / 2;

      const bombCenterY =
        bomb.y + BOMB_SIZE / 2;

      const dx =
        playerCenterX - bombCenterX;

      const dy =
        playerCenterY - bombCenterY;

      const distance =
        Math.sqrt(dx * dx + dy * dy);

      if (
        distance <
        PLAYER_SIZE / 2 + BOMB_SIZE / 2
      ) {

        // 💥 GAME OVER
        setGameOver(true);

      }

    });

  }, [playerPosition, bombs, level, gameOver]);

  // =========================
  // RECOMEÇAR
  // =========================

  const restartGame = () => {

    setScore(0);

    setLevel(1);

    setOrbsCollected(0);

    setGameOver(false);

    setPlayerPosition({
      x: width / 2,
      y: height / 2,
    });

    setOrbPosition(
      generateRandomPosition(ORB_SIZE)
    );

    setBombs([]);

  };

  // =========================
  // GAME OVER
  // =========================

  if (gameOver) {

    return (
      <View style={styles.gameOverContainer}>

        <Text style={styles.gameOverTitle}>
          GAME OVER
        </Text>

        <Text style={styles.explosion}>
          💥
        </Text>

        <Text style={styles.finalScoreLabel}>
          SUA PONTUAÇÃO
        </Text>

        <Text style={styles.finalScore}>
          {score}
        </Text>

        <Text style={styles.finalLevel}>
          Você chegou à fase {level}
        </Text>

        <Pressable
          style={styles.restartButton}
          onPress={restartGame}
        >
          <Text style={styles.restartText}>
            JOGAR NOVAMENTE
          </Text>
        </Pressable>

      </View>
    );
  }

  // =========================
  // JOGO
  // =========================

  return (
    <View style={styles.container}>

      {/* HUD */}

      <View style={styles.hud}>

        <View>
          <Text style={styles.label}>
            PONTOS
          </Text>

          <Text style={styles.value}>
            {score}
          </Text>
        </View>

        <View style={styles.levelContainer}>

          <Text style={styles.label}>
            FASE
          </Text>

          <Text style={styles.value}>
            {level}
          </Text>

        </View>

      </View>

      {/* INSTRUÇÃO */}

      <Text style={styles.instructions}>

        {level < 3
          ? 'Colete os orbes azuis!'
          : 'Cuidado com as bombas!'}

      </Text>

      {/* ORBE */}

      <View
        style={[
          styles.orb,
          {
            left: orbPosition.x,
            top: orbPosition.y,
          },
        ]}
      />

      {/* BOMBAS */}

      {bombs.map((bomb, index) => (

        <View
          key={index}
          style={[
            styles.bomb,
            {
              left: bomb.x,
              top: bomb.y,
            },
          ]}
        >

          <Text style={styles.bombText}>
            !
          </Text>

        </View>

      ))}

      {/* JOGADOR */}

      <View
        style={[
          styles.player,
          {
            left: playerPosition.x,
            top: playerPosition.y,
          },
        ]}
      />

    </View>
  );
}

const styles = StyleSheet.create({

  // =========================
  // JOGO
  // =========================

  container: {
    flex: 1,
    backgroundColor: '#171B3A',
  },

  // =========================
  // HUD
  // =========================

  hud: {
    position: 'absolute',
    top: 55,
    left: 20,
    right: 20,

    flexDirection: 'row',
    justifyContent: 'space-between',

    zIndex: 10,
  },

  levelContainer: {
    alignItems: 'flex-end',
  },

  label: {
    color: '#8F96B2',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.5,
  },

  value: {
    color: '#FFFFFF',
    fontSize: 25,
    fontWeight: '900',
  },

  // =========================
  // INSTRUÇÃO
  // =========================

  instructions: {
    position: 'absolute',

    top: 125,

    left: 0,
    right: 0,

    textAlign: 'center',

    color: '#B8BED8',

    fontSize: 16,

    fontWeight: '600',

    zIndex: 5,
  },

  // =========================
  // JOGADOR
  // =========================

  player: {
    position: 'absolute',

    width: PLAYER_SIZE,
    height: PLAYER_SIZE,

    borderRadius: PLAYER_SIZE / 2,

    backgroundColor: '#FF4F8B',

    borderWidth: 3,

    borderColor: '#FFFFFF',
  },

  // =========================
  // ORBE
  // =========================

  orb: {
    position: 'absolute',

    width: ORB_SIZE,
    height: ORB_SIZE,

    borderRadius: ORB_SIZE / 2,

    backgroundColor: '#00C2FF',

    borderWidth: 2,

    borderColor: '#FFFFFF',
  },

  // =========================
  // BOMBA
  // =========================

  bomb: {
    position: 'absolute',

    width: BOMB_SIZE,
    height: BOMB_SIZE,

    borderRadius: 12,

    backgroundColor: '#FF3B30',

    borderWidth: 3,

    borderColor: '#FFFFFF',

    alignItems: 'center',

    justifyContent: 'center',
  },

  bombText: {
    color: '#FFFFFF',

    fontSize: 25,

    fontWeight: '900',
  },

  // =========================
  // GAME OVER
  // =========================

  gameOverContainer: {
    flex: 1,

    backgroundColor: '#11131F',

    alignItems: 'center',

    justifyContent: 'center',

    padding: 30,
  },

  gameOverTitle: {
    color: '#FF3B30',

    fontSize: 48,

    fontWeight: '900',

    letterSpacing: 2,
  },

  explosion: {
    fontSize: 55,

    marginVertical: 15,
  },

  finalScoreLabel: {
    color: '#8F96B2',

    fontSize: 13,

    fontWeight: '700',

    letterSpacing: 2,

    marginTop: 10,
  },

  finalScore: {
    color: '#FFFFFF',

    fontSize: 55,

    fontWeight: '900',

    marginTop: 5,
  },

  finalLevel: {
    color: '#B8BED8',

    fontSize: 16,

    marginTop: 5,

    marginBottom: 35,
  },

  restartButton: {
    backgroundColor: '#7C6CFF',

    width: '100%',

    height: 58,

    borderRadius: 16,

    alignItems: 'center',

    justifyContent: 'center',
  },

  restartText: {
    color: '#FFFFFF',

    fontSize: 16,

    fontWeight: '800',

    letterSpacing: 1,
  },

});

