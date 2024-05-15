import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import React from "react";
import { Color } from "../../GlobalStyles";

const BottomNavTaskButton = ({
  label = "Click",
  icon: IconComponent,
  iconName = "click",
  color = "black",
  size = 30,
  iconPosition = "normal",
  onSubmit,
}: any) => {
  const styles = StyleSheet.create({
    btnContainer: {
      backgroundColor: Color.cardBg,
      flexDirection: iconPosition === "reverse" ? "row-reverse" : "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 5,
      padding: 4,
      paddingVertical: 10,
      borderRadius: 50,
      width: "30%",
    },
    label: {
      fontSize: 12,
    },
  });
  return (
    <View style={styles.btnContainer}>
      {IconComponent && (
        <IconComponent name={iconName} color={color} size={size} />
      )}
      <TouchableOpacity onPress={onSubmit}>
        <Text style={styles.label}>{label}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BottomNavTaskButton;
