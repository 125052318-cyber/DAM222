import { View , Text , Switch , StyleSheet} from "react-native";

export default function SwitchEjemplo({oscuro , cambiarModo}){

    return(
        <View>
            <Text style = {[styles.titulo , {color:oscuro ? '#FFFFFF' : '#000000'}]}>
                Modo Oscuro
            </Text>
            <Switch
                value = {oscuro}
                onValueChange = {cambiarModo}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {

        alignItems: 'center',
        justifyContent: 'center',
    },

titulo: {
        fontSize: 18,
        fontWeight:'bold',
        marginBottom: 8
    },
})