import { IMember } from './Member';
import { IOption } from './Option';
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

export interface IQuizAnswer {
  id: number;
  member: IMember;
  answer: IOption;
}

export interface IQuizRating {
  id: number;
  name: string;
  startedAt: string;
  endedAt: string;
  members: IMember[];
  questions: IQuestion[];
  answers: IQuizAnswer[];
}
