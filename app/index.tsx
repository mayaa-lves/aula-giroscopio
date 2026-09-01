
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { router } from 'expo-router';

export default function Index() {
  return (
    <View style={styles.container}>

      {/* Formas decorativas */}
      <View style={styles.shapePurple} />
      <View style={styles.shapeBlue} />
      <View style={styles.shapePink} />

      {/* Conteúdo principal */}
      <View style={styles.content}>

        <Text style={styles.miniTitle}>MOBILE GAME</Text>

        <Text style={styles.title}>
          GIRO
        </Text>

        <Text style={styles.titleColor}>
          GAME
        </Text>

        <Text style={styles.description}>
          Controle o personagem inclinando seu celular
          e tente chegar o mais longe possível.
        </Text>

        {/* Botão */}
        <Pressable
  style={styles.button}
  onPress={() => router.push('/jogo')}
>
          <Text style={styles.buttonText}>COMEÇAR</Text>
          <Text style={styles.arrow}>→</Text>
        </Pressable>

        {/* Informações */}
        <View style={styles.infoContainer}>

          <View style={styles.info}>
            <Text style={styles.infoNumber}>01</Text>
            <Text style={styles.infoText}>INCLINE</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.info}>
            <Text style={styles.infoNumber}>02</Text>
            <Text style={styles.infoText}>COLETE</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.info}>
            <Text style={styles.infoNumber}>03</Text>
            <Text style={styles.infoText}>AVANCE</Text>
          </View>

        </View>

      </View>

      <Text style={styles.version}>v1.0</Text>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#11131F',
    overflow: 'hidden',
  },

  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 28,
  },

  miniTitle: {
    color: '#8B91A7',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 3,
    marginBottom: 12,
  },

  title: {
    color: '#FFFFFF',
    fontSize: 64,
    fontWeight: '900',
    letterSpacing: -2,
    lineHeight: 62,
  },

  titleColor: {
    color: '#7C6CFF',
    fontSize: 64,
    fontWeight: '900',
    letterSpacing: -2,
    lineHeight: 65,
  },

  description: {
    color: '#A7ACBF',
    fontSize: 16,
    lineHeight: 24,
    maxWidth: 330,
    marginTop: 18,
    marginBottom: 35,
  },

  button: {
    height: 58,
    backgroundColor: '#7C6CFF',
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '800',
    letterSpacing: 1,
  },

  arrow: {
    color: '#FFFFFF',
    fontSize: 25,
    marginLeft: 15,
    marginTop: -2,
  },

  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 45,
    paddingVertical: 18,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#292D3D',
  },

  info: {
    alignItems: 'center',
    flex: 1,
  },

  infoNumber: {
    color: '#7C6CFF',
    fontSize: 12,
    fontWeight: '800',
    marginBottom: 5,
  },

  infoText: {
    color: '#D7D9E3',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
  },

  divider: {
    width: 1,
    height: 25,
    backgroundColor: '#292D3D',
  },

  version: {
    position: 'absolute',
    bottom: 20,
    right: 25,
    color: '#555B70',
    fontSize: 11,
  },

  shapePurple: {
    position: 'absolute',
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: '#5B4BE7',
    opacity: 0.12,
    top: -120,
    right: -80,
  },

  shapeBlue: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: '#00C2FF',
    opacity: 0.08,
    bottom: -70,
    left: -80,
  },

  shapePink: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#FF4F9A',
    opacity: 0.08,
    top: 180,
    right: -50,
  },
});

