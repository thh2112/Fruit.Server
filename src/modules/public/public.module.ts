import { Module } from '@nestjs/common';
import { NewPublicModule } from './new/new.public.module';

@Module({
  imports: [NewPublicModule],
})
export class PublicModule {}
