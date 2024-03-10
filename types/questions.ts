export interface QuestionType {
    _id: string;
    answer: string;
    askForExplaination: string;
    assignmentId: string;
    correct: string;
    explainationType: string;
    incorrect: string;
    options: 
      {
        image: string;
        text: string;
      }[];
    question: {
      image: string;
      text: string;
    };
    questionLevel: string;
    questionType: string;
    solution: {
      image: string;
      text: string;
    };
    status: number;
  }
  