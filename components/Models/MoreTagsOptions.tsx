import { View, Text, TouchableOpacity, Switch } from "react-native";
import { Color, FontSize } from "../../GlobalStyles";
import { Feather } from "@expo/vector-icons";
import { TextInput } from "react-native-gesture-handler";
import { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { CourseType } from "../../types/courses";

interface MoreTagsOptionsProps {
  setOpen: any;
  selectedTag:  any;
  handleDeleteClick: () => void;
  handleUpdateClick: () => void;
  handleStatusChange: () => void;
}

export default function MoreTagsOptions({
  setOpen,
  selectedTag,
  handleDeleteClick,
  handleUpdateClick,
  handleStatusChange
}: MoreTagsOptionsProps) {
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
          flexDirection: "row",
          alignItems: "center",
          gap: 20,
        }}
      >
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={handleUpdateClick}
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            flex: 1,
            paddingHorizontal: 20,
            paddingVertical: 20,
            borderRadius: 20,
            borderColor: Color.border,
            borderWidth: 1,
          }}
        >
          <Text
            style={{
              color: Color.buttonBg,
              fontSize: FontSize.medium14pxMed_size,
              fontWeight: "600",
            }}
          >
            Update
          </Text>
          <MaterialCommunityIcons
            name="pencil-outline"
            size={16}
            color={Color.buttonBg}
          />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={handleDeleteClick}
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            flex: 1,
            paddingHorizontal: 20,
            paddingVertical: 20,
            borderRadius: 20,
            borderColor: Color.border,
            borderWidth: 1,
          }}
        >
          <Text
            style={{
              color: Color.buttonBg,
              fontSize: FontSize.medium14pxMed_size,
              fontWeight: "600",
            }}
          >
            Delete
          </Text>
          <MaterialIcons name="delete" size={16} color={Color.buttonBg} />
        </TouchableOpacity>
      </View>
      <View
        style={{
          padding: 20,
          borderRadius: 20,
          borderColor: Color.border,
          borderWidth: 1,
          marginTop: 20,
          flexDirection: "row", 
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <View>
          <Text
            style={{
              color: Color.buttonBg,
              fontSize: FontSize.medium14pxMed_size,
              fontWeight: "600",
              marginBottom: 5
            }}
          >
            Status
          </Text>
          <Text
          style={{
            color: Color.textSecondary,
            fontSize: FontSize.medium11pxMed_size,
            fontWeight: "400",
          }}
        >
          {isEnabled ? "ON": "OFF"}
        </Text>
        </View>
        
        <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={() => setIsEnabled((prev: any) => !prev)}
            value={isEnabled}
          />
      </View>
    </View>
  );
}
