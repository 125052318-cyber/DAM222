/* 1.- Zona de importaciones */
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, ScrollView } from 'react-native';

/* 2.- Zona Main */
export default function SinSafeScrean() {
  return (
    /* Cambiamos SafeAreaView por un View normal para que notes la diferencia.
       Al hacer esto, el contenido ignorará los bordes seguros del teléfono. */
    <View style={styles.container}>
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        <Text style={styles.title}>Práctica en equipo</Text>
        <Text style={styles.subtitle}>Desliza hacia abajo para ver más</Text>

        {[...Array(15)].map((_, index) => (
          <View key={index} style={styles.box}>
            <Text>Registro de prueba {index + 1}</Text>
          </View>
        ))}

        <StatusBar style="auto" />
        
      </ScrollView>
    </View>
  );
}

/* 3.- Zona de estilos y posicionamientos */
const styles = StyleSheet.create({
  container: { // Renombramos de safeArea a container
    flex: 1, 
    backgroundColor: '#00BFFF',
  },
  scrollContent: {
    padding: 20,
    alignItems: 'center', 
  },
  title: {
    fontSize: 24, 
    fontWeight: 'bold', 
    marginTop: 10, 
  },
  subtitle: {
    fontSize: 16,
    color: '#666', 
    marginBottom: 20, 
  },
  box: {
    backgroundColor: '#fff', 
    width: '90%', 
    padding: 30, 
    marginVertical: 10, 
    borderRadius: 8, 
    elevation: 3, 
  }
});