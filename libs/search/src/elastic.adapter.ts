// Skeleton for Elasticsearch adapter
import { SearchPort, Indexable } from './search.port';

export class ElasticAdapter implements SearchPort {
  async indexMany(items: Indexable[]) { /* call Elasticsearch */ }
  async search(query: string) { return []; }
  async deleteById(id: string) { /* call Elasticsearch */ }
}
