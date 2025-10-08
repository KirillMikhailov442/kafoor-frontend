import { IOption } from '@/types/Option';
import { quizService } from '../configs';

class OptionService {
  private baseUrl = 'api/v1/options';

  public add(body: IOption) {
    return quizService.post<IOption>(this.baseUrl, body);
  }

  public remove(id: string) {
    return quizService.delete(`${this.baseUrl}/${id}`);
  }

  public edit(body: IOption) {
    return quizService.put<IOption>(this.baseUrl, body);
  }
}

export default new OptionService();
