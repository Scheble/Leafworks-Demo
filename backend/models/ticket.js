import User from './user';

export default class Ticket {
  constructor(ticket, ccUsers) {
    this.id = ticket.id;
    this.createdAt = ticket.created_at;
    this.subject = ticket.subject;
    this.description = ticket.description;

    this.ccUsers = ccUsers.map((user) => new User(user));
  }
}
