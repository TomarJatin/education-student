import { View, Text, TouchableOpacity, Switch } from "react-native";
import { Color, FontSize } from "../../GlobalStyles";
import { Feather } from "@expo/vector-icons";
import { TextInput } from "react-native-gesture-handler";
import { useState } from "react";
import * as ImagePicker from 'expo-image-picker';
import { Image } from "expo-image";

interface AddChapterProps {
  setOpen: any;
  handleCreateChapter: () => void;
  chapterName: string;
  setChapterName: any;
  chapterComponents: string[];
  setChapterComponents: any;
  image: any;
  setImage: any;
}

export default function AddChapter({ setOpen, handleCreateChapter, chapterComponents, chapterName, setChapterComponents, setChapterName, image, setImage }: AddChapterProps) {
  

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

  const checkSwitchState = (value: string) => {
    return chapterComponents.includes(value);
  }

  const handleSwitchChange = (value: string) => {
    let _chapterComponets = chapterComponents;
    if(checkSwitchState(value)){
      const index = _chapterComponets.indexOf(value);
      _chapterComponets.splice(index, 1);
    }
    else{
      _chapterComponets.push(value);
    }
    setChapterComponents([..._chapterComponets]);
  }

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
            value={chapterName}
            onChangeText={(text) => setChapterName(text)}
            placeholder="Chapter Name"
          />
        </View>
      </View>
      <View
        style={{
          borderWidth: 1,
          borderRadius: 20,
          borderColor: Color.border,
          padding: 20,
          flexDirection: "column",
          marginTop: 20,
        }}
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
              color: Color.textPrim,
              fontSize: FontSize.medium12pxMed_size,
              fontWeight: "600",
            }}
          >
            Videos
          </Text>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={checkSwitchState("Videos") ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={() => handleSwitchChange("Videos")}
            value={checkSwitchState("Videos")}
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
              color: Color.textPrim,
              fontSize: FontSize.medium12pxMed_size,
              fontWeight: "600",
            }}
          >
            Assignments
          </Text>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={checkSwitchState("Assignments") ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={() => handleSwitchChange("Assignments")}
            value={checkSwitchState("Assignments")}
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
              color: Color.textPrim,
              fontSize: FontSize.medium12pxMed_size,
              fontWeight: "600",
            }}
          >
            Tests
          </Text>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={checkSwitchState("Tests") ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={() => handleSwitchChange("Tests")}
            value={checkSwitchState("Tests")}
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
              color: Color.textPrim,
              fontSize: FontSize.medium12pxMed_size,
              fontWeight: "600",
            }}
          >
            Notes
          </Text>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={checkSwitchState("Notes") ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={() => handleSwitchChange("Notes")}
            value={checkSwitchState("Notes")}
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
          Add chapter thumbnail
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
        onPress={handleCreateChapter}
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
