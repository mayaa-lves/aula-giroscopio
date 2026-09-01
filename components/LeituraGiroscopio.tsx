// importando ferramentas
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Gyroscope } from 'expo-sensors'; 

// componente principal
export default function App() {

    // MEMÓRIA DO COMPONENTE

    // 'data' -> É a nossa variável que vai guardar o objeto { x, y, z }.
    // 'setData' -> É a ÚNICA função que devemos usar para ATUALIZAR o valor de 'data'.
    const [data, setData] = useState ({x: 0, y: 0, z: 0 });

    // -----------------------------------

    // INSTRUÇÕES PARA A INTERAÇÃO

    // useEffect -> manual de instruções para o componente
    useEffect(() => {
        // definindo a rapidez com que receberemos atualizações do sensor
        Gyroscope.setUpdateInterval(300);

        // executar o giroscópio - 'addListener' é uma função que sera executada sempre que houver uma atualização do sensor
        const subscription = Gyroscope.addListener(gyroscopeData => {
            setData(gyroscopeData); // atualizando o valor de 'data' com o objeto { x, y, z } do giroscópio
        });

        // limpeza do componente - função que será executada quando o componente 'deligado'
        return () => {
            subscription.remove(); 
        };

    }, []); // array vazio -> significa que o useEffect será executado apenas uma vez, quando o componente for montado

    // -----------------------------------


    // O QUE SERÁ EXIBIDO NA TELA

    // pegamos os valores de x,y,z
    const {x, y, z} = data;

    // redenrizar a interface
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Leitura do Giroscópio</Text>

            <Text style={styles.text}>x: {Number(x.toFixed(1)) == -0 ? 0 : x.toFixed(1)}</Text>
            <Text style={styles.text}>y: {Number(y.toFixed(1)) == -0 ? 0 : y.toFixed(1)}</Text>
            <Text style={styles.text}>z: {Number(z.toFixed(1)) == -0 ? 0 : z.toFixed(1)}</Text>
        </View>
    );
 }

 const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#ecf0f1',
        marginBottom: 20,
    },
    text: {
        fontSize: 20,
        color: '#ecf0f1',
        marginTop: 10,
    },
 });