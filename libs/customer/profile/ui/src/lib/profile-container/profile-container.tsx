import { useSuspenseQuery } from '@tanstack/react-query';
import { profileQueries } from '../queries/profile.queries';
import { ProfileView } from '../profile-view/profile-view';
import { Box, Container } from '@mui/material';
import { EditableContent } from '@onboarding-course/customer-common-ui';
import { ProfileEditForm } from '../profile-edit-form/profile-edit-form';
import { useState } from 'react';
import { UserProfile, UpdateProfileDto } from '@onboarding-course/customer-profile-domain';
import { ProfileHttpRepository } from '@onboarding-course/customer-profile-infrastructure';
import { UpdateProfileUseCase } from '@onboarding-course/customer-profile-application';



export const ProfileContainer = () => {
  const profileRepository = new ProfileHttpRepository(ProfileHttpRepository.getApiUrl());
  const updateProfileUseCase = new UpdateProfileUseCase(profileRepository);

  const [updatedUser, setUpdatedUser] = useState<UpdateProfileDto>({});
  const [isEditing, setIsEditing] = useState(false);
  const handleEdit = () => setIsEditing(true);
  const handleCancel = () => setIsEditing(false);


  //HACK to make sure we have the latest user data when saving because we are using a local state to store the updated user
  const handleSave = (updatedUser: UpdateProfileDto) => { 
    setIsEditing(false);  
    //override user with updatedUser
    setUpdatedUser(updatedUser);
    return updateProfileUseCase.execute(user.id,updatedUser); 
  };

  const overrideUser = (user: UserProfile) => ({
    ...user,
    ...updatedUser,
  }) as UserProfile;

  const { data: user } = useSuspenseQuery(profileQueries.details());
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
