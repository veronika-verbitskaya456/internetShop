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
