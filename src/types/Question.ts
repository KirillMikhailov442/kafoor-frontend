import { IOption } from './Option';

export interface IQuestion {
  id: string;
  text: string;
  scores: number;
  timeLimit: number;
  options?: IOption[];
}
