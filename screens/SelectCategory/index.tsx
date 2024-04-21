import { Color, FontSize } from "../../GlobalStyles";
import {
  Dimensions,
  FlatList,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useContext } from "react";
import { DataContextType } from "../../types/context";
import { DataContext } from "../../contexts/DataContext";

export default function SelectCategory({ navigation }: any) {
  const { selectedChapter } = useContext(DataContext) as DataContextType;

  const handleSelectionClick = (selectedTab: string) => {
    switch(selectedTab){
      case "Videos":
        navigation.navigate("Videos");
        break;
      case "Assignments":
        navigation.navigate("Assignments");
        break;
      case "Tests":
        navigation.navigate("Tests");
        break;
      case "Notes":
        navigation.navigate("Notes");
    }
  };

  return (
    <SafeAreaView>
      <View
        style={{
          minHeight: Dimensions.get("window").height,
          backgroundColor: Color.textWhite,
        }}
      >
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
                Select Category
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

        {/* Body */}
        <FlatList
          data={["1"]}
          renderItem={() => (
            <View style={{ paddingBottom: 400 }}>
              <FlatList
                data={selectedChapter?.chapterComponent}
                renderItem={({ item, index }) => (
                  <TouchableOpacity
                    onPress={() => handleSelectionClick(item)}
                    activeOpacity={0.5}
                    key={index}
                    style={{
                      marginTop: 20,
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 10,
                    }}
                  >
                    <Text
                      style={{
                        color: Color.buttonBg,
                        fontWeight: "500",
                        fontSize: FontSize.medium11pxMed_size,
                      }}
                    >
                      {item}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          )}
          style={{
            paddingHorizontal: 15,
          }}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
}
