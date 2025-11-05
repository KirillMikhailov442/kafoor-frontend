export interface ITellMyYourself {
  socketId: string;
  userId: number;
  name: string;
  nickname: string;
}

export interface ILeaveFromQuiz {
  socketId: string;
  quizId: string;
}

export interface IAnswer {
  questionId: number;
  userId: number;
  answer: number;
}

export interface IAnswers {
  [key: number]: { questionId: number; answer: number }[];
}
