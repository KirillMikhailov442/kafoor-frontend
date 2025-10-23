import { IOption } from './Option';

export interface IQuestion {
  slug: string;
  text: string;
  scores: number;
  timeLimit: number;
  options?: IOption[];
  quizId: number
}

export interface IQuestionCreate {
  questionId: number;
  quizId: number;
  text: string;
  scores: number;
  timeLimit: number;
}

export interface IQuestionUpdate {
  slug: string;
  quizId: number;
  text: string;
  scores: number;
  timeLimit: number;
}
