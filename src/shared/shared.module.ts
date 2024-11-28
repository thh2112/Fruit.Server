import { Global, Module } from '@nestjs/common';
import _values from 'lodash/values';

import * as providers from './providers';
import { RoleModule } from './modules/role/role.module';
import { UserModule } from './modules/user/user.module';

@Global()
@Module({
  imports: [RoleModule, UserModule],
  providers: _values(providers),
  exports: [..._values(providers), RoleModule, UserModule],
})
export class SharedModule {}
