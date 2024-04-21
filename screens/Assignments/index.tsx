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
import { useContext, useState } from "react";
import { DataContextType } from "../../types/context";
import { DataContext } from "../../contexts/DataContext";
import { AssignmentsType } from "../../types/assignments";
import { QuestionType } from "../../types/questions";
import { getAllAssignments } from "../../utils/api/assignments";
import { getAllQuestions } from "../../utils/api/question";
import AssignmentsComponent from "../../components/Assignment/Assignments";
import AddQuestions from "../../components/Assignment/AddQuestions";

export default function Assignments({ navigation }: any) {
    const {
        selectedChapter,
        selectedAssignment,
        selectedTest,
      } = useContext(DataContext) as DataContextType;
      const [tab, setTab] = useState("Assignments");
      const [assignmentName, setAssignmentName] = useState("");
      const [assignmentGrading, setAssignmentGrading] = useState(false);
      const [assignmentSolution, setAssignmentSolution] = useState(false);
      const [open, setOpen] = useState("");
      const [allAssignments, setAllAssignments] = useState<AssignmentsType[]>([]);
      const [allQuestions, setAllQuestions] = useState<QuestionType[]>([]);
      const [selectedCurrQuestionIdx, setSelectedCurrQuestionIdx] = useState(-1);
    
     
    
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
                Assignments
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
              {tab === "Assignments" && (
                  <Assignments
                    navigation={navigation}
                    setOpen={setOpen}
                    allAssignments={allAssignments}
                    fetchAllAssignments={fetchAllAssignments}
                    setTab={setTab}
                    setAllAssignments={setAllAssignments}
                  />
                )}

                {tab === "questions" && (
                  <AddQuestions
                    navigation={navigation}
                    setOpen={setOpen}
                    allQuestions={allQuestions}
                    fetchAllQuestions={fetchAllQuestions}
                    selectedCurrQuestionIdx={selectedCurrQuestionIdx}
                    setSelectedCurrQuestionIdx={setSelectedCurrQuestionIdx}
                    setAllQuestions={setAllQuestions}
                  />
                )}
            </View>
          )}
          style={{
            paddingHorizontal: 15,
          }}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
}
