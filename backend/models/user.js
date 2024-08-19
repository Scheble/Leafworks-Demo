import { Photo } from './photo';

export default class User {
  constructor(user) {
    this.id = user.id;
    this.name = user.name;
    this.photo = user.photo ? new Photo(user.photo) : undefined;
  }
}
