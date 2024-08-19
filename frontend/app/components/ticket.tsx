import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Typography,
} from '@mui/material';
import { ITicket } from '../interfaces/ticket.interface';
import dayjs from 'dayjs';

interface IProps {
  ticket: ITicket;
  onRemoveCC: (ticketId: number) => void;
}

const styles = {
  card: {
    display: 'flex',
    flexDirection: 'column',
    height: '40vh',
  },
  title: {
    height: '3em', // 2 lines height (1.8em per line)
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 2,
  },
  content: {
    flexGrow: 1,
    overflow: 'scroll',
  },
  actions: {
    marginTop: 'auto',
  },
};

export function Ticket({ ticket, onRemoveCC }: IProps) {
  return (
    <Card sx={styles.card}>
      <CardHeader
        title={
          <>
            <Typography
              variant='h6'
              sx={styles.title}
            >
              {ticket.subject}
            </Typography>
            <Typography
              variant='caption'
              gutterBottom
            >
              Created at {dayjs(ticket.createdAt).format('MMM DD')}
            </Typography>
          </>
        }
      />
      <Divider />
      <CardContent sx={styles.content}>
        <Typography variant='body2'>{ticket.description}</Typography>
      </CardContent>
      <Divider />
      <CardActions sx={styles.actions}>
        <Button
          size='small'
          variant='outlined'
          color='error'
          onClick={() => onRemoveCC(ticket.id)}
        >
          Remove from CC
        </Button>
      </CardActions>
    </Card>
  );
}
