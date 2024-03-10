export interface TagType {
  _id: string;
  courseId: string;
  postAccess: {
    instructor: boolean;
    student: boolean;
  };
  status: number;
  tagName: string;
}
