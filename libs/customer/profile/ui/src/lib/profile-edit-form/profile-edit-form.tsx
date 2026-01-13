import { Box, Button, TextField, Typography, Paper, Alert } from '@mui/material';
import { UpdateProfileDto, UserProfile } from '@onboarding-course/customer-profile-domain';
import { useIntl } from 'react-intl';
import { useProfileForm } from './form/useProfileForm';
import { Controller } from 'react-hook-form';

export interface ProfileEditFormProps {
  user: UserProfile;
  onSubmit: (data: UpdateProfileDto) => Promise<UserProfile>;
  onCancel: () => void;
}

export const ProfileEditForm: React.FC<ProfileEditFormProps> = ({ 
  user, 
  onSubmit, 
  onCancel
}) => {
  const intl = useIntl();

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useProfileForm(user);


  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 600, mx: 'auto' }}>
      <Typography variant="h5" component="h1" gutterBottom>
        {intl.formatMessage({ id: 'customer.profile.editProfile' })}
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller 
          name="firstName"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={intl.formatMessage({ id: 'customer.edit-profile.firstName' })}
              fullWidth
              margin="normal"
              disabled={isSubmitting}
              data-hook="firstName"
            />
          )}
        />
        {errors.firstName && (
          <Alert severity="error" sx={{ mb: 1 }}>
            {errors.firstName.message}
          </Alert>
        )}
        <Controller
          name="lastName"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={intl.formatMessage({ id: 'customer.edit-profile.lastName' })}
              fullWidth
              margin="normal"
              disabled={isSubmitting}
              data-hook="lastName"
            />
          )}
        />
        {errors.lastName && (
          <Alert severity="error" sx={{ mb: 1 }}>
            {errors.lastName.message}
          </Alert>
        )}
        <Controller
          name="phone"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={intl.formatMessage({ id: 'customer.edit-profile.phone' })}
              fullWidth
              margin="normal"
              disabled={isSubmitting}
              data-hook="phone"
            />
          )}
        />
        {errors.phone && (
          <Alert severity="error" sx={{ mb: 1 }}>
            {errors.phone.message}
          </Alert>
        )}
        <Controller
          name="address.address"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={intl.formatMessage({ id: 'customer.edit-profile.address' })}
              fullWidth
              margin="normal"
              disabled={isSubmitting}
              data-hook="address.address"
            />
          )}
        />
        <Controller
          name="address.city"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={intl.formatMessage({ id: 'customer.edit-profile.city' })}
              fullWidth
              margin="normal"
              disabled={isSubmitting}
              data-hook="address.city"
            />
          )}
        />
        <Controller
          name="address.state"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={intl.formatMessage({ id: 'customer.edit-profile.state' })}
              fullWidth
              margin="normal"             
              disabled={isSubmitting}
              data-hook="address.state"
            />
          )}
        />
        <Controller
          name="address.postalCode"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={intl.formatMessage({ id: 'customer.edit-profile.postalCode' })}
              fullWidth
              margin="normal"
              disabled={isSubmitting}
              data-hook="address.postalCode"
            />
          )}
        />
        
        <Box display="flex" justifyContent="flex-end" gap={2} mt={3}>
          <Button 
            variant="outlined" 
            onClick={onCancel}
            disabled={isSubmitting}
            data-hook="cancel"
          >
            {intl.formatMessage({ id: 'customer.edit-profile.cancel' })}
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isSubmitting}
            data-hook="submit"
          >
            {intl.formatMessage({ id: 'customer.edit-profile.saveChanges' })}
          </Button>
        </Box>
      </form>
    </Paper>
  );
};
