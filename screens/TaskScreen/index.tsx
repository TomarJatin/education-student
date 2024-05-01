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
import Assignment1 from "../Assignment1";
import QuestionCard from "../../components/common/QuestionCard";
import AnswerCard from "../../components/common/AnswerCard";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { useHeaderHeight } from "@react-navigation/elements";
import UploadAndPreview from "../../components/common/UploadPreview";

const NUM_COLUMNS = 7;
export default function SingleCorrect({ navigation }: any) {
  const [showAllItems, setShowAllItems] = useState(false);
  const [numItemsToShow, setNumItemsToShow] = useState(6);
  const height = useHeaderHeight();
  const toggleItems = () => {
    setShowAllItems(!showAllItems);
    if (showAllItems) {
      setNumItemsToShow(7); // Reset to initial number of items
    } else {
      setNumItemsToShow(QuestionList.length); // Show all items
    }
  };

  const QuestionList = [
    { _id: 1, label: "00", status: 3 },
    { _id: 2, label: "01", status: 1 },
    { _id: 3, label: "02", status: 2 },
    { _id: 4, label: "03", status: 0 },
    { _id: 5, label: "04", status: 0 },
    { _id: 6, label: "05", status: 0 },
    { _id: 7, label: "06", status: 0 },
    { _id: 8, label: "07", status: 0 },
    { _id: 9, label: "08", status: 0 },
    { _id: 10, label: "09", status: 0 },
    { _id: 11, label: "010", status: 0 },
    { _id: 12, label: "011", status: 0 },
    { _id: 13, label: "012", status: 0 },
    { _id: 14, label: "013", status: 0 },
    { _id: 15, label: "014", status: 0 },
    { _id: 16, label: "015", status: 0 },
    { _id: 17, label: "016", status: 0 },
    { _id: 18, label: "017", status: 0 },
    { _id: 19, label: "018", status: 0 },
    { _id: 20, label: "019", status: 0 },
    { _id: 21, label: "020", status: 0 },
    { _id: 22, label: "021", status: 0 },
    { _id: 23, label: "022", status: 0 },
    { _id: 24, label: "023", status: 0 },
    { _id: 25, label: "024", status: 0 },
    { _id: 26, label: "025", status: 0 },
    { _id: 27, label: "026", status: 0 },
    { _id: 28, label: "027", status: 0 },
    { _id: 29, label: "028", status: 0 },
    { _id: 30, label: "029", status: 0 },
  ];

  const QuestionItem: React.FC<any> = ({ label, status }: any) => {
    return (
      <View
        style={{
          backgroundColor: getStatusColor(status),
          ...styles.item,
        }}
      >
        <TouchableOpacity>
          <Text style={{ color: status ? "#ffffff" : "", ...styles.itemText }}>
            {label}
          </Text>
        </TouchableOpacity>
      </View>
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
            data={QuestionList.slice(0, numItemsToShow)}
            contentContainerStyle={styles.itemContainer}
            renderItem={({ item }: any) => (
              <QuestionItem status={item.status} label={item.label} />
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
                  imgSrc=""
                  question="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,"
                  explaination={true}
                  cardTitle="Question"
                />
              </View>
              <View style={{ paddingVertical: 20, paddingHorizontal: 20 }}>
                <AnswerCard answerType={"SingleCorrect"} />
              </View>
              <View>
                <UploadAndPreview />
              </View>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
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
    // flexWrap: "wrap",
    borderBottomWidth: 2,
    borderBlockColor: "#F4F4F4",
  },
  itemContainer: {
    width: "100%",
    flexDirection: "row",
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
