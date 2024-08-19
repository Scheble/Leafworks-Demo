import dynamic from 'next/dynamic';

import { getTicketsIamCollaborator } from '../actions/tickets.actions';

const BoardBody = dynamic(() => import('./board-body'), { ssr: false });

export default async function Board() {
  const { tickets } = await getTicketsIamCollaborator();

  return <BoardBody initTickets={tickets} />;
}
