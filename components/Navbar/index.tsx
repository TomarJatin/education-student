import { Color, FontSize } from "../../GlobalStyles";
import { Text, View, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
export default function Navbar({ navigation }: any) {
  return (
    <View
      style={{
        bottom: 10,
        backgroundColor: Color.textWhite,
        paddingHorizontal: 40,
        paddingVertical: 15,
        position: "absolute",
        zIndex: 20,
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        
        gap: 35,
      }}
    >
     <TouchableOpacity
        onPress={() => {
          navigation.navigate("Home");
        }}
        style={{
          flexDirection: "column",
          alignItems: "center",
        }}
        activeOpacity={0.5}
      >
        <Ionicons name="home-outline" size={24} color="black" />
        <Text
          style={{
            color: Color.textPrim,
            fontSize: FontSize.medium12pxMed_size,
          }}
        >
          Home
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          flexDirection: "column",
          alignItems: "center",
        }}
        activeOpacity={0.5}
        onPress={() => {
          navigation.navigate("Browsescreen");
        }}
      >
        <SimpleLineIcons name="bag" size={24} color="black" />
        <Text
          style={{
            color: Color.textPrim,
            fontSize: FontSize.medium12pxMed_size,
          }}
        >
          Browse
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate(" ");
        }}
        style={{
          flexDirection: "column",
          alignItems: "center",
        }}
        activeOpacity={0.5}
      >
        <Ionicons name="notifications-outline" size={24} color="black" />
        <Text
          style={{
            color: Color.textPrim,
            fontSize: FontSize.medium12pxMed_size,
          }}
        >
          Notification
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          flexDirection: "column",
          alignItems: "center",
        }}
        activeOpacity={0.5}
      >
        <Ionicons name="settings-outline" size={24} color="black" />
        <Text
          style={{
            color: Color.textPrim,
            fontSize: FontSize.medium12pxMed_size,
          }}
        >
          More
        </Text>
      </TouchableOpacity>
    </View>
  );
}
