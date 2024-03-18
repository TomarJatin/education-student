import { View, Text, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Navbar from "../../components/Navbar";

export default function Analytics({ navigation }: any) {
    return (
        <SafeAreaView>
            <View style={{
                minHeight: Dimensions.get("window").height,
            }}>
            <Text>Analytics</Text>
            </View>
            <Navbar navigation={navigation}/>
        </SafeAreaView>
    )
}