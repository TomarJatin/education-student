import { View, Text, TouchableOpacity } from "react-native";
import { Color, FontSize } from "../../GlobalStyles";
import { Feather } from "@expo/vector-icons";
import { Switch, TextInput } from "react-native-gesture-handler";
import * as ImagePicker from 'expo-image-picker';
import { Image } from "expo-image";

interface AddNoteProps {
  setOpen: any;
  setNoteName: any;
  noteName: string
  handleCreateNote: any;
  noteType: string;
  setNoteType: any;
  noteDownloadable: boolean;
  setNoteDownloadable: any;
  notesFile: any;
  setNotesFile: any;
}

export default function AddNote({
  setOpen,
  noteName,
  setNoteName,
  handleCreateNote,
  noteType,
  setNoteType,
  noteDownloadable,
  setNoteDownloadable,
  notesFile,
  setNotesFile
}: AddNoteProps) {

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
       
      aspect: [1, 1],
      quality: 0.1,
    });

    console.log(result);

    if (!result.canceled) {
      setNotesFile(result.assets[0].uri);
    }
  };

  return (
    <View
      style={{
        backgroundColor: Color.textWhite,
        padding: 15,
        borderRadius: 14,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            color: Color.textPrim,
            fontSize: FontSize.medium12pxMed_size,
            fontWeight: "600",
          }}
        >
          Add new Note
        </Text>
        <TouchableOpacity activeOpacity={0.5} onPress={() => setOpen("")}>
          <Feather name="x" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: "column",
          gap: 20,
          marginTop: 20,
        }}
      >
        <View
          style={{
            borderRadius: 10,
            gap: 10,
            borderColor: Color.border,
            borderWidth: 1,
            paddingVertical: 10,
            paddingHorizontal: 14,
          }}
        >
          <TextInput
            style={{
              width: "100%",
              fontSize: FontSize.medium12pxMed_size,
            }}
            placeholder="Note Name"
            value={noteName}
            onChangeText={(text) => setNoteName(text)}
          />
        </View>
        <View
          style={{
            borderRadius: 10,
            gap: 10,
            borderColor: Color.border,
            borderWidth: 1,
            paddingVertical: 10,
            paddingHorizontal: 14,
          }}
        >
          <TextInput
            style={{
              width: "100%",
              fontSize: FontSize.medium12pxMed_size,
            }}
            placeholder="Note Type"
            value={noteType}
            onChangeText={(text) => setNoteType(text)}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: Color.textPrim,
              fontSize: FontSize.medium12pxMed_size,
              fontWeight: "600",
            }}
          >
            Note Downloadable
          </Text>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={noteDownloadable ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={() => setNoteDownloadable((prev: any )=> !prev)}
            value={noteDownloadable}
          />
        </View>
      </View>
      <View>
      <Text
          style={{
            color: Color.textPrim,
            fontSize: FontSize.medium12pxMed_size,
            fontWeight: "600",
            marginVertical: 20,
          }}
        >
          Add File
        </Text>
        <View
          style={{
            flexDirection: "row",
            gap: 20,
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={pickImage}
            style={{
              width: 140,
              height: 140,
              borderRadius: 14,
              borderWidth: 1,
              borderColor: Color.borderColor,
              borderStyle: "dashed",
              flex: 1,
            }}
          >
            {notesFile && (
              <Image
                source={{ uri: notesFile }}
                style={{ width: "100%", height: "100%" }}
              />
            )}
          </TouchableOpacity>
          <Text
            style={{
              color: Color.textSecondary,
              fontSize: FontSize.medium11pxMed_size,
              fontWeight: "400",
              flex: 1,
            }}
          >
            Add thumbnail for better visibility. Students may find them
            appealing.
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => handleCreateNote()}
          activeOpacity={0.5}
          style={{
            width: "100%",
            backgroundColor: Color.buttonBg,
            paddingVertical: 10,
            borderRadius: 100,
            marginTop: 20,
          }}
        >
          <Text
            style={{
              fontSize: FontSize.medium12pxMed_size,
              fontWeight: "500",
              color: Color.textWhite,
              textAlign: "center",
            }}
          >
            Proceed
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
