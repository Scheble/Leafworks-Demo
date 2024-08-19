import { TICKETS_COLLABORATOS_KEY, USER_KEY } from '../constants';

export const buildTicketsCollaoratorsKey = (userId) =>
  `${TICKETS_COLLABORATOS_KEY}:${userId}`;

export const buildUserKey = (id) => `${USER_KEY}:${id}`;
