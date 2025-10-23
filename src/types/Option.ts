export interface IOption {
  slug: string;
  text: string;
  isCorrect: boolean;
}

export interface IOptionCreate {
  questionSlug: string;
  slug: number;
  text: string;
  isCorrect: boolean;
}

export interface IOptionUpdate {
  questionSlug: string;
  slug: string;
  text: string;
  isCorrect: boolean;
}
