
/*1.- Zona de importaciones */
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import MenuScreen from './screens/MenuScreen';

/* 2.- Zona Main */
export default function App() {
  return (
    <MenuScreen></MenuScreen>
  );
}

/* 3.- Zona de estilos y posicionamientos */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
