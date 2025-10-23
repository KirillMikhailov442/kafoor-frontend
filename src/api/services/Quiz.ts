import { IQuiz, IQuizCreate, IQuizUpdate } from '@/types/Quiz';
import { quizService } from '../configs';

class QuizService {
  private baseUrl = 'api/v1/quizzes';

  public getAllOfUser() {
    return quizService.get<IQuiz[]>(this.baseUrl + '/mine');
  }

  public create(body: IQuizCreate) {
    return quizService.post<IQuiz>(this.baseUrl, body);
  }

  public findById(id: number) {
    return quizService.get<IQuiz>(`${this.baseUrl}/${id}`);
  }

  public update(body: IQuizUpdate) {
    return quizService.put<IQuiz>(this.baseUrl, body);
  }

  public deleteById(id: string) {
    return quizService.delete<string>(`${this.baseUrl}/${id}`);
  }
}

export default new QuizService();
