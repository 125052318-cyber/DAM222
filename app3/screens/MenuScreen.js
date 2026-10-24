
/*1.- Zona de importaciones */
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, Button} from 'react-native';
import { useState } from 'react';
import Tarjetas from './Tarjetas';
import SafeScrean from './SafeScreen';
import SinSafeScrean from './SinSafeScreen';

/* 2.- Zona Main */
export default function MenuScreen() {

    const[screen,setScreen] = useState('menu');

    switch(screen){
        case 'tarjetas':
            return <Tarjetas/>

        case 'safescreen':
            return <SafeScrean/>

            case 'sinsafescreen':
            return <SinSafeScrean/>

        case 'menu':
            default:
                 return (

                <View style={styles.container}>

                    <Text> Menu de practicas </Text>

                    <Button title="Tarjetas" onPress={()=>setScreen('tarjetas')}></Button>
                    <Button title="SafeAreaView" onPress={()=>setScreen('safescreen')}></Button>
                    <Button title="Sin SafeAreaView" onPress={()=>setScreen('sinsafescreen')}></Button>
                    
                <StatusBar style="auto" />
                </View>

                     );
  } /* Esta llave es el switch */

} /* Esta llave es de la funcion */

/* 3.- Zona de estilos y posicionamientos */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});