import { Color, FontSize } from "../../GlobalStyles";
import { Text, View, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
export default function Navbar({ navigation }: any) {
  const route = useRoute();
  return (
    <View
      style={{
        bottom: 10,
        backgroundColor: Color.textWhite,
        paddingHorizontal: 40,
        paddingTop: 15,
        paddingBottom: 10,
        position: "absolute",
        zIndex: 20,
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderColor: "#D7D7D7",
        borderTopWidth: 0.5,
        gap: 40,
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
        <Ionicons
          name={route.name === "Home" ? "home" : "home-outline"}
          size={20}
          color="black"
        />
        <Text
          style={{
            color: Color.textPrim,
            fontSize: FontSize.medium11pxMed_size,
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
        <SimpleLineIcons name="bag" size={20} color="black" />
        <Text
          style={{
            color: Color.textPrim,
            fontSize: FontSize.medium11pxMed_size,
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
        <Ionicons name="notifications-outline" size={20} color="black" />
        <Text
          style={{
            color: Color.textPrim,
            fontSize: FontSize.medium11pxMed_size,
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
        onPress={() => navigation.navigate("More")}
      >
        <Ionicons name="settings-outline" size={20} color="black" />
        <Text
          style={{
            color: Color.textPrim,
            fontSize: FontSize.medium11pxMed_size,
          }}
        >
          More
        </Text>
      </TouchableOpacity>
    </View>
  );
}
