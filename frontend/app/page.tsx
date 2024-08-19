import React from 'react';
import { Box, Container, CssBaseline } from '@mui/material';

import Board from './components/board';
import Header from './components/header';
import Spinner from './components/spinner';

export default function Home() {
  return (
    <React.StrictMode>
      <CssBaseline />
      <Header />
      <Container maxWidth='lg'>
        <Box sx={{ bgcolor: '#cfe8fc', minHeight: '100vh', p: 5 }}>
          <React.Suspense fallback={<Spinner />}>
            <Board />
          </React.Suspense>
        </Box>
      </Container>
    </React.StrictMode>
  );
}
