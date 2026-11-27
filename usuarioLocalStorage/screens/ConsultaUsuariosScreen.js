import React , { useState, useCallback } from 'react';
import {SafeAreaView,View,Text,FlatList,StyleSheet,Pressable } from 'react-native';
import {router , useFocusEffect} from 'expo-router';
import { obtenerUsuarios } from '../services/usuariosService';

export default function ConsultaUsuariosScreen() {

  const [usuarios, setUsuarios] = useState([]);

    const cargarUsuarios = async () => {
    const lista = await obtenerUsuarios();
    setUsuarios(lista);
    };

    useFocusEffect(
     useCallback(() => {
    cargarUsuarios();
  }, [])
);

  const renderTarjeta = ({ item }) => (
 <Pressable
      onPress={()=>router.push({pathname:'/detalle',params:{id:item.id,nombre:item.nombre, edad:item.edad}})}
    >
      <View style={styles.card}>
        <Text style={styles.nombre}>{item.nombre}</Text>
        <View style={styles.linea}></View>
        <Text style={styles.info}>
          Edad: {item.edad} años
        </Text>
      </View>
    </Pressable>
  );

  return (

    <SafeAreaView style={styles.container}>

      <Text style={styles.titulo}>
        Lista de Usuarios
      </Text>

      <FlatList
        data={usuarios}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderTarjeta}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      />

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
    marginBottom: 20,
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 18,
    marginBottom: 15,
    elevation: 4,

    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },

  nombre: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2563EB',
  },

  linea: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 10,
  },

  info: {
    fontSize: 16,
    color: '#4B5563',
  },

});