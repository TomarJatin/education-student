export interface AssignmentsType {
  _id: string;
  assignmentDuration: string;
  assignmentGrading: string;
  assignmentName: string;
  assignmentSolution: string;
  assignmentType: string;
  assignmentUIType: string;
  startTime: string;
  endTime: string;
  chapterId: string;
  questions: any[];
  status: number;
  totalMarks: string;
}
