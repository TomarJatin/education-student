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
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Feather } from '@expo/vector-icons';
import { EvilIcons } from "@expo/vector-icons";
import { Octicons } from '@expo/vector-icons';
import { Fontisto } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { useContext, useEffect, useState } from "react";
import { Image } from "expo-image";
import { AntDesign } from '@expo/vector-icons';
import Navbar from "../../components/Navbar/Forum";
import { getAllTags } from "../../utils/api/tags";
import { DataContextType } from "../../types/context";
import { DataContext } from "../../contexts/DataContext";
import { TagType } from "../../types/tags";
import { getAllPosts } from "../../utils/api/posts";
import { PostType } from "../../types/post";

export default function Forum({ navigation }: any) {
  const { selectedForumCourse } = useContext(DataContext) as DataContextType;
  const [selectedTab, setSelectedTab] = useState<TagType | null>(null);
  const [allTags, setAllTags] = useState<TagType[]>([]);
  const [allPosts, setAllPosts] = useState<PostType[]>([]);
  const tabs = [
    {
      id: 1,
      title: "Topics",
    },
    {
      id: 2,
      title: "Free Discussion",
    },
    {
      id: 3,
      title: "Text",
    },
    {
      id: 4,
      title: "File",
    },
  ];

  const fetchAllTags = async () => {
    if(selectedForumCourse){
      getAllTags(selectedForumCourse?._id, 10, 0, "asc", 10, setAllTags);
    }
  };

  const fetchAllPosts = async () => {
    if(selectedTab){
      getAllPosts(selectedTab._id, 10, 0, "asc", 10, setAllPosts);
    }
  };

  useEffect(() => {
    fetchAllTags();
  }, []);

  useEffect(() => {
    fetchAllPosts();
  }, [selectedTab]);

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
              paddingBottom: 20,
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
                Forum
              </Text>
            </View>
            <TouchableOpacity
              style={{ paddingHorizontal: 15 }}
              activeOpacity={0.5}
            >
              <MaterialIcons name="more-vert" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
            {allTags.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => setSelectedTab({...item})}
                activeOpacity={0.5}
                style={{
                  padding: 8,
                  backgroundColor:
                    selectedTab?._id === item?._id ? Color.buttonBg : Color.textWhite,
                  borderRadius: 34,
                  marginLeft: 20,
                }}
              >
                <Text
                  style={{
                    color:
                      selectedTab?._id === item?._id
                        ? Color.textWhite
                        : Color.buttonBg,
                    fontSize: FontSize.medium12pxMed_size,
                    fontWeight: "500",
                  }}
                >
                  {item?.tagName}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Body */}
        <FlatList
          data={["1"]}
          renderItem={() => (
            <View style={{ paddingBottom: 400 }}>
              {/* Search Bar */}
              <View style={{
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 10,
                paddingVertical: 10,
                borderWidth: 1,
                borderColor: Color.border,
                borderRadius: 10,
                marginVertical: 20,
                width: "100%"
              }}>
                <TextInput placeholder="Search" style={{
                    width: "90%"
                }} />
                <EvilIcons name="search" size={24} color="black" />
              </View>

              <View>
                {allPosts.map((item, index) => (
                  <View style={{
                    paddingVertical: 15,
                        borderBottomColor: Color.border,
                        borderBottomWidth: 1,
                        flexDirection: "column",
                        gap: 10
                  }} key={index}>
                    <View style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}>
                    <View style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 10
                    }}>
                    <Image
                      source={{
                        uri: "https://images.pexels.com/photos/356079/pexels-photo-356079.jpeg?cs=srgb&dl=pexels-pixabay-356079.jpg&fm=jpg",
                      }}
                      style={{
                        width: 24,
                        height: 24,
                        borderRadius: 12
                      }}
                    />
                        <Text style={{fontSize: FontSize.medium12pxMed_size, fontWeight: "500"}}>Rober Garcia</Text>
                    </View>
                    <Feather name="more-horizontal" size={24} color="black" />
                    </View>
                    <Text style={{
                        fontSize: FontSize.medium11pxMed_size,
                        color: Color.textPrimLM,
                    }}>{item.text}</Text>
                    <Image
                      source={{
                        uri: item.mediaLink ? item.mediaLink : "https://images.pexels.com/photos/356079/pexels-photo-356079.jpeg?cs=srgb&dl=pexels-pixabay-356079.jpg&fm=jpg",
                      }}
                      style={{
                        width: "100%",
                        height: 200,
                      }}
                    />
                    <View style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center"
                    }}>
                      <View style={{flexDirection: "row",
                        alignItems: "center",
                        gap: 20}}>
                        <View style={{flexDirection: "row", gap: 6, alignItems: "center"}}>
                            <TouchableOpacity activeOpacity={0.5}>
                            <Entypo name="triangle-up" size={24} color="black" />
                            {/* <Ionicons
                          name="triangle-outline"
                          size={20}
                          color="black"
                        /> */}
                        {/* <Ionicons
                          name="triangle-sharp"
                          size={20}
                          color="black"
                        /> */}
                            </TouchableOpacity>
                            <Text style={{
                        fontSize: FontSize.medium11pxMed_size,
                        color: Color.textPrimLM,
                    }}>1000</Text>
                        </View>
                        <View style={{flexDirection: "row", gap: 6, alignItems: "center"}}>
                            <TouchableOpacity activeOpacity={0.5}>
                           
                        <Entypo name="triangle-down" size={24} color="black" />
                        {/* <Ionicons
                          name="triangle-sharp"
                          size={20}
                          color="black"
                        /> */}
                            </TouchableOpacity>
                            <Text style={{
                        fontSize: FontSize.medium11pxMed_size,
                        color: Color.textPrimLM,
                    }}>1000</Text>
                        </View>
                        <View style={{flexDirection: "row", gap: 6, alignItems: "center"}}>
                            <TouchableOpacity onPress={() => navigation.navigate("Post")} activeOpacity={0.5}>
                            <Fontisto name="comment" size={20} color="black" />
                            </TouchableOpacity>
                            <Text style={{
                        fontSize: FontSize.medium11pxMed_size,
                        color: Color.textPrimLM,
                    }}>1000</Text>
                        </View>
                        
                      </View>
                      <View style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 20
                      }}>
                        <TouchableOpacity activeOpacity={0.5}>
                        <Entypo name="share" size={20} color="black" />
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.5}>
                        <Ionicons
                          name="bookmark-outline"
                          size={20}
                          color="black"
                        />
                        </TouchableOpacity>
                        
                      </View>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          )}
          style={{
            paddingHorizontal: 15,
          }}
          showsVerticalScrollIndicator={false}
        />
        
      </View>
      <View style={{
            bottom: 140,
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
                <Text style={{color: Color.textPrim, fontSize: FontSize.medium12pxMed_size}}>Courses</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{
              flexDirection: "column",
              alignItems: "center"
            }} activeOpacity={0.5}>
            <Feather name="activity" size={16} color="black" />
                <Text style={{color: Color.textPrim, fontSize: FontSize.medium12pxMed_size}}>Activity</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
                navigation.navigate("Tags")
            }} style={{
              flexDirection: "column",
              alignItems: "center"
            }} activeOpacity={0.5}>
            <Octicons name="hash" size={16} color="black" />
                <Text style={{color: Color.textPrim, fontSize: FontSize.medium12pxMed_size}}>Tags</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{
              flexDirection: "column",
              alignItems: "center"
            }} activeOpacity={0.5}>
           <Ionicons name="add-circle-outline" size={16} color="black" />
                <Text style={{color: Color.textPrim, fontSize: FontSize.medium12pxMed_size}}>Ask Something</Text>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
  );
}
