export interface IUserLogin {
  email: string;
  password: string;
}

export interface IUserRegister {
  name: string;
  email: string;
  nickname: string;
  password: string;
}

export interface IUserRegisterRes extends IUser, IUserTokens {}

export interface IUserTokens {
  accessToken: string;
  refreshToken: string;
}

export interface IUser {
  id: string;
  name: string;
  nickname: string;
  email: string;
}
