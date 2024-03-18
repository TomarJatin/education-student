import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Pressable,
  ImageBackground,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Color, FontSize } from "../../GlobalStyles";

export default function Testscreen({ navigation }: any) {
  const renderCard = () => {
    return (
      <View style={styles.cardContainer}>
        <View style={styles.card}>
          <Image
            style={styles.cardImage}
            source={require("../../assets/banner.png")}
          />
          <View style={styles.cardDetails}>
            <Text style={styles.cardTitle}>Chemistry</Text>
            <Text style={styles.cardStatus}>Upcoming</Text>
            <Text style={styles.cardTime}>Starting Time</Text>
          </View>
        </View>
        <Text style={styles.cardInfo}>
          Get ready! This is about to start in 15 minutes
        </Text>
        <Pressable style={styles.startButton}>
          <Text style={styles.startButtonText}>Start</Text>
          <MaterialIcons name="navigate-next" size={24} color="white" />
        </Pressable>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <MaterialIcons name="chevron-left" size={30} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Tests</Text>
      </View>

      <View style={styles.content}>
        {renderCard()}
        <View style={styles.spacing} />
        <View style={styles.cardContainer}>
          <Text
            style={{
              color: Color.textPrim,
              fontSize: FontSize.semi16pxSemi_size,
              fontWeight: "600",
              padding:10,
              paddingBottom:20,
            }}
          >
            Comming Up Next
          </Text>
          <View style={styles.card}>
            <Image
              style={styles.cardImage}
              source={require("../../assets/banner.png")}
            />
            <View style={styles.cardDetails}>
              <Text style={styles.cardTitle}>Chemistry</Text>
              <Text style={ {   color: "red",}}>Upcoming</Text>
              <Text style={styles.cardTime}>Starting Time</Text>
            </View>
          </View>
          <Text style={styles.cardInfo}>
            Start Tomorrow
          </Text>
      
        </View>
      </View>
    </SafeAreaView>
  );
}

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
