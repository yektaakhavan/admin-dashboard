export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

// Data needed to create a user. The server assigns the id.
export type NewUser = Omit<User, 'id'>;
