import React from 'react';
import { Box, Typography, Button, Paper, Stack } from '@mui/material';
import { UserProfile } from '@onboarding-course/customer-profile-domain';

export interface ProfileViewProps {
  user: UserProfile;
  onEdit: () => void;
}

const InfoRow = ({ label, value }: { label: string; value: string }) => (
  <Box>
    <Typography variant="subtitle2" color="textSecondary">
      {label}
    </Typography>
    <Typography variant="body1">{value}</Typography>
  </Box>
);

export const ProfileView: React.FC<ProfileViewProps> = ({ user, onEdit }) => {
  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 600, mx: 'auto' }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" component="h1">
          My Profile
        </Typography>
        <Button variant="outlined" onClick={onEdit}>
          Edit Profile
        </Button>
      </Box>

      <Stack spacing={2}>
        <Box display="grid" gridTemplateColumns="1fr 1fr" gap={2}>
          <InfoRow label="Name" value={user.name} />
          <InfoRow label="Email" value={user.email} />
        </Box>
        <Box display="grid" gridTemplateColumns="1fr 1fr" gap={2}>
          <InfoRow label="Phone" value={user.phone || '-'} />
        </Box>
        <InfoRow label="Address" value={user.address || '-'} />
      </Stack>
    </Paper>
  );
};
