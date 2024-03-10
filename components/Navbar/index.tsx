import { Color, FontSize } from "../../GlobalStyles";
import {
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';

import { AntDesign } from '@expo/vector-icons';

export default function Navbar({ navigation }: any){
    return (
        <View style={{
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
            gap: 30
        }}>
            <TouchableOpacity onPress={() => {
                navigation.navigate("SelectedCourse")
            }} style={{
              flexDirection: "column",
              alignItems: "center"
            }} activeOpacity={0.5}>
            <AntDesign name="folderopen" size={16} color="black" />
                <Text style={{color: Color.textPrim, fontSize: FontSize.medium12pxMed_size}}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity  style={{
              flexDirection: "column",
              alignItems: "center"
            }} activeOpacity={0.5}>
            <Feather name="activity" size={16} color="black" />
                <Text style={{color: Color.textPrim, fontSize: FontSize.medium12pxMed_size}}>Browse</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
                navigation.navigate("Tags")
            }} style={{
              flexDirection: "column",
              alignItems: "center"
            }} activeOpacity={0.5}>
            <Octicons name="hash" size={16} color="black" />
                <Text style={{color: Color.textPrim, fontSize: FontSize.medium12pxMed_size}}>Notification</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{
              flexDirection: "column",
              alignItems: "center"
            }} activeOpacity={0.5}>
           <Ionicons name="add-circle-outline" size={16} color="black" />
                <Text style={{color: Color.textPrim, fontSize: FontSize.medium12pxMed_size}}>More</Text>
            </TouchableOpacity>
        </View>
    )
}