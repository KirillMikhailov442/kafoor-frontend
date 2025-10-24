export interface IOption {
  slug: string;
  text: string;
  correct: boolean;
}

export interface IOptionCreate {
  questionSlug: string;
  slug: number;
  text: string;
  correct: boolean;
}

export interface IOptionUpdate {
  questionSlug: string;
  slug: string;
  text: string;
  correct: boolean;
}
