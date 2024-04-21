import { Color, FontSize } from "../../GlobalStyles";
import {
  Dimensions,
  FlatList,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useContext, useState } from "react";
import { DataContextType } from "../../types/context";
import { DataContext } from "../../contexts/DataContext";
import { getAllNotes } from "../../utils/api/notes";
import NotesComponent from "../../components/Assignment/Notes";
import { NoteType } from "../../types/notes";

export default function Notes({ navigation }: any) {
    const {
        selectedChapter,
        selectedAssignment,
        selectedTest,
      } = useContext(DataContext) as DataContextType;
      const [tab, setTab] = useState((selectedChapter?.chapterComponent && selectedChapter?.chapterComponent?.length > 0) ?  selectedChapter?.chapterComponent[0]: "");
      const [open, setOpen] = useState("");
      const [selectedCurrQuestionIdx, setSelectedCurrQuestionIdx] = useState(-1);
      const [allNotes, setAllNotes] = useState<NoteType[]>([]);
    
      
    
      const fetchAllNotes = () => {
        if (!selectedChapter) {
          return;
        }
        getAllNotes(selectedChapter?._id, 10, 0, "asc", 10, setAllNotes);
      };
    
     

  return (
    <SafeAreaView>
      <View
        style={{
          minHeight: Dimensions.get("window").height,
          backgroundColor: Color.textWhite,
        }}
      >
        <View
          style={{
            width: "100%",
            paddingHorizontal: 0,
            paddingVertical: 20,
            borderBottomColor: Color.border,
            borderBottomWidth: 1,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                style={{ paddingHorizontal: 15 }}
                activeOpacity={0.5}
                onPress={() => navigation.goBack()}
              >
                <MaterialIcons name="chevron-left" size={30} color="black" />
              </TouchableOpacity>
              <Text
                style={{
                  color: Color.textPrim,
                  fontSize: FontSize.medium14pxMed_size,
                  fontWeight: "600",
                }}
              >
                Notes
              </Text>
            </View>
            <TouchableOpacity
              style={{ paddingHorizontal: 15 }}
              activeOpacity={0.5}
            >
              <MaterialIcons name="more-vert" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Body */}
        <FlatList
          data={["1"]}
          renderItem={() => (
            <View style={{ paddingBottom: 400 }}>
              <NotesComponent
                    navigation={navigation}
                    setOpen={setOpen}
                    allNotes={allNotes}
                    fetchAllNotes={fetchAllNotes}
                    setAllNotes={setAllNotes}
                  />
            </View>
          )}
          style={{
            paddingHorizontal: 15,
          }}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
}
