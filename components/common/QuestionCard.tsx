import { View, Text, Pressable, StyleSheet, Dimensions } from "react-native";
import { Image } from "expo-image";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Color, FontSize } from "../../GlobalStyles";
import { TouchableOpacity } from "react-native-gesture-handler";

type QuestionCardProps = {
  imgSrc: string | undefined;
  cardTitle: string | undefined;
  cardTime?: string | undefined;
  question: string | undefined;
  explaination: boolean | undefined;
  action?: () => void;
};
const windowWidth = Dimensions.get("window").width;
const QuestionCard: React.FC<QuestionCardProps> = ({
  action,
  imgSrc,
  cardTitle,
  cardTime,
  question,
  explaination = true,
}) => {
  const [explainationPopup, setExplainationPopup] = useState(false);
  function toggleExplainationPopup() {
    setExplainationPopup(!explainationPopup);
  }
  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardDetails}>
        <Text style={styles.cardTitle}>{cardTitle}</Text>
        {/* <Text style={styles.cardTime}>{cardTime}</Text> */}
      </View>
      <View style={styles.card}>
        <Image
          style={styles.cardImage}
          source={require("../../assets/banner.png")}
        />
        <View style={styles.infoContainer}>
          <TouchableOpacity onPress={toggleExplainationPopup}>
            <View style={styles.info}>
              <MaterialIcons name="error" size={20} color="red" />
            </View>
          </TouchableOpacity>
        </View>
        {explainationPopup && (
          <View style={styles.imageInfoPopupContainer}>
            <Text style={styles.imageInfoPopupTitle}>Explaination Needed</Text>
            <View style={styles.imageInfoPopupContent}>
              <View
                style={{
                  backgroundColor: "#ffff",
                  borderRadius: 50,
                  padding: 5,
                  borderWidth: 1,
                  borderColor: "#F4F4F4",
                  alignSelf: "center",
                }}
              >
                <MaterialIcons name="error" size={20} color="red" />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  padding: 1,
                  width: "70%",
                }}
              >
                <Text style={{ fontSize: 11 }}>
                  Lorem ipsum dipsum vipsum lipsum gipsum Lorem ipsum dipsum
                  vipsum lipsum gipsum Lorem ipsum dipsum vipsum Lorem ipsum
                </Text>
              </View>
            </View>
          </View>
        )}
      </View>
      <Text style={styles.cardInfo}>{question}</Text>
      {/* <Pressable onPress={action} style={styles.startButton}>
        <MaterialIcons name="navigate-next" size={24} color="white" />
      </Pressable> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  backButton: {
    paddingHorizontal: 15,
  },
  title: {
    color: Color.textPrim,
    fontSize: FontSize.medium14pxMed_size,
    fontWeight: "600",
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  cardContainer: {
    backgroundColor: "rgba(135, 206, 250, 0.1)",
    borderRadius: 20,
    padding: 20,
    marginBottom: 15,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  cardImage: {
    height: windowWidth * (50 / 100),
    width: windowWidth * (80 / 100),
    borderRadius: 8,
  },
  infoContainer: {
    position: "absolute",
    top: 10,
    right: 10,
    borderRadius: 50,
  },
  info: {
    backgroundColor: "#ffff",
    borderRadius: 50,
    padding: 5,
  },
  imageInfoPopupContainer: {
    position: "absolute",
    padding: 10,
    flexDirection: "column",
    backgroundColor: "white",
    width: "90%",
    minHeight: "50%",
    justifyContent: "center",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 5,
    alignItems: "flex-start",
    top: 45,
    right: 10,
  },
  imageInfoPopupTitle: {
    fontWeight: "700",
    fontSize: 12,
    marginVertical: 5,
    marginBottom: 10,
    marginLeft: 5,
  },
  imageInfoPopupContent: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  cardDetails: {
    marginTop: 10,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: FontSize.medium14pxMed_size,
    fontWeight: "600",
    color: Color.textPrim,
  },
  cardStatus: {
    color: "green",
  },
  cardTime: {
    color: "gray",
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
  startButton: {
    backgroundColor: "black",
    borderRadius: 24,
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  startButtonText: {
    color: "white",
    marginLeft: 5,
  },
  spacing: {
    marginBottom: 20,
  },
});

export default QuestionCard;
