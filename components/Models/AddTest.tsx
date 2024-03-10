import { View, Text, TouchableOpacity } from "react-native";
import { Color, FontSize } from "../../GlobalStyles";
import { Feather } from "@expo/vector-icons";
import { Switch, TextInput } from "react-native-gesture-handler";

interface AddTestProps {
  setOpen: any;
  TestName: string;
  setTestName: any;
  grading: boolean;
  setGranding: any;
  solution: boolean;
  setSolution: any;
  handleCreateTest: any;
}

export default function AddTest({
  setOpen,
  TestName,
  setTestName,
  grading,
  setGranding,
  solution,
  setSolution,
  handleCreateTest,
}: AddTestProps) {

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
            value={TestName}
            onChangeText={(text) => setTestName(text)}
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
            Test Grading
          </Text>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={grading ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={() => setGranding((prev: any )=> !prev)}
            value={grading}
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
            Solution Publishing
          </Text>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={solution ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={() => setSolution((prev: any) => !prev)}
            value={solution}
          />
        </View>
      </View>
      <View>

        <TouchableOpacity
          onPress={() => handleCreateTest()}
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
