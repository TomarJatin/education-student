import {
  Dimensions,
  FlatList,
  ImageBackground,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  Linking,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Color, FontSize } from "../../GlobalStyles";
import { LinearGradient } from "expo-linear-gradient";
import { Image } from "expo-image";
import { useContext, useEffect, useState } from "react";
import { DataContext } from "../../contexts/DataContext";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import Carousel from "react-native-reanimated-carousel";
import { AntDesign } from "@expo/vector-icons";
import { DataContextType } from "../../types/context";
import Navbar from "../../components/Navbar";
import { getBannerByStudent } from "../../utils/api/banners";
export default function Home({ navigation }: any) {
  const arr = [1, 2, 3, 4, 5, 6];
  const { setCourseScreen } = useContext(DataContext) as DataContextType;
  const [banners, setBanners] = useState<any>([]);
  const [sponserCrousel, setSponserCrousel] = useState([
    {
      id: 1,
      bannerUrl:
        "https://media.wired.com/photos/61f48f02d0e55ccbebd52d15/3:2/w_2400,h_1600,c_limit/Gear-Rant-Game-Family-Plans-1334436001.jpg",
      bannerLink:
        "https://media.wired.com/photos/61f48f02d0e55ccbebd52d15/3:2/w_2400,h_1600,c_limit/Gear-Rant-Game-Family-Plans-1334436001.jpg",
    },
  ]);

  const openWebLink = (url: string) => {
    if (url !== "") {
      Linking.openURL(url).catch((err) =>
        console.error("An error occurred: ", err)
      );
    }
  };

  const fetchStudentBanners = async () => {
    getBannerByStudent(10, 0, "asc", 1, setBanners);
  };

  useEffect(() => {
    fetchStudentBanners();
  }, []);

  return (
    <SafeAreaView>
      <StatusBar backgroundColor={Color.textWhite} barStyle={"dark-content"} />
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
            <View style={{ paddingBottom: 100, paddingTop: 30 }}>
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingHorizontal: 6,
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
              <View
                style={{
                  width: "100%",
                  marginTop: 20,
                  marginBottom: 26,
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Carousel
                  loop
                  width={Dimensions.get("window").width * 0.98}
                  height={Dimensions.get("window").height * 0.29}
                  autoPlay={true}
                  data={
                    banners?.length > 0
                      ? banners.map(
                          (item: {
                            _id: string;
                            link: string;
                            place: string;
                            priority: number;
                            status: number;
                            type: string;
                          }) => ({
                            id: item._id,
                            bannerUrl: item.link,
                            bannerLink: item.link,
                          })
                        )
                      : sponserCrousel
                  }
                  scrollAnimationDuration={1000}
                  renderItem={({
                    item,
                  }: {
                    item: { id: number; bannerLink: string; bannerUrl: string };
                  }) => (
                    <View
                      style={{
                        flex: 1,
                        justifyContent: "center",
                        paddingHorizontal: 10,
                      }}
                    >
                      <TouchableOpacity
                        onPress={() => openWebLink(item?.bannerLink)}
                        activeOpacity={0.7}
                        style={{
                          width: "100%",
                        }}
                      >
                        <Image
                          style={{
                            width: "100%",
                            borderRadius: 20,
                            height: "100%",
                          }}
                          contentFit="cover"
                          source={{ uri: item?.bannerUrl }}
                        />
                      </TouchableOpacity>
                    </View>
                  )}
                />
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  gap: 12,
                }}
              >
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={() => {
                    // setCourseScreen("base");
                    navigation.navigate("Courses");
                  }}
                  style={{
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <View
                    style={{
                      padding: 20,
                      backgroundColor: Color.cardBg,
                      borderRadius: 14,
                    }}
                  >
                    <Image
                      source={require("../../assets/copy.svg")}
                      style={{
                        width: 28,
                        height: 28,
                      }}
                      contentFit="contain"
                    />
                  </View>

                  <Text
                    style={{
                      fontSize: FontSize.medium11pxMed_size,
                      color: Color.buttonBg,
                      fontWeight: "500",
                    }}
                  >
                    Courses
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={() => {
                    // setCourseScreen("base");
                    navigation.navigate("SelectedCourse");
                  }}
                  style={{
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <View
                    style={{
                      padding: 20,
                      backgroundColor: Color.cardBg,
                      borderRadius: 14,
                    }}
                  >
                    <Image
                      source={require("../../assets/chat.svg")}
                      style={{
                        width: 28,
                        height: 28,
                      }}
                      contentFit="contain"
                    />
                  </View>

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
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={() => {
                    // setCourseScreen("base");
                    navigation.navigate("Analytics");
                  }}
                  style={{
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <View
                    style={{
                      padding: 20,
                      backgroundColor: Color.cardBg,
                      borderRadius: 14,
                    }}
                  >
                    <Image
                      source={require("../../assets/bar-graph.svg")}
                      style={{
                        width: 28,
                        height: 28,
                      }}
                      contentFit="contain"
                    />
                  </View>

                  <Text
                    style={{
                      fontSize: FontSize.medium11pxMed_size,
                      color: Color.buttonBg,
                      fontWeight: "500",
                    }}
                  >
                    Analytics
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={() => {
                    // setCourseScreen("base");
                    navigation.navigate("VideoComponent");
                  }}
                  style={{
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <View
                    style={{
                      padding: 20,
                      backgroundColor: Color.cardBg,
                      borderRadius: 14,
                    }}
                  >
                    <Image
                      source={require("../../assets/video-learning.svg")}
                      style={{
                        width: 28,
                        height: 28,
                      }}
                      contentFit="contain"
                    />
                  </View>

                  <Text
                    style={{
                      fontSize: FontSize.medium11pxMed_size,
                      color: Color.buttonBg,
                      fontWeight: "500",
                    }}
                  >
                    Video
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={() => {
                    // setCourseScreen("base");
                    navigation.navigate("Assignment");
                  }}
                  style={{
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <View
                    style={{
                      padding: 20,
                      backgroundColor: Color.cardBg,
                      borderRadius: 14,
                    }}
                  >
                    <Image
                      source={require("../../assets/drawing.svg")}
                      style={{
                        width: 28,
                        height: 28,
                      }}
                      contentFit="contain"
                    />
                  </View>

                  <Text
                    style={{
                      fontSize: FontSize.medium11pxMed_size,
                      color: Color.buttonBg,
                      fontWeight: "500",
                    }}
                  >
                    Assignment
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={() => {
                    // setCourseScreen("base");
                    navigation.navigate("Tests");
                  }}
                  style={{
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <View
                    style={{
                      padding: 20,
                      backgroundColor: Color.cardBg,
                      borderRadius: 14,
                    }}
                  >
                    <Image
                      source={require("../../assets/3d-report.svg")}
                      style={{
                        width: 28,
                        height: 28,
                      }}
                      contentFit="contain"
                    />
                  </View>

                  <Text
                    style={{
                      fontSize: FontSize.medium11pxMed_size,
                      color: Color.buttonBg,
                      fontWeight: "500",
                    }}
                  >
                    Tests
                  </Text>
                </TouchableOpacity>
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
                  Pending Tasks
                </Text>
                <Text
                  style={{
                    fontSize: FontSize.medium12pxMed_size,
                    color: Color.textSecondary,
                    fontWeight: "500",
                  }}
                >
                  See All
                </Text>
              </View>
              <ScrollView
                style={{
                  paddingVertical: 20,
                }}
                showsHorizontalScrollIndicator={false}
                horizontal
              >
                {[1].map((item, index) => (
                  <View
                    key={index}
                    style={{
                      width: 220,
                      backgroundColor: Color.cardBg,
                      borderRadius: 20,
                      marginRight: 20,
                    }}
                  >
                    <Image
                      style={{
                        width: "100%",
                        height: 90,
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                      }}
                      contentFit="cover"
                      source={require("../../assets/banner.png")}
                    />
                    <View
                      style={{
                        width: "100%",
                        flexDirection: "column",
                        alignItems: "flex-end",
                      }}
                    >
                      <TouchableOpacity
                        delayPressIn={5}
                        onPress={() => {
                          navigation.navigate("Testscreen");
                        }}
                      >
                        <Image
                          style={{
                            width: 45,
                            height: 45,
                            borderRadius: 23,
                            marginRight: 20,
                            marginTop: -20,
                          }}
                          contentFit="cover"
                          source={require("../../assets/play.png")}
                        />
                      </TouchableOpacity>
                    </View>
                    <View
                      style={{
                        paddingHorizontal: 15,
                        paddingBottom: 15,
                        flexDirection: "column",
                        gap: 5,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: FontSize.medium14pxMed_size,
                          color: Color.textPrim,
                          fontWeight: "600",
                        }}
                      >
                        Tests
                      </Text>
                      <Text
                        style={{
                          fontSize: FontSize.medium12pxMed_size,
                          color: Color.textPrim,
                          fontWeight: "400",
                        }}
                      >
                        1 Test Starting in
                      </Text>
                      <Text
                        style={{
                          fontSize: FontSize.medium12pxMed_size,
                          color: Color.textPrim,
                          fontWeight: "400",
                        }}
                      >
                        4 upcoming
                      </Text>
                    </View>
                  </View>
                ))}
                {[2].map((item, index) => (
                  <View
                    key={index}
                    style={{
                      width: 220,
                      backgroundColor: Color.cardBg,
                      borderRadius: 20,
                      marginRight: 20,
                    }}
                  >
                    <Image
                      style={{
                        width: "100%",
                        height: 90,
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                      }}
                      contentFit="cover"
                      source={require("../../assets/assignment.svg")}
                    />
                    <View
                      style={{
                        width: "100%",
                        flexDirection: "column",
                        alignItems: "flex-end",
                      }}
                    >
                      <TouchableOpacity
                        delayPressIn={5}
                        onPress={() => {
                          navigation.navigate("SubmitAssignement");
                        }}
                      >
                        <Image
                          style={{
                            width: 45,
                            height: 45,
                            borderRadius: 23,
                            marginRight: 20,
                            marginTop: -20,
                          }}
                          contentFit="cover"
                          source={require("../../assets/play.png")}
                        />
                      </TouchableOpacity>
                    </View>
                    <View
                      style={{
                        paddingHorizontal: 15,
                        paddingBottom: 15,
                        flexDirection: "column",
                        gap: 5,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: FontSize.medium14pxMed_size,
                          color: Color.textPrim,
                          fontWeight: "600",
                        }}
                      >
                        Assignements
                      </Text>
                      <Text
                        style={{
                          fontSize: FontSize.medium12pxMed_size,
                          color: Color.textPrim,
                          fontWeight: "400",
                        }}
                      >
                        2 Pending
                      </Text>
                      <Text
                        style={{
                          fontSize: FontSize.medium12pxMed_size,
                          color: Color.textPrim,
                          fontWeight: "400",
                        }}
                      >
                        4 upcoming
                      </Text>
                    </View>
                  </View>
                ))}
              </ScrollView>
            </View>

            /////assinment
          )}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <Navbar navigation={navigation} />
    </SafeAreaView>
  );
}
