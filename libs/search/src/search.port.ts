export type Indexable = { id: string; type: string; payload: Record<string, any> };

export interface SearchPort {
  indexMany(items: Indexable[]): Promise<void>;
  search(query: string, params?: Record<string, any>): Promise<any[]>;
  deleteById(id: string): Promise<void>;
}
