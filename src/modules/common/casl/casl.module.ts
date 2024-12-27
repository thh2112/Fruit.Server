import { Global, Module } from '@nestjs/common';
import { CaslAbilityFactory } from './providers/casl-ability.factory';

@Global()
@Module({
  providers: [CaslAbilityFactory],
  exports: [CaslAbilityFactory],
})
export class CaslModule {}
