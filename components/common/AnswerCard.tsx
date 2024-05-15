import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Color, FontSize } from "../../GlobalStyles";
import { TextInput } from "react-native-gesture-handler";
import { useCallback, useEffect, useRef, useState } from "react";
import { Image } from "expo-image";
import React from "react";
import { RichEditor } from "react-native-pell-rich-editor";

type AnswerType = "SCQ" | "MCQ" | "fillInTheBlanks";

type AnswerCardProps = {
  answerType: AnswerType;
  options: any;
  answerList: any;
  setAnswer?: any;
  questionId?: any;
};
const windowWidth = Dimensions.get("window").width;
const AnswerCard: React.FC<AnswerCardProps> = ({
  answerType,
  options,
  answerList,
  setAnswer,
  questionId = "",
}) => {
  const SingleCorrect = () => {
    let answerFound = answerList.current?.find(
      (item: any) => item.questionId === questionId
    );
    const [selected, setSelected] = useState(
      answerFound ? answerFound.answer : ""
    );
    const richTextEditor: any = useRef();

    useEffect(() => {
      // Update the answer ref
      const existingAnswerIndex = answerList.current.findIndex(
        (item: any) => item.questionId === questionId
      );

      const newAnswer = {
        questionId: questionId,
        answer: selected,
      };

      if (existingAnswerIndex !== -1) {
        // If the question ID exists, update the existing object
        answerList.current[existingAnswerIndex] = newAnswer;
      } else {
        // If the question ID doesn't exist, add the new answer object
        answerList.current.push(newAnswer);
      }
    }, [selected]);

    return (
      <View style={styles.cardContainer}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 15,
          }}
        >
          <Text style={{ fontWeight: "600", fontSize: 12 }}>
            Tap on Correct Answer
          </Text>
          <Text
            style={{
              color: Color.blueButton,
              textDecorationLine: "underline",
              fontSize: 12,
            }}
          >
            Single Correct
          </Text>
        </View>

        {options.map((item: any, idx: any) => (
          <TouchableOpacity key={idx} onPress={() => setSelected(item.text)}>
            {item.image && (
              <Image style={styles.cardImage} source={{ uri: item.image }} />
            )}
            {item.text && (
              <RichEditor
                disabled={true}
                ref={richTextEditor}
                editorStyle={{
                  ...styles.cardInfo,
                  backgroundColor:
                    selected === item.text ? "#5CA0F0" : "#ffffff",
                  color: selected === item.text ? "#ffffff" : "#000000",
                }}
                initialContentHTML={item.text} // Set initial HTML content
              />
            )}
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const styles = StyleSheet.create({
    cardContainer: {
      backgroundColor: "rgba(135, 206, 250, 0.1)",
      borderRadius: 20,
      padding: 20,
      marginBottom: 15,
    },
    cardImage: {
      height: 100, // Set height as per your requirement
      width: "100%",
    },
    cardInfo: {
      backgroundColor: "#ffffff",
      color: "#000000",
      fontSize: 11,
      paddingVertical: 10,
      paddingHorizontal: 10,
      borderRadius: 8,
      marginBottom: 10,
    },
  });

  const MultiCorrect = React.memo(({ options }: any) => {
    let answerFound = answerList.current?.find(
      (item: any) => item.questionId === questionId
    );
    const [selectedList, setSelectedList] = useState<any>(
      answerFound ? answerFound.answer.split(" ") : []
    );

    const handleSelect = useCallback(
      (idx: any) => {
        setSelectedList((prev: any) => {
          if (prev.includes(idx)) {
            return prev.filter((item: any) => item !== idx);
          } else {
            return [...prev, idx];
          }
        });
      },
      [setSelectedList]
    );

    useEffect(() => {
      // Update the answer ref
      const existingAnswerIndex = answerList.current.findIndex(
        (item: any) => item.questionId === questionId
      );

      const newAnswer = {
        questionId: questionId,
        answer: selectedList.join(" "),
      };

      if (existingAnswerIndex !== -1) {
        // If the question ID exists, update the existing object
        answerList.current[existingAnswerIndex] = newAnswer;
      } else {
        // If the question ID doesn't exist, add the new answer object
        answerList.current.push(newAnswer);
      }
    }, [selectedList]);

    return (
      <View style={styles.cardContainer}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 15,
          }}
        >
          <Text style={{ fontWeight: "600", fontSize: 12 }}>
            Tap on Correct Answer
          </Text>
          <Text
            style={{
              color: Color.blueButton,
              textDecorationLine: "underline",
              fontSize: 12,
            }}
          >
            Multiple Correct
          </Text>
        </View>
        {options.map((item: any, idx: any) => (
          <TouchableOpacity
            style={{ marginTop: 30 }}
            key={idx}
            onPress={() => handleSelect(item.text)}
          >
            {item.image && (
              <Image style={styles.cardImage} source={{ uri: item.image }} />
            )}
            {item.text && (
              <RichEditor
                disabled={true}
                initialContentHTML={item.text} // Set initial HTML content
                editorStyle={{
                  ...styles.cardInfo,
                  backgroundColor: selectedList.includes(item.text)
                    ? "#5CA0F0"
                    : "#ffffff",
                  color: selectedList.includes(idx) ? "#ffffff" : "#000000",
                }} // Style for the editor
                // Handle change event
              />
            )}
          </TouchableOpacity>
        ))}
      </View>
    );
  });

  const FillBlanksSingle = () => {
    let answerFound = answerList.current?.find(
      (item: any) => item.questionId === questionId
    );
    const [selected, setSelected] = useState("");

    // useEffect(() => {
    //   // Update the answer ref

    // }, [selected]);
    const styles = StyleSheet.create({
      cardContainer: {
        backgroundColor: "rgba(135, 206, 250, 0.1)",
        borderRadius: 20,
        padding: 20,
        marginBottom: 15,
      },
      input: {
        backgroundColor: "white",
        borderRadius: 10,
        padding: 10,
      },
    });
    return (
      <View style={styles.cardContainer}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 15,
          }}
        >
          <Text style={{ fontWeight: "600", fontSize: 12 }}>
            Enter Correct Answer
          </Text>
          <Text
            style={{
              color: Color.blueButton,
              textDecorationLine: "underline",
              fontSize: 12,
            }}
          >
            Fill in the Blanks
          </Text>
        </View>
        <View>
          <TextInput
            value={selected}
            onBlur={() => {
              const existingAnswerIndex = answerList.current.findIndex(
                (item: any) => item.questionId === questionId
              );

              const newAnswer = {
                questionId: questionId,
                answer: selected,
              };

              if (existingAnswerIndex !== -1) {
                // If the question ID exists, update the existing object
                answerList.current[existingAnswerIndex] = newAnswer;
              } else {
                // If the question ID doesn't exist, add the new answer object
                answerList.current.push(newAnswer);
              }
            }}
            onChangeText={(value: any) => setSelected(value)}
            style={styles.input}
          />
        </View>
      </View>
    );
  };

  const FillBlanksMulti = () => {
    const ANS_LENGTH = 6;
    const [inputValues, setInputValues] = useState(Array(ANS_LENGTH).fill(""));
    const inputRefs: any = useRef([]);
    const styles = StyleSheet.create({
      cardContainer: {
        backgroundColor: "rgba(135, 206, 250, 0.1)",
        borderRadius: 20,
        padding: 20,
        marginBottom: 15,
      },
      input: {
        backgroundColor: "white",
        borderRadius: 10,
        padding: 10,
        flexGrow: 1,
      },
      inputContainer: {
        flexDirection: "row",
        gap: 3,
        flexWrap: ANS_LENGTH <= 6 ? "nowrap" : "wrap",
      },
    });

    const handleInputChange = (index: any, value: any) => {
      const newInputValues = [...inputValues];
      newInputValues[index] = value;
      setInputValues(newInputValues);

      // Move focus to the next input field
      if (value.length === 1 && index < ANS_LENGTH - 1) {
        inputRefs.current[index + 1].focus();
      }
    };
    const renderInputs = () => {
      const inputs = [];
      for (let i = 0; i < ANS_LENGTH; i++) {
        inputs.push(
          <View
            key={i}
            style={{
              width: `${100 / (ANS_LENGTH <= 6 ? ANS_LENGTH : 6)}%`,
            }}
          >
            <TextInput
              ref={(ref) => (inputRefs.current[i] = ref)}
              style={[styles.input]}
              value={inputValues[i]}
              onChangeText={(text) => handleInputChange(i, text)}
              maxLength={1}
            />
          </View>
        );
      }
      return inputs;
    };

    const handleSubmit = () => {
      console.log("Input Values:", inputValues.join(""));
    };

    return (
      <View style={styles.cardContainer}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 15,
          }}
        >
          <Text style={{ fontWeight: "600", fontSize: 12 }}>
            Enter Correct Answer
          </Text>
          <Text
            style={{
              color: "blue",
              textDecorationLine: "underline",
              fontSize: 12,
            }}
          >
            Fill in the Blanks
          </Text>
        </View>
        <View style={styles.inputContainer}>{renderInputs()}</View>
      </View>
    );
  };

  switch (answerType) {
    case "MCQ":
      return (
        <View>
          <MultiCorrect options={options} />
        </View>
      );
    case "SCQ":
      return (
        <View>
          <SingleCorrect />
        </View>
      );
    case "fillInTheBlanks":
      return (
        <View>
          <FillBlanksSingle />
        </View>
      );
  }
};
export default AnswerCard;

const styles = StyleSheet.create({
  cardDetails: {
    marginTop: 10,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: FontSize.medium14pxMed_size,
    fontWeight: "600",
    color: Color.textPrim,
  },
  cardInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginBottom: 10,
    marginLeft: "auto",
    marginRight: "auto",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: "#ffffff",
    textAlign: "center",
    fontSize: 11,
  },
  cardContainer: {
    backgroundColor: "rgba(135, 206, 250, 0.1)",
    borderRadius: 20,
    padding: 20,
    marginBottom: 15,
  },
  cardImage: {
    height: windowWidth * (50 / 100),
    width: "100%",
    borderRadius: 8,
  },
});
