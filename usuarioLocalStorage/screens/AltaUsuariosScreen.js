import React, { useState } from 'react';
import {View,SafeAreaView,Text,TextInput,Pressable,StyleSheet, Alert} from 'react-native';
import { router } from 'expo-router';
import { crearUsuario } from '../services/usuariosService';

export default function App() {
  const [nombre, setNombre] = useState('');
  const [edad, setEdad] = useState('');

  const [guardando, setGuardando] = useState(false);

  const manejarAgregarUsuario = async () => {
  if (guardando) return;
  setGuardando(true);
  try {
    const resultado = await crearUsuario({ nombre, edad });
    if (!resultado.ok) {
      Alert.alert('Error de validación', resultado.errores.join('\n'));
      return;
    }
    setNombre('');
    setEdad('');
    Alert.alert('Éxito', 'Usuario guardado en LocalStorage.', [
      { text: 'Aceptar', onPress: () => router.canGoBack() && router.back() },
    ]);
  } finally {
    setGuardando(false);
  }
 };

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.card}>

        <Text style={styles.titulo}>
          Registro de Usuarios
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Nombre del usuario"
          value={nombre}
          onChangeText={setNombre}
        />

        <TextInput
          style={styles.input}
          placeholder="Edad del usuario"
          keyboardType="numeric"
          value={edad}
          onChangeText={setEdad}
        />

        <Pressable style={styles.boton}
        onPress={manejarAgregarUsuario}
        disabled={guardando}>
          <Text style={styles.textoBoton}>
            Agregar Usuario
          </Text>
        </Pressable>

      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  card: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    padding: 25,
    borderRadius: 15,
    elevation: 5, 
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },

  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 25,
    color: '#1F2937',
  },

  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 18,
    backgroundColor: '#F9FAFB',
    fontSize: 16,
  },

  boton: {
    backgroundColor: '#29bb0c',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },

  textoBoton: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: 'bold',
  },

});