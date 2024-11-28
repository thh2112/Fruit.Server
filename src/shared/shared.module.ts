import { Global, Module } from '@nestjs/common';
import _values from 'lodash/values';

import * as providers from './providers';

@Global()
@Module({
  imports: [],
  providers: _values(providers),
  exports: [..._values(providers)],
})
export class SharedModule {}
