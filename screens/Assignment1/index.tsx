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
import {
  getAllAssignments,
  initiateAssignment,
} from "../../utils/api/assignments";
import { getAllQuestions } from "../../utils/api/question";
import AssignmentsComponent from "../../components/Assignment/Assignments";
import AddQuestions from "../../components/Assignment/AddQuestions";
import { Image } from "expo-image";
import { createStackNavigator } from "@react-navigation/stack";
import StatusCard from "../../components/common/StatusCard";

export default function Assignment1({ navigation }: any) {
  const { selectedChapter, selectedAssignment, selectedTest, course } =
    useContext(DataContext) as DataContextType;
  const [tab, setTab] = useState("Assignment");
  const [assignmentName, setAssignmentName] = useState("");
  const [assignmentGrading, setAssignmentGrading] = useState(false);
  const [assignmentSolution, setAssignmentSolution] = useState(false);
  const [open, setOpen] = useState("");
  const [allAssignments, setAllAssignments] = useState<AssignmentsType[]>([]);
  const [allQuestions, setAllQuestions] = useState<QuestionType[]>([]);
  const [selectedCurrQuestionIdx, setSelectedCurrQuestionIdx] = useState(-1);

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

  console.log("selected Assignment", selectedAssignment);

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
          startTime={selectedAssignment?.startTime}
          endTime={selectedAssignment?.endTime}
          imgSrc="dada"
          key={"1"}
          action={() => {
            (async function () {
              try {
                const body = {
                  courseId: course?._id,
                  assignementId: selectedAssignment?._id,
                  type: "assignment", // assignment or test
                  submission: [],
                };
                const response = await initiateAssignment(body);
                console.log("response", response);
                if (response?.status === 200) {
                  navigation.navigate("SingleCorrect");
                }
              } catch (err) {
                console.log(err);
              }
            })();
          }}
          cardStatus={selectedAssignment?.status.toString() || ""}
          cardTime={selectedAssignment?.assignmentDuration}
        />
      </View>
    </SafeAreaView>
  );
}
