import React from "react";
import {
  Dimensions,
  FlatList,
  ImageBackground,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  Linking,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { EvilIcons } from "@expo/vector-icons";
import { Color, FontSize } from "../../GlobalStyles";
import Carousel from "react-native-reanimated-carousel";
import { Image } from "expo-image";

import Navbar from "../../components/Navbar";
import { ScrollView } from "react-native-gesture-handler";

export default function Browsescreen({ navigation }: any) {
  const [sponsorCarousel, setSponsorCarousel] = React.useState([
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

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <StatusBar
          backgroundColor={Color.textWhite}
          barStyle={"dark-content"}
        />
        <View
          style={{ flex: 1, padding: 15, backgroundColor: Color.textWhite }}
        >
          <View
            style={{
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
              Explore
            </Text>
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <EvilIcons name="search" size={35} color="black" />
              <Image
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 16,
                  marginLeft: 20,
                }}
                source={{
                  uri: "https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png?f=webp",
                }}
              />
            </TouchableOpacity>
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
              data={sponsorCarousel}
              scrollAnimationDuration={1000}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => openWebLink(item?.bannerLink)}
                  activeOpacity={0.7}
                >
                  <Image
                    style={{
                      width: "100%",
                      borderRadius: 20,
                      aspectRatio: 16 / 9,
                    }}
                    source={{ uri: item?.bannerUrl }}
                  />
                </TouchableOpacity>
              )}
            />
          </View>

          <Text
            style={{
              fontSize: FontSize.semi14pxSemi_size,
              color: Color.textPrim,
              fontWeight: "600",
              paddingBottom: 10,
            }}
          >
            Topics
          </Text>
          <View
            style={{
              width: "100%",
              marginTop: 20,
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Carousel
              loop
              width={Dimensions.get("window").width * 0.98}
              height={Dimensions.get("window").height * 0.3} // Adjusted height
              autoPlay={true}
              data={sponsorCarousel}
              scrollAnimationDuration={1000}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => openWebLink(item?.bannerLink)}
                  activeOpacity={0.7}
                >
                  <Image
                    style={{
                      width: "45%", // Adjusted width
                      borderRadius: 25,
                      aspectRatio: 1,
                    }}
                    source={{ uri: item?.bannerUrl }}
                  />
                </TouchableOpacity>
              )}
            />
          </View>

          <Text
            style={{
              fontSize: FontSize.semi14pxSemi_size,
              color: Color.textPrim,
              fontWeight: "600",
              paddingBottom: 10,
            }}
          >
            Recommended Course
          </Text>
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
              height={Dimensions.get("window").height * 0.3} // Adjusted height
              autoPlay={true}
              data={sponsorCarousel}
              scrollAnimationDuration={1000}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => openWebLink(item?.bannerLink)}
                  activeOpacity={0.7}
                >
                  <Image
                    style={{
                      width: "45%", // Adjusted width
                      borderRadius: 25,
                      aspectRatio: 1,
                    }}
                    source={{ uri: item?.bannerUrl }}
                  />
                </TouchableOpacity>
              )}
            />
          </View>
        </View>

        <Text
        style={{
          fontSize: FontSize.semi14pxSemi_size,
          color: Color.textPrim,
          fontWeight: "600",
          paddingBottom: 10,
        }}
        >Teachers</Text>
        <View style={{

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
              height={Dimensions.get("window").height * 0.3} // Adjusted height
              autoPlay={true}
              data={sponsorCarousel}
              scrollAnimationDuration={1000}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => openWebLink(item?.bannerLink)}
                  activeOpacity={0.7}
                >
                  <Image
                    style={{
                      width: "45%", // Adjusted width
                      borderRadius: 100,
                      zIndex:20,
                      aspectRatio: 1,
                    }}
                    source={{ uri: item?.bannerUrl }}
                  />
                </TouchableOpacity>
              )}
            />
        </View>
      </ScrollView>
      <Navbar navigation={navigation} />
    </SafeAreaView>
  );
}
