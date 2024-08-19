import cache from '../cache';
import { USER_KEY } from '../constants';
import { buildUserKey } from '../helpers/cache.helper';
import ZendeskService from './zendesk.service';

export default class UsersService {
  constructor() {
    this.zendeskService = new ZendeskService();
  }

  async getUsers(ids) {
    const cacheUsers = (
      await Promise.all(ids.map((id) => cache.get(`${USER_KEY}:${id}`)))
    )
      .filter(Boolean)
      .map((user) => JSON.parse(user));

    let restIds = ids;

    if (cacheUsers.length) {
      restIds = ids.filter((id) => !cacheUsers.some((user) => user.id === id));
    }
    const users = restIds.length
      ? await this.zendeskService.getUsers(restIds)
      : [];

    await Promise.all(
      users.map((user) =>
        cache.set(buildUserKey(user.id), JSON.stringify(user))
      )
    );

    return [...cacheUsers, ...users];
  }
}
