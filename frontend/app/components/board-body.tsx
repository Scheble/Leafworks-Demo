'use client';

import { Backdrop, CircularProgress, Grid } from '@mui/material';

import { useTickets } from '../hooks/useTickets';
import { ITicket } from '../interfaces/ticket.interface';
import { Ticket } from './ticket';
import { useState } from 'react';

interface IProps {
  initTickets: ITicket[];
}

export default function BoardBody({ initTickets }: IProps) {
  const [showBackdrop, setShowBackdrop] = useState(false);
  const { tickets, deleteIamCollaborator } = useTickets(initTickets);

  const onRemoveCC = async (ticketId: number) => {
    setShowBackdrop(true);
    try {
      await deleteIamCollaborator(ticketId);
    } catch (error) {
      alert('There was an error when removing from CC list');
    }
    setShowBackdrop(false);
  };

  return (
    <>
      <Grid
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      >
        {tickets.map((ticket) => (
          <Grid
            item
            key={ticket.id}
            xs={4}
          >
            <Ticket
              ticket={ticket}
              onRemoveCC={onRemoveCC}
            />
          </Grid>
        ))}
      </Grid>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={showBackdrop}
      >
        <CircularProgress color='inherit' />
      </Backdrop>
    </>
  );
}
