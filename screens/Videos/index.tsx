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
import { VideoType } from "../../types/video";
import Video from "../../components/Assignment/Video";
import { getAllVideos } from "../../utils/api/video";

export default function Videos({ navigation }: any) {
    const {
        selectedChapter,
        selectedAssignment,
        selectedTest,
      } = useContext(DataContext) as DataContextType;
      const [tab, setTab] = useState((selectedChapter?.chapterComponent && selectedChapter?.chapterComponent?.length > 0) ?  selectedChapter?.chapterComponent[0]: "");
      const [assignmentName, setAssignmentName] = useState("");
      const [assignmentGrading, setAssignmentGrading] = useState(false);
      const [assignmentSolution, setAssignmentSolution] = useState(false);
      const [open, setOpen] = useState("");
      const [allVideos, setAllVideos] = useState<VideoType[]>([]);
    
      const fetchAllVideos = () => {
        if (!selectedChapter) {
          return;
        }
        getAllVideos(selectedChapter?._id, 10, 0, "asc", 10, setAllVideos);
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
                Videos
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
              <Video
                    navigation={navigation}
                    setOpen={setOpen}
                    allVideos={allVideos}
                    fetchAllVideos={fetchAllVideos}
                    setAllVideos={setAllVideos}
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
