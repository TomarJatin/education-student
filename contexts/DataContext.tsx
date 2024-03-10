import React, { createContext, useState, useEffect } from "react";
import { AuthContextType, DataContextType } from "../types/context";
import { CourseType } from "../types/courses";
import { ChapterType } from "../types/chapters";
import { VideoType } from "../types/video";
import { AssignmentsType } from "../types/assignments";
import { TestType } from "../types/test";

// Define the context
const DataContext = createContext<DataContextType | null>(null);

// Data Provider component
const DataProvider= ({ children }: any) => {
  const [course, setCourse] = useState<CourseType | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<ChapterType | null>(null);
  const [selectedVideoData, setSelectedVideo] = useState<VideoType | null>(null);
  const [selectedAssignment, setSelectedAssignment] = useState<AssignmentsType | null>(null);
  const [selectedTest, setSelectedTest] = useState<TestType | null>(null);
  const [courseScreen, setCourseScreen] = useState("base");
  const [selectedForumCourse, setSelectedForumCourse] = useState<CourseType | null>(null);

  return (
    <DataContext.Provider
      value={{
        course,
        selectedChapter,
        selectedVideoData,
        selectedAssignment,
        selectedTest,
        courseScreen,
        selectedForumCourse,
        setCourse,
        setSelectedAssignment,
        setSelectedTest,
        setSelectedChapter,
        setSelectedVideo,
        setCourseScreen,
        setSelectedForumCourse
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export { DataContext, DataProvider };