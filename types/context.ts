import { AssignmentsType } from "./assignments";
import { ChapterType } from "./chapters";
import { CourseType } from "./courses";
import { TestType } from "./test";
import { VideoType } from "./video";

export interface AuthContextType{
    auth: boolean;
    setAuth: any;
}

export interface DataContextType{
    course: CourseType | null,
    setCourse: any,
    selectedChapter: ChapterType | null;
    setSelectedChapter: any;
    selectedVideoData: VideoType | null;
    setSelectedVideo: any;
    selectedAssignment: AssignmentsType | null;
    setSelectedAssignment: any;
    selectedTest: TestType | null;
    setSelectedTest: any;
    courseScreen: string;
    setCourseScreen: any;
    selectedForumCourse: CourseType | null,
    setSelectedForumCourse: any;
}