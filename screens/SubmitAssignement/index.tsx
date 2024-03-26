import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Pressable,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { FlatList } from "react-native-gesture-handler";

export default function SubmitAssignment({ navigation }: any) {
    const handleItemPress = () => {
      
        navigation.navigate('Forum');
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
   
    <View style={styles.cardContainer}>
      <Text style={styles.cardHeaderText}>Submission By Tomorrow</Text>
      <View style={styles.card}>
        <Image
          style={styles.cardImage}
          source={require("../../assets/banner.png")}
        />
        <View style={styles.cardDetails}>
          <Text style={styles.cardTitle}>Chemistry</Text>
          <Text style={styles.cardStatus}>Ongoing</Text>
          <Text style={styles.cardTime}>Starting Time</Text>
        </View>
      </View>
      <Text style={styles.cardInfo}>Start Early, Finish Early</Text>
      <Pressable style={styles.startButton} onPress={handleItemPress}>
        <Text style={styles.startButtonText}>Start</Text>
        <MaterialIcons name="navigate-next" size={24} color="white" />
      </Pressable>
    </View>
 

        <View style={styles.cardContainer}>
          <Text style={styles.cardHeaderText}>Coming Up Next</Text>
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
          <Text style={styles.cardInfo}>Start Tomorrow</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 20,
  },
  backButton: {
    paddingRight: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  content: {
    flex: 1,
  },
  cardContainer: {
    backgroundColor: "rgba(135, 206, 250, 0.1)",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  cardHeaderText: {
    fontSize: 16,
    fontWeight: "bold",
    paddingBottom: 10,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  cardImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  cardDetails: {
    marginLeft: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  cardStatus: {
    color: "green",
    fontWeight: "bold",
  },
  cardTime: {
    color: "gray",
  },
  cardInfo: {
    marginBottom: 10,
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
});
