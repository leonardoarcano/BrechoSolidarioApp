import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // para debug

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo(a)!</Text>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Lista')}>
        <Text style={styles.buttonText}>Ver Itens</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Cadastro')}>
        <Text style={styles.buttonText}>Cadastrar Item</Text>
      </TouchableOpacity>
      
      <Text onPress={limparDados} style={styles.debugText}>Apagar Todos os Itens (debug)</Text>

      <Text style={styles.sobreText} onPress={() => navigation.navigate('Sobre')}>Sobre o Aplicativo</Text>
    </View>
  );
}


const limparDados = async () => {
  try {
    await AsyncStorage.clear();
    alert('Todos os itens foram apagados!');
  } catch (e) {
    alert('Erro ao limpar os dados');
  }
};


//definindo estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 28,
    marginBottom: 40,
    fontWeight: 'bold',
    color: '#333',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#01D9C1', // cor principal
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
    elevation: 3, // sombra leve para Android
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  debugText: {
    color: '#FF0000',
    marginTop: '20'
  },
  sobreText: {
    marginTop: '50%'
  },
});