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
import { getAllTests } from "../../utils/api/tests";
import { TestType } from "../../types/test";
import TestsComponent from "../../components/Assignment/Tests";
import AddQuestions from "../../components/Assignment/AddQuestions";
import { getAllQuestions } from "../../utils/api/question";
import { QuestionType } from "../../types/questions";

export default function Tests({ navigation }: any) {
    const {
        selectedChapter,
        selectedAssignment,
        selectedTest,
      } = useContext(DataContext) as DataContextType;
      const [tab, setTab] = useState("Tests");
      const [open, setOpen] = useState("");
      const [allTests, setAllTests] = useState<TestType[]>([]);
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
    
      const fetchAllTests = () => {
        if (!selectedChapter) {
          return;
        }
        getAllTests(selectedChapter?._id, 10, 0, "asc", 10, setAllTests);
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
                Tests
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

                {tab === "Tests" && (
                  <Tests
                    navigation={navigation}
                    setOpen={setOpen}
                    allTests={allTests}
                    fetchAllTests={fetchAllTests}
                    setAllTests={setAllTests}
                    setTab={setTab}
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
