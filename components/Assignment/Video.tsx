import {
  Dimensions,
  FlatList,
  ImageBackground,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Color, FontSize } from "../../GlobalStyles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useContext, useEffect, useRef, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Video, ResizeMode } from "expo-av";
import { Image } from "expo-image";
import { VideoType } from "../../types/video";
import { getAllVideos, handleUpdateVideo } from "../../utils/api/video";
import { DataContext } from "../../contexts/DataContext";
import { DataContextType } from "../../types/context";
import DraggableFlatList, {
  ScaleDecorator,
  RenderItemParams,
} from "react-native-draggable-flatlist";

interface VideoProps {
  navigation: any;
  setOpen: any;
  fetchAllVideos: () => void;
  allVideos: VideoType[];
  setAllVideos: any;
}

export default function VideoComponent({
  navigation,
  setOpen,
  allVideos,
  fetchAllVideos,
  setAllVideos,
}: VideoProps) {
  const video = useRef(null);
  const { selectedChapter, courseScreen } = useContext(
    DataContext
  ) as DataContextType;
  const [status, setStatus] = useState({});
  const [isActive, setIsActive] = useState(false);

  const renderItem = ({
    item,
    drag,
    isActive,
  }: RenderItemParams<VideoType>) => {
    return (
      <ScaleDecorator>
        <TouchableOpacity
          onLongPress={drag}
          disabled={isActive}
          activeOpacity={0.5}
          style={{
            marginTop: 20,
          }}
        >
          <View
            style={{
              marginTop: 20,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                color: Color.buttonBg,
                fontWeight: "500",
                fontSize: FontSize.medium11pxMed_size,
              }}
            >
              {item.videoTitle}
            </Text>
           
          </View>
          <Video
            ref={video}
            style={{
              width: "100%",
              height: 200,
            }}
            source={{
              uri: item.videoUrl,
            }}
            useNativeControls
            resizeMode={ResizeMode.CONTAIN}
            isLooping
            onPlaybackStatusUpdate={(status) => setStatus(() => status)}
          />
          <Text
            style={{
              color: Color.textSecondary,
              fontWeight: "400",
              fontSize: FontSize.medium11pxMed_size,
              marginTop: 5,
            }}
          >
            {item.videoDescription}
          </Text>
        </TouchableOpacity>
      </ScaleDecorator>
    );
  };

  const handleStatusChange = async (item: VideoType, status: number) => {
    let _allVideos = allVideos;
    const index = _allVideos.findIndex((chapter) => chapter === item);
    console.log("index: ", index);
    _allVideos[index].status = status;
    setAllVideos([..._allVideos]);
    const data = JSON.stringify({ ...item, status: status });
    await handleUpdateVideo(data, item._id);
  };

  useEffect(() => {
    fetchAllVideos();
  }, []);

  return (
    <View>
      {/* Create Card */}
      {/* <View
        style={{
          padding: 20,
          borderRadius: 20,
          borderColor: Color.border,
          borderWidth: 1,
          marginTop: 20,
        }}
      >
        <View>
          <Text
            style={{
              color: Color.buttonBg,
              fontSize: FontSize.medium14pxMed_size,
              fontWeight: "600",
              marginBottom: 10,
            }}
          >
            Add Questions
          </Text>
        </View>
        <Text
          style={{
            color: Color.textSecondary,
            fontSize: FontSize.medium11pxMed_size,
            fontWeight: "400",
            marginBottom: 20,
          }}
        >
          Add thumbnail for better visibility. Students may find them appealing.
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.navigate("AddVideo")}
            activeOpacity={0.5}
            style={{
              flexDirection: "row",
              gap: 10,
              alignItems: "center",
              paddingHorizontal: 30,
              paddingVertical: 10,
              backgroundColor: Color.buttonBg,
              borderRadius: 100,
            }}
          >
            <Text
              style={{
                color: Color.textWhite,
                fontSize: FontSize.medium12pxMed_size,
                fontWeight: "500",
              }}
            >
              Add new Video
            </Text>
            <MaterialCommunityIcons
              name="pencil-outline"
              size={16}
              color="white"
            />
          </TouchableOpacity>
        </View>
      </View> */}
      {courseScreen !== "base" && (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 20
          }}
        >
          <Text
            style={{
              color: Color.buttonBg,
              fontSize: FontSize.medium12pxMed_size,
              fontWeight: "600",
            }}
          >
            Videos
          </Text>
          <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
            <TouchableOpacity activeOpacity={0.5} onPress={() => setIsActive(true)}
              style={{
                backgroundColor: isActive ? Color.buttonBg : Color.textWhite,
                padding: 8,
                borderRadius: 24,
              }}
            >
              <Text
                style={{
                  color: isActive ? Color.textWhite : Color.buttonBg,
                  fontSize: FontSize.rehular10pxRegular_size,
                  fontWeight: "600",
                }}
              >
                Active
              </Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.5} onPress={() => setIsActive(false)}
              style={{
                backgroundColor: !isActive ? Color.buttonBg : Color.textWhite,
                padding: 8,
                borderRadius: 24,
              }}
            >
              <Text
                style={{
                  color: !isActive ? Color.textWhite : Color.buttonBg,
                  fontSize: FontSize.rehular10pxRegular_size,
                  fontWeight: "600",
                }}
              >
                Inactive
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      <DraggableFlatList
        data={courseScreen === "base" ? allVideos: isActive ? allVideos.filter((item) => item.status === 1): allVideos.filter((item) => item.status === 0)}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        onDragEnd={({ data }) => {
          setAllVideos(data);
        }}
      />
    </View>
  );
}
