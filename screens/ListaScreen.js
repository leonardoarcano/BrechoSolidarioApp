import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function ListaScreen() {
  const [itens, setItens] = useState([]);
  const [filtro, setFiltro] = useState('todos');
  const navigation = useNavigation();

  useEffect(() => {
    const carregarItens = async () => {
      const dados = await AsyncStorage.getItem('itens');
      setItens(dados ? JSON.parse(dados) : []);
    };

    const unsubscribe = setInterval(carregarItens, 500);
    return () => clearInterval(unsubscribe);
  }, []);

  const itensFiltrados = itens.filter((item) => {
    if (filtro === 'todos') return true;
    return item.tipo === filtro;
  });

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('Detalhe', { item })}
    >
      <Image
        source={
          item.imagem
            ? { uri: item.imagem }
            : require('../assets/placeholder.png')
        }
        style={styles.imagem}
      />
      <Text style={styles.nome}>{item.nome}</Text>
      <Text style={styles.tipo}>{item.tipo === 'brecho' ? 'Brechó' : 'Doação'}</Text>
      {item.tipo === 'brecho' && <Text style={styles.preco}>R$ {item.preco}</Text>}
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <View style={styles.filtros}>
        <TouchableOpacity
          style={[styles.botaoFiltro, filtro === 'todos' && styles.ativo]}
          onPress={() => setFiltro('todos')} 
        >
          <Text>Todos</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.botaoFiltro, filtro === 'brecho' && styles.ativo]}
          onPress={() => setFiltro('brecho')}
        >
          <Text>Brechó</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.botaoFiltro, filtro === 'doacao' && styles.ativo]}
          onPress={() => setFiltro('doacao')}
        >
          <Text>Doação</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={itensFiltrados}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f2f2f2',
    padding: 15,
    marginVertical: 8,
    borderRadius: 8,
  },
  imagem: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 10,
  },
  nome: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  tipo: {
    color: '#555',
    marginTop: 5,
    
  },
  preco: {
    fontSize: 16,
    color: '#D90119',
  },
  filtros: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  botaoFiltro: {
    padding: 8,
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: '#eee',
  },
  ativo: {
    backgroundColor: '#01D9C1',
  },
});
