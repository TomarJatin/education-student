import "react-native-gesture-handler";
import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { RootStackParamList } from "../types/navigation";
import { useState, useEffect, useRef } from "react";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./Home";
import { AuthContext } from "../contexts";
import { AuthContextType } from "../types/context";
import Login from "./Login";
import Assignment from "./Assignment";
import AddQuestion from "./AddQuestion";
import Chapters from "./Chapters";
import { checkRefreshToken } from "../utils/api/login";
import AddVideo from "./AddVideo";
import ActiveCourses from "./ActiveCourses";
import Forum from "./Forum";
import Post from "./Post";
import SelectedCourse from "./SelectCourse";
import Tags from "./Tags";
import Testscreen from "./Testscreen";
import SubmitAssignement from "./SubmitAssignement";
import Browsescreen from "./Browsescreen";
import Video from "./Video";
import Tests from "./Tests";
import Analytics from "./Analytics";
import VideoComponent from "./Assignment/Video";
import Courses from "./Courses";
import More from "./More";
import SelectCategory from "./SelectCategory";
import Assignments from "./Assignments";
import Notes from "./Notes";
import Videos from "./Videos";
import Assignment1 from "./Assignment1";
import SingleCorrect from "./TaskScreen";

const Stack = createStackNavigator<RootStackParamList>();

export default function Route() {
  const { auth, setAuth } = React.useContext(AuthContext) as AuthContextType;

  useEffect(() => {
    checkRefreshToken(setAuth);
  }, []);

  return (
    <NavigationContainer>
      {auth ? (
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Courses"
            component={Courses}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ActiveCourses"
            component={ActiveCourses}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Assignment"
            component={Assignment}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AddQuestion"
            component={AddQuestion}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AddVideo"
            component={AddVideo}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Chapters"
            component={Chapters}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Forum"
            component={Forum}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Post"
            component={Post}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SelectedCourse"
            component={SelectedCourse}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Tags"
            component={Tags}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Testscreen"
            component={Testscreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SubmitAssignement"
            component={SubmitAssignement}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Browsescreen"
            component={Browsescreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Video"
            component={Video}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Tests"
            component={Tests}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Analytics"
            component={Analytics}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="VideoComponent"
            component={VideoComponent}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SelectCategory"
            component={SelectCategory}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="More"
            component={More}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Assignments"
            component={Assignments}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Assignment1"
            component={Assignment1}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SingleCorrect"
            component={SingleCorrect}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Notes"
            component={Notes}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Videos"
            component={Videos}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
