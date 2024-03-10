import { View, Text, TouchableOpacity } from "react-native";
import { Color, FontSize } from "../../GlobalStyles";
import { Feather } from "@expo/vector-icons";
import { TextInput } from "react-native-gesture-handler";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { Image } from "expo-image";
import { uploadFiles } from "../../utils/api/upload";

interface AddCourseProps {
  setOpen: any;
  courseName: string;
  courseCode: string;
  setCourseName: any;
  setCourseCode: any;
  handleCreateCourse: any;
  image: any;
  setImage: any
}

export default function AddCourse({
  setOpen,
  courseCode,
  courseName,
  setCourseCode,
  setCourseName,
  handleCreateCourse,
  image,
  setImage
}: AddCourseProps) {
  

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
    </View>
  );
}
