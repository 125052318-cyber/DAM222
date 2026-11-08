import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ActivityIndicator, TextInput, TouchableOpacity } from 'react-native';
import { useState } from 'react';

export default function App() {
  const [cargando, setCarga] = useState(false);
  const [pantalla, setPantalla] = useState('principal');
  
  // Estados para tu formulario
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');

  const cambiarPantalla = (destino) => {
    setCarga(true);
    setTimeout(() => {
      setPantalla(destino);
      setCarga(false);
    }, 1500);
  };

  // PANTALLA DE CARGA
  if (cargando) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#5c5cff" />
        <Text style={styles.textoCarga}>Cargando...</Text>
      </View>
    );
  }

  // PANTALLA DE INICIO (Formulario)
  if (pantalla === 'inicio') {
    return (
      <View style={styles.container}>
        <Text style={styles.tituloBold}>Iniciar Sesion</Text>
        
        <TextInput
          style={styles.input}
          placeholder="Escribe tu correo"
          placeholderTextColor="#a0a0a0"
          value={correo}
          onChangeText={setCorreo}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        
        <TextInput
          style={styles.input}
          placeholder="Escribe tu contraseña"
          placeholderTextColor="#a0a0a0"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />
        
        <TouchableOpacity onPress={() => cambiarPantalla('principal')}>
          <Text style={styles.textoAzul}>Regresar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // PANTALLA PRINCIPAL
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Pantalla Principal</Text>
      <StatusBar style="auto" />
      
      <TouchableOpacity onPress={() => cambiarPantalla('inicio')}>
        <Text style={styles.textoAzul}>Ir a Inicio</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d9d9d9', 
    alignItems: 'center',
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 20,
    marginBottom: 10,
    color: '#000',
  },
  tituloBold: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#000',
  },
  textoCarga: {
    marginTop: 10,
    fontSize: 14,
    color: '#000',
  },
  input: {
    width: '80%',
    height: 45,
    borderColor: '#b0b0b0',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 15,
    borderRadius: 8,
    backgroundColor: '#e6e6e6',
  },
  textoAzul: {
    color: '#0066cc',
    fontSize: 16,
    marginTop: 10,
  }
});