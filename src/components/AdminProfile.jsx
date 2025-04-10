import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Box, Typography, Avatar, Container, CircularProgress } from '@mui/material';
import UpdateButton from './UpdateButton';
import UpdateNotesButton from './UpdateNotesButton';

const AdminProfile = () => {
  const { user, isLoading } = useAuth0();

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        mt={6}
        p={4}
        boxShadow={3}
        borderRadius={4}
        bgcolor="white"
      >
        {/* Avatar Image */}
        <Avatar
          src={user.picture}
          alt={user.name}
          sx={{
            width: 120,
            height: 120,
            mb: 2,
          }}
        />

        {/* User Info */}
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Admin Profile
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          {user.email}
        </Typography>

        {/* Action Buttons */}
        <Box display="flex" flexDirection="column" gap={2} mt={3} width="100%">
          <UpdateButton />
          <UpdateNotesButton />
        </Box>
      </Box>
    </Container>
  );
};

export default AdminProfile;
