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
  async checkOrCreateUser(id: string, user: UserCreationAttributes): Promise<UserAttributes | null> {
    const search = await this.findById(id);
    if (!search) {
      return search;
    }
    const created = await this.create(user);
    return created;
  }
}

export default new UserRepository();