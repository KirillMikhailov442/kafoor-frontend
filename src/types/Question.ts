import { IOption } from './Option';

export interface IQuestion {
  id: string;
  text: string;
  points: number;
  limit: number;
  options?: IOption[];
}
