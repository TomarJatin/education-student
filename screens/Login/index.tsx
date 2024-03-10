import { Image } from "expo-image";
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput } from "react-native-gesture-handler";
import { Color, FontSize } from "../../GlobalStyles";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts";
import { AuthContextType } from "../../types/context";
import { handleLogin } from "../../utils/api/login";

export default function Login() {
  const { setAuth } = useContext(AuthContext) as AuthContextType;
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");


  const DoLogin = () => {
    if(password === "" || email === ""){
      return;
    }
    handleLogin(email.toLowerCase(), password, setAuth);
  }

  return (
    <SafeAreaView>
      <View style={{
        width: "100%",
        flexDirection: "column",
        alignItems: "center",
        padding: 20
      }}>
        <Image
          style={{
            width: 167,
            height: 100,
            marginTop: Dimensions.get("window").height*0.15
          }}
          contentFit="contain"
          source={require("../../assets/login-img.png")}
        />
        <View style={{
          marginTop: Dimensions.get("window").height*0.14,
          width: "100%"
        }}>
          <Text style={{
            fontSize: FontSize.semi16pxSemi_size,
            fontWeight: "600",
            color: Color.textPrim
          }}>
          Sign in as Teacher/Assistant
          </Text>
          <Text style={{
            fontSize: FontSize.medium11pxMed_size,
            fontWeight: "600",
            color: Color.textSecondary,
            marginTop: 5
          }}>
          Enter Unique ID & Password
          </Text>
        </View>
        <View style={{
          width: "100%",
          flexDirection: "column",
          gap: 20,
          marginTop: Dimensions.get("window").height*0.06,
        }}>
          <View style={{
            flexDirection: "row",
            alignItems: "center",
            borderRadius: 10,
            gap: 10,
            borderColor: Color.border,
            borderWidth: 1,
            paddingVertical: 10,
            paddingHorizontal: 14
          }}>
            <MaterialIcons name="email" size={24} color="black" />
            <TextInput style={{
              width: "100%",
              fontSize: FontSize.medium12pxMed_size,
            }} placeholder="Login Id" value={email} onChangeText={(text) => setEmail(text)} />
          </View>
          <View style={{
            flexDirection: "row",
            alignItems: "center",
            borderRadius: 10,
            gap: 10,
            borderColor: Color.border,
            borderWidth: 1,
            paddingVertical: 10,
            paddingHorizontal: 14
          }}>
            <MaterialIcons name="lock" size={24} color="black" />
            <TextInput style={{
              width: "100%",
              fontSize: FontSize.medium12pxMed_size,
            }} placeholder="Password" secureTextEntry={true} value={password} onChangeText={(text) => setPassword(text)} />
          </View>
        </View>
        <TouchableOpacity onPress={DoLogin} activeOpacity={0.5} style={{
          width: "100%",
          backgroundColor: Color.buttonBg,
          paddingVertical: 10,
          borderRadius: 100,
          marginTop: 30
        }}>
          <Text style={{
            fontSize: FontSize.medium12pxMed_size,
            fontWeight: "500",
            color: Color.textWhite,
            textAlign: "center"
          }}>Login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
