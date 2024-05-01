import { TextInput, View, Text, StyleSheet, Button } from "react-native";
import { Color } from "../../GlobalStyles";
import { useEffect, useState } from "react";
import { Audio } from "expo-av";
import SoundRecorder from "./SoundRecorder";

const UploadAndPreview: any = ({ uploadType }: any) => {
  // const [selectedFile, setSelectedFile] = useState(null);
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
  async function playSound() {
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync(
      require("../../assets/Hello.mp3")
    );
    setSound(sound);

    console.log("Playing Sound");
    await sound.playAsync();
  }
  useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);
  return (
    <View style={styles.cardContainer}>
      <Button title="Play Sound" onPress={playSound} />
      <SoundRecorder />
      <Text>Sound</Text>
    </View>
  );
};

export default UploadAndPreview;
