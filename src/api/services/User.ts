import {
  IUser,
  IUserLogin,
  IUserRegister,
  IUserRegisterRes,
  IUserTokens,
} from '@/types/User';
import { authService } from '../configs';

class UserService {
  private baseUrl = 'api/v1/users';

  public login(body: IUserLogin) {
    return authService.post<{ data: IUserTokens }>(
      this.baseUrl + '/login',
      body,
    );
  }

  public register(body: IUserRegister) {
    return authService.post<{ data: IUserRegisterRes }>(this.baseUrl, body);
  }
}

export default new UserService();
