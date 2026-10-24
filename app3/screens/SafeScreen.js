/* 1.- Zona de importaciones */
// Importa StatusBar para controlar la barra superior del teléfono (batería, hora, etc.)
import { StatusBar } from 'expo-status-bar';
// Importa los componentes base de React Native necesarios para construir la interfaz
import { StyleSheet, View, Text, SafeAreaView, ScrollView } from 'react-native';

/* 2.- Zona Main */
export default function SafeScrean() {
  return (
    /* SafeAreaView: Contenedor principal.
       Garantiza que nada de lo que esté adentro quede tapado por la cámara (notch) 
       o los bordes físicos redondeados del teléfono. */
    <SafeAreaView style={styles.safeArea}>
      
      {/* /* ScrollView: Permite que el contenido se pueda deslizar (scrollear).
         Nota que usamos 'contentContainerStyle' en lugar de 'style' para alinear los elementos internos. */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        <Text style={styles.title}>Práctica en equipo</Text>
        <Text style={styles.subtitle}>Desliza hacia abajo para ver más</Text>

        {/* Bucle para generar 15 cajas falsas. 
            Esto llena la pantalla a propósito para que puedas probar el gesto de deslizamiento. */}
            
        {[...Array(15)].map((_, index) => (
          // El atributo 'key' es obligatorio en React al hacer listas para identificar cada nodo
          <View key={index} style={styles.box}>
            <Text>Registro de prueba {index + 1}</Text>
          </View>
        ))}

        {/* Ajusta automáticamente el color de los iconos de la barra superior (hora, batería) */}
        <StatusBar style="auto" />
        
      </ScrollView>
    </SafeAreaView>
  );
}

/* 3.- Zona de estilos y posicionamientos */
const styles = StyleSheet.create({
  safeArea: {
    // flex: 1 es crucial aquí. Le dice al SafeAreaView que se expanda y ocupe el 100% del alto de la pantalla.
    // Sin esto, el contenedor colapsa y tu pantalla se verá en blanco.
    flex: 1, 
    backgroundColor: '#00BFFF', // Color de fondo general (azul cielo profundo)
  },
  scrollContent: {
    // Añade espacio interno alrededor del contenido desplazable
    padding: 20,
    // Centra todos los textos y cajas horizontalmente
    alignItems: 'center', 
  },
  title: {
    fontSize: 24, // Tamaño de letra grande
    fontWeight: 'bold', // Grosor de letra (negrita)
    marginTop: 10, // Margen exterior superior
  },
  subtitle: {
    fontSize: 16,
    color: '#666', // Color de texto gris oscuro para menor jerarquía visual
    marginBottom: 20, // Empuja las cajas hacia abajo para separarlas del subtítulo
  },
  box: {
    backgroundColor: 'white', // Fondo blanco para cada registro
    width: '90%', // Cada caja toma el 90% del ancho disponible
    padding: 30, // Espacio interno para que el texto respire
    marginVertical: 10, // Margen exterior arriba y abajo (separa una caja de otra)
    borderRadius: 8, // Esquinas redondeadas
    elevation: 3, // Aplica una sombra suave en Android para dar un efecto de "tarjeta" elevada
  }
});