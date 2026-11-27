import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { actualizarUsuario as actualizarUsuarioService } from '../services/usuariosService';

export default function ActualizarUsuarioScreen() {
  const params = useLocalSearchParams();
  const [nombre, setNombre] = useState(params.nombre ? String(params.nombre) : '');
  const [edad, setEdad] = useState(params.edad ? String(params.edad) : '');
  const [guardando, setGuardando] = useState(false);
  const [mensajeError, setMensajeError] = useState('');
  const [mensajeExito, setMensajeExito] = useState('');

  const actualizarUsuario = async () => {
    if (guardando) return;
    setGuardando(true);
    setMensajeError('');
    setMensajeExito('');

    try {
      const resultado = await actualizarUsuarioService(params.id, { nombre, edad });

      if (!resultado.ok) {
        setMensajeError(
          Array.isArray(resultado.errores)
            ? resultado.errores.join('\n')
            : 'No se pudieron validar los datos del usuario.'
        );
        return;
      }

      setMensajeExito('Usuario actualizado en LocalStorage.');

      setTimeout(() => {
        if (router.canGoBack()) {
          router.back();
        } else {
          router.replace('/consulta');
        }
      }, 400);
    } catch (error) {
      setMensajeError(error?.message || 'Ocurrió un error al actualizar el usuario.');
    } finally {
      setGuardando(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>
        Actualizar Usuario
      </Text>

      <View style={styles.card}>
        <Text style={styles.label}>
          Nombre
        </Text>

        <TextInput
          style={styles.input}
          value={nombre}
          onChangeText={setNombre}
          placeholder="Nombre"
        />

        <Text style={styles.label}>
          Edad
        </Text>

        <TextInput
          style={styles.input}
          value={edad}
          onChangeText={setEdad}
          placeholder="Edad"
          keyboardType="numeric"
        />

        {mensajeError ? (
          <Text style={styles.mensajeError}>{mensajeError}</Text>
        ) : null}

        {mensajeExito ? (
          <Text style={styles.mensajeExito}>{mensajeExito}</Text>
        ) : null}

        <Pressable
          style={[styles.boton, guardando && styles.botonDeshabilitado]}
          onPress={actualizarUsuario}
          disabled={guardando}
        >
          <Text style={styles.textoBoton}>
            {guardando ? 'Guardando...' : 'Guardar cambios'}
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
    padding: 20,
  },

  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#1F2937',
    marginBottom: 25,
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 25,
    elevation: 5,
  },

  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 8,
  },

  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 20,
  },

  mensajeError: {
    color: '#DC2626',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
  },

  mensajeExito: {
    color: '#15803D',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
  },

  boton: {
    backgroundColor: '#FACC15',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },

  botonDeshabilitado: {
    opacity: 0.6,
  },

  textoBoton: {
    color: '#1F2937',
    fontSize: 16,
    fontWeight: 'bold',
  },
});