import {
  Dimensions,
  FlatList,
  ImageBackground,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Color, FontSize } from "../../GlobalStyles";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import Modal from "react-native-modal";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useContext, useState } from "react";
import Video from "../../components/Assignment/Video";
import AddChapter from "../../components/Models/AddChapter";
import MoreChapterOptions from "../../components/Models/MoreChapterOption";
import MoreVideoOptions from "../../components/Models/MoreVideoOption";
import Assignments from "../../components/Assignment/Assignments";
import { VideoType } from "../../types/video";
import { deleteVideo, getAllVideos } from "../../utils/api/video";
import { DataContext } from "../../contexts/DataContext";
import { DataContextType } from "../../types/context";
import { AssignmentsType } from "../../types/assignments";
import {
  getAllAssignments,
  handleAddAssignments,
  handleDeleteAssignments,
  handleUpdateAssignments,
} from "../../utils/api/assignments";
import AddAssignment from "../../components/Models/AddAssignment";
import {
  getAllTests,
  handleAddTests,
  handleDeleteTests,
  handleUpdateTests,
} from "../../utils/api/tests";
import AddTest from "../../components/Models/AddTest";
import { TestType } from "../../types/test";
import Tests from "../../components/Assignment/Tests";
import AddQuestions from "../../components/Assignment/AddQuestions";
import Notes from "../../components/Assignment/Notes";
import AddNote from "../../components/Models/AddNote";
import { getAllNotes, handleAddNotes, handleDeleteNotes, handleUpdateNotes } from "../../utils/api/notes";
import { QuestionType } from "../../types/questions";
import { getAllQuestions } from "../../utils/api/question";
import { NoteType } from "../../types/notes";
import { uploadFiles } from "../../utils/api/upload";

export default function Assignment({ navigation }: any) {
  const {
    selectedChapter,
    selectedAssignment,
    selectedTest,
  } = useContext(DataContext) as DataContextType;
  const [tab, setTab] = useState((selectedChapter?.chapterComponent && selectedChapter?.chapterComponent?.length > 0) ?  selectedChapter?.chapterComponent[0]: "");
  const [assignmentName, setAssignmentName] = useState("");
  const [assignmentGrading, setAssignmentGrading] = useState(false);
  const [assignmentSolution, setAssignmentSolution] = useState(false);
  const [open, setOpen] = useState("");
  const [allAssignments, setAllAssignments] = useState<AssignmentsType[]>([]);
  const [allQuestions, setAllQuestions] = useState<QuestionType[]>([]);
  const [selectedCurrQuestionIdx, setSelectedCurrQuestionIdx] = useState(-1);
  const [allNotes, setAllNotes] = useState<NoteType[]>([]);
  const [allTests, setAllTests] = useState<TestType[]>([]);
  const [allVideos, setAllVideos] = useState<VideoType[]>([]);

  const fetchAllVideos = () => {
    if (!selectedChapter) {
      return;
    }
    getAllVideos(selectedChapter?._id, 10, 0, "asc", 10, setAllVideos);
  };

  const fetchAllTests = () => {
    if (!selectedChapter) {
      return;
    }
    getAllTests(selectedChapter?._id, 10, 0, "asc", 10, setAllTests);
  };

  const fetchAllNotes = () => {
    if (!selectedChapter) {
      return;
    }
    getAllNotes(selectedChapter?._id, 10, 0, "asc", 10, setAllNotes);
  };

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
    <>
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
            <ScrollView
              showsHorizontalScrollIndicator={false}
              style={{
                marginTop: 25,
              }}
              horizontal={true}
            >
              
              {
                selectedChapter?.chapterComponent?.map((item, index) => (
                  <TouchableOpacity
                  key={index}
                onPress={() => setTab(item)}
                activeOpacity={0.5}
                style={{
                  padding: 8,
                  backgroundColor:
                    tab === item ? Color.buttonBg : Color.textWhite,
                  borderRadius: 34,
                  marginLeft: 20,
                }}
              >
                <Text
                  style={{
                    color: tab === item ? Color.textWhite : Color.buttonBg,
                    fontSize: FontSize.medium12pxMed_size,
                    fontWeight: "500",
                  }}
                >
                  {item}
                </Text>
              </TouchableOpacity>
                ))
              }
            </ScrollView>
          </View>

          <FlatList
            data={["1"]}
            renderItem={() => (
              <View style={{ paddingBottom: 400 }}>
                {tab === "Videos" && (
                  <Video
                    navigation={navigation}
                    setOpen={setOpen}
                    allVideos={allVideos}
                    fetchAllVideos={fetchAllVideos}
                    setAllVideos={setAllVideos}
                  />
                )}
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

                {tab === "Notes" && (
                  <Notes
                    navigation={navigation}
                    setOpen={setOpen}
                    allNotes={allNotes}
                    fetchAllNotes={fetchAllNotes}
                    setAllNotes={setAllNotes}
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
      <Modal
        isVisible={open !== ""}
        onSwipeComplete={() => setOpen("")}
        onBackdropPress={() => setOpen("")}
        onBackButtonPress={() => setOpen("")}
      >
        

        

       
        
        {open === "add assignment" && (
          <AddAssignment
            setOpen={setOpen}
            setAssignmentName={setAssignmentName}
            setGranding={setAssignmentGrading}
            setSolution={setAssignmentSolution}
            solution={assignmentSolution}
            grading={assignmentGrading}
            assignmentName={assignmentName}
          />
        )}

        
      </Modal>
    </>
  );
}
