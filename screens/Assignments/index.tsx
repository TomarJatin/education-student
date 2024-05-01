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
import { NavigationContainer } from "@react-navigation/native";
import Assignment1 from "../Assignment1";

export default function Assignments({ navigation }: any) {
  const {
    selectedChapter,
    selectedAssignment,
    selectedTest,
    setSelectedAssignment,
  } = useContext(DataContext) as DataContextType;
  const [tab, setTab] = useState("Assignments");
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

  useEffect(() => {
    fetchAllAssignments();
  }, []);

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
        <FlatList
          data={["1"]}
          renderItem={() => (
            <View
              style={{
                padding: 20,
                paddingTop: 10,
                borderRadius: 20,
                backgroundColor: Color.cardBg,
                borderColor: Color.border,
                borderWidth: 1,
                marginTop: 20,
              }}
            >
              <View
                style={{
                  marginTop: 10,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    color: Color.textPrimLM,
                    fontSize: FontSize.medium12pxMed_size,
                    fontWeight: "600",
                  }}
                >
                  Ongoing Assignments
                </Text>
              </View>
              <FlatList
                data={allAssignments}
                renderItem={({ item, index }) => (
                  <TouchableOpacity
                    onPress={() => {
                      // setSelectedForumCourse({ ...item });
                      setSelectedAssignment({ ...item });
                      navigation.navigate("Assignment1");
                    }}
                    activeOpacity={0.5}
                    key={index}
                    style={{
                      marginTop: 20,
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 10,
                    }}
                  >
                    <Image
                      source={{
                        uri: selectedChapter?.chapterIcon,
                      }}
                      contentFit="cover"
                      style={{
                        width: 46,
                        height: 46,
                        borderRadius: 6,
                      }}
                    />
                    <Text
                      style={{
                        color: Color.buttonBg,
                        fontWeight: "500",
                        fontSize: FontSize.medium11pxMed_size,
                      }}
                    >
                      {item?.assignmentName}
                    </Text>
                  </TouchableOpacity>
                )}
              />
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
