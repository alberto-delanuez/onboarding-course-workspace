import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Paper, Alert } from '@mui/material';
import { UpdateProfileDto, UserProfile } from '@onboarding-course/customer-profile-domain';

export interface ProfileEditFormProps {
  user: UserProfile;
  onSubmit: (data: UpdateProfileDto) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
  error?: string | null;
}

export const ProfileEditForm: React.FC<ProfileEditFormProps> = ({ 
  user, 
  onSubmit, 
  onCancel, 
  isLoading = false,
  error = null 
}) => {
  const [formData, setFormData] = useState<UpdateProfileDto>({
    name: user.name,
    phone: user.phone,
    address: user.address,
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 600, mx: 'auto' }}>
      <Typography variant="h5" component="h1" gutterBottom>
        Edit Profile
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          name="name"
          fullWidth
          margin="normal"
          value={formData.name || ''}
          onChange={handleChange}
          required
          disabled={isLoading}
        />
        <TextField
          label="Phone"
          name="phone"
          fullWidth
          margin="normal"
          value={formData.phone || ''}
          onChange={handleChange}
          disabled={isLoading}
        />
        <TextField
          label="Address"
          name="address"
          fullWidth
          margin="normal"
          value={formData.address || ''}
          onChange={handleChange}
          multiline
          rows={3}
          disabled={isLoading}
        />
        
        <Box display="flex" justifyContent="flex-end" gap={2} mt={3}>
          <Button 
            variant="outlined" 
            onClick={onCancel}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isLoading}
          >
            {isLoading ? 'Saving...' : 'Save Changes'}
          </Button>
        </Box>
      </form>
    </Paper>
  );
};
