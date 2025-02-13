import {View,Text,Image,TextInput,TouchableOpacity,Pressable,} from "react-native";
import React, { useContext, useState } from "react";
import Colors from "./../../constant/Colors";
import { StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { auth, db } from "../../config/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { UserDetailContext } from "./../../context/UserDetailContext";

export default function SignUp() {
  const router = useRouter();
  const [fullName,setFullName]=useState()
  const [email,setEmail]=useState()
  const [password,setPassword]=useState()
  const {userDetail,setUserDetail}=useContext(UserDetailContext)

  const CreateNewAccount=()=>{
    createUserWithEmailAndPassword(auth,email,password)
    .then(async(resp)=>{
      const user=resp.user;
      console.log(user);
      await SaveUser(user);
      // Save user to Database
    })
    .catch(e=>{
      console.log(e.message)
    })
  }

  const SaveUser=async(user)=>{
    const data={
      name: fullName,
      email: email,
      member:false,
      uid:user?.uid
    }
    await setDoc(doc(db, 'users', email),data)

    setUserDetail(data)
  

    // Navigate to New Screen

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
        Create an Account
      </Text>
      <TextInput placeholder="Full Name" onChangeText={(value)=>setFullName(value)} style={styles.textInput} />
      <TextInput placeholder="Email" keyboardType="email" onChangeText={(value)=>setEmail(value)} style={styles.textInput} />
      <TextInput placeholder="Password" onChangeText={(value)=>setPassword(value)} secureTextEntry={true} style={styles.textInput}/>
      
      <TouchableOpacity
      onPress={CreateNewAccount}
        style={{
          padding: 15,
          width: "100%",
          backgroundColor: Colors.PRIMARY,
          borderRadius: 10,
          marginTop: 25,
        }}
      >
        <Text
          style={{
            fontFamily: "outfit",
            fontSize: 20,
            color: Colors.WHITE,
            textAlign: "center",
          }}
        >
          Create an Account
        </Text>
      </TouchableOpacity>

      <View style={{display: "flex",flexDirection: "row",gap: 5,marginTop: 20,}}>
        <Text style={{ fontFamily: "outfit" }}>Already have an account</Text>
        <Pressable onPress={() => router.push("/auth/signIn")}>
          <Text style={{color: Colors.PRIMARY,fontFamily: "outfit-bold",}}>
            Sign In Here
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
