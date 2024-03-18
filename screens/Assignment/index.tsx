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
    setSelectedVideo,
    selectedChapter,
    selectedAssignment,
    selectedTest,
  } = useContext(DataContext) as DataContextType;
  const [tab, setTab] = useState("assignments");
  const [assignmentName, setAssignmentName] = useState("");
  const [assignmentGrading, setAssignmentGrading] = useState(false);
  const [assignmentSolution, setAssignmentSolution] = useState(false);
  const [testName, setTestName] = useState("");
  const [testGrading, setTestGrading] = useState(false);
  const [testSolution, setTestSolution] = useState(false);
  const [noteName, setNoteName] = useState("");
  const [open, setOpen] = useState("");
  const [noteType, setNoteType] = useState("");
  const [noteDownloadable, setNoteDownloadable] = useState(false);
  const [currSelectedVideo, setCurrSelectedVideo] = useState<VideoType | null>(
    null
  );
  const [currSelectedNotes, setCurrSelectedNotes] = useState<any>(null);
  const [currSelectedAssignment, setCurrSelectedAssignment] =
    useState<AssignmentsType | null>(null);
  const [currSelectedTest, setCurrSelectedTest] = useState<TestType | null>(
    null
  );
  const [allAssignments, setAllAssignments] = useState<AssignmentsType[]>([]);
  const [allQuestions, setAllQuestions] = useState<QuestionType[]>([]);
  const [selectedCurrQuestionIdx, setSelectedCurrQuestionIdx] = useState(-1);
  const [allNotes, setAllNotes] = useState<NoteType[]>([]);
  const [allTests, setAllTests] = useState<TestType[]>([]);
  const [allVideos, setAllVideos] = useState<VideoType[]>([]);
  const [notesFile, setNotesFile] = useState<any>(null);

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

  const handleUpdateClick = () => {
    console.log("update clicked", currSelectedVideo);
    if (currSelectedVideo) {
      setSelectedVideo(currSelectedVideo);
      navigation.navigate("AddVideo");
    }
  };

  const handleCreateNote = async () => {
    if (!selectedChapter || !notesFile) {
      return;
    }
    const _arr = notesFile.split(".");
    const lastElement = _arr.pop();

    var file: any = {
      uri: notesFile,
      type: "file/" + lastElement,
      name: "file." + lastElement,
    };
    const res: any = await uploadFiles(file);
    console.log("res: ", res);
    let url = [];
    if (res && res?.data?.urls) {
      url = res.data.urls;
    }
    let data = JSON.stringify({
      chapterId: selectedChapter._id,
      noteName: noteName,
      noteType: noteType,
      noteDownload: String(noteDownloadable),
      noteUrl: url,
    });

    if(currSelectedNotes){
      await handleUpdateNotes(data, currSelectedNotes._id);
      setCurrSelectedNotes(null);
    }
    else{
      await handleAddNotes(data);
    }
    fetchAllNotes();
    setOpen("");
  };

  const handleDeleteVideo = async () => {
    if (currSelectedVideo) {
      await deleteVideo(currSelectedVideo?._id);
      fetchAllVideos();
      setOpen("");
    }
  };

  const handleUpdateAssignmentClick = () => {
    if (currSelectedAssignment) {
      setOpen("add assignment");
      setAssignmentName(currSelectedAssignment.assignmentName);
      setAssignmentGrading(Boolean(currSelectedAssignment.assignmentGrading));
      setAssignmentSolution(Boolean(currSelectedAssignment.assignmentSolution));
    }
  };

  const DeleteAssignment = async () => {
    if (currSelectedAssignment) {
      await handleDeleteAssignments(currSelectedAssignment?._id);
      fetchAllAssignments();
      setOpen("");
    }
  };

  const DeleteNote = async () => {
    if (currSelectedNotes) {
      await handleDeleteNotes(currSelectedNotes?._id);
      fetchAllNotes();
      setOpen("");
    }
  };

  const DeleteTest = async () => {
    if (currSelectedTest) {
      await handleDeleteTests(currSelectedTest?._id);
      fetchAllTests();
      setOpen("");
    }
  };

  const handleCreateAssignment = async () => {
    if (!selectedChapter) {
      return;
    }
    let data = JSON.stringify({
      chapterId: selectedChapter._id,
      assignmentName: assignmentName,
      assignmentType: "basic",
      assignmentGrading: String(assignmentGrading),
      assignmentSolution: String(assignmentSolution),
      assignmentUIType: "basic",
      totalMarks: "50",
      assignmentDuration: "60",
    });
    if(currSelectedAssignment){
      await handleUpdateAssignments(data, currSelectedAssignment._id);
      setCurrSelectedAssignment(null);
    }else{
      await handleAddAssignments(data);
    }
    fetchAllAssignments();
    setOpen("");
  };

  const handleUpdateTestClick = () => {
    console.log("update clicked", currSelectedTest);
    if(currSelectedTest){
      setOpen("add test");
      setTestName(currSelectedTest.testName);
      setTestGrading(Boolean(currSelectedTest.testGrading));
      setTestSolution(Boolean(currSelectedTest.testSolution));
    }
  };

  const handleUpdateNoteClick = () => {
    if(currSelectedNotes){
      setOpen("add note");
      setNoteName(currSelectedNotes.noteName);
      setNoteType(currSelectedNotes.noteType);
      setNoteDownloadable(Boolean(currSelectedNotes.noteDownload));
    }
  };

  const handleCreateTest = async () => {
    if (!selectedChapter) {
      return;
    }
    let data = JSON.stringify({
      chapterId: selectedChapter._id,
      testName: testName,
      testType: "basic",
      testGrading: String(testGrading),
      testSolution: String(testSolution),
      testUIType: "basic",
      totalMarks: "50",
      testDuration: "60",
    });
    if(currSelectedTest){
      await handleUpdateTests(data, currSelectedTest._id);
      setCurrSelectedTest(null);
    }
    else{
      await handleAddTests(data);
    }
    fetchAllTests();
    setOpen("");
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
          </View>

          <FlatList
            data={["1"]}
            renderItem={() => (
              <View style={{ paddingBottom: 400 }}>
                
                {tab === "assignments" && (
                  <Assignments
                    setCurrSelectedAssignment={setCurrSelectedAssignment}
                    navigation={navigation}
                    setOpen={setOpen}
                    allAssignments={allAssignments}
                    fetchAllAssignments={fetchAllAssignments}
                    setTab={setTab}
                    setAllAssignments={setAllAssignments}
                  />
                )}

                {tab === "add questions" && (
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
      <Modal
        isVisible={open !== ""}
        onSwipeComplete={() => setOpen("")}
        onBackdropPress={() => setOpen("")}
        onBackButtonPress={() => setOpen("")}
      >
        {open === "more video" && (
          <MoreVideoOptions
            handleDeleteClick={handleDeleteVideo}
            handleUpdateClick={handleUpdateClick}
          />
        )}

        {open === "more assignment options" && (
          <MoreVideoOptions
            handleDeleteClick={DeleteAssignment}
            handleUpdateClick={handleUpdateAssignmentClick}
          />
        )}

        {open === "more tests options" && (
          <MoreVideoOptions
            handleDeleteClick={DeleteTest}
            handleUpdateClick={handleUpdateTestClick}
          />
        )}
        {open === "more notes options" && (
          <MoreVideoOptions
            handleDeleteClick={DeleteNote}
            handleUpdateClick={handleUpdateNoteClick}
          />
        )}
        {open === "add assignment" && (
          <AddAssignment
            setOpen={setOpen}
            setAssignmentName={setAssignmentName}
            setGranding={setAssignmentGrading}
            setSolution={setAssignmentSolution}
            solution={assignmentSolution}
            grading={assignmentGrading}
            assignmentName={assignmentName}
            handleCreateAssignment={handleCreateAssignment}
          />
        )}

        {open === "add test" && (
          <AddTest
            setOpen={setOpen}
            setTestName={setTestName}
            setGranding={setTestGrading}
            setSolution={setTestSolution}
            solution={testSolution}
            grading={testGrading}
            TestName={testName}
            handleCreateTest={handleCreateTest}
          />
        )}

        {open === "add note" && (
          <AddNote
            setOpen={setOpen}
            setNoteName={setNoteName}
            noteName={noteName}
            handleCreateNote={handleCreateNote}
            noteDownloadable={noteDownloadable}
            noteType={noteType}
            setNoteDownloadable={setNoteDownloadable}
            setNoteType={setNoteType}
            notesFile={notesFile}
            setNotesFile={setNotesFile}
          />
        )}
      </Modal>
    </>
  );
}
