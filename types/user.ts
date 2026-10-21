export type RegisterUserData = {
  name: string;
  email: string;
  password: string;
};

export type User = {
  _id: string;
  name: string;
  email: string;
  avatarUrl?: string;
};