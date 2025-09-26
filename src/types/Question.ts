import { IOption } from './Option';

export interface IQuestion {
  text: string;
  points: number;
  limit: number;
  options?: IOption[];
}
