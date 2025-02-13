// Importation des composants
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Colors from "./../constant/Colors";
import { useRouter } from "expo-router";


export default function Index() {

const router=useRouter();

  return (
    // Conteneur principal occupant tout l'espace disponible avec un fond blanc
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.WHITE
      }}
    >
      {/* Image affichée en haut de l'écran */}
      <Image source={require('./../assets/images/easyweb-1200x1200-blanc.png')}
        style={{
          width: '100%',
          height: 500,
          marginTop: 70

        }} />

      {/* Deuxième conteneur contenant le texte et le bouton */}
      <View style={{
        padding: 20,
        backgroundColor: Colors.PRIMARY,
        height: '100%',
        borderTopLeftRadius: 35,
        borderTopRightRadius: 35,


      }}>
        {/* Premier texte en gras, centré, de couleur blanche */}
        <Text style={{
          fontSize: 30,
          textAlign: 'center',
          color: Colors.WHITE,
          fontFamily: 'outfit-bold'
        }}>

          Salut les Terriens</Text>

        {/* Deuxième texte en plus petit, centré, avec un léger espacement en haut */}
        <Text style={{
          fontSize: 20,
          color: Colors.WHITE,
          textAlign: 'center',
          marginTop: 10,
          fontFamily: 'outfit-regular'
        }}>

          Bienvenu sur la planete Pandora!</Text>

        {/* Bouton stylisé avec Stylesheet + style cust */}
        <TouchableOpacity style={styles.button}
        onPress={() =>router.push('../auth/signUp')}
        >
          <Text style={[styles.buttonText, { color: Colors.PRIMARY }]}>Get Started</Text>
        </TouchableOpacity>
        
        
        {/* Deuxieme Bouton stylisé avec le texte "Get Started" */}
        <TouchableOpacity onPress={()=>router.push('../auth/signIn')} style={[styles.button, {
          backgroundColor: Colors.PRIMARY,
          borderWidth: 1,
          borderColor: Colors.WHITE,
        }]}>
          <Text style={[styles.buttonText, {
            color: Colors.WHITE
          }]}>Already have an account ?</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}

// Définition des styles avec StyleSheet pour le bouton
const styles = StyleSheet.create({
  button: {
    padding: 20,
    marginTop: 20,
    backgroundColor: Colors.WHITE,
    borderRadius: 10
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'outfit-Regular'
  }
})