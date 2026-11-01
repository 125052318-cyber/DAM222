import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View , SafeAreaView , ScrollView , Alert , TextInput , Button , Switch } from 'react-native';

export default function App() {

  // definicion de los estados que vamos a usar para los textos
  const [nombre , setNombre] = useState('');
  const [carrera , setCarrera] = useState('');
  const [semestre , setSemestre] = useState('');

  // definicion de los estados que vamos a usar para los switch
  const [taller , setTaller] = useState(false);
  const [constancia , setConstancia] = useState(false);
  const [deporte , setDeporte] = useState(false);

  // La logica para validar al momento de que presione el boton
  const validacionDatos = () =>{

    if(nombre == "" || carrera == "" || semestre == ""){
      Alert.alert("Faltan datos, Por favor verifique si completo los campos")
      return;
    }

    if(isNaN(semestre) ){
      Alert.alert("ERROR:" , " El semestre debe de ser numerico")
      return;
    }

    // Mostramos el Alert de confirmación
    //AL MOMENTO DE LLAMAR UNA VARIABLE TODO EL TEXTO VA CON COMILLAS INVERTIDAS , NO CON COMILLAS DOBLES O SIMPLES
    //ESTAS SON LAS COMILLAS INVERTIDAS ``

    Alert.alert("Registro enviado",
      `Nombre: ${nombre} \n Carrera: ${carrera}  \n Semestre: ${semestre} \n
Taller: ${taller ? 'Si' : 'No'} \n Constancia: ${constancia ? 'Si' : 'No'} \n Deporte: ${deporte ? 'Si' : 'No'}`
    )

    //Limpiamos campos
    setNombre("");
    setCarrera("");
    setSemestre("");

  } // llave de validacionDatos

  return (
    // El SafeAreaView nos ayudara a que este delimitada la zona del telefono y no invada los items o la isla dinamica
    <SafeAreaView style = {styles.safeArea}>

      <ScrollView contentContainerStyle = {styles.scrollContent}>

      <Text style = {styles.titulo}> Registro de Evento Universitario</Text>

      {/* Desarrollo de la vista para el TextInput */}

      <TextInput
      style = {styles.inputEst} 
      placeholder='NOMBRE'
      value={nombre}
      onChangeText={setNombre}
      />

      <TextInput
      style = {styles.inputEst} 
      placeholder='CARRERA'
      value={carrera}
      onChangeText={setCarrera}
      />

      <TextInput
      style = {styles.inputEst} 
      placeholder='SEMESTRE'
      value={semestre}
      onChangeText={setSemestre}
      />

      <Text style = {styles.titulo}>OPCIONES</Text>

      {/* El text para los switch */}
      <Text style = {styles.preguntas}>¿Asistirá al taller?</Text>
      <Switch
      value={taller}
      onValueChange={setTaller}
      trackColor={{ false: '#d3d3d3' , true: '#1c2e9e'}}
      />

      <Text style = {styles.preguntas}>¿Requiere constancia?</Text>
      <Switch
      value={constancia}
      onValueChange={setConstancia}
      trackColor={{ false: '#d3d3d3' , true: '#1c2e9e'}}
      />

      <Text style = {styles.preguntas}>¿Participará en deportes?</Text>
      <Switch
      value={deporte}
      onValueChange={setDeporte}
      trackColor={{ false: '#d3d3d3' , true: '#1c2e9e'}}
      />


      <Button title="Enviar Registro" onPress={validacionDatos} />
      
      </ScrollView>

    </SafeAreaView>
  );

} // Llave de App

const styles = StyleSheet.create({
   titulo: { /* Es el estilo para el titulo */
    fontSize:28,
    fontWeight:'bold',
    marginBottom:25
  }, 
  safeArea:{ /* Es el estilo obligatorio para el safeAreaView */
    flex:1,
    backgroundColor: "#4db6ac",
  },
  scrollContent:{ /* Es el estilo para el scroll */
    padding:20
  },
  inputEst:{ /* Es el estilo para los input */
    borderWidth:1,
    borderColor: '#000',
    padding:15,
    marginBottom:20,
    borderRadius: 8,
  },
  preguntas:{ /* Es el estilo para las preguntas */
    fontSize:20,
    color: 'white',
    fontWeight: 'bold',
    marginBottom:10,
    marginTop:5
  }
});
