import {
  Dimensions,
  FlatList,
  ImageBackground,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Switch,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Color, FontSize } from "../../GlobalStyles";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Video, ResizeMode } from "expo-av";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useContext, useEffect, useRef, useState } from "react";
import { addVideo, handleUpdateVideo } from "../../utils/api/video";
import { DataContext } from "../../contexts/DataContext";
import { AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { DataContextType } from "../../types/context";
import { uploadFiles } from "../../utils/api/upload";
import { getAllQuestions, handleAddQuestions } from "../../utils/api/question";
import { RichEditor, RichToolbar } from "react-native-pell-rich-editor";
import { QuestionType } from "../../types/questions";
import MathJax from "react-native-mathjax";

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

interface QuestionOptionType {
  text: string;
  image: any;
}

export default function AddVideo({ navigation }: any) {
  const {
    selectedChapter,
    selectedVideoData,
    selectedAssignment,
    setSelectedVideo,
  } = useContext(DataContext) as DataContextType;
  const [status, setStatus] = useState({});
  const video = useRef(null);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [currSelectedVideo, setCurrSelectedVideo] = useState<any>(null);
  const [component, setComponent] = useState("video");
  const [resources, setResources] = useState<string[]>([]);
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
  const [allQuestions, setAllQuestions] = useState<QuestionType[]>([]);
  const [selectedCurrQuestionIdx, setSelectedCurrQuestionIdx] = useState(-1);
  const [questionTimer, setQuestionTimer] = useState("");
  const [proVideo, setProVideo] = useState(false);
  const [randomQuestions, setRandomQuestions] = useState(false);
  const editorRef = useRef(null);

  const handleProceed = async () => {
    if (!selectedChapter || !video || !title || !desc) {
      return;
    }
    if (
      selectedVideoData &&
      selectedVideoData.videoTitle === title &&
      selectedVideoData.videoDescription === desc &&
      selectedVideoData.videoResources.length === resources.length
    ) {
      setComponent("question");
      return;
    }
    const _arr = currSelectedVideo.split(".");
    const lastElement = _arr.pop();

    var file: any = {
      uri: currSelectedVideo,
      type: "video/" + lastElement,
      name: "video." + lastElement,
    };
    const res: any = await uploadFiles(file);
    console.log("res: ", res);
    let url = "";
    if (res && res?.data?.urls) {
      url = res.data.urls[0];
    }
    const data = JSON.stringify({
      videoType: proVideo ? "pro" : "basic",
      questionRandom: String(randomQuestions),
      chapterId: selectedChapter?._id,
      videoTitle: title,
      videoUrl: url,
      videoThumbnail: "videoimage",
      videoDescription: desc,
      videoResources: resources,
    });
    console.log("data: ", data);
    if (selectedVideoData) {
      await handleUpdateVideo(data, selectedVideoData._id);
      setComponent("question");
    } else {
      await addVideo(data);
      navigation.goBack();
    }
  };

  const handleUploadResources = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      quality: 0.1,
    });

    console.log(result);

    if (!result.canceled) {
      let _resources = resources;
      result.assets.map(async (item) => {
        const _arr = item.uri.split(".");
        const lastElement = _arr.pop();
        let fileToUpload: any = {
          uri: item.uri,
          type: item.type + "/" + lastElement,
          name: item.type + "." + lastElement,
        };
        console.log("file to upload: ", fileToUpload);
        console.log("uploading files....");
        const res: any = await uploadFiles(fileToUpload);
        if (res && res?.data?.urls) {
          _resources = [..._resources, ...res.data?.urls];
          setResources([..._resources]);
          console.log(
            "updated resources: ",
            _resources,
            [..._resources, ...res.data?.urls],
            resources
          );
        }
      });
    }
  };

  const handlePickVideo = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      quality: 0.1,
    });

    console.log(result);

    if (!result.canceled) {
      setCurrSelectedVideo(result.assets[0].uri);
    }
  };

  const removeItemFromResources = (index: number) => {
    let _resources = resources;
    _resources.splice(index, 1);
    setResources([..._resources]);
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
      setFile(result.assets[0]);
      console.log(result.assets[0].type);
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
      _questionOptions[index].image = result.assets[0];
      setQuestionOptions([..._questionOptions]);
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
      image: "",
    });
  });

  const handleCreateQuestion = async () => {
    if (!selectedChapter || !selectedVideoData) {
      return;
    }
    let data = JSON.stringify({
      videoId: selectedVideoData?._id,
      questionType: tab,
      answerType: answerType,
      questionLevel: level,
      question: {
        text: questionText,
        image: "",
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
    fetchAllQuestions();
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

  const fetchAllQuestions = () => {
    if (!selectedVideoData) {
      return;
    }
    getAllQuestions(
      selectedVideoData?._id,
      10,
      0,
      "asc",
      10,
      setAllQuestions,
      "videoId"
    );
  };

  useEffect(() => {
    if (selectedVideoData) {
      setTitle(selectedVideoData.videoTitle);
      setDesc(selectedVideoData.videoDescription);
      setResources([...selectedVideoData.videoResources]);
      setRandomQuestions(
        selectedVideoData.questionRandom === "true" ? true : false
      );
      setProVideo(selectedVideoData.videoType !== "basic" ? true : false);
    }
  }, []);

  useEffect(() => {
    fetchAllQuestions();
  }, [selectedAssignment]);

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
                Upload
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
            <View
              style={{
                flexDirection: "column",
                gap: 20,
                paddingBottom: 400,
              }}
            >
              {component === "question" ? (
                <>
                  <View>
                    {selectedVideoData && (
                      <Video
                        ref={video}
                        style={{
                          width: "100%",
                          height: 200,
                        }}
                        source={{
                          uri: selectedVideoData?.videoUrl,
                        }}
                        useNativeControls
                        resizeMode={ResizeMode.CONTAIN}
                        isLooping
                        onPlaybackStatusUpdate={(status) =>
                          setStatus(() => status)
                        }
                      />
                    )}
                  </View>
                  <View
                    style={{
                      paddingVertical: 20,
                      display: "flex",
                      flexDirection: "row",
                      flexWrap: "wrap",
                      gap: 10,
                    }}
                  >
                    {allQuestions.map((item, index) => (
                      <TouchableOpacity
                        key={index}
                        activeOpacity={0.5}
                        onPress={() => setSelectedCurrQuestionIdx(index)}
                        style={{
                          padding: 7,
                          borderWidth: 1,
                          borderColor: Color.border,
                          borderRadius: 6,
                        }}
                      >
                        <Text
                          style={{
                            fontWeight: "500",
                            fontSize: FontSize.medium11pxMed_size,
                            color: Color.borderColor,
                          }}
                        >
                          {index + 1}
                        </Text>
                      </TouchableOpacity>
                    ))}
                    {allQuestions.length === 0 && (
                      <Text style={{ fontSize: FontSize.medium12pxMed_size }}>
                        No Questions here
                      </Text>
                    )}
                  </View>
                  {selectedCurrQuestionIdx !== -1 ? (
                    <View>
                      <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={() => setSelectedCurrQuestionIdx(-1)}
                        style={{
                          width: "100%",
                          backgroundColor: Color.buttonBg,
                          paddingVertical: 10,
                          borderRadius: 100,
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
                          Add Questions
                        </Text>
                      </TouchableOpacity>
                      <View style={{
                        marginTop: 20
                      }}>
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
                              marginBottom: 20,
                            }}
                          >
                            {
                              <Image
                                source={{
                                  uri: "https://images.pexels.com/photos/356079/pexels-photo-356079.jpeg?cs=srgb&dl=pexels-pixabay-356079.jpg&fm=jpg",
                                }}
                                style={{
                                  width: "100%",
                                  borderRadius: 14,
                                  height: 200,
                                  marginTop: 20,
                                }}
                              />
                            }
                            {/* {file.type === "video" && (
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
                              )} */}
                          </View>
                          <MathJax
                            mathJaxOptions={mmlOptions}
                            html={
                              allQuestions[selectedCurrQuestionIdx].question
                                .text
                            }
                          />
                        </View>

                        <Text
                          style={{
                            fontSize: FontSize.medium12pxMed_size,
                            marginVertical: 20,
                            fontWeight: "600",
                          }}
                        >
                          Options
                        </Text>

                        {allQuestions[selectedCurrQuestionIdx].options.map(
                          (item, index) => (
                            <View
                              key={index}
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
                                  marginBottom: 20,
                                }}
                              >
                                {
                                  <Image
                                    source={{
                                      uri: "https://images.pexels.com/photos/356079/pexels-photo-356079.jpeg?cs=srgb&dl=pexels-pixabay-356079.jpg&fm=jpg",
                                    }}
                                    style={{
                                      width: "100%",
                                      borderRadius: 14,
                                      height: 200,
                                      marginTop: 20,
                                    }}
                                  />
                                }
                                {/* {file.type === "video" && (
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
                              )} */}
                              </View>
                              <MathJax
                                mathJaxOptions={mmlOptions}
                                html={item.text}
                              />
                            </View>
                          )
                        )}
                      </View>
                    </View>
                  ) : (
                    <>
                      <View
                        style={{
                          borderRadius: 14,
                          gap: 10,
                          backgroundColor: Color.cardPrim2,
                          padding: 20,
                        }}
                      >
                        {randomQuestions ? (
                          <>
                            <View
                              style={{
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                              }}
                            >
                              <Text
                                style={{
                                  color: Color.buttonBg,
                                  fontSize: FontSize.medium12pxMed_size,
                                  fontWeight: "600",
                                  marginBottom: 10,
                                }}
                              >
                                Ask Answers
                              </Text>
                              <Text
                                style={{
                                  color: Color.buttonBg,
                                  fontSize: FontSize.medium12pxMed_size,
                                  fontWeight: "600",
                                  marginBottom: 10,
                                }}
                              >
                                hh-mm-ss
                              </Text>
                            </View>
                            <Text
                              style={{
                                color: Color.textSecondary,
                                fontSize: FontSize.medium11pxMed_size,
                                fontWeight: "400",
                              }}
                            >
                              Question will popup randomly after mentioned time
                              slot. Format should be hour-minute-second
                            </Text>

                            <View
                              style={{
                                borderRadius: 10,
                                gap: 10,
                                backgroundColor: Color.textWhite,
                                borderColor: Color.border,
                                borderWidth: 1,
                                paddingVertical: 10,
                                paddingHorizontal: 14,
                              }}
                            >
                              <TextInput
                                style={{
                                  width: "100%",
                                  fontSize: FontSize.medium12pxMed_size,
                                }}
                                placeholder="hh-mm-ss"
                                value={questionTimer}
                                onChangeText={(text) => setQuestionTimer(text)}
                              />
                            </View>
                          </>
                        ) : null}
                        <Text
                          style={{
                            color: Color.buttonBg,
                            fontSize: FontSize.medium12pxMed_size,
                            fontWeight: "600",
                          }}
                        >
                          Select Question Type
                        </Text>
                        <Text
                          style={{
                            color: Color.textSecondary,
                            fontSize: FontSize.medium11pxMed_size,
                            fontWeight: "400",
                          }}
                        >
                          Select question type for this time slot.
                        </Text>
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                            gap: 5,
                            marginTop: 20,
                          }}
                        >
                          <TouchableOpacity
                            onPress={() => setTab("MCQ")}
                            activeOpacity={0.5}
                            style={{
                              padding: 8,
                              backgroundColor:
                                tab === "MCQ"
                                  ? Color.buttonBg
                                  : Color.textWhite,
                              borderRadius: 34,
                            }}
                          >
                            <Text
                              style={{
                                color:
                                  tab === "MCQ"
                                    ? Color.textWhite
                                    : Color.buttonBg,
                                fontSize: FontSize.medium12pxMed_size,
                                fontWeight: "500",
                              }}
                            >
                              Multiple Choice
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
                                tab === "MSQ"
                                  ? Color.buttonBg
                                  : Color.textWhite,
                              borderRadius: 34,
                            }}
                          >
                            <Text
                              style={{
                                color:
                                  tab === "MSQ"
                                    ? Color.textWhite
                                    : Color.buttonBg,
                                fontSize: FontSize.medium12pxMed_size,
                                fontWeight: "500",
                              }}
                            >
                              Multi Correct
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
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
                          style={{
                            flexDirection: "column",
                            gap: 20,
                            marginTop: 20,
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
                            Add Answers
                          </Text>
                          {tab !== "fill in the blanks" ? (
                            questionOptions.map((item, index) => (
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
                                            onPress={() =>
                                              optionFileRemove(index)
                                            }
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
                                              uri: questionOptions[index].image
                                                .uri,
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
                                              uri: questionOptions[index].image
                                                .uri,
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
                                        setQuestionOptions([
                                          ..._questionOptions,
                                        ]);
                                      }}
                                    />
                                  </View>
                                </View>
                              </View>
                            ))
                          ) : (
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
                                  gap: 20,
                                  alignItems: "center",
                                }}
                              >
                                <TouchableOpacity
                                  onPress={() =>
                                    setFillInTheBlanksType("multiple")
                                  }
                                  style={{
                                    padding: 6,
                                    backgroundColor:
                                      fillInTheBlanksType === "multiple"
                                        ? Color.blueButton
                                        : Color.textWhite,
                                    borderRadius: 100,
                                    borderWidth: 1,
                                    borderColor:
                                      fillInTheBlanksType === "multiple"
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
                                <Text
                                  style={{
                                    fontSize: FontSize.medium12pxMed_size,
                                    fontWeight: "600",
                                    color: Color.buttonBg,
                                  }}
                                >
                                  Multiple Input
                                </Text>
                                <View
                                  style={{
                                    flexDirection: "row",
                                    gap: 10,
                                    alignItems: "center",
                                  }}
                                >
                                  <View
                                    style={{
                                      padding: 8,
                                      backgroundColor: Color.textWhite,
                                      borderRadius: 6,
                                    }}
                                  >
                                    <Text
                                      style={{
                                        fontSize: FontSize.medium12pxMed_size,
                                        fontWeight: "500",
                                        color: Color.buttonBg,
                                      }}
                                    >
                                      2
                                    </Text>
                                  </View>
                                  <View
                                    style={{
                                      padding: 8,
                                      backgroundColor: Color.textWhite,
                                      borderRadius: 6,
                                    }}
                                  >
                                    <Text
                                      style={{
                                        fontSize: FontSize.medium12pxMed_size,
                                        fontWeight: "500",
                                        color: Color.buttonBg,
                                      }}
                                    >
                                      2
                                    </Text>
                                  </View>
                                  <View
                                    style={{
                                      padding: 8,
                                      backgroundColor: Color.textWhite,
                                      borderRadius: 6,
                                    }}
                                  >
                                    <Text
                                      style={{
                                        fontSize: FontSize.medium12pxMed_size,
                                        fontWeight: "500",
                                        color: Color.buttonBg,
                                      }}
                                    >
                                      2
                                    </Text>
                                  </View>
                                  <View
                                    style={{
                                      padding: 8,
                                      backgroundColor: Color.textWhite,
                                      borderRadius: 6,
                                    }}
                                  >
                                    <Text
                                      style={{
                                        fontSize: FontSize.medium12pxMed_size,
                                        fontWeight: "500",
                                        color: Color.buttonBg,
                                      }}
                                    >
                                      2
                                    </Text>
                                  </View>
                                  <View
                                    style={{
                                      padding: 8,
                                      backgroundColor: Color.textWhite,
                                      borderRadius: 6,
                                    }}
                                  >
                                    <Text
                                      style={{
                                        fontSize: FontSize.medium12pxMed_size,
                                        fontWeight: "500",
                                        color: Color.buttonBg,
                                      }}
                                    >
                                      2
                                    </Text>
                                  </View>
                                </View>
                              </View>
                              <View
                                style={{
                                  flexDirection: "row",
                                  gap: 20,
                                  alignItems: "center",
                                  marginTop: 20,
                                }}
                              >
                                <TouchableOpacity
                                  onPress={() =>
                                    setFillInTheBlanksType("single")
                                  }
                                  style={{
                                    padding: 6,
                                    backgroundColor:
                                      fillInTheBlanksType === "single"
                                        ? Color.blueButton
                                        : Color.textWhite,
                                    borderRadius: 100,
                                    borderWidth: 1,
                                    borderColor:
                                      fillInTheBlanksType === "single"
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
                                <Text
                                  style={{
                                    fontSize: FontSize.medium12pxMed_size,
                                    fontWeight: "600",
                                    color: Color.buttonBg,
                                  }}
                                >
                                  Single Input
                                </Text>
                                <View
                                  style={{
                                    flexDirection: "row",
                                    gap: 10,
                                    alignItems: "center",
                                  }}
                                >
                                  <View
                                    style={{
                                      padding: 8,
                                      backgroundColor: Color.textWhite,
                                      borderRadius: 6,
                                    }}
                                  >
                                    <Text
                                      style={{
                                        fontSize: FontSize.medium12pxMed_size,
                                        fontWeight: "500",
                                        color: Color.buttonBg,
                                      }}
                                    >
                                      How are You?
                                    </Text>
                                  </View>
                                </View>
                              </View>
                            </View>
                          )}
                          {tab !== "fill in the blanks" && (
                            <TouchableOpacity
                              onPress={addEmptyOption}
                              activeOpacity={0.5}
                              style={{
                                flexDirection: "column",
                                alignItems: "center",
                              }}
                            >
                              <Ionicons
                                name="add-circle-sharp"
                                size={40}
                                color="black"
                              />
                            </TouchableOpacity>
                          )}

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
                                Students can upload images alongside their
                                answer
                              </Text>
                              <Switch
                                trackColor={{
                                  false: "#767577",
                                  true: "#81b0ff",
                                }}
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
                                  <AntDesign
                                    name="addfile"
                                    size={18}
                                    color="black"
                                  />
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

                          <View
                            style={{
                              flexDirection: "row",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
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
                                  keyboardType="numeric"
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
                                  keyboardType="numeric"
                                  onChangeText={(text) =>
                                    setIncorrectValue(text)
                                  }
                                />
                              </View>
                            </View>
                          </View>
                        </View>
                      </>

                      <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={handleCreateQuestion}
                        style={{
                          width: "100%",
                          backgroundColor: Color.buttonBg,
                          paddingVertical: 10,
                          borderRadius: 100,
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
                    </>
                  )}
                </>
              ) : (
                <>
                  <View
                    style={{
                      borderRadius: 10,
                      gap: 10,
                      borderColor: Color.border,
                      borderWidth: 1,
                      paddingVertical: 10,
                      paddingHorizontal: 14,
                    }}
                  >
                    <TextInput
                      style={{
                        width: "100%",
                        fontSize: FontSize.medium12pxMed_size,
                      }}
                      placeholder="Title"
                      value={title}
                      onChangeText={(text) => setTitle(text)}
                    />
                  </View>
                  <View>
                    {currSelectedVideo ? (
                      <Video
                        ref={video}
                        style={{
                          width: "100%",
                          height: 200,
                        }}
                        source={{
                          uri: currSelectedVideo,
                        }}
                        useNativeControls
                        resizeMode={ResizeMode.CONTAIN}
                        isLooping
                        onPlaybackStatusUpdate={(status) =>
                          setStatus(() => status)
                        }
                      />
                    ) : (
                      <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={handlePickVideo}
                        style={{
                          flexDirection: "column",
                          width: "100%",
                          padding: 40,
                          alignItems: "center",
                          justifyContent: "center",
                          borderRadius: 20,
                          borderColor: Color.border,
                          borderWidth: 1,
                        }}
                      >
                        <Text style={{ fontSize: FontSize.medium14pxMed_size }}>
                          Pick Video
                        </Text>
                      </TouchableOpacity>
                    )}
                    {currSelectedVideo && (
                      <View
                        style={{
                          flexDirection: "column",
                          alignItems: "flex-end",
                          width: "100%",
                          marginTop: 10,
                        }}
                      >
                        <TouchableOpacity
                          activeOpacity={0.5}
                          onPress={() => setCurrSelectedVideo(null)}
                          style={{
                            flexDirection: "row",
                            gap: 10,
                            alignItems: "center",
                          }}
                        >
                          <Text
                            style={{
                              fontSize: FontSize.medium12pxMed_size,
                              color: Color.buttonBg,
                              fontWeight: "500",
                            }}
                          >
                            Remove
                          </Text>
                          <MaterialIcons
                            name="delete"
                            size={24}
                            color="black"
                          />
                        </TouchableOpacity>
                      </View>
                    )}
                  </View>
                  <View
                    style={{
                      borderRadius: 10,
                      gap: 10,
                      borderColor: Color.border,
                      borderWidth: 1,
                      paddingVertical: 10,
                      paddingHorizontal: 14,
                    }}
                  >
                    <TextInput
                      style={{
                        width: "100%",
                        fontSize: FontSize.medium12pxMed_size,
                      }}
                      placeholder="Description"
                      value={desc}
                      onChangeText={(text) => setDesc(text)}
                    />
                  </View>

                  <View
                    style={{
                      borderRadius: 10,
                      borderColor: Color.border,
                      borderWidth: 1,
                      padding: 20,
                    }}
                  >
                    <Text
                      style={{
                        color: Color.buttonBg,
                        fontSize: FontSize.medium12pxMed_size,
                        fontWeight: "600",
                      }}
                    >
                      Add File (Supports PDF, Work File only)
                    </Text>
                    <TouchableOpacity
                      onPress={handleUploadResources}
                      activeOpacity={0.5}
                      style={{
                        flexDirection: "column",
                        alignItems: "center",
                        marginVertical: 20,
                      }}
                    >
                      <Ionicons
                        name="add-circle-sharp"
                        size={40}
                        color="black"
                      />
                    </TouchableOpacity>
                    <Text
                      style={{
                        color: Color.buttonBg,
                        fontSize: FontSize.medium12pxMed_size,
                        fontWeight: "600",
                      }}
                    >
                      Resources
                    </Text>
                    <View
                      style={{
                        flexDirection: "column",
                        gap: 20,
                        marginTop: 14,
                      }}
                    >
                      {resources.map((item, index) => (
                        <View
                          key={index}
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <Text
                            style={{
                              color: Color.buttonBg,
                              fontSize: FontSize.medium11pxMed_size,
                              fontWeight: "500",
                            }}
                          >
                            {item}
                          </Text>
                          <TouchableOpacity
                            onPress={() => removeItemFromResources(index)}
                            activeOpacity={0.5}
                          >
                            <MaterialIcons
                              name="delete"
                              size={20}
                              color="black"
                            />
                          </TouchableOpacity>
                        </View>
                      ))}
                    </View>
                  </View>

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
                      Force Correct Answers
                    </Text>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={{
                          color: Color.textSecondary,
                          fontSize: FontSize.medium11pxMed_size,
                          fontWeight: "400",
                          width: "75%",
                        }}
                      >
                        Force ask answers to student when playing video. Video
                        will play only when correct answers are given.
                      </Text>
                      <Switch
                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                        thumbColor={proVideo ? "#f5dd4b" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={() => setProVideo((prev: any) => !prev)}
                        value={proVideo}
                      />
                    </View>
                  </View>

                  {proVideo ? (
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
                        Show Questions Randomly
                      </Text>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Text
                          style={{
                            color: Color.textSecondary,
                            fontSize: FontSize.medium11pxMed_size,
                            fontWeight: "400",
                            width: "75%",
                          }}
                        >
                          do you want questions to be shown as random?
                        </Text>
                        <Switch
                          trackColor={{ false: "#767577", true: "#81b0ff" }}
                          thumbColor={randomQuestions ? "#f5dd4b" : "#f4f3f4"}
                          ios_backgroundColor="#3e3e3e"
                          onValueChange={() =>
                            setRandomQuestions((prev: any) => !prev)
                          }
                          value={randomQuestions}
                        />
                      </View>
                    </View>
                  ) : null}
                  <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={handleProceed}
                    style={{
                      width: "100%",
                      backgroundColor: Color.buttonBg,
                      paddingVertical: 10,
                      borderRadius: 100,
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
                </>
              )}
            </View>
          )}
          style={{
            paddingHorizontal: 15,
            paddingTop: 20,
          }}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
}
