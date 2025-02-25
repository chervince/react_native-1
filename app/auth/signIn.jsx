import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Pressable, ToastAndroid, ActivityIndicator } from "react-native";
import React, { useState, useContext } from "react";
import Colors from "./../../constant/Colors";
import { useRouter } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../config/firebaseConfig";
import { getDoc, doc } from "firebase/firestore";
import { UserDetailContext } from "./../../context/UserDetailContext";

export default function signIn() {
  const router = useRouter();
  const [email,setEmail]=useState()
  const [password,setPassword]=useState()
  const context = useContext(UserDetailContext);
  if (!context) {
    throw new Error("UserDetailContext must be used within a UserDetailContext.Provider");
  }
  const { userDetail, setUserDetail } = context;
  const [loading,setLoading]=useState(false);

  const onSignInClick=()=>{
    setLoading(true)
    signInWithEmailAndPassword(auth,email,password)
    .then(async (resp)=> {
      const user = resp.user
      console.log(user)
      await getUserDetail();
      setLoading(false);
      router.replace("/(tabs)/home")   
    }).catch(e => {
      console.log(e)
      setLoading(false);
      ToastAndroid.show('e.message',ToastAndroid.BOTTOM)
    })

  }

  const getUserDetail=async()=>{
    const result=await getDoc(doc(db,'users',email));
    console.log(result.data())
    setUserDetail(result.data())
  }

  return (
       <View
          style={{
            display: "flex",
            alignItems: "center",
            flex: 1,
            backgroundColor: Colors.WHITE,
            paddingTop: 100,
            flex: 1,
            padding: 25,
          }}
        >
          <Image
            source={require("./../../assets/images/easyweb-1200x1200-noir.png")}
            style={{
              width: 180,
              height: 180,
            }}
          />
          <Text
            style={{
              fontSize: 30,
              fontFamily: "outfit",
            }}
          >
            Welcome Back
          </Text>
          <TextInput placeholder="Email"
              onChangeText={(value)=>setEmail(value)}
              style={styles.textInput} />
          <TextInput placeholder="Password"
              onChangeText={(value)=>setPassword(value)} 
              secureTextEntry={true} 
              style={styles.textInput}/>
          
          <TouchableOpacity
          onPress={onSignInClick}
          disabled={loading}
            style={{
              padding: 15,
              width: "100%",
              backgroundColor: Colors.PRIMARY,
              borderRadius: 10,
              marginTop: 25,
            }}
          >
            {!loading? <Text
              style={{
                fontFamily: "outfit",
                fontSize: 20,
                color: Colors.WHITE,
                textAlign: "center",
              }}>Sign in</Text>:
              <ActivityIndicator size="large" color={Colors.WHITE}/>
            }
                            
          </TouchableOpacity>
    
          <View style={{display: "flex",flexDirection: "row",gap: 5,marginTop: 20,}}>
            <Text style={{ fontFamily: "outfit" }}>Don't have an account</Text>
            <Pressable onPress={() => router.push("/auth/signUp")}>
              <Text style={{color: Colors.PRIMARY,fontFamily: "outfit-bold",}}>
                Create New Here
              </Text>
            </Pressable>
          </View>
        </View>
  );
}

const styles = StyleSheet.create({
  textInput: {
    fontSize: 20,
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 20,
  },
});
