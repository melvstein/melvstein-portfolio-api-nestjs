export class UserProfileDto {
  readonly id!: number;
  readonly userId!: number;
  readonly firstName!: string;
  readonly middleName?: string;
  readonly lastName!: string;
  readonly contactNumber!: string;
  readonly dateOfBirth!: Date;
  readonly avatarUrl?: string;
  readonly createdAt!: Date;
  readonly updatedAt!: Date;
}
