import { Color, FontSize } from "../../GlobalStyles";
import {
  Dimensions,
  FlatList,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useContext, useEffect, useState } from "react";
import { DataContextType } from "../../types/context";
import { DataContext } from "../../contexts/DataContext";
import { AssignmentsType } from "../../types/assignments";
import { QuestionType } from "../../types/questions";
import { getAllAssignments } from "../../utils/api/assignments";
import { getAllQuestions } from "../../utils/api/question";
import AssignmentsComponent from "../../components/Assignment/Assignments";
import AddQuestions from "../../components/Assignment/AddQuestions";
import { Image } from "expo-image";
import { createStackNavigator } from "@react-navigation/stack";
import StatusCard from "../../components/common/StatusCard";

export default function Assignment1({ navigation }: any) {
  const { selectedChapter, selectedAssignment, selectedTest } = useContext(
    DataContext
  ) as DataContextType;
  const [tab, setTab] = useState("Assignment");
  const [assignmentName, setAssignmentName] = useState("");
  const [assignmentGrading, setAssignmentGrading] = useState(false);
  const [assignmentSolution, setAssignmentSolution] = useState(false);
  const [open, setOpen] = useState("");
  const [allAssignments, setAllAssignments] = useState<AssignmentsType[]>([]);
  const [allQuestions, setAllQuestions] = useState<QuestionType[]>([]);
  const [selectedCurrQuestionIdx, setSelectedCurrQuestionIdx] = useState(-1);

  console.log("Assignment selected", selectedAssignment);

  const fetchAllQuestions = () => {
    if (selectedAssignment) {
      getAllQuestions(
        selectedAssignment?._id,
        10,
        0,
        "asc",
        10,
        setAllQuestions,
        "assignmentId"
      );
    } else if (selectedTest) {
      getAllQuestions(
        selectedTest?._id,
        10,
        0,
        "asc",
        10,
        setAllQuestions,
        "testId"
      );
    }
  };

  const fetchAllAssignments = () => {
    if (!selectedChapter) {
      return;
    }
    getAllAssignments(
      selectedChapter?._id,
      10,
      0,
      "asc",
      10,
      setAllAssignments
    );
  };

  //   useEffect(() => {
  //     fetchAllAssignments();
  //   }, []);

  return (
    <SafeAreaView>
      <View
        style={{
          minHeight: Dimensions.get("window").height,
          backgroundColor: Color.textWhite,
        }}
      >
        {/* Topbar */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
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
              Assignment
            </Text>
          </View>
          <TouchableOpacity
            style={{ paddingHorizontal: 15 }}
            activeOpacity={0.5}
          >
            <MaterialIcons name="more-vert" size={24} color="black" />
          </TouchableOpacity>
        </View>

        <StatusCard
          btnLabel="Start"
          cardTitle={selectedAssignment?.assignmentName}
          contentText={selectedAssignment?.totalMarks}
          imgSrc="dada"
          key={"1"}
          action={() => {
            navigation.navigate("SingleCorrect");
          }}
          cardStatus={selectedAssignment?.status.toString() || ""}
          cardTime={selectedAssignment?.assignmentDuration}
        />
      </View>
    </SafeAreaView>
  );
}
