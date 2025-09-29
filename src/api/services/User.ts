import {
  IUser,
  IUserLogin,
  IUserRegister,
  IUserRegisterRes,
  IUserTokens,
  IUserUpdate,
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

  public update(body: IUserUpdate) {
    return authService.put<{ data: IUser }>(this.baseUrl, body);
  }

  public updateTokens(refresh: string) {
    return authService.patch<{ data: IUserTokens }>(
      this.baseUrl + '/update-tkens',
      { refreshToken: refresh },
    );
  }

  public profile() {
    return authService.get(this.baseUrl + '/profile');
  }
}

export default new UserService();
