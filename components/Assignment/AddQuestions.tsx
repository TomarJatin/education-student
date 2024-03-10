import {
  Dimensions,
  FlatList,
  ImageBackground,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Color, FontSize } from "../../GlobalStyles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useContext, useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Image } from "expo-image";
import { AssignmentsType } from "../../types/assignments";
import { DataContext } from "../../contexts/DataContext";
import { DataContextType } from "../../types/context";
import { getAllAssignments } from "../../utils/api/assignments";
import { QuestionType } from "../../types/questions";
import { getAllQuestions } from "../../utils/api/question";
import MathJax from "react-native-mathjax";
import DraggableFlatList, {
  ScaleDecorator,
  RenderItemParams,
} from "react-native-draggable-flatlist";

interface AddQuestionsProps {
  navigation: any;
  setOpen: any;
  fetchAllQuestions: any;
  allQuestions: QuestionType[];
  setAllQuestions: any;
  selectedCurrQuestionIdx: number;
  setSelectedCurrQuestionIdx: any;
}

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

export default function AddQuestions({
  navigation,
  setOpen,
  fetchAllQuestions,
  allQuestions,
  selectedCurrQuestionIdx,
  setSelectedCurrQuestionIdx,
  setAllQuestions,
}: AddQuestionsProps) {
  const { selectedAssignment } = useContext(DataContext) as DataContextType;

  // const renderItem = ({
  //   item,
  //   drag,
  //   isActive,
  // }: RenderItemParams<QuestionType>) => {
  //   return (
  //     <ScaleDecorator>
        
  //     </ScaleDecorator>
  //   );
  // };

  useEffect(() => {
    fetchAllQuestions();
  }, []);

  return (
    <View>
      {/* Create Card */}
      <View
        style={{
          padding: 20,
          borderRadius: 20,
          borderColor: Color.border,
          borderWidth: 1,
          marginTop: 20,
        }}
      >
        <View>
          <Text
            style={{
              color: Color.buttonBg,
              fontSize: FontSize.medium14pxMed_size,
              fontWeight: "600",
              marginBottom: 10,
            }}
          >
            Add Questions
          </Text>
        </View>
        <Text
          style={{
            color: Color.textSecondary,
            fontSize: FontSize.medium11pxMed_size,
            fontWeight: "400",
            marginBottom: 20,
          }}
        >
          Add thumbnail for better visibility. Students may find them appealing.
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.navigate("AddQuestion")}
            activeOpacity={0.5}
            style={{
              flexDirection: "row",
              gap: 10,
              alignItems: "center",
              paddingHorizontal: 30,
              paddingVertical: 10,
              backgroundColor: Color.buttonBg,
              borderRadius: 100,
            }}
          >
            <Text
              style={{
                color: Color.textWhite,
                fontSize: FontSize.medium12pxMed_size,
                fontWeight: "500",
              }}
            >
              Add
            </Text>
            <MaterialCommunityIcons
              name="pencil-outline"
              size={16}
              color="white"
            />
          </TouchableOpacity>
        </View>
      </View>

      <View
        style={{
          borderColor: Color.border,
          borderBottomWidth: 1,
          paddingVertical: 20,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text
          style={{ fontWeight: "500", fontSize: FontSize.medium14pxMed_size }}
        >
          Assignments{" "}
          {selectedCurrQuestionIdx !== -1 && selectedCurrQuestionIdx + 1 + " Q"}
        </Text>
        <TouchableOpacity activeOpacity={0.5}>
          <MaterialIcons name="more-vert" size={24} color="black" />
        </TouchableOpacity>
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

      {selectedCurrQuestionIdx !== -1 && (
        <View>
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
              html={allQuestions[selectedCurrQuestionIdx].question.text}
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

          {allQuestions[selectedCurrQuestionIdx].options.map((item, index) => (
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
              <MathJax mathJaxOptions={mmlOptions} html={item.text} />
            </View>
          ))}
        </View>
      )}
    </View>
  );
}
