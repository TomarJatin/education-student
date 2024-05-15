import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { Color, FontSize } from "../../GlobalStyles";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Audio } from "expo-av";
import * as FileSystem from "expo-file-system";

const AudioPlayer = ({
  sound,
  setSound,
  title = "Recording 001",
  totalDuration = 2,
}: any) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  let [intervalId, setIntervalId] = useState<any>();
  const handlePlayPause = async () => {
    if (isPlaying) {
      console.log("paused");
      await pauseSound();
      clearInterval(intervalId);
    } else {
      await playSound();
      intervalId = setInterval(
        () =>
          setDuration((prev: any) => {
            if (prev < totalDuration) {
              return prev + 1;
            } else {
              clearInterval(intervalId);
              setDuration(0);
              setIsPlaying(false);
              return totalDuration;
            }
          }),
        1000
      );
    }
  };

  async function LoadAudio() {
    try {
      console.log(
        "Loading Sound",
        FileSystem.documentDirectory + "recordings/" + `${title}`
      );
      setIsPlaying(false);
      const { sound }: any = await Audio.Sound.createAsync({
        uri: FileSystem.documentDirectory + "recordings/" + `${title}`,
      });
      setSound(sound);
    } catch (err) {
      console.log("err playing", err);
    }
  }

  async function playSound() {
    console.log("Playing Sound");
    setIsPlaying(true);
    await sound.playAsync();
  }

  async function pauseSound() {
    console.log("pause Sound");
    await sound.pauseAsync();
    setIsPlaying(false);
  }

  useEffect(() => {
    setDuration(0);
    LoadAudio();

    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [title]);

  function formatTime(totalDuration: number) {
    const minutes = Math.floor(totalDuration / 60);
    console.log("miinutes", minutes);
    const remainingSeconds = totalDuration % 60;
    console.log("secs", remainingSeconds);
    const formattedTime = `${minutes
      .toString()
      .padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")} seconds`;
    return formattedTime;
  }
  return (
    <View style={styles.cardContainer}>
      <View style={styles.audioPreview}>
        <TouchableOpacity onPress={handlePlayPause}>
          <AntDesign
            name={isPlaying ? "pausecircle" : "play"}
            size={24}
            color="black"
          />
        </TouchableOpacity>
        <View style={{ marginRight: "auto", marginLeft: 20 }}>
          <Text style={{ fontWeight: "600" }}>{title}</Text>
          <Text style={{ fontSize: 11, marginTop: 3 }}>
            {duration ? formatTime(duration) : formatTime(totalDuration)}
          </Text>
        </View>
        <TouchableOpacity>
          <MaterialIcons name="delete" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

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
  audioPreview: {
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default AudioPlayer;
