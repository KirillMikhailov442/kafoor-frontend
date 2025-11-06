import { quizService } from '../configs';

class MemberService {
  private baseUrl = 'api/v1/members';

  public getQuizzes() {
    return quizService.get(`${this.baseUrl}/quizzes`);
  }
}

export default new MemberService();
