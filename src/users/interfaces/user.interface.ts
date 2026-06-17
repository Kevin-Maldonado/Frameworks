export type Role = 'STUDENT' | 'MENTOR';

export interface User {
  id: number;
  email: string;
  name: string;
  role: Role;
  isActive: boolean;
}
