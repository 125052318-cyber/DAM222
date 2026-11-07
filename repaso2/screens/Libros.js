import {StatusBar} from  "expo-status-bar"
import { useState , useEffect } from "react"
import {StyleSheet , Text , SafeAreaView , ScrollView, Alert, TextInput, Pressable , View ,Image , ActivityIndicator, FlatList, SectionList} from "react-native"

export default function Libros(){

/* Variable para mostrar la pantalla de carga */
const [mostrarSplash , setMostrasSplash] = useState(true)

/* Variables para extraer informacion de los libros */
const [titulo , setTitulo] = useState('');
const [autor , setAutor] = useState('');
const [genero , setGenero] = useState('');

/* Variables para cuando se ejecute el boton: cargar y guardar los libros */
const [cargar , setCargar] = useState(false);
const [libros , setLibros] = useState([]);


/* Validacion al momento de que el usuario pique el boton */
const guardarYverificar = () =>{
    /* Validacion cuando el usuario no completa algun campo */
    if(titulo == "" || autor == "" || genero==""){
        Alert.alert("Favor de llenar todos los campos")
        return;
    }

    /* Encendemos el indicador de carga */
    setCargar(true);

    /* Iniciamos el temporizador de 4 segundos */
    setTimeout(() =>{
        /* se crea el nuevo libro y se agrega a la lista */
        const nuevoLibro = {
            id: Date.now().toString(),
            titulo:titulo,
            autor:autor,
            genero:genero
        }
        setLibros([...libros , nuevoLibro])
        
        /* Se vacian los inputs al momento de presionar el boton (Pressable) */
        setTitulo("");
        setAutor("");
        setGenero("");

        /* Se apaga el indicadro de carga */
        setCargar(false)

         /* Validacion para cuando se haga el registro exitosamente */
         /* Usar comillas invertidas en caso de mostrar las variables --> `` */
        Alert.alert("Libro guardado exitosamente")

        },4000)
}


/* Lleva el tiempo para mostrar la pantalla de carga */
useEffect(() => {
    const timer = setTimeout (() => {
        setMostrasSplash(false)
    }, 2000)
    return () => clearTimeout(timer);
},[])


/* Muestra la imagen y el texto de la pantalla de carga */
if(mostrarSplash){
    return(
        <View style={styles.splashCont}>
            <Image source = {require('../assets/image.png')} />
            <Text style={styles.slplasLoan}>Repa2</Text>
        </View>
    )
}

    return(
        <> 
        {/* Todo se trabajo en Fragmentos */}
        {/* Se usa image para hacer el fondo de pantalla */}
        <Image
        source={require('../assets/image1.jpg')}
        style = {styles.imagenFondo}
        resizeMode="cover"
        />

            <SafeAreaView style = {styles.safeAreaS}>
                
                    <Text style = {styles.titulo} >CATÁLOGO DE LIBROS</Text>

                    {/* Titulo del libro */}
                    <TextInput
                    style = {styles.textInp}
                    placeholder="Titulo del libro"
                    value={titulo}
                    onChangeText={setTitulo}
                    />

                    {/* Autor */}
                    <TextInput
                    style = {styles.textInp}
                    placeholder="Autor"
                    value={autor}
                    onChangeText={setAutor}
                    />

                    {/* Género */}
                    <TextInput
                    style = {styles.textInp}
                    placeholder="Género"
                    value={genero}
                    onChangeText={setGenero}
                    />

                    {/* Boton para guardar */}
                    {/* Se manda a llamar la constante donde se hizo la verificacion */}
                    <Pressable style = {styles.estiloBoton} onPress={guardarYverificar}> 
                        <Text style = {styles.textoBoton}>Agregar Libro</Text>
                    </Pressable>

                    {/* Muestra la actividad de ActivityIndicator */}
                    {cargar &&(
                        <View style ={{alignItems:'center', marginTop:20}} >
                        <ActivityIndicator size="large" color={'#4a73ac'} />
                        <Text style = {{fontSize:24 , color:'black' , fontWeight:'bold'}} >CARGANDO...</Text>

                        </View>
                    )}

                    {/* Mostramos el total de libros que hay */}
                    <Text style = {styles.textoSimple} >Total de libros: {libros.length}</Text>


                    {/* Mostramos los datos de los libros */}
                    <FlatList 
                    data = {libros}
                    keyExtractor = {(item) => item.id}
                    renderItem = {({item}) => (
                    <View style = {styles.tarjeta} >
                    <Text style = {styles.tituloTarjeta} >Titulo: {item.titulo} </Text>
                    <Text style = {styles.tituloTarjeta} >Autor: {item.autor} </Text>
                    <Text style = {styles.tituloTarjeta} >Género: {item.genero} </Text>
                    </View>
                        )}>
                    </FlatList>
                
            </SafeAreaView>

        </>
    )
}

const styles = StyleSheet.create({
safeAreaS:{ /* Es el formato obligatorio para tener la seguridad en la pantalla */
flex:1
},
titulo:{ /* Es el estilo para el titulo de la app */
fontSize:26,
marginTop:20,
color:'#FFFF',
marginBottom:20,
textAlign:'center',
fontWeight:'bold'
},
splashCont:{ /* Es el estilo para la pantalla de carga */
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    width:'100%'
}, 
slplasLoan:{ /* Es el estilo para el texto de la pantalla de carga */
    color:'#0a0a0a',
    marginTop:20,
    fontSize:20,
    fontWeight:'bold'
},
imagenFondo:{ /* Es el estilo para poner el fondo de pantalla en la app */
    position:'absolute', /* Este es obligatorio para que pueda funcionar como fondo */
    top:0,
    left:0,
    bottom:0,
    right:0,
    width:'100%',
    height:'100%',
},
textInp:{ /* Es el estilo para los inputs */
    borderWidth:3,
    borderColor:'#e26900',
    backgroundColor:'#FFFF',
    fontSize:24,
    borderRadius:8,
    marginBottom:20,
    marginTop:20,
    padding:10,
    width:'95%',
    alignSelf:'center'
},
estiloBoton:{ /* Es el estilo para el boton (Pressable) */
    backgroundColor:'#0011fb',
    borderColor:'#f3f1f8',
    borderRadius:8,
    padding:20,
    marginTop:10,
    borderWidth:3,
    width:'90%',
    alignSelf:'center'

},
textoBoton:{ /* Es el estilo para el texto del boton (Pressable) */
    fontSize:24,
    fontWeight:'bold',
    textAlign:'center',
    color:'#f3f1f8'
},
textoSimple:{ /* Es el estilo para el texto donde muestra el conteo de libros */
    fontSize:20,
    color:'Black',
    fontWeight:'bold',
    textAlign:'left',
    marginTop:10,
    marginLeft:15
},
tarjeta:{ /* Es el estilo para el diseño de la tarjeta del flatList */
marginTop:10,
padding:10,
backgroundColor:'#5b99a3',
borderRadius:8,
borderColor:'white',
width:'90%',
alignSelf:'center',
},
tituloTarjeta:{ /* Diseño para el titulo del libro en la tarjeta */
fontSize:20,
color:'white',
fontWeight:'bold',
textAlign:'left'
},
subTituloTarjeta:{ /* Diseño para los subtitulos del libro en la tarjeta */
fontSize:18,
color:'#ed900d',
fontWeight:'bold',
textAlign:'left'
}
})