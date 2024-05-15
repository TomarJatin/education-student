import { useState } from "react";
import { TouchableOpacity, View, StyleSheet, Text } from "react-native";
import { Audio } from "expo-av";
import * as FileSystem from "expo-file-system";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";

export const SoundRecorder = ({
  setRecordingName,
  duration,
  setDuration,
}: any) => {
  const [recording, setRecording] = useState<any>();
  const [permissionResponse, requestPermission] = Audio.usePermissions();
  const [localDuration, setLocalDuration] = useState(0);
  let [intervalId, setIntervalId] = useState<any>();

  async function startRecording() {
    try {
      if (permissionResponse?.status !== "granted") {
        console.log("Requesting permission..");
        await requestPermission();
      }
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      console.log("Starting recording..");
      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      let id = setInterval(() => {
        setLocalDuration((prev: any) => prev + 1);
      }, 1000);
      setIntervalId(id);
      setRecording(recording);
      console.log("Recording started");
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  }

  console.log("filesystem", FileSystem.documentDirectory);

  async function stopRecording() {
    try {
      setDuration(localDuration);
      clearInterval(intervalId);
      console.log("Stopping recording..");
      setRecording(undefined);
      await recording.stopAndUnloadAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
      });
      const uri = recording.getURI();
      const fileName = `recording-${Date.now()}.caf`;
      await FileSystem.makeDirectoryAsync(
        FileSystem.documentDirectory + "recordings/",
        { intermediates: true }
      );
      await FileSystem.moveAsync({
        from: uri,
        to: FileSystem.documentDirectory + "recordings/" + `${fileName}`,
      });
      setLocalDuration(0);
      setRecordingName(fileName);
      setRecording(null);
      console.log("uri", uri);
      console.log("Recording stopped and stored at", uri);
    } catch (err) {
      console.log(err);
    }
  }
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
    <View>
      <View>
        <Text>Record Answer</Text>
        <Text style={{ fontSize: 11, marginTop: 3 }}>
          {formatTime(localDuration)}
        </Text>
        <Text>{duration}</Text>
        {recording ? (
          <TouchableOpacity onPress={stopRecording}>
            <MaterialIcons name="stop" size={24} color="black" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={startRecording}>
            <MaterialIcons name="play-arrow" size={24} color="black" />
          </TouchableOpacity>
        )}
      </View>
      <View>
        <View></View>
      </View>
    </View>
  );
};

const stylesheet = StyleSheet.create(() => {});
