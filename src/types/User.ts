export interface IUserLogin {
  email: string;
  password: string;
}

export interface IUserRegister {
  name: string;
  email: string;
  nickname: string;
  password: string;
  role: 'STUDENT' | 'TEACHER';
}

export interface IUserRegisterRes extends IUser, IUserTokens {}

export interface IUserTokens {
  accessToken: string;
  refreshToken: string;
}

export interface IUser {
  id: number;
  name: string;
  nickname: string;
  email: string;
  confirmed: boolean;
  roles: string[];
}

export interface IUserUpdate
  extends Pick<IUser, 'name' | 'email' | 'nickname'> {}
