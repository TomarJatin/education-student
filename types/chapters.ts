export interface ChapterType {
  _id: string;
  assignments: [];
  chapterComponent: string [] | null;
  chapterIcon: string;
  chapterName: string;
  courseId: string;
  notes: [];
  status: number;
  tests: [];
  videos: [];
}
