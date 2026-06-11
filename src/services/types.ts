enum UserRole {
  CUSTOMER = "customer",
  ADMIN = "admin",
}

export type User = {
  id: number;
  email: string;
  password: string;
  name: string;
  role: UserRole;
  avatar: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  access_token: string;
  refresh_token: string;
};

