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

export type ProductCategory = {
  id: number;
  name: string;
  image: string;
  slug: string;
};

export type Product = {
  id: number;
  title: string;
  slug: string;
  price: number;
  description: string;
  category: ProductCategory;
  images: Array<string>;
};

export type ProductResponse = {
  id: number;
  title: string | null;
  slug: string | null;
  price: number;
  description: string | null;
  category: ProductCategory;
  images: Array<string> | null;
};
