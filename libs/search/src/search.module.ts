import { Module, Provider } from '@nestjs/common';
import { AlgoliaAdapter } from './algolia.adapter';
import { ElasticAdapter } from './elastic.adapter';

export const SEARCH_PORT = 'SEARCH_PORT';

const adapterFactory: Provider = {
  provide: SEARCH_PORT,
  useFactory: () => {
    const provider = process.env.SEARCH_PROVIDER || 'elastic';
    switch (provider) {
      case 'algolia':
        return new AlgoliaAdapter();
      default:
        return new ElasticAdapter();
    }
  },
};

@Module({ providers: [adapterFactory], exports: [adapterFactory] })
export class SearchModule {}
