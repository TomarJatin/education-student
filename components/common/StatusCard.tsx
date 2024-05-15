import { View, Text, Pressable, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useMemo } from "react";
import { Color, FontSize } from "../../GlobalStyles";

type StatusCardProps = {
  imgSrc: string | undefined;
  cardTitle: string | undefined;
  cardStatus: string | undefined;
  cardTime: string | undefined;
  contentText: string | undefined;
  btnLabel: string | undefined;
  startTime: string | undefined;
  endTime: string | undefined;
  action: () => void;
};

const StatusCard: React.FC<StatusCardProps> = ({
  btnLabel,
  action,
  imgSrc,
  cardTitle,
  cardTime,
  endTime,
  startTime,
  contentText,
}) => {
  const getStatus = (
    startTime: string | number | Date | undefined,
    endTime: string | number | Date | undefined
  ) => {
    const currentTime = new Date();
    const start = new Date(startTime as string);
    const end = new Date(endTime as string);

    if (currentTime >= start && currentTime <= end) {
      return "Ongoing";
    } else if (currentTime < start) {
      return "Upcoming";
    } else {
      return "Expired";
    }
  };
  const formatTimeRange = (startTime: any, endTime: any) => {
    const start = new Date(startTime);
    const end = new Date(endTime);

    const options: any = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    const startFormatted = new Intl.DateTimeFormat("en-US", options).format(
      start
    );
    const endFormatted = new Intl.DateTimeFormat("en-US", options).format(end);

    return `Starting at ${startFormatted} to ${endFormatted}`;
  };

  const range: any = useMemo(() => {
    return formatTimeRange(startTime, endTime);
  }, [startTime, endTime]);
  const cardStatus = React.useMemo(() => {
    return getStatus(startTime, endTime);
  }, [startTime, endTime]);
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
      gap: 20,
    },
    cardImage: {
      height: 60,
      width: 60,
      borderRadius: 8,
    },
    cardDetails: {
      width: "80%",
    },
    cardTitle: {
      fontSize: FontSize.medium14pxMed_size,
      fontWeight: "600",
      color: Color.textPrim,
    },
    cardStatus: {
      color:
        cardStatus === "Upcoming"
          ? "blue"
          : cardStatus === "Ongoing"
          ? "green"
          : "red",
    },
    cardTime: {
      color: "gray",
      fontSize: 12,
      width: "60%",
    },

    startButton: {
      backgroundColor: "black",
      borderRadius: 24,
      paddingVertical: 10,
      paddingHorizontal: 20,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
    },
    startButtonText: {
      color: "white",
      marginLeft: 5,
    },
    spacing: {
      marginBottom: 20,
    },
  });
  return (
    <View style={styles.cardContainer}>
      <View style={styles.card}>
        <View
          style={{
            flexDirection: "row",
            gap: 5,
            width: "100%",
          }}
        >
          <Image
            style={styles.cardImage}
            source={require("../../assets/banner.png")}
          />
          <View style={styles.cardDetails}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text style={styles.cardTitle}>{cardTitle}</Text>
              <Text>Marks :{contentText}</Text>
            </View>
            <Text style={styles.cardStatus}>{cardStatus}</Text>
            <Text style={styles.cardTime}>{range}</Text>
          </View>
        </View>
        <Pressable onPress={action} style={styles.startButton}>
          <Text style={styles.startButtonText}>{btnLabel}</Text>
          <MaterialIcons name="navigate-next" size={24} color="white" />
        </Pressable>
      </View>
    </View>
  );
};

export default StatusCard;
