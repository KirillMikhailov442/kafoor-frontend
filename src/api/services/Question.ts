import { IQuestion, IQuestionCreate } from '@/types/Question';
import { quizService } from '../configs';

class QuestionService {
  private baseUrl = 'api/v1/questions';

  public getAllOfQuiz(quizId: number) {
    return quizService.get(`api/v1/questions-of-quiz/${quizId}`);
  }

  public add(body: IQuestionCreate) {
    return quizService.post<IQuestion>(this.baseUrl, body);
  }

  public remove(slug: string) {
    return quizService.delete(`${this.baseUrl}/slug/${slug}`);
  }

  public edit(body: IQuestion) {
    return quizService.put<IQuestion>(this.baseUrl, body);
  }
}

export default new QuestionService();
