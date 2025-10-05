import { IQuiz, IQuizCreate } from '@/types/Quiz';
import { quizService } from '../configs';

class QuizService {
  private baseUrl = 'api/v1/quizzes';

  public getAllOfUser() {
    return quizService.get<IQuiz[]>(this.baseUrl + '/mine');
  }

  public create(body: IQuizCreate) {
    return quizService.post<IQuiz>(this.baseUrl, body);
  }
}

export default new QuizService();
