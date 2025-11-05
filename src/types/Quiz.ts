import { IMember } from './Member';
import { IQuestion } from './Question';

export interface IQuiz {
  id: number;
  name: string;
  maxMembers: number;
  questions: IQuestion[];
  members: IMember[];
  endedAt: number;
  startedAt: number;
  createdAt: number;
  updatedAt: number;
  userId: number;
}

export interface IQuizCreate {
  name: string;
  maxMembers: number;
}

export interface IQuizUpdate {
  id: number;
  name: string;
  maxMembers: number;
}

export interface IQuizStart {
  quizId: number;
  users: number[];
}

export interface IQuizMemberAnswer {
  questionId: number;
  answer: number;
}

export interface IQuizFinish {
  quizId: number;
  answers: IQuizMemberAnswer[];
}
