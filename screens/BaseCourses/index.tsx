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
import AddCourse from "../../components/Models/AddCourses";
import {
  getAllCourse,
  createBaseCourse,
  deleteBaseCourse,
  updateBaseCourse,
  cloneBaseCourse,
} from "../../utils/api/baseCourses";
import MoreCoursesOptions from "../../components/Models/MoreCoursesOptions";
import { CourseType } from "../../types/courses";
import { DataContext } from "../../contexts/DataContext";
import { DataContextType } from "../../types/context";
import { uploadFiles } from "../../utils/api/upload";
import CloneCourse from "../../components/Models/CloneCourse";

export default function BaseCourses({ navigation }: any) {
  const { setCourse } = useContext(DataContext) as DataContextType;
  const [open, setOpen] = useState("");
  const [allCourses, setAllCourses] = useState<CourseType[]>([]);
  const [courseName, setCourseName] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [selectedCourse, setSelectedCourse] = useState<CourseType | null>(null);
  const [updateCourse, setUpdateCourse] = useState(false);
  const [image, setImage] = useState<any>(null);
  const [publishCourse, setPublishCourse] = useState(false);
  const [sellPrice, setSellPrice] = useState("");
  const [courseDisplay, setCourseDisplay] = useState(false);
  const [discountPrice, setDiscountPrice] = useState("");
  const [communityDisplay, setCommunityDisplay] = useState(false);

  const handleCreateCourse = async () => {
    console.log("clicked");
    if (courseCode === "" || courseName === "" || !image) {
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
      courseName: courseName,
      courseCode: courseCode,
      courseType: "base",
      courseIcon: url,
      courseDisplay: String(courseDisplay),
      sellPrice: sellPrice,
      discountPrice: discountPrice,
      communityDisplay: String(communityDisplay),
      publishCourse: String(publishCourse),
    });

    console.log("course creation data: ", JSON.stringify(data));
    if (updateCourse && selectedCourse) {
      await updateBaseCourse(data, selectedCourse._id);
    } else {
      await createBaseCourse(data);
    }

    fetchAllCourses();
    setOpen("");
  };

  const handleCloneCourse = async () => {
    console.log("clicked");
    if (courseCode === "" || courseName === "" || !image || !selectedCourse) {
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
      courseId: selectedCourse?._id,
      courseName: courseName,
      courseCode: courseCode,
      courseType: "deep clone",
      courseIcon: url,
      courseDisplay: String(courseDisplay),
      sellPrice: sellPrice,
      discountPrice: discountPrice,
      communityDisplay: String(communityDisplay),
      publishCourse: String(publishCourse),
    });

    console.log("course creation data: ", JSON.stringify(data));
    await cloneBaseCourse(data);

    fetchAllCourses();
    setOpen("");
  };

  const handleUpdateClick = () => {
    if (selectedCourse) {
      setUpdateCourse(true);
      setOpen("create course");
      setCourseCode(selectedCourse.courseCode);
      setCourseName(selectedCourse.courseName);
    }
  };

  const handleCloneClick = () => {
    setOpen("clone course");
  };

  const handleDeleteClick = async () => {
    if (selectedCourse) {
      await deleteBaseCourse(selectedCourse?._id);
      fetchAllCourses();
      setOpen("");
    }
  };

  const fetchAllCourses = async () => {
    getAllCourse("base", 10, 0, "asc", 10, setAllCourses);
  };

  useEffect(() => {
    fetchAllCourses();
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
                Add Courses
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
              <View style={{ paddingBottom: 200 }}>
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
                  <Text
                    style={{
                      color: Color.textSecondary,
                      fontSize: FontSize.medium11pxMed_size,
                      fontWeight: "400",
                      marginBottom: 20,
                    }}
                  >
                    Add thumbnail for better visibility. Students may find them
                    appealing.
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "flex-end",
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => setOpen("create course")}
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
                        Create new course
                      </Text>
                      <MaterialCommunityIcons
                        name="pencil-outline"
                        size={16}
                        color="white"
                      />
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Manage Card */}
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
                      Active Courses
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

                  <FlatList
                    data={allCourses}
                    renderItem={({ item, index }) => (
                      <TouchableOpacity
                        onPress={() => {
                          setCourse({ ...item });
                          navigation.navigate("Chapters");
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
                          <Image
                            source={{
                              uri: item.courseIcon,
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
                              setSelectedCourse({ ...item });
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
        {open === "create course" && (
          <CloneCourse
            setOpen={setOpen}
            image={image}
            setImage={setImage}
            courseCode={courseCode}
            courseName={courseName}
            setCourseCode={setCourseCode}
            setCourseName={setCourseName}
            handleCreateCourse={handleCreateCourse}
            publishCourse={publishCourse}
            setPublishCourse={setPublishCourse}
            sellPrice={sellPrice}
            setSellPrice={setSellPrice}
            courseDisplay={courseDisplay}
            setCourseDisplay={setCourseDisplay}
            discountPrice={discountPrice}
            setDiscountPrice={setDiscountPrice}
            communityDisplay={communityDisplay}
            setCommunityDisplay={setCommunityDisplay}
          />
        )}
        {open === "clone course" && (
          <CloneCourse
            setOpen={setOpen}
            image={image}
            setImage={setImage}
            courseCode={courseCode}
            courseName={courseName}
            setCourseCode={setCourseCode}
            setCourseName={setCourseName}
            handleCreateCourse={handleCloneCourse}
            publishCourse={publishCourse}
            setPublishCourse={setPublishCourse}
            sellPrice={sellPrice}
            setSellPrice={setSellPrice}
            courseDisplay={courseDisplay}
            setCourseDisplay={setCourseDisplay}
            discountPrice={discountPrice}
            setDiscountPrice={setDiscountPrice}
            communityDisplay={communityDisplay}
            setCommunityDisplay={setCommunityDisplay}
          />
        )}
        {open === "more options" && (
          <MoreCoursesOptions
            setOpen={setOpen}
            selectedCourse={selectedCourse}
            handleDeleteClick={handleDeleteClick}
            handleUpdateClick={handleUpdateClick}
            handleCloneClick={handleCloneClick}
          />
        )}
      </Modal>
    </>
  );
}
