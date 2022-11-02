export interface Repository<I, O> {
  create(data: I): Promise<O>;
  update(id: string, data: Partial<I>): Promise<O>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<O | null>;
  findAll(): Promise<O[]>;
}

export default class BaseRepository<I, O> implements Repository<I, O> {
  private data: O[];

  constructor(data?: O[]) {
    this.data = data || [];
  }

  async create(data: I): Promise<O> {
    const newItem = { 
      ...data, 
      id: Math.random().toString(36).substr(2, 9)
    };
    this.data.push(newItem as O);
    return Promise.resolve(newItem as O);
  }

  async update(id: string, data: Partial<I>): Promise<O> {
    const item = this.data.find((item: any) => item.id === id);
    if (!item) {
      throw new Error(`Resource with id ${id} not found`);
    }
    const updatedItem = { ...item, ...data };
    this.data = this.data.map((item: any) => item.id === id ? updatedItem : item);
    return Promise.resolve(updatedItem);
  }

  async delete(id: string): Promise<void> {
    this.data = this.data.filter((item: any) => item.id !== id);
    return Promise.resolve();
  }

  async findById(id: string): Promise<O | null> {
    const item = this.data.find((item: any) => item.id === id) || null;
    return Promise.resolve(item);
  }

  async findAll(): Promise<O[]> {
    return Promise.resolve(this.data);
  }
  
}