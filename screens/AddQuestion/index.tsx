import {
  Dimensions,
  FlatList,
  ImageBackground,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Color, FontSize } from "../../GlobalStyles";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useContext, useRef, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { RichEditor, RichToolbar } from "react-native-pell-rich-editor";
// import MathJax from "react-native-mathjax";
import { DataContext } from "../../contexts/DataContext";
import { DataContextType } from "../../types/context";
import { handleAddQuestions } from "../../utils/api/question";
import * as ImagePicker from "expo-image-picker";
import { ResizeMode, Video } from "expo-av";
import { Switch } from "react-native-gesture-handler";
import { uploadFiles } from "../../utils/api/upload";

interface QuestionOptionType {
  text: string;
  image: any;
}

export default function AddQuestion({ navigation }: any) {
  const { setSelectedVideo, selectedChapter, selectedAssignment, selectedTest } = useContext(
    DataContext
  ) as DataContextType;
  const [tab, setTab] = useState("MCQ");
  const [answerType, setAnswerType] = useState("textEditor");
  // image/system/textEditor/audio
  const [level, setLevel] = useState("easy");
  // easy/medium/hard
  const [questionText, setQuestionText] = useState("");
  const [file, setFile] = useState<any>(null);
  const [questionOptions, setQuestionOptions] = useState<QuestionOptionType[]>(
    []
  );
  const [questionSolution, setQuestionSolution] = useState({
    text: "",
    image: "",
  });
  const [askForExplaination, setAskForExplaination] = useState(false);
  const [questionAnswer, setQuestionAnswer] = useState("");
  const [correctValue, setCorrectValue] = useState("1");
  const [incorrectValue, setIncorrectValue] = useState("0");
  const [fillInTheBlanksType, setFillInTheBlanksType] = useState("single");
  const editorRef = useRef(null);

  const mmlOptions = {
    messageStyle: "none",
    extensions: ["tex2jax.js"],
    jax: ["input/TeX", "output/HTML-CSS"],
    tex2jax: {
      inlineMath: [
        ["$", "$"],
        ["\\(", "\\)"],
      ],
      displayMath: [
        ["$$", "$$"],
        ["\\[", "\\]"],
      ],
      processEscapes: true,
    },
    TeX: {
      extensions: [
        "AMSmath.js",
        "AMSsymbols.js",
        "noErrors.js",
        "noUndefined.js",
      ],
    },
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      aspect: [1, 1],
      quality: 0.1,
    });

    console.log(result);

    if (!result.canceled) {
      const _arr = result.assets[0].uri.split(".");
      const lastElement = _arr.pop();
      let fileToUpload: any = {
        uri: result.assets[0].uri,
        type: result.assets[0].type + "/" + lastElement,
        name: result.assets[0].type + "." + lastElement,
      };
      console.log("uploading files...");
      const res: any = await uploadFiles(fileToUpload);
      console.log(res.data);
      if (res && res?.data?.urls){
        setFile({
          uri: res.data.urls[0],
          type: result.assets[0].type
        })
      }
      
    }
  };

  const pickOptionFile = async (index: number) => {
    // No permissions request is necessary for launching the image library
    const _questionOptions = questionOptions;

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 0.1,
    });

    console.log(result);

    if (!result.canceled) {
      const _arr = result.assets[0].uri.split(".");
      const lastElement = _arr.pop();
      let fileToUpload: any = {
        uri: result.assets[0].uri,
        type: result.assets[0].type + "/" + lastElement,
        name: result.assets[0].type + "." + lastElement,
      };
      const res: any = await uploadFiles(fileToUpload);
      if (res && res?.data?.urls){
        _questionOptions[index].image = {
          uri: res.data.urls[0],
          type: result.assets[0].type
        };
        setQuestionOptions([..._questionOptions]);
      }
      
    }
  };

  const optionFileRemove = async (index: number) => {
    const _questionOptions = questionOptions;
    _questionOptions[index].image = null;
    setQuestionOptions([..._questionOptions]);
  };
  const _options: QuestionOptionType[] = [];
  questionOptions.map((item) => {
    _options.push({
      text: item.text,
      image: item.image.uri ? item.image.uri: "",
    });
  });

  const handleCreateQuestion = async () => {
    if (!selectedChapter || (!selectedAssignment && !selectedTest)) {
      return;
    }
    if(selectedAssignment){
      let data = JSON.stringify({
        assignmentId: selectedAssignment?._id,
        questionType: tab,
        answerType: answerType,
        questionLevel: level,
        question: {
          text: questionText,
          image: file ? file.uri : "",
        },
        options: _options,
        answer: questionAnswer,
        solution: {
          text: questionSolution.text,
          image: questionSolution.image,
        },
        askForExplaination: String(askForExplaination),
        correct: correctValue,
        incorrect: incorrectValue,
      });
      await handleAddQuestions(data);
    }
    else if(selectedTest){
      let data = JSON.stringify({
        testId: selectedTest?._id,
        questionType: tab,
        answerType: answerType,
        questionLevel: level,
        question: {
          text: questionText,
          image: file ? file.uri : "",
        },
        options: _options,
        answer: questionAnswer,
        solution: {
          text: questionSolution.text,
          image: questionSolution.image,
        },
        askForExplaination: String(askForExplaination),
        correct: correctValue,
        incorrect: incorrectValue,
      });
      await handleAddQuestions(data);
    }
    navigation.goBack();
  };

  const handleSelectAnswer = (index: number) => {
    if (tab !== "MSQ") {
      setQuestionAnswer(String(index + 1));
    } else {
      const stringIndex = String(index);
      let ans = questionAnswer;
      if (isChecked(index)) {
        ans = ans.replace(stringIndex, "");
      } else {
        ans = ans + stringIndex;
      }
      setQuestionAnswer(ans);
    }
  };

  const isChecked = (index: number) => {
    if (tab !== "MSQ") {
      return Number(questionAnswer) === index + 1;
    } else {
      const stringIndex = String(index);
      return questionAnswer.includes(stringIndex);
    }
  };

  const addEmptyOption = () => {
    setQuestionOptions((prev) => [
      ...prev,
      {
        image: null,
        text: "",
      },
    ]);
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
                Add new Question
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
            <TouchableOpacity
              onPress={() => setTab("MCQ")}
              activeOpacity={0.5}
              style={{
                padding: 8,
                backgroundColor:
                  tab === "MCQ" ? Color.buttonBg : Color.textWhite,
                borderRadius: 34,
                marginLeft: 20,
              }}
            >
              <Text
                style={{
                  color: tab === "MCQ" ? Color.textWhite : Color.buttonBg,
                  fontSize: FontSize.medium12pxMed_size,
                  fontWeight: "500",
                }}
              >
                Multiple Choice
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setTab("qid")}
              activeOpacity={0.5}
              style={{
                padding: 8,
                backgroundColor:
                  tab === "qid" ? Color.buttonBg : Color.textWhite,
                borderRadius: 34,
                marginLeft: 15,
              }}
            >
              <Text
                style={{
                  color: tab === "qid" ? Color.textWhite : Color.buttonBg,
                  fontSize: FontSize.medium12pxMed_size,
                  fontWeight: "500",
                }}
              >
                QID
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => setTab("fill in the blanks")}
              style={{
                padding: 8,
                backgroundColor:
                  tab === "fill in the blanks"
                    ? Color.buttonBg
                    : Color.textWhite,
                borderRadius: 34,
                marginLeft: 20,
              }}
            >
              <Text
                style={{
                  color:
                    tab === "fill in the blanks"
                      ? Color.textWhite
                      : Color.buttonBg,
                  fontSize: FontSize.medium12pxMed_size,
                  fontWeight: "500",
                }}
              >
                Fill in the Blanks
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => setTab("MSQ")}
              style={{
                padding: 8,
                backgroundColor:
                  tab === "MSQ" ? Color.buttonBg : Color.textWhite,
                borderRadius: 34,
                marginLeft: 20,
              }}
            >
              <Text
                style={{
                  color: tab === "MSQ" ? Color.textWhite : Color.buttonBg,
                  fontSize: FontSize.medium12pxMed_size,
                  fontWeight: "500",
                }}
              >
                Multi Correct
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => setTab("File")}
              style={{
                padding: 8,
                backgroundColor:
                  tab === "File" ? Color.buttonBg : Color.textWhite,
                borderRadius: 34,
                marginLeft: 20,
                marginRight: 20,
              }}
            >
              <Text
                style={{
                  color: tab === "File" ? Color.textWhite : Color.buttonBg,
                  fontSize: FontSize.medium12pxMed_size,
                  fontWeight: "500",
                }}
              >
                File
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {tab !== "File" && (
          <RichToolbar
            style={{
              backgroundColor: Color.textWhite,
            }}
            iconTint={Color.buttonBg}
            editor={editorRef}
          />
        )}

        <FlatList
          data={["1"]}
          renderItem={() => (
            <View style={{ paddingBottom: 500 }}>
              {/* Add Questions */}
              {tab !== "File" ? (
                <>
                  <View>
                    <Text
                      style={{
                        color: Color.buttonBg,
                        fontSize: FontSize.medium14pxMed_size,
                        fontWeight: "600",
                        marginBottom: 10,
                      }}
                    >
                      Add Question
                    </Text>
                    <View
                      style={{
                        padding: 14,
                        borderRadius: 14,
                        backgroundColor: Color.cardPrim2,
                        borderWidth: 1,
                        borderColor: Color.border,
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 14,
                          }}
                        >
                          <TouchableOpacity
                            onPress={pickImage}
                            style={{
                              padding: 6,
                              backgroundColor: Color.textWhite,
                              borderRadius: 100,
                              borderWidth: 1,
                              borderColor: Color.buttonCardBg,
                            }}
                          >
                            <AntDesign name="addfile" size={18} color="black" />
                          </TouchableOpacity>
                          {/* <TouchableOpacity
                          style={{
                            padding: 6,
                            backgroundColor: Color.textWhite,
                            borderRadius: 100,
                            borderWidth: 1,
                            borderColor: Color.buttonCardBg,
                          }}
                        >
                          <Ionicons name="ios-videocam" size={18} color="black" />
                        </TouchableOpacity> */}
                        </View>
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 10,
                          }}
                        >
                          <TouchableOpacity
                            activeOpacity={0.5}
                            onPress={() => setLevel("easy")}
                            style={{
                              backgroundColor:
                                level === "easy"
                                  ? Color.buttonBg
                                  : Color.textWhite,
                              borderRadius: 6,
                              padding: 8,
                            }}
                          >
                            <Text
                              style={{
                                fontSize: FontSize.medium11pxMed_size,
                                fontWeight: "500",
                                color:
                                  level === "easy"
                                    ? Color.textWhite
                                    : Color.buttonBg,
                              }}
                            >
                              Easy
                            </Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            onPress={() => setLevel("medium")}
                            activeOpacity={0.5}
                            style={{
                              backgroundColor:
                                level === "medium"
                                  ? Color.buttonBg
                                  : Color.textWhite,
                              borderRadius: 6,
                              padding: 8,
                            }}
                          >
                            <Text
                              style={{
                                fontSize: FontSize.medium11pxMed_size,
                                fontWeight: "500",
                                color:
                                  level === "medium"
                                    ? Color.textWhite
                                    : Color.buttonBg,
                              }}
                            >
                              Medium
                            </Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            activeOpacity={0.5}
                            onPress={() => setLevel("hard")}
                            style={{
                              backgroundColor:
                                level === "hard"
                                  ? Color.buttonBg
                                  : Color.textWhite,
                              borderRadius: 6,
                              padding: 8,
                            }}
                          >
                            <Text
                              style={{
                                fontSize: FontSize.medium11pxMed_size,
                                fontWeight: "500",
                                color:
                                  level === "hard"
                                    ? Color.textWhite
                                    : Color.buttonBg,
                              }}
                            >
                              Hard
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                      <View>
                        {file && (
                          <View>
                            <View
                              style={{
                                flexDirection: "column",
                                alignItems: "flex-end",
                                position: "absolute",
                                zIndex: 1,
                                width: "100%",
                                marginTop: 30,
                                marginLeft: -10,
                              }}
                            >
                              <TouchableOpacity
                                onPress={() => setFile(null)}
                                style={{
                                  padding: 6,
                                  backgroundColor: Color.textWhite,
                                  borderRadius: 100,
                                  borderWidth: 1,
                                  borderColor: Color.buttonCardBg,
                                }}
                              >
                                <MaterialIcons
                                  name="delete"
                                  size={18}
                                  color="black"
                                />
                              </TouchableOpacity>
                            </View>
                            {file.type === "image" && (
                              <Image
                                source={{
                                  uri: file.uri,
                                }}
                                style={{
                                  width: "100%",
                                  borderRadius: 14,
                                  height: 200,
                                  marginTop: 20,
                                }}
                              />
                            )}
                            {file.type === "video" && (
                              <Video
                                style={{
                                  width: "100%",
                                  height: 200,
                                }}
                                source={{
                                  uri: file.uri,
                                }}
                                useNativeControls
                                resizeMode={ResizeMode.CONTAIN}
                                isLooping
                              />
                            )}
                          </View>
                        )}
                        {/* <MathJax
                        mathJaxOptions={mmlOptions}
                        html={
                          "<p>yo</p></br> $(a+b)^2 = \\frac{(n^2+n)(2n+1)}{6}$"
                        }
                      /> */}
                        <RichEditor
                          ref={editorRef}
                          style={{
                            marginTop: 20,
                            borderRadius: 14,
                          }}
                          initialContentHTML={"<br/><br/>"}
                          onChange={(content) => {
                            setQuestionText(content);
                          }}
                        />
                      </View>
                    </View>
                  </View>

                  {/* Add Answer */}
                  <View
                    style={{ flexDirection: "column", gap: 20, marginTop: 20 }}
                  >
                    <Text
                      style={{
                        color: Color.buttonBg,
                        fontSize: FontSize.medium14pxMed_size,
                        fontWeight: "600",
                        marginBottom: 10,
                      }}
                    >
                      Add Answers
                    </Text>
                    {tab !== "fill in the blanks" ? questionOptions.map((item, index) => (
                      <View key={index}>
                        <View
                          style={{
                            padding: 14,
                            borderRadius: 14,
                            backgroundColor: Color.cardPrim2,
                            borderWidth: 1,
                            borderColor: Color.border,
                          }}
                        >
                          <View
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                              justifyContent: "space-between",
                            }}
                          >
                            <View
                              style={{
                                flexDirection: "row",
                                alignItems: "center",
                                gap: 14,
                              }}
                            >
                              <TouchableOpacity
                                onPress={() => pickOptionFile(index)}
                                style={{
                                  padding: 6,
                                  backgroundColor: Color.textWhite,
                                  borderRadius: 100,
                                  borderWidth: 1,
                                  borderColor: Color.buttonCardBg,
                                }}
                              >
                                <AntDesign
                                  name="addfile"
                                  size={18}
                                  color="black"
                                />
                              </TouchableOpacity>
                              {/* <TouchableOpacity
                              style={{
                                padding: 6,
                                backgroundColor: Color.textWhite,
                                borderRadius: 100,
                                borderWidth: 1,
                                borderColor: Color.buttonCardBg,
                              }}
                            >
                              <Ionicons
                                name="ios-videocam"
                                size={18}
                                color="black"
                              />
                            </TouchableOpacity>
                            <TouchableOpacity
                              style={{
                                padding: 6,
                                backgroundColor: Color.textWhite,
                                borderRadius: 100,
                                borderWidth: 1,
                                borderColor: Color.buttonCardBg,
                              }}
                            >
                              <MaterialIcons name="mic" size={18} color="black" />
                            </TouchableOpacity> */}
                              {/* <TouchableOpacity
                              style={{
                                padding: 6,
                                backgroundColor: Color.textWhite,
                                borderRadius: 100,
                                borderWidth: 1,
                                borderColor: Color.buttonCardBg,
                              }}
                            >
                              <MaterialIcons
                                name="delete"
                                size={18}
                                color="black"
                              />
                            </TouchableOpacity> */}
                            </View>
                            <TouchableOpacity
                              onPress={() => handleSelectAnswer(index)}
                              style={{
                                padding: 6,
                                backgroundColor: isChecked(index)
                                  ? Color.blueButton
                                  : Color.textWhite,
                                borderRadius: 100,
                                borderWidth: 1,
                                borderColor: isChecked(index)
                                  ? Color.blueButton
                                  : Color.buttonCardBg,
                              }}
                            >
                              <MaterialIcons
                                name="check"
                                size={18}
                                color={
                                  isChecked(index)
                                    ? Color.textWhite
                                    : Color.buttonBg
                                }
                              />
                            </TouchableOpacity>
                          </View>
                          <View>
                            {questionOptions[index].image && (
                              <View>
                                <View
                                  style={{
                                    flexDirection: "column",
                                    alignItems: "flex-end",
                                    position: "absolute",
                                    zIndex: 1,
                                    width: "100%",
                                    marginTop: 30,
                                    marginLeft: -10,
                                  }}
                                >
                                  <TouchableOpacity
                                    onPress={() => optionFileRemove(index)}
                                    style={{
                                      padding: 6,
                                      backgroundColor: Color.textWhite,
                                      borderRadius: 100,
                                      borderWidth: 1,
                                      borderColor: Color.buttonCardBg,
                                    }}
                                  >
                                    <MaterialIcons
                                      name="delete"
                                      size={18}
                                      color="black"
                                    />
                                  </TouchableOpacity>
                                </View>
                                {questionOptions[index].image.type ===
                                  "image" && (
                                  <Image
                                    source={{
                                      uri: questionOptions[index].image.uri,
                                    }}
                                    style={{
                                      width: "100%",
                                      borderRadius: 14,
                                      height: 200,
                                      marginTop: 20,
                                    }}
                                  />
                                )}
                                {questionOptions[index].image.type ===
                                  "video" && (
                                  <Video
                                    style={{
                                      width: "100%",
                                      height: 200,
                                    }}
                                    source={{
                                      uri: questionOptions[index].image.uri,
                                    }}
                                    useNativeControls
                                    resizeMode={ResizeMode.CONTAIN}
                                    isLooping
                                  />
                                )}
                              </View>
                            )}
                            <RichEditor
                              ref={editorRef}
                              style={{
                                marginTop: 20,
                                borderRadius: 14,
                              }}
                              initialContentHTML={"<br/><br/>"}
                              onChange={(content) => {
                                let _questionOptions = questionOptions;
                                _questionOptions[index].text = content;
                                setQuestionOptions([..._questionOptions]);
                              }}
                            />
                          </View>
                        </View>
                      </View>
                    )) : (
                      <View style={{padding: 14,
                        borderRadius: 14,
                        backgroundColor: Color.cardPrim2,
                        borderWidth: 1,
                        borderColor: Color.border,}}>
                          <View style={{flexDirection: "row", gap: 20, alignItems: "center"}}>
                          <TouchableOpacity
                              onPress={() => setFillInTheBlanksType("multiple")}
                              style={{
                                padding: 6,
                                backgroundColor: fillInTheBlanksType === "multiple"
                                  ? Color.blueButton
                                  : Color.textWhite,
                                borderRadius: 100,
                                borderWidth: 1,
                                borderColor: fillInTheBlanksType === "multiple"
                                  ? Color.blueButton
                                  : Color.buttonCardBg,
                              }}
                            >
                              <MaterialIcons
                                name="check"
                                size={18}
                                color={
                                  fillInTheBlanksType === "multiple"
                                    ? Color.textWhite
                                    : Color.buttonBg
                                }
                              />
                            </TouchableOpacity>
                            <Text style={{fontSize: FontSize.medium12pxMed_size, fontWeight: "600", color: Color.buttonBg}}>Multiple Input</Text>
                            <View style={{flexDirection: "row", gap: 10, alignItems: "center"}}>
                              <View style={{padding: 8, backgroundColor: Color.textWhite, borderRadius: 6}}>
                                <Text style={{fontSize: FontSize.medium12pxMed_size, fontWeight: "500", color: Color.buttonBg}}>2</Text>
                              </View>
                              <View style={{padding: 8, backgroundColor: Color.textWhite, borderRadius: 6}}>
                                <Text style={{fontSize: FontSize.medium12pxMed_size, fontWeight: "500", color: Color.buttonBg}}>2</Text>
                              </View>
                              <View style={{padding: 8, backgroundColor: Color.textWhite, borderRadius: 6}}>
                                <Text style={{fontSize: FontSize.medium12pxMed_size, fontWeight: "500", color: Color.buttonBg}}>2</Text>
                              </View>
                              <View style={{padding: 8, backgroundColor: Color.textWhite, borderRadius: 6}}>
                                <Text style={{fontSize: FontSize.medium12pxMed_size, fontWeight: "500", color: Color.buttonBg}}>2</Text>
                              </View>
                              <View style={{padding: 8, backgroundColor: Color.textWhite, borderRadius: 6}}>
                                <Text style={{fontSize: FontSize.medium12pxMed_size, fontWeight: "500", color: Color.buttonBg}}>2</Text>
                              </View>
                            </View>
                          </View>
                          <View style={{flexDirection: "row", gap: 20, alignItems: "center", marginTop: 20}}>
                          <TouchableOpacity
                              onPress={() => setFillInTheBlanksType("single")}
                              style={{
                                padding: 6,
                                backgroundColor: fillInTheBlanksType === "single"
                                  ? Color.blueButton
                                  : Color.textWhite,
                                borderRadius: 100,
                                borderWidth: 1,
                                borderColor: fillInTheBlanksType === "single"
                                  ? Color.blueButton
                                  : Color.buttonCardBg,
                              }}
                            >
                              <MaterialIcons
                                name="check"
                                size={18}
                                color={
                                  fillInTheBlanksType === "single"
                                    ? Color.textWhite
                                    : Color.buttonBg
                                }
                              />
                            </TouchableOpacity>
                            <Text style={{fontSize: FontSize.medium12pxMed_size, fontWeight: "600", color: Color.buttonBg}}>Single Input</Text>
                            <View style={{flexDirection: "row", gap: 10, alignItems: "center"}}>
                              <View style={{padding: 8, backgroundColor: Color.textWhite, borderRadius: 6}}>
                                <Text style={{fontSize: FontSize.medium12pxMed_size, fontWeight: "500", color: Color.buttonBg}}>How are You?</Text>
                              </View>
                            </View>
                          </View>
                      </View>
                    )}
                    { tab !== "fill in the blanks" && <TouchableOpacity
                      onPress={addEmptyOption}
                      activeOpacity={0.5}
                      style={{ flexDirection: "column", alignItems: "center" }}
                    >
                      <Ionicons
                        name="add-circle-sharp"
                        size={40}
                        color="black"
                      />
                    </TouchableOpacity>}

                    <View
                      style={{
                        padding: 14,
                        borderRadius: 14,
                        backgroundColor: Color.cardPrim2,
                        borderWidth: 1,
                        borderColor: Color.border,
                      }}
                    >
                      <Text
                        style={{
                          color: Color.buttonBg,
                          fontSize: FontSize.medium14pxMed_size,
                          fontWeight: "600",
                          marginBottom: 10,
                        }}
                      >
                        Ask for Explaination
                      </Text>
                      <View
                        style={{
                          flexDirection: "row",
                          gap: 10,
                          alignItems: "center",
                        }}
                      >
                        <Text
                          style={{
                            color: Color.textSecondary,
                            fontSize: FontSize.medium11pxMed_size,
                            fontWeight: "400",
                          }}
                        >
                          Students can upload images alongside their answer
                        </Text>
                        <Switch
                          trackColor={{ false: "#767577", true: "#81b0ff" }}
                          thumbColor={
                            askForExplaination ? "#f5dd4b" : "#f4f3f4"
                          }
                          ios_backgroundColor="#3e3e3e"
                          onValueChange={() =>
                            setAskForExplaination((prev: any) => !prev)
                          }
                          value={askForExplaination}
                        />
                      </View>
                    </View>

                    <View>
                      <Text
                        style={{
                          color: Color.buttonBg,
                          fontSize: FontSize.medium14pxMed_size,
                          fontWeight: "600",
                          marginBottom: 5,
                        }}
                      >
                        Solution (Optional)
                      </Text>
                      <Text
                        style={{
                          color: Color.textSecondary,
                          fontSize: FontSize.medium11pxMed_size,
                          fontWeight: "400",
                          marginBottom: 10,
                        }}
                      >
                        Students can upload images alongside their answer
                      </Text>
                      <View
                        style={{
                          padding: 14,
                          borderRadius: 14,
                          backgroundColor: Color.cardPrim2,
                          borderWidth: 1,
                          borderColor: Color.border,
                        }}
                      >
                        <View style={{ flexDirection: "row" }}>
                          <TouchableOpacity
                            style={{
                              padding: 6,
                              backgroundColor: Color.textWhite,
                              borderRadius: 100,
                              borderWidth: 1,
                              borderColor: Color.buttonCardBg,
                            }}
                          >
                            <AntDesign name="addfile" size={18} color="black" />
                          </TouchableOpacity>
                        </View>
                        <RichEditor
                          ref={editorRef}
                          style={{
                            marginTop: 10,
                            borderRadius: 14,
                          }}
                          initialContentHTML={"<br/><br/>"}
                          onChange={(content) => {
                            let _questionSolution = questionSolution;
                            _questionSolution.text = content;
                            setQuestionSolution({ ..._questionSolution });
                          }}
                        />
                      </View>
                    </View>

                    <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          gap: 10,
                        }}
                      >
                        <Text
                          style={{
                            fontSize: FontSize.medium12pxMed_size,
                            fontWeight: "600",
                            color: Color.buttonBg,
                          }}
                        >
                          Correct Points
                        </Text>
                        <View
                          style={{
                            borderRadius: 10,
                            gap: 10,
                            borderColor: Color.border,
                            borderWidth: 1,
                            paddingVertical: 5,
                            paddingHorizontal: 14,
                          }}
                        >
                          <TextInput
                            style={{
                              width: "100%",
                              fontSize: FontSize.medium11pxMed_size,
                            }}
                            value={correctValue}
                            keyboardType = 'numeric'
                            onChangeText={(text) => setCorrectValue(text)}
                          />
                        </View>
                      </View>

                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          gap: 10,
                        }}
                      >
                        <Text
                          style={{
                            fontSize: FontSize.medium12pxMed_size,
                            fontWeight: "600",
                            color: Color.buttonBg,
                          }}
                        >
                          Incorrect Points
                        </Text>
                        <View
                          style={{
                            borderRadius: 10,
                            gap: 10,
                            borderColor: Color.border,
                            borderWidth: 1,
                            paddingVertical: 5,
                            paddingHorizontal: 14,
                          }}
                        >
                          <TextInput
                            style={{
                              width: "100%",
                              fontSize: FontSize.medium11pxMed_size,
                            }}
                            value={incorrectValue}
                            keyboardType = 'numeric'
                            onChangeText={(text) => setIncorrectValue(text)}
                          />
                        </View>
                      </View>
                    </View>
                  </View>
                </>
              ) : (
                <TouchableOpacity
                  // onPress={}
                  activeOpacity={0.5}
                  style={{ flexDirection: "column", alignItems: "center" }}
                >
                  <Ionicons name="add-circle-sharp" size={40} color="black" />
                </TouchableOpacity>
              )}
            </View>
          )}
          style={{
            paddingHorizontal: 15,
            paddingTop: 20,
          }}
          showsVerticalScrollIndicator={false}
        />
        <View
          style={{
            width: "100%",
            padding: 20,
            bottom: 360,
            position: "absolute",
          }}
        >
          <TouchableOpacity
            onPress={handleCreateQuestion}
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
    </SafeAreaView>
  );
}
