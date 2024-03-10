import {
  Dimensions,
  FlatList,
  ImageBackground,
  Text,
  View,
  TouchableOpacity,
  StatusBar
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Color, FontSize } from "../../GlobalStyles";
import { LinearGradient } from "expo-linear-gradient";
import { Image } from "expo-image";
import { useContext } from "react";
import { DataContext } from "../../contexts/DataContext";
import { DataContextType } from "../../types/context";
export default function Home({navigation}: any) {
  const arr = [1, 2, 3, 4, 5, 6];
  const {setCourseScreen} = useContext(DataContext) as DataContextType;

  return (
    <SafeAreaView>
      <StatusBar
        backgroundColor={Color.textWhite}
        barStyle={"dark-content"}
      />
      <View
        style={{
          padding: 15,
          minHeight: Dimensions.get("window").height,
          backgroundColor: Color.textWhite,
        }}
      >
        <FlatList
          data={["1"]}
          renderItem={() => (
            <>
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: FontSize.semi16pxSemi_size,
                    color: Color.textPrim,
                    fontWeight: "600",
                  }}
                >
                  Good Evening, Kate
                </Text>
                <Image
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 16,
                  }}
                  contentFit="cover"
                  source={{
                    uri: "https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png?f=webp",
                  }}
                />
              </View>
              <ImageBackground
                source={require("../../assets/stats.png")}
                imageStyle={{ borderRadius: 20 }}
                resizeMode="cover"
                style={{
                  width: "100%",
                  height: 120,
                  marginTop: 20,
                }}
              >
                <View style={{ width: "100%", height: "100%", padding: 20 }}>
                  <Text
                    style={{
                      color: Color.textWhite,
                      fontSize: FontSize.medium14pxMed_size,
                      fontWeight: "600",
                    }}
                  >
                    Dashboard
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginTop: 26,
                    }}
                  >
                    <View>
                      <Text
                        style={{
                          color: Color.textWhite,
                          fontSize: FontSize.medium11pxMed_size,
                          fontWeight: "500",
                        }}
                      >
                        Active Courses
                      </Text>
                      <Text
                        style={{
                          color: Color.textWhite,
                          fontSize: FontSize.medium14pxMed_size,
                          fontWeight: "600",
                        }}
                      >
                        21
                      </Text>
                    </View>
                    <View>
                      <Text
                        style={{
                          color: Color.textWhite,
                          fontSize: FontSize.medium11pxMed_size,
                          fontWeight: "500",
                        }}
                      >
                        Total Courses
                      </Text>
                      <Text
                        style={{
                          color: Color.textWhite,
                          fontSize: FontSize.medium14pxMed_size,
                          fontWeight: "600",
                        }}
                      >
                        222
                      </Text>
                    </View>
                    <View>
                      <Text
                        style={{
                          color: Color.textWhite,
                          fontSize: FontSize.medium11pxMed_size,
                          fontWeight: "500",
                        }}
                      >
                        Fee Pending
                      </Text>
                      <Text
                        style={{
                          color: Color.textWhite,
                          fontSize: FontSize.medium14pxMed_size,
                          fontWeight: "600",
                        }}
                      >
                        2
                      </Text>
                    </View>
                  </View>
                </View>
              </ImageBackground>
              <View
                style={{
                  flexDirection: "column",
                  gap: 14,
                  marginTop: 20,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() => {
                      setCourseScreen("base")
                      navigation.navigate("BaseCourses");
                    }}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 10,
                      paddingHorizontal: 14,
                      paddingVertical: 8,
                      backgroundColor: Color.cardBg,
                      borderRadius: 14,
                      width: Dimensions.get("window").width * 0.43,
                    }}
                  >
                    <Image
                      source={require("../../assets/book.svg")}
                      style={{
                        width: 28,
                        height: 28,
                      }}
                      contentFit="contain"
                    />
                    <Text
                      style={{
                        fontSize: FontSize.medium11pxMed_size,
                        color: Color.buttonBg,
                        fontWeight: "500",
                      }}
                    >
                      Base Courses
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                  onPress={() => {
                    setCourseScreen("active");
                    navigation.navigate("ActiveCourses");
                  }}
                    activeOpacity={0.5}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 10,
                      paddingHorizontal: 14,
                      paddingVertical: 8,
                      backgroundColor: Color.cardBg,
                      borderRadius: 14,
                      width: Dimensions.get("window").width * 0.43,
                    }}
                  >
                    <Image
                      source={require("../../assets/open-book.svg")}
                      style={{
                        width: 28,
                        height: 28,
                      }}
                      contentFit="contain"
                    />
                    <Text
                      style={{
                        fontSize: FontSize.medium11pxMed_size,
                        color: Color.buttonBg,
                        fontWeight: "500",
                      }}
                    >
                      Active Courses
                    </Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <TouchableOpacity
                    activeOpacity={0.5}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 10,
                      paddingHorizontal: 14,
                      paddingVertical: 8,
                      backgroundColor: Color.cardBg,
                      borderRadius: 14,
                      width: Dimensions.get("window").width * 0.43,
                    }}
                  >
                    <Image
                      source={require("../../assets/archive.svg")}
                      style={{
                        width: 28,
                        height: 28,
                      }}
                      contentFit="contain"
                    />
                    <Text
                      style={{
                        fontSize: FontSize.medium11pxMed_size,
                        color: Color.buttonBg,
                        fontWeight: "500",
                      }}
                    >
                      Archive Courses
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() => navigation.navigate('SelectedCourse')}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 10,
                      paddingHorizontal: 14,
                      paddingVertical: 8,
                      backgroundColor: Color.cardBg,
                      borderRadius: 14,
                      width: Dimensions.get("window").width * 0.43,
                    }}
                  >
                    <Image
                      source={require("../../assets/forum.svg")}
                      style={{
                        width: 28,
                        height: 28,
                      }}
                      contentFit="contain"
                    />
                    <Text
                      style={{
                        fontSize: FontSize.medium11pxMed_size,
                        color: Color.buttonBg,
                        fontWeight: "500",
                      }}
                    >
                      Forum
                    </Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <TouchableOpacity
                    activeOpacity={0.5}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 10,
                      paddingHorizontal: 14,
                      paddingVertical: 8,
                      backgroundColor: Color.cardBg,
                      borderRadius: 14,
                      width: Dimensions.get("window").width * 0.43,
                    }}
                  >
                    <Image
                      source={require("../../assets/assignment.svg")}
                      style={{
                        width: 28,
                        height: 28,
                      }}
                      contentFit="contain"
                    />
                    <Text
                      style={{
                        fontSize: FontSize.medium11pxMed_size,
                        color: Color.buttonBg,
                        fontWeight: "500",
                      }}
                    >
                      Check Assignment
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: 30,
                }}
              >
                <Text
                  style={{
                    fontSize: FontSize.medium14pxMed_size,
                    color: Color.textPrim,
                    fontWeight: "600",
                  }}
                >
                  Active Courses
                </Text>
                <Text
                  style={{
                    fontSize: FontSize.medium14pxMed_size,
                    color: Color.textPrim,
                    fontWeight: "600",
                  }}
                >
                  See All
                </Text>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 14,
                  flexWrap: "wrap",
                  marginTop: 20,
                  alignItems: "center",
                }}
              >
                {arr.map((item) => (
                  <TouchableOpacity activeOpacity={0.5} key={item}>
                    <Image
                      source={{
                        uri: "https://media.istockphoto.com/id/1366428092/photo/webinar-e-learning-skills-business-internet-technology-concepts-training-webinar-e-learning.webp?b=1&s=170667a&w=0&k=20&c=qjK4h0qt4W_NNG8TmboGw8RDRv8TNzEoFM_JEDZ1Ah0=",
                      }}
                      contentFit="cover"
                      style={{
                        width: 100,
                        height: 100,
                        borderRadius: 14,
                      }}
                    />
                    <Text
                      style={{
                        fontSize: FontSize.medium11pxMed_size,
                        fontWeight: "500",
                        color: Color.buttonBg,
                        marginTop: 4,
                      }}
                    >
                      Course Name
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </>
          )}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
}
