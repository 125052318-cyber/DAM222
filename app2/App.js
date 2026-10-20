
/*1.- Zona de importaciones */
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View , Image} from 'react-native';
import {Saludo} from './components/Saludo';
import {Saludos2} from './components/Saludos2';
import {Perfil} from './components/Perfil';

/* 2.- Zona Main */
export default function App() {
  return (


    <View style={styles.container}>
      <Perfil style={styles.tarjeta1} nombre = "Genaro" carrera = "ITIID" materia = "Materia Movil" cuatri = "4"/>

      <Perfil style={styles.tarjeta2} nombre = "Emilio" carrera = "ITIID" materia = "Materia Movil" cuatri = "4"/>

      <Perfil style={styles.tarjeta3} nombre = "Jenny" carrera = "ITIID" materia = "Materia Movil" cuatri = "4"/>

      <StatusBar style="auto" />
    </View>

  );
}

/* 3.- Zona de estilos y posicionamientos */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  tarjeta1:{
backgroundColor:'green'
  },
  tarjeta2:{
backgroundColor:'yellow'
  },
  tarjeta3:{
backgroundColor:'purple'
  },
});
