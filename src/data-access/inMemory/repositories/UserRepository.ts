import BaseRepository from "./BaseRepository";

export type UserAttributes = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string | null;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
};

export type UserCreationAttributes = Omit<UserAttributes, 'id' | 'password' | 'created_at' | 'updated_at'>;

class UserRepository extends BaseRepository<UserCreationAttributes, UserAttributes> {
  async checkOrCreateUser(user: UserCreationAttributes) {
    const items = await this.findAll();
    const search = items.find((item: any) => item.email === user.email) || null;
    if (search == null) {
      const created = await this.create(user);
      return created;
    }
    return search;
  }
}

export default new UserRepository();