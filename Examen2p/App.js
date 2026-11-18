import { StatusBar } from 'expo-status-bar';
import { useState , useEffect } from "react"
import { StyleSheet, Text, View, Pressable, Alert } from 'react-native';
import { Encabezado } from './componentes/Encabezado';


export default function App() {

const verAct1 =()=>{
  window.alert("Estudiar React Native")
 }

 const verAct2 = () =>{
  window.alert("Realizar Práctica en JavaScript")
 }

 const verAct3 = () =>{
  window.alert("Entregar Proyecto escolar")
 }

  return (


    <View style={styles.container}>
      
      <StatusBar style="auto" />

      <View style={styles.container}>
      <Text style={styles.titulo}>Mi Dia Universitario</Text>
      <Text style={styles.subtitulo}>Organiza tus actividades</Text>
    
      </View>
     

      <Text style={styles.titulo}>¡Hola, estudiante!</Text>
      <Text style={styles.subtitulo}>Hoy es un buen dia para cumplir tus objetivos</Text>
      <Text style={styles.subtitulo}>Mis actividades</Text>

      <Text style={styles.Tarjetas}>Estudiar React Native</Text>
      <Pressable onPress={verAct1}>
        <Text style={styles.botones}>Ver actividad</Text>
     </Pressable>

      <Text style={styles.Tarjetas}>Realizar practica en JavaScript</Text>
      <Pressable onPress={verAct2}>
        <Text style={styles.botones}>Ver actividad</Text>
     </Pressable>

      <Text style={styles.Tarjetas}>Entregar proyecto escolar</Text>
      <Pressable onPress={verAct3}>
        <Text style={styles.botones}>Ver actividad</Text>
     </Pressable>


       

    </View>
 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titulo: {
    fontSize:20,
    marginTop:20,
    marginButton:20
  },
  subtitulo:{
    fontSize:10,
    marginTop:10,
    textAlign:'center',
    marginButton:10
  },
  Encabezado: {
    backgroundColor: "Blue",
  },
  Tarjetas: {
    fontSize: 16,
    backgroundColor: "#d4cf2afd",
    color:'white',
    marginTop:10,
    marginButton:10
  },
  botones:{
    backgroundColor:'blue',
    marginTop:10,
    marginButton:10

  }
});
