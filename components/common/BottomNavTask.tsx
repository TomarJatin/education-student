import { View, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";

import BottomNavTaskButton from "./BottomNavTaskButton";

const BottomNavTasks = ({ onSubmit }: any) => {
  return (
    <View style={styles.navContainer}>
      <BottomNavTaskButton
        icon={FontAwesome}
        iconName={"step-backward"}
        size={15}
        label="Previous"
        color={"black"}
      />
      {/* <BottomNavTaskButton label={"Save"} /> */}
      <BottomNavTaskButton label={"Submit"} onSubmit={onSubmit} />
      <BottomNavTaskButton
        icon={FontAwesome}
        iconName={"step-forward"}
        size={15}
        label="Next"
        color={"black"}
        iconPosition={"reverse"}
      />
    </View>
  );
};

export default BottomNavTasks;

const styles = StyleSheet.create({
  navContainer: {
    backgroundColor: "#ffffff",
    position: "absolute",
    bottom: 5,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
    width: "100%",
  },
});
