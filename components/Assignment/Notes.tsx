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
import { useContext, useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Image } from "expo-image";
import { TestType } from "../../types/test";
import { DataContext } from "../../contexts/DataContext";
import { DataContextType } from "../../types/context";
import { getAllNotes, handleUpdateNotes } from "../../utils/api/notes";
import { NoteType } from "../../types/notes";
import DraggableFlatList, {
  ScaleDecorator,
  RenderItemParams,
} from "react-native-draggable-flatlist";

interface NotesProps {
  navigation: any;
  setCurrSelectedNotes: any;
  setOpen: any;
  fetchAllNotes: any;
  allNotes: NoteType[];
  setAllNotes: any;
}

export default function Notes({
  navigation,
  setCurrSelectedNotes,
  setOpen,
  fetchAllNotes,
  allNotes,
  setAllNotes,
}: NotesProps) {
  const { selectedChapter, courseScreen } = useContext(DataContext) as DataContextType;
  const [isActive, setIsActive] = useState(false);

  const renderItem = ({
    item,
    drag,
    isActive,
  }: RenderItemParams<NoteType>) => {
    return (
      <ScaleDecorator>
        <TouchableOpacity
        onLongPress={drag}
        disabled={isActive}
              // onPress={() => {
              //   navigation.navigate("Assignment");
              //   setSelectedChapter({ ...item });
              // }}
              activeOpacity={0.5}
              style={{
                marginTop: 20,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <Image
                  source={{
                    uri: "https://media.istockphoto.com/id/1366428092/photo/webinar-e-learning-skills-business-internet-technology-concepts-training-webinar-e-learning.webp?b=1&s=170667a&w=0&k=20&c=qjK4h0qt4W_NNG8TmboGw8RDRv8TNzEoFM_JEDZ1Ah0=",
                  }}
                  contentFit="cover"
                  style={{
                    width: 46,
                    height: 46,
                    borderRadius: 6,
                  }}
                />
                <Text
                  style={{
                    color: Color.buttonBg,
                    fontWeight: "500",
                    fontSize: FontSize.medium11pxMed_size,
                  }}
                >
                  {item.noteName}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <TouchableOpacity
                disabled={courseScreen==="base"}
              onPress={() =>
                handleStatusChange(item, item.status === 0 ? 1 : 0)
              }
              style={{
                padding: 8,
                backgroundColor: item.status
                  ? Color.blueButton
                  : Color.buttonCardBg,
                borderRadius: 100,
              }}
              activeOpacity={0.5}
            >
              <Ionicons
                name="ios-eye-off-outline"
                size={18}
                color={item.status ? "white" : "black"}
              />
            </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setCurrSelectedNotes({ ...item });
                    setOpen("more notes options");
                  }}
                  activeOpacity={0.5}
                >
                  <MaterialIcons name="more-vert" size={24} color="black" />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
      </ScaleDecorator>
    );
  };

  const handleStatusChange = async (item: NoteType, status: number) => {
    let _allNotes = allNotes;
    const index = _allNotes.findIndex((chapter) => chapter === item);
    console.log("index: ", index)
    _allNotes[index].status = status;
    setAllNotes([..._allNotes]);
    const data = JSON.stringify({ ...item, status: status });
    await handleUpdateNotes(data, item._id);
  };

  useEffect(() => {
    fetchAllNotes();
  }, []);

  return (
    <View>
      {/* Create Card */}
      <View
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
            Add Notes
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
            onPress={() => setOpen("add note")}
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
              Add
            </Text>
            <MaterialCommunityIcons
              name="pencil-outline"
              size={16}
              color="white"
            />
          </TouchableOpacity>
        </View>
      </View>

      <View
        style={{
          padding: 20,
          borderRadius: 20,
          borderColor: Color.border,
          borderWidth: 1,
        }}
      >
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
            Notes
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
        {/* Card Header */}

        <DraggableFlatList
          data={courseScreen === "base" ? allNotes: isActive ? allNotes.filter((item) => item.status === 1): allNotes.filter((item) => item.status === 0)}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
          onDragEnd={({ data }) => {
            setAllNotes(data);
          }}
        />
      </View>
    </View>
  );
}
