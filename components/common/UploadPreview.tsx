import { TextInput, View, Text, StyleSheet, Button } from "react-native";
import { Color } from "../../GlobalStyles";
import { useEffect, useState } from "react";
import { Audio } from "expo-av";
import AudioPlayer from "./AudioPlayer";
import { SoundRecorder } from "./SoundRecorder";

const UploadAndPreview: any = ({ uploadType }: any) => {
  const [recordingName, setRecordingName] = useState<any>();
  const [duration, setDuration] = useState<number>(0);
  const [sound, setSound] = useState<any>();
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
      <Text>Sound</Text>
      <SoundRecorder
        duration={duration}
        setDuration={setDuration}
        setRecordingName={setRecordingName}
      />
      <AudioPlayer
        title={recordingName}
        totalDuration={duration}
        sound={sound}
        setSound={setSound}
      />
    </View>
  );
};

export default UploadAndPreview;
