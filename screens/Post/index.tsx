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
import { AntDesign } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { useState } from "react";
import { Image } from "expo-image";
import Navbar from "../../components/Navbar/Forum";

export default function Post({ navigation }: any) {
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
                Post
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
              <View>
                <View
                  style={{
                    paddingVertical: 15,
                    borderBottomColor: Color.border,
                    borderBottomWidth: 1,
                    flexDirection: "column",
                    gap: 10,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 10,
                      }}
                    >
                      <Image
                        source={{
                          uri: "https://images.pexels.com/photos/356079/pexels-photo-356079.jpeg?cs=srgb&dl=pexels-pixabay-356079.jpg&fm=jpg",
                        }}
                        style={{
                          width: 24,
                          height: 24,
                          borderRadius: 12,
                        }}
                      />
                      <Text
                        style={{
                          fontSize: FontSize.medium12pxMed_size,
                          fontWeight: "500",
                        }}
                      >
                        Rober Garcia
                      </Text>
                    </View>
                    <Feather name="more-horizontal" size={24} color="black" />
                  </View>
                  <Text
                    style={{
                      fontSize: FontSize.medium11pxMed_size,
                      color: Color.textPrimLM,
                    }}
                  >
                    In publishing and graphic design, Lorem ipsum is a
                    placeholder text commonly used to demonstrate the visual
                    form of a document or a typeface without relying on
                    meaningful content. Lorem ipsum may be used as a placeholder
                    before final copy is available.
                  </Text>
                  <Image
                    source={{
                      uri: "https://images.pexels.com/photos/356079/pexels-photo-356079.jpeg?cs=srgb&dl=pexels-pixabay-356079.jpg&fm=jpg",
                    }}
                    style={{
                      width: "100%",
                      height: 200,
                    }}
                  />
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 20,
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          gap: 6,
                          alignItems: "center",
                        }}
                      >
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
                        <Text
                          style={{
                            fontSize: FontSize.medium11pxMed_size,
                            color: Color.textPrimLM,
                          }}
                        >
                          1000
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          gap: 6,
                          alignItems: "center",
                        }}
                      >
                        <TouchableOpacity activeOpacity={0.5}>
                          <Entypo
                            name="triangle-down"
                            size={24}
                            color="black"
                          />
                          {/* <Ionicons
                          name="triangle-sharp"
                          size={20}
                          color="black"
                        /> */}
                        </TouchableOpacity>
                        <Text
                          style={{
                            fontSize: FontSize.medium11pxMed_size,
                            color: Color.textPrimLM,
                          }}
                        >
                          1000
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          gap: 6,
                          alignItems: "center",
                        }}
                      >
                        <TouchableOpacity
                          onPress={() => navigation.navigate("Post")}
                          activeOpacity={0.5}
                        >
                          <Fontisto name="comment" size={20} color="black" />
                        </TouchableOpacity>
                        <Text
                          style={{
                            fontSize: FontSize.medium11pxMed_size,
                            color: Color.textPrimLM,
                          }}
                        >
                          1000
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 20,
                      }}
                    >
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
                <View
                  style={{
                    paddingVertical: 15,
                    borderBottomColor: Color.border,
                    borderBottomWidth: 1,
                    flexDirection: "column",
                    gap: 10,
                  }}
                >
                  <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 10,
                      }}
                    >
                      <Image
                        source={{
                          uri: "https://images.pexels.com/photos/356079/pexels-photo-356079.jpeg?cs=srgb&dl=pexels-pixabay-356079.jpg&fm=jpg",
                        }}
                        style={{
                          width: 24,
                          height: 24,
                          borderRadius: 12,
                        }}
                      />
                      <Text
                        style={{
                          fontSize: FontSize.medium12pxMed_size,
                          fontWeight: "500",
                        }}
                      >
                        Rober Garcia
                      </Text>
                    </View>
                  <Text
                    style={{
                      fontSize: FontSize.medium11pxMed_size,
                      color: Color.textPrimLM,
                    }}
                  >
                    In publishing and graphic design, Lorem ipsum is a
                    placeholder text commonly used to demonstrate the visual
                    form of a document or a typeface without relying on
                    meaningful content. Lorem ipsum may be used as a placeholder
                    before final copy is available.
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 20,
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          gap: 6,
                          alignItems: "center",
                        }}
                      >
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
                        <Text
                          style={{
                            fontSize: FontSize.medium11pxMed_size,
                            color: Color.textPrimLM,
                          }}
                        >
                          1000
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          gap: 6,
                          alignItems: "center",
                        }}
                      >
                        <TouchableOpacity activeOpacity={0.5}>
                          <Entypo
                            name="triangle-down"
                            size={24}
                            color="black"
                          />
                          {/* <Ionicons
                          name="triangle-sharp"
                          size={20}
                          color="black"
                        /> */}
                        </TouchableOpacity>
                        <Text
                          style={{
                            fontSize: FontSize.medium11pxMed_size,
                            color: Color.textPrimLM,
                          }}
                        >
                          1000
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          gap: 6,
                          alignItems: "center",
                        }}
                      >
                        <TouchableOpacity
                          onPress={() => navigation.navigate("Post")}
                          activeOpacity={0.5}
                        >
                          <Octicons name="reply" size={20} color="black" />
                        </TouchableOpacity>
                        <Text
                          style={{
                            fontSize: FontSize.medium11pxMed_size,
                            color: Color.textPrimLM,
                          }}
                        >
                          Reply
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          gap: 6,
                          alignItems: "center",
                        }}
                      >
                        <TouchableOpacity
                          onPress={() => navigation.navigate("Post")}
                          activeOpacity={0.5}
                        >
                          <Feather name="award" size={20} color="black" />
                        </TouchableOpacity>
                        <Text
                          style={{
                            fontSize: FontSize.medium11pxMed_size,
                            color: Color.textPrimLM,
                          }}
                        >
                          Award
                        </Text>
                      </View>
                      
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 20,
                      }}
                    >
                      <TouchableOpacity activeOpacity={0.5}>
                      <Feather name="more-horizontal" size={20} color="black" />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
                <View style={{paddingLeft: 10, marginLeft: 10, marginTop: 10, borderLeftColor: Color.borderColor, borderLeftWidth: 1}}>
                {
                    [1, 2, 3, 4, 5].map((item, index) => (
                        <View
                        key={index}
                  style={{
                    paddingVertical: 15,
                    borderBottomColor: Color.border,
                    borderBottomWidth: 1,
                    flexDirection: "column",
                    gap: 10,
                  }}
                >
                  <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 10,
                      }}
                    >
                      <Image
                        source={{
                          uri: "https://images.pexels.com/photos/356079/pexels-photo-356079.jpeg?cs=srgb&dl=pexels-pixabay-356079.jpg&fm=jpg",
                        }}
                        style={{
                          width: 24,
                          height: 24,
                          borderRadius: 12,
                        }}
                      />
                      <Text
                        style={{
                          fontSize: FontSize.medium12pxMed_size,
                          fontWeight: "500",
                        }}
                      >
                        Rober Garcia
                      </Text>
                    </View>
                  <Text
                    style={{
                      fontSize: FontSize.medium11pxMed_size,
                      color: Color.textPrimLM,
                    }}
                  >
                    In publishing and graphic design, Lorem ipsum is a
                    placeholder text commonly used to demonstrate the visual
                    form of a document or a typeface without relying on
                    meaningful content. Lorem ipsum may be used as a placeholder
                    before final copy is available.
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 20,
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          gap: 6,
                          alignItems: "center",
                        }}
                      >
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
                        <Text
                          style={{
                            fontSize: FontSize.medium11pxMed_size,
                            color: Color.textPrimLM,
                          }}
                        >
                          1000
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          gap: 6,
                          alignItems: "center",
                        }}
                      >
                        <TouchableOpacity activeOpacity={0.5}>
                          <Entypo
                            name="triangle-down"
                            size={24}
                            color="black"
                          />
                          {/* <Ionicons
                          name="triangle-sharp"
                          size={20}
                          color="black"
                        /> */}
                        </TouchableOpacity>
                        <Text
                          style={{
                            fontSize: FontSize.medium11pxMed_size,
                            color: Color.textPrimLM,
                          }}
                        >
                          1000
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          gap: 6,
                          alignItems: "center",
                        }}
                      >
                        <TouchableOpacity
                          onPress={() => navigation.navigate("Post")}
                          activeOpacity={0.5}
                        >
                          <Octicons name="reply" size={20} color="black" />
                        </TouchableOpacity>
                        <Text
                          style={{
                            fontSize: FontSize.medium11pxMed_size,
                            color: Color.textPrimLM,
                          }}
                        >
                          Reply
                        </Text>
                      </View>
                      
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 20,
                      }}
                    >
                      <TouchableOpacity activeOpacity={0.5}>
                      <Feather name="more-horizontal" size={20} color="black" />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
                    ))
                }
                </View>
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
            bottom: 85,
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
            <TouchableOpacity style={{
              flexDirection: "column",
              alignItems: "center"
            }} activeOpacity={0.5 } onPress={() => {
              navigation.navigate("SelectedCourse")
          }}>
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
