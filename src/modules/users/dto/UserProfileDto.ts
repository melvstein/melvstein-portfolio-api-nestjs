export class UserProfileDto {
  id!: number;
  userId!: number;
  firstName!: string;
  middleName?: string;
  lastName!: string;
  contactNumber!: string;
  dateOfBirth!: Date;
  avatarUrl?: string;
  createdAt!: Date;
  updatedAt!: Date;
}
