import * as crypto from 'node:crypto';
import DBEntity from './DBEntity';

export type ProfileEntity = {
  id: string;
  avatar: string;
  sex: string;
  birthday: number;
  country: string;
  street: string;
  city: string;
  memberTypeId: string;
  userId: string;
};
type CreateProfileDTO = Omit<ProfileEntity, 'id'>;
type ChangeProfileDTO = Partial<Omit<ProfileEntity, 'id' | 'userId'>>;

export default class DBProfiles extends DBEntity<
  ProfileEntity,
  ChangeProfileDTO,
  CreateProfileDTO
> {
  constructor() {
    super();

    this.create({
      userId: 'e63d3721-cc74-4c96-a5f0-c2d704fe0ca1',
      avatar: ';loipoipo',
      sex: 'male',
      birthday: 25,
      country: 'lkjlkjl',
      street: 'lkjlkl',
      city: 'lkjlkjlkjl',
      memberTypeId: 'basic'
    });
  }
  async create(dto: CreateProfileDTO) {
    const created: ProfileEntity = {
      ...dto,
      id: crypto.randomUUID(),
    };
    this.entities.push(created);
    return created;
  }
}
