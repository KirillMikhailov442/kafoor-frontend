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
