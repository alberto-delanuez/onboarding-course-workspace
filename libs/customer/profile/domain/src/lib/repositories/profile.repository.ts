import { UserProfile } from '../models/user-profile.model';
import { UpdateProfileDto } from '../dtos/update-profile.dto';

export interface ProfileRepository {
  getProfile(): Promise<UserProfile>;
  updateProfile(id: string, data: UpdateProfileDto): Promise<UserProfile>;
}
