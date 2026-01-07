import React, { useEffect, useState } from 'react';
import { 
  GetProfileUseCase, 
  UpdateProfileUseCase 
} from '@onboarding-course/customer-profile-application';
import { ProfileHttpRepository } from '@onboarding-course/customer-profile-infrastructure';
import { UserProfile, UpdateProfileDto } from '@onboarding-course/customer-profile-domain';
import { ProfileView } from '../profile-view/profile-view';
import { ProfileEditForm } from '../profile-edit-form/profile-edit-form';
import { Box, CircularProgress, Alert } from '@mui/material';

export const ProfileContainer: React.FC = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  // In a real app, this ID would come from auth context or URL
  const userId = '1'; 

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const repository = new ProfileHttpRepository();
      const useCase = new GetProfileUseCase(repository);
      const profile = await useCase.execute(userId);
      setUser(profile);
    } catch (err: any) {
      setError('Failed to load profile. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdate = async (data: UpdateProfileDto) => {
    setIsSaving(true);
    setError(null);
    try {
      const repository = new ProfileHttpRepository();
      const useCase = new UpdateProfileUseCase(repository);
      const updatedProfile = await useCase.execute(userId, data);
      setUser(updatedProfile);
      setIsEditing(false);
    } catch (err: any) {
      setError('Failed to update profile. Please try again.');
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" p={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error && !user) {
    return (
      <Box p={4}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  if (!user) return null;

  return (
    <Box p={2}>
      {isEditing ? (
        <ProfileEditForm 
          user={user} 
          onSubmit={handleUpdate} 
          onCancel={() => setIsEditing(false)}
          isLoading={isSaving}
          error={error}
        />
      ) : (
        <ProfileView 
          user={user} 
          onEdit={() => setIsEditing(true)} 
        />
      )}
    </Box>
  );
};
