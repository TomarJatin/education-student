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
import { Image } from "expo-image";

export default function SelectCategory({ navigation }: any) {
  const { selectedChapter } = useContext(DataContext) as DataContextType;

  const handleSelectionClick = (selectedTab: string) => {
    switch (selectedTab) {
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
            <View
              style={{
                padding: 20,
                paddingTop: 10,
                borderRadius: 20,
                backgroundColor: Color.cardBg,
                borderColor: Color.border,
                borderWidth: 1,
                marginTop: 20,
              }}
            >
              <FlatList
                data={selectedChapter?.chapterComponent}
                renderItem={({ item, index }) => (
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 10,
                    }}
                  >
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
                      <Image
                        source={{
                          uri: selectedChapter?.chapterIcon,
                        }}
                        contentFit="cover"
                        style={{
                          width: 46,
                          height: 46,
                          borderRadius: 6,
                        }}
                      />
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
                  </View>
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
