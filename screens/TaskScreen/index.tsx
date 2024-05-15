import { Color, FontSize } from "../../GlobalStyles";
import {
  Dimensions,
  FlatList,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Button,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useContext, useEffect, useRef, useState } from "react";
import { DataContextType } from "../../types/context";
import { DataContext } from "../../contexts/DataContext";
import { AssignmentsType } from "../../types/assignments";
import { QuestionType } from "../../types/questions";
import { getAllAssignments } from "../../utils/api/assignments";
import {
  getAllQuestions,
  getAllQuestions2,
  getQuestionById,
} from "../../utils/api/question";
import AssignmentsComponent from "../../components/Assignment/Assignments";
import AddQuestions from "../../components/Assignment/AddQuestions";
import { Image } from "expo-image";
import Assignment1 from "../Assignment1";
import QuestionCard from "../../components/common/QuestionCard";
import AnswerCard from "../../components/common/AnswerCard";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { useHeaderHeight } from "@react-navigation/elements";
import UploadAndPreview from "../../components/common/UploadPreview";
import BottomNavTasks from "../../components/common/BottomNavTask";
import { useIsFocused } from "@react-navigation/native";

const NUM_COLUMNS = 7;
export default function SingleCorrect({ navigation }: any) {
  const [showAllItems, setShowAllItems] = useState(false);
  const [numItemsToShow, setNumItemsToShow] = useState(6);
  const [allQuestions, setAllQuestions] = useState<QuestionType[]>([]);
  const [selectedQuestion, setSelectedQuestion] = useState<any>("");
  const [answerList, setAnswerList] = useState([]);
  const answerList2: any = useRef([]);
  const height = useHeaderHeight();
  const toggleItems = () => {
    setShowAllItems(!showAllItems);
    if (showAllItems) {
      setNumItemsToShow(7); // Reset to initial number of items
    } else {
      setNumItemsToShow(Number(selectedAssignment?.questions?.length)); // Show all items
    }
  };

  const {
    selectedChapter,
    selectedAssignment,
    selectedTest,
    setSelectedAssignment,
  } = useContext(DataContext) as DataContextType;

  const handleSubmit = () => {
    console.log("anslist", answerList2);
  };

  const fetchAllQuestions = async () => {
    if (selectedAssignment) {
      const response = await getAllQuestions2(
        selectedAssignment?._id,
        10,
        0,
        "asc",
        10,
        "assignmentId"
      );
      setAllQuestions(response);
      setSelectedQuestion(response[0]);
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

  const isFocused = useIsFocused();
  console.log("logger");

  useEffect(() => {
    if (isFocused) {
      fetchAllQuestions();
    }
  }, [isFocused]);

  const handleQuestionItemPress = async (questionId: string) => {
    try {
      const response = allQuestions.find(
        (item: any) => item._id === questionId
      );
      setSelectedQuestion(response);
    } catch (err) {
      console.log("ERR", err);
    }
  };

  const QuestionItem: React.FC<any> = ({
    label,
    value,
    status,
    isActive,
  }: any) => {
    console.log("isActive", isActive);
    return (
      <TouchableOpacity onPress={() => handleQuestionItemPress(value)}>
        <View
          style={{
            backgroundColor: isActive
              ? getStatusColor(2)
              : getStatusColor(status),
            ...styles.item,
          }}
        >
          <Text
            style={{
              color: status || isActive ? "#ffffff" : "",
              ...styles.itemText,
            }}
          >
            {label}
          </Text>
        </View>
      </TouchableOpacity>
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
              Single Correct
            </Text>
          </View>
          <TouchableOpacity
            style={{ paddingHorizontal: 15 }}
            activeOpacity={0.5}
          >
            <MaterialIcons name="more-vert" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <View style={styles.container}>
          <FlatList
            data={allQuestions?.slice(0, numItemsToShow)}
            contentContainerStyle={styles.itemContainer}
            renderItem={({ item, index }: any) => (
              <QuestionItem
                status={0}
                isActive={selectedQuestion._id === item._id}
                value={item?._id}
                label={index + 1}
              />
            )}
            keyExtractor={(item) => item._id.toString()}
            numColumns={NUM_COLUMNS}
          />
          <TouchableOpacity
            style={{
              padding: 10,
              alignSelf: "flex-start",
              transform: [{ rotate: showAllItems ? "180deg" : "0deg" }],
            }}
            onPress={toggleItems}
          >
            <Image
              source={require("../../assets/Vector.svg")}
              style={{
                width: 18,
                height: 18,
              }}
              contentFit="contain"
            />
          </TouchableOpacity>
        </View>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "padding"}
          style={{ flex: 1 }}
          keyboardVerticalOffset={height + 47}
        >
          <View style={{ flex: 1 }}>
            <ScrollView>
              <View style={{ paddingVertical: 20, paddingHorizontal: 20 }}>
                <QuestionCard
                  imgSrc={selectedQuestion?.question?.image}
                  question={selectedQuestion?.question?.text}
                  explaination={selectedQuestion?.askForExplaination}
                  cardTitle="Question"
                />
              </View>
              <View style={{ paddingVertical: 20, paddingHorizontal: 20 }}>
                <AnswerCard
                  questionId={selectedQuestion._id}
                  answerList={answerList2}
                  setAnswer={setAnswerList}
                  options={selectedQuestion?.options}
                  answerType={selectedQuestion?.questionType}
                />
              </View>
              {/* <View>
                <UploadAndPreview />
              </View> */}
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
        <BottomNavTasks onSubmit={handleSubmit} />
      </View>
    </SafeAreaView>
  );
}

function getStatusColor(status: number) {
  switch (status) {
    case 1:
      return "#D80027";
    case 2:
      return "#293335";
    case 3:
      return "#1ED760";
    default:
      return ""; // Default value if status doesn't match any case
  }
}

const windowWidth = Dimensions.get("window").width;
const columnGap = 12;
const itemWidth = (windowWidth - columnGap * (NUM_COLUMNS + 5)) / NUM_COLUMNS;
const itemSize = 30;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    width: "100%",
    paddingHorizontal: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    borderBottomWidth: 2,
    borderBlockColor: "#F4F4F4",
  },
  itemContainer: {
    width: "100%",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  item: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: itemWidth,
    height: itemWidth,
    textAlign: "center",
    borderRadius: 8,
    // minWidth: itemWidth,
    borderWidth: 1,
    borderColor: "#F3F3FA",
    marginBottom: columnGap,
    marginRight: columnGap,
  },
  itemText: { fontSize: 12 },
});
