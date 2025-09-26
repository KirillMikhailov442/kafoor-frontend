import { IQuestion } from './Question';

export interface IQuiz {
  title: string;
  maxMember: number;
  questions?: IQuestion[];
}
