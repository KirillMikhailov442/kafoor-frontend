import { IOption, IOptionCreate, IOptionUpdate } from '@/types/Option';
import { quizService } from '../configs';

class OptionService {
  private baseUrl = 'api/v1/options';

  public getAllOfQuestion(questionId: string) {
    return quizService.get(`api/v1/options-of-question/${questionId}`);
  }

  public add(body: IOptionCreate) {
    return quizService.post<IOption>(this.baseUrl, body);
  }

  public remove(slug: string) {
    return quizService.delete(`${this.baseUrl}/slug/${slug}`);
  }

  public edit(body: IOptionUpdate) {
    return quizService.put<IOption>(this.baseUrl, body);
  }
}

export default new OptionService();
