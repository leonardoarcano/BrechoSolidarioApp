import React from 'react';
import { View, Text, Image, StyleSheet, Alert, TouchableOpacity } from 'react-native';

export default function DetalheScreen({ route }) {
  const { item } = route.params;

  const mostrarInteresse = () => {
    Alert.alert('Interesse enviado!', 'Você demonstrou interesse no item.');
  };

  return (
    <View style={styles.container}>
      <Image
        source={item.imagem ? { uri: item.imagem } : require('../assets/placeholder.png')}
        style={styles.imagem}
      />
      <Text style={styles.nome}>{item.nome}</Text>
      <Text style={styles.tipo}>{item.tipo === 'brecho' ? 'Brechó' : 'Doação'}</Text>
      {item.descricao && <Text style={styles.descricao}>{item.descricao}</Text>}
      {item.tipo === 'brecho' && <Text style={styles.preco}>Preço: R$ {item.preco}</Text>}

      <TouchableOpacity style={styles.botao} onPress={mostrarInteresse}>
        <Text style={styles.botaoTexto}>Tenho Interesse</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  imagem: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  nome: { fontSize: 22, fontWeight: 'bold' },
  tipo: { fontSize: 16, color: '#555', marginVertical: 5 },
  descricao: { fontSize: 16, marginTop: 10 },
  preco: { fontSize: 18, color: '#D90119', marginTop: 10 },
  botao: {
    backgroundColor: '#01D9C1',
    marginTop: 30,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  botaoTexto: {
    color: '#fff',
    fontSize: 16,
  },
});
