import { View, Text, TouchableOpacity, Switch } from "react-native";
import { Color, FontSize } from "../../GlobalStyles";
import { Feather } from "@expo/vector-icons";
import { TextInput } from "react-native-gesture-handler";
import { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { CourseType } from "../../types/courses";

interface ActiveCoursesOptionsProps {
  setOpen: any;
  selectedCourse: CourseType | null;
  handleCloneClick: () => void;
}

export default function ActiveCoursesOptions({
  setOpen,
  selectedCourse,
  handleCloneClick
}: ActiveCoursesOptionsProps) {
  const [isEnabled, setIsEnabled] = useState(false);

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
          padding: 20,
          borderRadius: 20,
          borderColor: Color.border,
          borderWidth: 1,
          marginTop: 20,
        }}
      >
        <View>
          <Text
            style={{
              color: Color.buttonBg,
              fontSize: FontSize.medium14pxMed_size,
              fontWeight: "600",
              marginBottom: 10,
            }}
          >
            Clone
          </Text>
        </View>
        <Text
          style={{
            color: Color.textSecondary,
            fontSize: FontSize.medium11pxMed_size,
            fontWeight: "400",
            marginBottom: 20,
          }}
        >
          Add thumbnail for better visibility. Students may find them appealing.
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
          }}
        >
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={handleCloneClick}
            style={{
              flexDirection: "row",
              gap: 10,
              alignItems: "center",
              paddingHorizontal: 30,
              paddingVertical: 10,
              backgroundColor: Color.buttonBg,
              borderRadius: 100,
            }}
          >
            <Text
              style={{
                color: Color.textWhite,
                fontSize: FontSize.medium12pxMed_size,
                fontWeight: "500",
              }}
            >
              Clone this Course
            </Text>
            <MaterialCommunityIcons
              name="pencil-outline"
              size={16}
              color="white"
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
