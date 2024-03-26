import React, { useContext, useEffect, useRef, useState } from "react";
import { Text, View, TouchableOpacity, StyleSheet, ImageBackground } from "react-native";
import { Video, ResizeMode } from "expo-av";
import DraggableFlatList, { RenderItemParams } from "react-native-draggable-flatlist";
import { DataContext } from "../../contexts/DataContext";
import { VideoType } from "../../types/video";
import { handleUpdateVideo } from "../../utils/api/video";
import { FlatList } from "react-native-gesture-handler";
import Modal from "react-native-modal";


const dummyVideos = [
  {
    _id: "8",
    videoTitle: "Video a",
    videoUrl: "https://v.ftcdn.net/07/02/70/02/700_F_702700224_uC9r4arn1Y5TfzsFP55N6Dxus4ICKk07_ST.mp4",
    thumbnailURL: require("../../assets/book.svg"),
  },
];

interface VideoProps {
  navigation: any;
  setOpen: any;
  setCurrSelectedVideo: any;
  allVideos: VideoType[];
  setAllVideos: any;
}

export default function VideoComponent({
  navigation,
  setCurrSelectedVideo,
  allVideos,
  setAllVideos,
}: VideoProps) {
  const video = useRef<Video>(null);
  //const { courseScreen } = useContext(DataContext);
  const [data, setData] = useState(dummyVideos);
  
  const [isQuestionModalVisible, setIsQuestionModalVisible] = useState(false); 
  const [videoTime, setVideoTime] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');

  const handleResumeVideo =  () => {
    video.current?.playAsync(); 
  };
  
  useEffect(() => {
    const interval = setInterval(() => {
      if (!video.current) return;
      video.current.getStatusAsync().then(({ positionMillis }:any) => {
        setVideoTime(positionMillis / 1000);
      });
    }, 1000);
    
    return ()=> clearInterval(interval);
  }, [video]);

  useEffect(() => {
    if (videoTime >= 15) {
      setIsQuestionModalVisible(true);
      video.current?.pauseAsync();
    }
  }, [videoTime]);

  const handleQuestionResponse = async (option: string) => {
    if (option) {
      await setSelectedOption(option);
      setIsQuestionModalVisible(false);
      video.current?.playAsync(); 
      console.log("User selected option:", option);
    }
  };
  
  


  const renderItem = ({ item, drag, isActive }: RenderItemParams<VideoType>) => {
    return (
      <TouchableOpacity
        onLongPress={drag}
        disabled={isActive}
        activeOpacity={0.5}
        style={{ marginTop: 20 }}
      >
        <View>
          <Text>{item.videoTitle}</Text>
          <Video
            ref={video}
            style={{ width: "100%", height: 200 }}
            source={{ uri: item.videoUrl }}
            useNativeControls
            resizeMode={ResizeMode.CONTAIN}
            isLooping
          />
          <Text>{item.videoDescription}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <View>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
          onDragEnd={({ data }) => setData(data)}
        />
      </View>

      <Modal
        isVisible={isQuestionModalVisible}
        onSwipeComplete={handleResumeVideo}
        onBackdropPress={handleResumeVideo}
        onBackButtonPress={handleResumeVideo}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <TouchableOpacity onPress={() => handleQuestionResponse("Option 1")}>
              <Text style={styles.optionText}>Option 1</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleQuestionResponse("Option 2")}>
              <Text style={styles.optionText}>Option 2</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleQuestionResponse("Option 3")}>
              <Text style={styles.optionText}>Option 3</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "lightblue",
    borderRadius: 10,
    padding: 20,
    width: "80%",
  },
  optionText: {
    borderWidth: 0.5,
    margin: 10,
    fontSize: 18,
    borderRadius: 10,
    borderColor: "gray",
    padding: 20,
  },
});
