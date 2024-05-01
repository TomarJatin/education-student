import { View, Text, StyleSheet, Button, TouchableOpacity } from "react-native";
import { Color, FontSize } from "../../GlobalStyles";
import { TextInput } from "react-native-gesture-handler";
import { useRef, useState } from "react";

type AnswerType = "SingleCorrect" | "MultiCorrect" | "FillBlanks";

type AnswerCardProps = {
  answerType: AnswerType;
};
const AnswerCard: React.FC<AnswerCardProps> = () => {
  const [selected, setSelected] = useState();
  const SingleCorrect = () => {
    const choiceList = [
      {
        id: 1,
        value:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
      },
      {
        id: 2,
        value:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
      },
      {
        id: 3,
        value:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
      },
      {
        id: 4,
        value:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
      },
    ];
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
        {choiceList.map((item, idx: any) => (
          <TouchableOpacity key={idx} onPress={() => setSelected(idx)}>
            <Text
              style={{
                ...styles.cardInfo,
                backgroundColor: selected === idx ? "#5CA0F0" : "#ffffff",
                color: selected === idx ? "#ffffff" : "#000000",
              }}
            >
              {item.value}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };
  const MultiCorrect = () => {
    const [selectedList, setSelectedList] = useState<any>([]);
    const choiceList = [
      {
        id: 1,
        value:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
      },
      {
        id: 2,
        value:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
      },
      {
        id: 3,
        value:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
      },
      {
        id: 4,
        value:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
      },
    ];
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
            MultiCorrect Correct
          </Text>
        </View>
        {choiceList.map((item, idx: any) => (
          <TouchableOpacity
            key={idx}
            onPress={() =>
              setSelectedList((prev: any) => {
                if (prev.includes(idx)) {
                  return prev.filter((item: any) => item != idx);
                } else {
                  return [...prev, idx];
                }
              })
            }
          >
            <Text
              style={{
                ...styles.cardInfo,
                backgroundColor: selectedList.includes(idx)
                  ? "#5CA0F0"
                  : "#ffffff",
                color: selectedList.includes(idx) ? "#ffffff" : "#000000",
              }}
            >
              {item.value}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const FillBlanksSingle = () => {
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
          <TextInput style={styles.input} />
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

  return (
    <View>
      <SingleCorrect />
      <MultiCorrect />
      <FillBlanksMulti />
      <FillBlanksSingle />
    </View>
  );
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
});
