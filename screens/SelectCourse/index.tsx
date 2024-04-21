import { Color, FontSize } from "../../GlobalStyles";
import {
  Dimensions,
  FlatList,
  ImageBackground,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Octicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { useContext, useEffect, useState } from "react";
import { Image } from "expo-image";
import { getAllCourse } from "../../utils/api/baseCourses";
import { CourseType } from "../../types/courses";
import { DataContextType } from "../../types/context";
import { DataContext } from "../../contexts/DataContext";

export default function SelectCourse({ navigation }: any) {
    const { setSelectedForumCourse } = useContext(DataContext) as DataContextType;
    const [allCourses, setAllCourses] = useState<CourseType[]>([]);

    const fetchAllCourses = async () => {
        getAllCourse("base", 10, 0, "asc", 1, setAllCourses);
      };
    
      useEffect(() => {
        fetchAllCourses();
      }, []);

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
                Select Course
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
                    data={allCourses}
                    renderItem={({ item, index }) => (
                      <TouchableOpacity
                        onPress={() => {
                          setSelectedForumCourse({ ...item });
                          navigation.navigate("Forum");
                        }}
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
                              uri: item.courseIcon,
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
                            {item?.courseName}
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
