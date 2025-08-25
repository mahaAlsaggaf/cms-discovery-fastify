// Skeleton for Algolia adapter
import { SearchPort, Indexable } from './search.port';

export class AlgoliaAdapter implements SearchPort {
  async indexMany(items: Indexable[]) { /* call Algolia */ }
  async search(query: string) { return []; }
  async deleteById(id: string) { /* call Algolia */ }
}
