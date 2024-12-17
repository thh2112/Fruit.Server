import { Global, Module } from '@nestjs/common';
import _values from 'lodash/values';

import * as providers from './providers';
import * as utils from './utils';
import * as pipes from './pipes';

@Global()
@Module({
  imports: [],
  providers: [..._values(providers), ..._values(utils), ..._values(pipes)],
  exports: [..._values(providers), ..._values(utils), ..._values(pipes)],
})
export class SharedModule {}
