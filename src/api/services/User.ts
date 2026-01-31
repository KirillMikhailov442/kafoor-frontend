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
  private authUrl = 'api/v1/auth';

  public login(body: IUserLogin) {
    return authService.post<{ data: IUserTokens }>(
      `${this.authUrl}/login`,
      body,
    );
  }

  public register(body: IUserRegister) {
    return authService.post<{ data: IUserRegisterRes }>(
      `${this.authUrl}/register`,
      body,
    );
  }

  public update(body: IUserUpdate) {
    return authService.put<{ data: IUser }>(this.baseUrl, body);
  }

  public updateTokens(refresh: string) {
    return authService.patch<{ data: IUserTokens }>(
      `${this.authUrl}/update-tokens`,
      { refreshToken: refresh },
    );
  }

  public profile() {
    return authService.get(`${this.baseUrl}/profile`);
  }

  public getUsersByIds(usersId: number[]) {
    return authService.post(`${this.baseUrl}/by-ids`, { ids: usersId });
  }
}

export default new UserService();
