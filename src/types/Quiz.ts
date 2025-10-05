import { IMember } from './Member';
import { IQuestion } from './Question';

export interface IQuiz {
  id: number;
  name: string;
  maxMember: number;
  questions: IQuestion[];
  members: IMember[];
  endedAt: number;
}

export interface IQuizCreate {
  name: string;
  maxMember: number;
}
