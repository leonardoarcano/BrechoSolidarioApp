import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function SobreScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sobre o Projeto</Text>
      <Text style={styles.text}>
        Este aplicativo foi desenvolvido como parte de um projeto de extensão da faculdade de ADS (Análise e Desenvolvimento de Sistemas).
      </Text>
   
      <Text style={styles.text}>
        Desenvolvido por: Leonardo Rafael das G. Silva
      </Text>
      <Text style={styles.text}>
        Faculdade: Estácio de Sá
      </Text>
      <Text style={styles.text}>
        Ano: 2025
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
});
