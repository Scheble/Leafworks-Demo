import { IUser } from './user.interface';

export interface ITicket {
  id: number;
  createdAt: string;
  subject: string;
  description: string;
  ccUsers: IUser[];
}
