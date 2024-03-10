import {
  Dimensions,
  FlatList,
  ImageBackground,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Color, FontSize } from "../../GlobalStyles";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Modal from "react-native-modal";
import { useContext, useEffect, useState } from "react";
import {
  getAllChapter,
  createChapter,
  deleteChapter,
  handleUpdateChapter,
} from "../../utils/api/chapters";
import MoreCoursesOptions from "../../components/Models/MoreCoursesOptions";
import { ChapterType } from "../../types/chapters";
import { DataContext } from "../../contexts/DataContext";
import { DataContextType } from "../../types/context";
import AddChapter from "../../components/Models/AddChapter";
import DraggableFlatList, {
  ScaleDecorator,
  RenderItemParams,
} from "react-native-draggable-flatlist";
import MoreChapterOptions from "../../components/Models/MoreChapterOption";
import { uploadFiles } from "../../utils/api/upload";

export default function Chapters({ navigation }: any) {
  const { course, setSelectedChapter, courseScreen } = useContext(
    DataContext
  ) as DataContextType;
  const [open, setOpen] = useState("");
  const [allChapters, setAllChapters] = useState<ChapterType[]>([]);
  const [chapterName, setChapterName] = useState("");
  const [chapterComponents, setChapterComponents] = useState<string[]>([]);
  const [selectedChapter, setCurrSelectedChapter] =
    useState<ChapterType | null>(null);
  const [image, setImage] = useState<any>(null);
  const [updateChapter, setUpdateChapter] = useState(false);

  const renderItem = ({
    item,
    drag,
    isActive,
    getIndex,
  }: RenderItemParams<ChapterType>) => {
    return (
      <ScaleDecorator>
        <TouchableOpacity
          onLongPress={drag}
          disabled={isActive}
          onPress={() => {
            navigation.navigate("Assignment");
            setSelectedChapter({ ...item });
          }}
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
                uri: item.chapterIcon,
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
              {item.chapterName}
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
                setCurrSelectedChapter({ ...item });
                setOpen("more options");
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

  const handleCreateChapter = async () => {
    console.log("clicked");
    if (chapterName === "" || !course || !image) {
      return;
    }
    const _arr = image.split(".");
    const lastElement = _arr.pop();

    var file: any = {
      uri: image,
      type: "image/" + lastElement,
      name: "photo." + lastElement,
    };
    const res: any = await uploadFiles(file);
    console.log("res: ", res);
    let url = "";
    if (res && res?.data?.urls) {
      url = res.data.urls[0];
    }
    const data = JSON.stringify({
      chapterName: chapterName,
      chapterComponent: chapterComponents,
      chapterIcon: url,
      courseId: course._id,
    });
    console.log("data: ", data);
    if (updateChapter && selectedChapter) {
      await handleUpdateChapter(data, selectedChapter._id);
    } else {
      await createChapter(data);
    }

    fetchAllChapters();
    setOpen("");
  };

  const handleStatusChange = async (item: ChapterType, status: number) => {
    let _allChapters = allChapters;
    const index = allChapters.findIndex((chapter) => chapter === item);
    console.log("index: ", index)
    _allChapters[index].status = status;
    setAllChapters([..._allChapters]);
    const data = JSON.stringify({ ...item, status: status });
    await handleUpdateChapter(data, item._id);
  };

  const handleUpdateClick = () => {
    console.log("update clicked", selectedChapter);
    if (selectedChapter) {
      setUpdateChapter(true);
      setOpen("create chapter");
      setChapterName(selectedChapter.chapterName);
      if (selectedChapter.chapterComponent) {
        setChapterComponents([...selectedChapter.chapterComponent]);
      }
    }
  };

  const handleDeleteClick = async () => {
    if (selectedChapter) {
      await deleteChapter(selectedChapter?._id);
      fetchAllChapters();
      setOpen("");
    }
  };

  const handleReorder = () => {};

  const fetchAllChapters = async () => {
    if (course) {
      getAllChapter(course?._id, 10, 0, "asc", 10, setAllChapters);
    }
  };

  useEffect(() => {
    fetchAllChapters();
  }, []);

  return (
    <>
      <SafeAreaView>
        <View
          style={{
            minHeight: Dimensions.get("window").height,
            backgroundColor: Color.textWhite,
          }}
        >
          {/* Topbar */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
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
                Chapters
              </Text>
            </View>
            <TouchableOpacity
              style={{ paddingHorizontal: 15 }}
              activeOpacity={0.5}
            >
              <MaterialIcons name="more-vert" size={24} color="black" />
            </TouchableOpacity>
          </View>

          <FlatList
            data={["1"]}
            renderItem={() => (
              <View style={{paddingBottom: 200}}>
                {/* Create Card */}
                {courseScreen === "base" && (
                  <View
                    style={{
                      padding: 20,
                      borderRadius: 20,
                      borderColor: Color.border,
                      borderWidth: 1,
                      marginTop: 20,
                    }}
                  >
                    <Text
                      style={{
                        color: Color.textSecondary,
                        fontSize: FontSize.medium11pxMed_size,
                        fontWeight: "400",
                        marginBottom: 20,
                      }}
                    >
                      Add thumbnail for better visibility. Students may find
                      them appealing.
                    </Text>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "flex-end",
                      }}
                    >
                      <TouchableOpacity
                        onPress={() => setOpen("create chapter")}
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
                          Create new chapter
                        </Text>
                        <MaterialCommunityIcons
                          name="pencil-outline"
                          size={16}
                          color="white"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                )}

                {/* Manage Card */}
                {courseScreen === "base" && (
                  <View
                    style={{
                      padding: 20,
                      borderRadius: 20,
                      borderColor: Color.border,
                      borderWidth: 1,
                      marginTop: 20,
                    }}
                  >
                    {/* Card Header */}
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text
                        style={{
                          color: Color.textPrimLM,
                          fontSize: FontSize.medium12pxMed_size,
                          fontWeight: "600",
                        }}
                      >
                        Active Chapters
                      </Text>
                      <Text
                        style={{
                          color: Color.textPrimLM,
                          fontSize: FontSize.medium12pxMed_size,
                          fontWeight: "600",
                        }}
                      >
                        Manage
                      </Text>
                    </View>
                    <DraggableFlatList
                      data={allChapters}
                      renderItem={renderItem}
                      onDragEnd={({ data }) => {
                        setAllChapters(data);
                        handleReorder();
                      }}
                      keyExtractor={(item) => item._id}
                    />
                  </View>
                )}

                {courseScreen === "active" && (
                  <>
                    <View
                      style={{
                        padding: 20,
                        borderRadius: 20,
                        borderColor: Color.border,
                        borderWidth: 1,
                        marginTop: 20,
                      }}
                    >
                      {/* Card Header */}
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Text
                          style={{
                            color: Color.textPrimLM,
                            fontSize: FontSize.medium12pxMed_size,
                            fontWeight: "600",
                          }}
                        >
                          Active Chapters
                        </Text>
                        <Text
                          style={{
                            color: Color.textPrimLM,
                            fontSize: FontSize.medium12pxMed_size,
                            fontWeight: "600",
                          }}
                        >
                          Manage
                        </Text>
                      </View>
                      <DraggableFlatList
                        data={allChapters.filter((item) => item.status === 1)}
                        renderItem={renderItem}
                        onDragEnd={({ data }) => {
                          setAllChapters(data);
                          handleReorder();
                        }}
                        keyExtractor={(item) => item._id}
                      />
                    </View>
                    <View
                      style={{
                        padding: 20,
                        borderRadius: 20,
                        borderColor: Color.border,
                        borderWidth: 1,
                        marginTop: 20,
                      }}
                    >
                      {/* Card Header */}
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Text
                          style={{
                            color: Color.textPrimLM,
                            fontSize: FontSize.medium12pxMed_size,
                            fontWeight: "600",
                          }}
                        >
                          Inactive Chapters
                        </Text>
                        <Text
                          style={{
                            color: Color.textPrimLM,
                            fontSize: FontSize.medium12pxMed_size,
                            fontWeight: "600",
                          }}
                        >
                          Manage
                        </Text>
                      </View>
                      <DraggableFlatList
                        data={allChapters.filter((item) => item.status === 0)}
                        renderItem={renderItem}
                        onDragEnd={({ data }) => {
                          setAllChapters(data);
                          handleReorder();
                        }}
                        keyExtractor={(item) => item._id}
                      />
                    </View>
                  </>
                )}
              </View>
            )}
            style={{
              paddingHorizontal: 15,
            }}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </SafeAreaView>
      <Modal
        isVisible={open !== ""}
        onSwipeComplete={() => setOpen("")}
        onBackdropPress={() => setOpen("")}
        onBackButtonPress={() => setOpen("")}
      >
        {open === "create chapter" && (
          <AddChapter
            setOpen={setOpen}
            setChapterComponents={setChapterComponents}
            setChapterName={setChapterName}
            chapterComponents={chapterComponents}
            chapterName={chapterName}
            handleCreateChapter={handleCreateChapter}
            image={image}
            setImage={setImage}
          />
        )}
        {open === "more options" && (
          <MoreChapterOptions
            setOpen={setOpen}
            selectedChapter={selectedChapter}
            handleDeleteClick={handleDeleteClick}
            handleUpdateClick={handleUpdateClick}
          />
        )}
      </Modal>
    </>
  );
}
