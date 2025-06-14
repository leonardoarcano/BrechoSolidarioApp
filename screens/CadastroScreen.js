import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { Image } from 'react-native';

export default function CadastroScreen({ navigation }) {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [tipo, setTipo] = useState('doacao'); // 'doacao' ou 'brecho'
  const [preco, setPreco] = useState('');
  const [imagemUri, setImagemUri] = useState(null);
  const escolherImagem = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Permissão negada para acessar as imagens!');
      return;
    }
  
    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });
  
    if (!resultado.canceled) {
      setImagemUri(resultado.assets[0].uri);
    }
  };

  const handleSalvar = async () => {
    if (!nome.trim()) {
      Alert.alert('Erro', 'Por favor, insira o nome do item.');
      return;
    }

    const novoItem = {
        id: Date.now(),
        nome,
        descricao,
        tipo,
        preco: tipo === 'brecho' ? preco : null,
        imagem: imagemUri,
      };

    try {
      const dadosSalvos = await AsyncStorage.getItem('itens');
      const lista = dadosSalvos ? JSON.parse(dadosSalvos) : [];
      lista.push(novoItem);
      await AsyncStorage.setItem('itens', JSON.stringify(lista));
      navigation.navigate('Lista');
      Alert.alert('Sucesso!', 'Item cadastrado com sucesso.');
    } catch (e) {
      console.log('Erro ao salvar:', e);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nome do item</Text>
      <TextInput style={styles.input} value={nome} onChangeText={setNome} />

      <Text style={styles.label}>Descrição (opcional)</Text>
      <TextInput style={styles.input} value={descricao} onChangeText={setDescricao} />

      <Text style={styles.label}>Tipo</Text>
      <View style={styles.toggleContainer}>
        <TouchableOpacity
          style={[styles.toggleButton, tipo === 'doacao' && styles.selected]}
          onPress={() => setTipo('doacao')}
        >
          <Text style={styles.toggleText}>Doação</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.toggleButton, tipo === 'brecho' && styles.selected]}
          onPress={() => setTipo('brecho')}
        >
          <Text style={styles.toggleText}>Brechó</Text>
        </TouchableOpacity>
      </View>

      {tipo === 'brecho' && (
        <>
          <Text style={styles.label}>Preço (R$)</Text>
          <TextInput style={styles.input} value={preco} onChangeText={setPreco} keyboardType="numeric" />
        </>
      )}

      <TouchableOpacity style={styles.uploadButton} onPress={escolherImagem}>
  <Text style={styles.uploadText}>
    {imagemUri ? 'Imagem selecionada' : 'Adicionar imagem'}
  </Text>
</TouchableOpacity>

{imagemUri && (
  <Image
    source={{ uri: imagemUri }}
    style={{ width: 100, height: 100, alignSelf: 'center', marginBottom: 10 }}
  />
)}

      <Button title="Salvar" onPress={handleSalvar} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flex: 1,
  },
  label: {
    marginTop: 10,
    fontSize: 16,
    color: '#333',
  },
  input: {
    backgroundColor: '#eee',
    padding: 10,
    borderRadius: 8,
    marginTop: 5,
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  toggleButton: {
    flex: 1,
    padding: 10,
    marginHorizontal: 5,
    backgroundColor: '#ccc',
    borderRadius: 8,
    alignItems: 'center',
  },
  selected: {
    backgroundColor: '#01D9C1',
  },
  toggleText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  uploadButton: {
    marginVertical: 20,
    padding: 15,
    backgroundColor: '#ddd',
    borderRadius: 8,
    alignItems: 'center',
  },
  uploadText: {
    color: '#555',
  },
});
