import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import { UserDetailContext } from "./../context/UserDetailContext";
import { useState } from "react";

export default function RootLayout() {

  const [loaded, error] = useFonts({
    'outfit-regular': require('./../assets/fonts/Outfit-Regular.ttf'),
    'outfit-bold': require('./../assets/fonts/Outfit-Bold.ttf'),
    'outfif-regular': require('./../assets/fonts/Outfit-Regular.ttf'),
  })

  const [userDetail, setUserDetail] = useState(null);
  
  return (
    <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
      <Stack screenOptions={{ headerShown: false }}>
        {/* Ensure that your routes/components are here */}
      </Stack>
    </UserDetailContext.Provider>
  )
}
