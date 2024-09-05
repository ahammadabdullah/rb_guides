export type User = {
  id: string;
  name: string;
  email: string;
  image: string;
  role?: string;
  about?: string;
  age?: number;
  location?: Array<string>;
};
