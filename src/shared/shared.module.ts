import { Global, Module } from '@nestjs/common';
import _values from 'lodash/values';

import * as providers from './providers';
import * as utils from './utils';

@Global()
@Module({
  imports: [],
  providers: [..._values(providers), ..._values(utils)],
  exports: [..._values(providers), ..._values(utils)],
})
export class SharedModule {}
