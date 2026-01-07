import { ProfileView } from '../profile-view/profile-view';
import { Box, CircularProgress, Container, Stack, Alert } from '@mui/material';
import { EditableContent } from '@onboarding-course/customer-common-ui';
import { ProfileEditForm } from '../profile-edit-form/profile-edit-form';
import { useState } from 'react';
import { UserProfile, UpdateProfileDto } from '@onboarding-course/customer-profile-domain';
import { useUserProfileQuery } from '../queries/use-profile-query';
import { useUpdateUserProfileMutation } from '../queries/use-update-profile';
import { useIntl } from 'react-intl';

export const ProfileContainer = () => {
  const intl = useIntl();

  const { data: user, isLoading, isError } = useUserProfileQuery();

  const [updatedUser, setUpdatedUser] = useState<UpdateProfileDto>({});
  const [isEditing, setIsEditing] = useState(false);
  const handleEdit = () => setIsEditing(true);
  const handleCancel = () => setIsEditing(false);

  const updateUserProfileAsync  = useUpdateUserProfileMutation();

  //HACK to make sure we have the latest user data when saving because we are using a local state to store the updated user
  const handleSave = async (updatedUser: UpdateProfileDto) => { 
    setIsEditing(false);  
    //override user with updatedUser
    setUpdatedUser(updatedUser);
    return await updateUserProfileAsync({id: user?.id || '', data: updatedUser}); 
  };

  const overrideUser = (user: UserProfile) => ({
    ...user,
    ...updatedUser,
  }) as UserProfile;

  if (isLoading) {
    return (
      <Stack justifyContent="center" alignItems="center" spacing={2} sx={{ height: '30vh' }}>
        <CircularProgress />
      </Stack>
    );
  }

  if (isError || !user) {
    return (
      <Alert severity="error">
        {intl.formatMessage({ id: 'customer.profile.error.loading', defaultMessage: 'Error loading profile' })}
      </Alert>
    );
  }
 
  return (
    <Container maxWidth="lg">
      <Box p={2}>
        <EditableContent
          isEditing={isEditing}
          view={<ProfileView user={overrideUser(user)} onEdit={handleEdit} />}
          edit={<ProfileEditForm user={overrideUser(user)} onCancel={handleCancel} onSubmit={handleSave} />}
          />
      </Box>
    </Container>
  );
};
