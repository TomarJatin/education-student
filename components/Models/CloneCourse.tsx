import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import { Color, FontSize } from "../../GlobalStyles";
import { Feather } from "@expo/vector-icons";
import { FlatList, Switch, TextInput } from "react-native-gesture-handler";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { Image } from "expo-image";
import { uploadFiles } from "../../utils/api/upload";

interface CloneCourseProps {
  setOpen: any;
  courseName: string;
  courseCode: string;
  setCourseName: any;
  setCourseCode: any;
  handleCreateCourse: any;
  image: any;
  setImage: any;
  publishCourse: boolean;
  setPublishCourse: any;
  sellPrice: string;
  setSellPrice: any;
  courseDisplay: boolean;
  setCourseDisplay: any;
  discountPrice: string;
  setDiscountPrice: any;
  communityDisplay: boolean;
  setCommunityDisplay: any;
}

export default function CloneCourse({
  setOpen,
  courseCode,
  courseName,
  setCourseCode,
  setCourseName,
  handleCreateCourse,
  image,
  setImage,
  publishCourse,
  setPublishCourse,
  sellPrice,
  setSellPrice,
  courseDisplay,
  setCourseDisplay,
  discountPrice,
  setDiscountPrice,
  communityDisplay,
  setCommunityDisplay,
}: CloneCourseProps) {
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
       
      aspect: [1, 1],
      quality: 0.1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View
      style={{
        backgroundColor: Color.textWhite,
        padding: 15,
        borderRadius: 14,
        height: Dimensions.get("screen").height * 0.6,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            color: Color.textPrim,
            fontSize: FontSize.medium12pxMed_size,
            fontWeight: "600",
          }}
        >
          Add new Course
        </Text>
        <TouchableOpacity activeOpacity={0.5} onPress={() => setOpen("")}>
          <Feather name="x" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={["1"]}
        renderItem={() => (
          <>
            <View
              style={{
                flexDirection: "column",
                gap: 20,
                marginTop: 20,
              }}
            >
              <View
                style={{
                  borderRadius: 10,
                  gap: 10,
                  borderColor: Color.border,
                  borderWidth: 1,
                  paddingVertical: 10,
                  paddingHorizontal: 14,
                }}
              >
                <TextInput
                  style={{
                    width: "100%",
                    fontSize: FontSize.medium12pxMed_size,
                  }}
                  placeholder="Course Name"
                  value={courseName}
                  onChangeText={(text) => setCourseName(text)}
                />
              </View>
              <View
                style={{
                  borderRadius: 10,
                  gap: 10,
                  borderColor: Color.border,
                  borderWidth: 1,
                  paddingVertical: 10,
                  paddingHorizontal: 14,
                }}
              >
                <TextInput
                  style={{
                    width: "100%",
                    fontSize: FontSize.medium12pxMed_size,
                  }}
                  placeholder="Course Code"
                  value={courseCode}
                  onChangeText={(text) => setCourseCode(text)}
                />
              </View>
              <View
                style={{
                  borderRadius: 10,
                  gap: 10,
                  borderColor: Color.border,
                  borderWidth: 1,
                  paddingVertical: 10,
                  paddingHorizontal: 14,
                }}
              >
                <TextInput
                  style={{
                    width: "100%",
                    fontSize: FontSize.medium12pxMed_size,
                  }}
                  placeholder="Sell Price"
                  keyboardType="numeric"
                  value={sellPrice}
                  onChangeText={(text) => setSellPrice(text)}
                />
              </View>
              <View
                style={{
                  borderRadius: 10,
                  gap: 10,
                  borderColor: Color.border,
                  borderWidth: 1,
                  paddingVertical: 10,
                  paddingHorizontal: 14,
                }}
              >
                <TextInput
                  style={{
                    width: "100%",
                    fontSize: FontSize.medium12pxMed_size,
                  }}
                  placeholder="Discount Price"
                  value={discountPrice}
                  keyboardType="numeric"
                  onChangeText={(text) => setDiscountPrice(text)}
                />
              </View>
              <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      color: Color.buttonBg,
                      fontSize: FontSize.medium12pxMed_size,
                      fontWeight: "600",
                      width: "75%",
                    }}
                  >
                    Publish Course
                  </Text>
                  <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={publishCourse ? "#f5dd4b" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={() => setPublishCourse((prev: any) => !prev)}
                    value={publishCourse}
                  />
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      color: Color.buttonBg,
                      fontSize: FontSize.medium12pxMed_size,
                      fontWeight: "600",
                      width: "75%",
                    }}
                  >
                    Course Display
                  </Text>
                  <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={courseDisplay ? "#f5dd4b" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={() => setCourseDisplay((prev: any) => !prev)}
                    value={courseDisplay}
                  />
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      color: Color.buttonBg,
                      fontSize: FontSize.medium12pxMed_size,
                      fontWeight: "600",
                      width: "75%",
                    }}
                  >
                    Community Display
                  </Text>
                  <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={communityDisplay ? "#f5dd4b" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={() => setCommunityDisplay((prev: any) => !prev)}
                    value={communityDisplay}
                  />
                </View>
            </View>
            <View>
              <Text
                style={{
                  color: Color.textPrim,
                  fontSize: FontSize.medium12pxMed_size,
                  fontWeight: "600",
                  marginVertical: 20,
                }}
              >
                Add course thumbnail
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  gap: 20,
                  alignItems: "center",
                }}
              >
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={pickImage}
                  style={{
                    width: 140,
                    height: 140,
                    borderRadius: 14,
                    borderWidth: 1,
                    borderColor: Color.borderColor,
                    borderStyle: "dashed",
                    flex: 1,
                  }}
                >
                  {image && (
                    <Image
                      source={{ uri: image }}
                      style={{ width: "100%", height: "100%" }}
                    />
                  )}
                </TouchableOpacity>
                <Text
                  style={{
                    color: Color.textSecondary,
                    fontSize: FontSize.medium11pxMed_size,
                    fontWeight: "400",
                    flex: 1,
                  }}
                >
                  Add thumbnail for better visibility. Students may find them
                  appealing.
                </Text>
              </View>

              <TouchableOpacity
                onPress={() => handleCreateCourse()}
                activeOpacity={0.5}
                style={{
                  width: "100%",
                  backgroundColor: Color.buttonBg,
                  paddingVertical: 10,
                  borderRadius: 100,
                  marginTop: 20,
                }}
              >
                <Text
                  style={{
                    fontSize: FontSize.medium12pxMed_size,
                    fontWeight: "500",
                    color: Color.textWhite,
                    textAlign: "center",
                  }}
                >
                  Proceed
                </Text>
              </TouchableOpacity>
            </View>
          </>
        )}
        showsVerticalScrollIndicator={false}
        style={{
          width: "100%",
          height: "100%",
        }}
      />
    </View>
  );
}
