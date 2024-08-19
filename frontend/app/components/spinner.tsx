import { CircularProgress } from '@mui/material';

export default function Spinner() {
  return (
    <div
      style={{
        width: '100%',
        textAlign: 'center',
        marginTop: '15px',
      }}
    >
      <CircularProgress />
    </div>
  );
}
