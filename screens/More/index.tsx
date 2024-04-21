import { Dimensions, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Navbar from "../../components/Navbar";
import { Color, FontSize } from "../../GlobalStyles";
import { MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../contexts";
import { AuthContextType } from "../../types/context";

export default function More({navigation}: any) {
    const { setAuth } = useContext(AuthContext) as AuthContextType;

    const handleLogout = async () => {
        
        setAuth(false);
        await AsyncStorage.clear();
      };

  return (
    <SafeAreaView>
      <View style={{
        minHeight: Dimensions.get("window").height,
        backgroundColor: Color.bg,
      }}>
        <View
          style={{
            width: "100%",
            paddingHorizontal: 0,
            paddingVertical: 20,
            borderBottomColor: Color.border,
            borderBottomWidth: 1,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                style={{ paddingHorizontal: 15 }}
                activeOpacity={0.5}
                onPress={() => navigation.goBack()}
              >
                <MaterialIcons name="chevron-left" size={30} color="black" />
              </TouchableOpacity>
              <Text
                style={{
                  color: Color.textPrim,
                  fontSize: FontSize.medium14pxMed_size,
                  fontWeight: "600",
                }}
              >
                More 
              </Text>
            </View>
            <TouchableOpacity
              style={{ paddingHorizontal: 15 }}
              activeOpacity={0.5}
            >
              <MaterialIcons name="more-vert" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{
            padding: 20
        }}>
            <TouchableOpacity style={{
                paddingVertical: 10
            }} onPress={handleLogout} activeOpacity={0.5}>
            <Text style={{
                fontSize: FontSize.medium14pxMed_size,
                fontWeight: "600"
            }}>
                Logout
            </Text>
        </TouchableOpacity>
        </View>
      </View>
      <Navbar navigation={navigation} />
    </SafeAreaView>
  );
}
