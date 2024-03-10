import { Color, FontSize } from "../../GlobalStyles";
import {
  Dimensions,
  FlatList,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Switch,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Modal from "react-native-modal";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { useContext, useEffect, useState } from "react";
import { Image } from "expo-image";
import { getAllCourse } from "../../utils/api/baseCourses";
import { CourseType } from "../../types/courses";
import { DataContextType } from "../../types/context";
import { DataContext } from "../../contexts/DataContext";
import Navbar from "../../components/Navbar/Forum";
import MoreCoursesOptions from "../../components/Models/MoreCoursesOptions";
import MoreTagsOptions from "../../components/Models/MoreTagsOptions";

export default function Tags({ navigation }: any) {
  const { setSelectedForumCourse } = useContext(DataContext) as DataContextType;
  const [allCourses, setAllCourses] = useState<CourseType[]>([]);
  const [open, setOpen] = useState("");
  const [selectedCourse, setSelectedCourse] = useState<CourseType | null>(null);
  const [component, setComponent] = useState("select");
  const [isEnabled, setIsEnabled] = useState(false);

  const fetchAllCourses = async () => {
    getAllCourse("base", 10, 0, "asc", 10, setAllCourses);
  };

  useEffect(() => {
    fetchAllCourses();
  }, []);

  const handleUpdateClick = () => {};

  const handleDeleteClick = () => {};

  const handleStatusChange = () => {};

  return (
    <>
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
                  onPress={() => {
                    if (component === "select") {
                      navigation.goBack();
                    } else {
                      setComponent("select");
                    }
                  }}
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
                  {component === "select" ? "Select Tags" : "Create new Tag"}
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
                {component === "select" ? (
                  <View>
                    <TouchableOpacity
                      onPress={() => {
                        setComponent("create");
                      }}
                      activeOpacity={0.5}
                      style={{
                        padding: 20,
                        borderRadius: 20,
                        borderColor: Color.border,
                        borderWidth: 1,
                        marginTop: 20,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <View>
                        <Text
                          style={{
                            color: Color.buttonBg,
                            fontSize: FontSize.medium14pxMed_size,
                            fontWeight: "600",
                            marginBottom: 5,
                          }}
                        >
                          Create new Tag
                        </Text>
                        <Text
                          style={{
                            color: Color.textSecondary,
                            fontSize: FontSize.medium11pxMed_size,
                            fontWeight: "400",
                          }}
                        >
                          Tap to create new Tag or Community
                        </Text>
                      </View>
                      <Feather name="chevron-right" size={24} color="black" />
                    </TouchableOpacity>
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
                          Current Tags
                        </Text>
                      </View>

                      <FlatList
                        data={allCourses}
                        renderItem={({ item, index }) => (
                          <TouchableOpacity
                            onPress={() => {
                              //   setCourse({ ...item });
                              //   navigation.navigate("Chapters");
                            }}
                            activeOpacity={0.5}
                            key={index}
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
                              <Text
                                style={{
                                  color: Color.buttonBg,
                                  fontWeight: "500",
                                  fontSize: FontSize.medium11pxMed_size,
                                }}
                              >
                                {item?.courseName}
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
                                style={{
                                  padding: 8,
                                  backgroundColor: Color.buttonCardBg,
                                  borderRadius: 100,
                                }}
                                activeOpacity={0.5}
                              >
                                <Ionicons
                                  name="ios-eye-off-outline"
                                  size={18}
                                  color="black"
                                />
                              </TouchableOpacity>
                              <TouchableOpacity
                                onPress={() => {
                                  //   setSelectedCourse({ ...item });
                                  setOpen("more options");
                                }}
                                activeOpacity={0.5}
                              >
                                <MaterialIcons
                                  name="more-vert"
                                  size={24}
                                  color="black"
                                />
                              </TouchableOpacity>
                            </View>
                          </TouchableOpacity>
                        )}
                      />
                    </View>
                  </View>
                ) : (
                  <View
                    style={{
                      marginTop: 20,
                      flexDirection: "column",
                      gap: 20,
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
                        placeholder="Enter title of Tag"
                        // value={assignmentName}
                        // onChangeText={(text) => setAssignmentName(text)}
                      />
                    </View>

                    <View
                      style={{
                        padding: 20,
                        borderRadius: 20,
                        borderColor: Color.border,
                        borderWidth: 1,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: FontSize.medium12pxMed_size,
                          color: Color.textPrim,
                          fontWeight: "600",
                          marginBottom: 15,
                        }}
                      >
                        Admin Acess
                      </Text>

                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Text
                          style={{
                            fontSize: FontSize.medium11pxMed_size,
                            color: Color.textPrim,
                            fontWeight: "500",
                          }}
                        >
                          Assistant
                        </Text>
                        <Switch
                          trackColor={{ false: "#767577", true: "#81b0ff" }}
                          thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                          ios_backgroundColor="#3e3e3e"
                          onValueChange={() =>
                            setIsEnabled((prev: any) => !prev)
                          }
                          value={isEnabled}
                        />
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
                      <Text
                        style={{
                          fontSize: FontSize.medium12pxMed_size,
                          color: Color.textPrim,
                          fontWeight: "600",
                          marginBottom: 15,
                        }}
                      >
                        Post Acess
                      </Text>

                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Text
                          style={{
                            fontSize: FontSize.medium11pxMed_size,
                            color: Color.textPrim,
                            fontWeight: "500",
                          }}
                        >
                          Assistant
                        </Text>
                        <Switch
                          trackColor={{ false: "#767577", true: "#81b0ff" }}
                          thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                          ios_backgroundColor="#3e3e3e"
                          onValueChange={() =>
                            setIsEnabled((prev: any) => !prev)
                          }
                          value={isEnabled}
                        />
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-between",
                          marginTop: 15,
                        }}
                      >
                        <Text
                          style={{
                            fontSize: FontSize.medium11pxMed_size,
                            color: Color.textPrim,
                            fontWeight: "500",
                          }}
                        >
                          Students
                        </Text>
                        <Switch
                          trackColor={{ false: "#767577", true: "#81b0ff" }}
                          thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                          ios_backgroundColor="#3e3e3e"
                          onValueChange={() =>
                            setIsEnabled((prev: any) => !prev)
                          }
                          value={isEnabled}
                        />
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
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <View>
                          <Text
                            style={{
                              fontSize: FontSize.medium12pxMed_size,
                              color: Color.textPrim,
                              fontWeight: "600",
                              marginBottom: 5,
                            }}
                          >
                            Admin Acess
                          </Text>
                          <Text
                            style={{
                              fontSize: FontSize.rehular10pxRegular_size,
                              color: Color.textPrim,
                              fontWeight: "400",
                            }}
                          >
                            Enable to publish this tag.
                          </Text>
                        </View>
                        <Switch
                          trackColor={{ false: "#767577", true: "#81b0ff" }}
                          thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                          ios_backgroundColor="#3e3e3e"
                          onValueChange={() =>
                            setIsEnabled((prev: any) => !prev)
                          }
                          value={isEnabled}
                        />
                      </View>
                    </View>
                    <TouchableOpacity
                      // onPress={handleCreateChapter}
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
                        Save
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            )}
            style={{
              paddingHorizontal: 15,
            }}
            showsVerticalScrollIndicator={false}
          />
        </View>
        <View
          style={{
            bottom: 85,
            backgroundColor: Color.textWhite,
            paddingHorizontal: 40,
            paddingVertical: 15,
            position: "absolute",
            zIndex: 20,
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 30,
          }}
        >
          <TouchableOpacity
            style={{
              flexDirection: "column",
              alignItems: "center",
            }}
            activeOpacity={0.5}
            onPress={() => {
              navigation.navigate("SelectedCourse");
            }}
          >
            <AntDesign name="folderopen" size={16} color="black" />
            <Text
              style={{
                color: Color.textPrim,
                fontSize: FontSize.medium12pxMed_size,
              }}
            >
              Courses
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flexDirection: "column",
              alignItems: "center",
            }}
            activeOpacity={0.5}
          >
            <Feather name="activity" size={16} color="black" />
            <Text
              style={{
                color: Color.textPrim,
                fontSize: FontSize.medium12pxMed_size,
              }}
            >
              Activity
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Tags");
            }}
            style={{
              flexDirection: "column",
              alignItems: "center",
            }}
            activeOpacity={0.5}
          >
            <Octicons name="hash" size={16} color="black" />
            <Text
              style={{
                color: Color.textPrim,
                fontSize: FontSize.medium12pxMed_size,
              }}
            >
              Tags
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flexDirection: "column",
              alignItems: "center",
            }}
            activeOpacity={0.5}
          >
            <Ionicons name="add-circle-outline" size={16} color="black" />
            <Text
              style={{
                color: Color.textPrim,
                fontSize: FontSize.medium12pxMed_size,
              }}
            >
              Ask Something
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <Modal
        isVisible={open !== ""}
        onSwipeComplete={() => setOpen("")}
        onBackdropPress={() => setOpen("")}
        onBackButtonPress={() => setOpen("")}
      >
        {open === "more options" && (
          <MoreTagsOptions
            setOpen={setOpen}
            selectedTag={selectedCourse}
            handleDeleteClick={handleDeleteClick}
            handleUpdateClick={handleUpdateClick}
            handleStatusChange={handleStatusChange}
          />
        )}
      </Modal>
    </>
  );
}
