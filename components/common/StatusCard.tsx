import { View, Text, Pressable, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Color, FontSize } from "../../GlobalStyles";

type StatusCardProps = {
  imgSrc: string | undefined;
  cardTitle: string | undefined;
  cardStatus: string | undefined;
  cardTime: string | undefined;
  contentText: string | undefined;
  btnLabel: string | undefined;
  action: () => void;
};

const StatusCard: React.FC<StatusCardProps> = ({
  btnLabel,
  action,
  imgSrc,
  cardStatus,
  cardTitle,
  cardTime,
  contentText,
}) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.card}>
        <Image
          style={styles.cardImage}
          source={require("../../assets/banner.png")}
        />
        <View style={styles.cardDetails}>
          <Text style={styles.cardTitle}>{cardTitle}</Text>
          <Text style={styles.cardStatus}>{cardStatus}</Text>
          <Text style={styles.cardTime}>{cardTime}</Text>
        </View>
      </View>
      <Text style={styles.cardInfo}>{contentText}</Text>
      <Pressable onPress={action} style={styles.startButton}>
        <Text style={styles.startButtonText}>{btnLabel}</Text>
        <MaterialIcons name="navigate-next" size={24} color="white" />
      </Pressable>
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
    marginBottom: 20,
  },
  cardImage: {
    height: 60,
    width: 60,
    borderRadius: 8,
  },
  cardDetails: {
    marginLeft: 10,
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
    marginBottom: 20,
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

export default StatusCard;
