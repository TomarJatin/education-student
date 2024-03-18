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
import { AssignmentsType } from "../../types/assignments";
import { DataContext } from "../../contexts/DataContext";
import { DataContextType } from "../../types/context";
import { getAllAssignments, handleUpdateAssignments } from "../../utils/api/assignments";
import DraggableFlatList, {
  ScaleDecorator,
  RenderItemParams,
} from "react-native-draggable-flatlist";

interface AssignmentsProps {
  navigation: any;
  setCurrSelectedAssignment: any;
  setOpen: any;
  setTab: any;
  fetchAllAssignments: any;
  allAssignments: AssignmentsType[];
  setAllAssignments: any;
}

export default function Assignments({
  navigation,
  setCurrSelectedAssignment,
  setOpen,
  setTab,
  fetchAllAssignments,
  allAssignments,
  setAllAssignments,
}: AssignmentsProps) {
  const { selectedChapter, setSelectedAssignment, courseScreen } = useContext(
    DataContext
  ) as DataContextType;
  const [isActive, setIsActive] = useState(false);

  const renderItem = ({
    item,
    drag,
    isActive,
  }: RenderItemParams<AssignmentsType>) => {
    return (
      <ScaleDecorator>
        <TouchableOpacity
        disabled={isActive}
        onLongPress={drag}
              onPress={() => {
                setTab("add questions");
                setSelectedAssignment({ ...item });
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
                  {item.assignmentName}
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
                    setCurrSelectedAssignment({ ...item });
                    setOpen("more assignment options");
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

  const handleStatusChange = async (item: AssignmentsType, status: number) => {
    let _allAssignments = allAssignments;
    const index = _allAssignments.findIndex((chapter) => chapter === item);
    console.log("index: ", index)
    _allAssignments[index].status = status;
    setAllAssignments([..._allAssignments]);
    const data = JSON.stringify({ ...item, status: status });
    await handleUpdateAssignments(data, item._id);
  };

  useEffect(() => {
    fetchAllAssignments();
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
        
        {courseScreen !== "base" && (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: Color.buttonBg,
              fontSize: FontSize.medium12pxMed_size,
              fontWeight: "600",
            }}
          >
            Assignments
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
          data={courseScreen === "base" ? allAssignments: isActive ? allAssignments.filter((item) => item.status === 1): allAssignments.filter((item) => item.status === 0)}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
          onDragEnd={({ data }) => {
            setAllAssignments(data);
          }}
        />
      </View>
    </View>
  );
}
