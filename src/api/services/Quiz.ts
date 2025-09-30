import { quizService } from '../configs';

class QuizService {
  private baseUrl = 'api/v1/quizzes';

  public getAllOfUser() {
    return quizService.get(this.baseUrl);
  }
}

export default new QuizService();
