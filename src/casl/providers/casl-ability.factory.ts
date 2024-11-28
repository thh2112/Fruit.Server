import { Ability, AbilityBuilder, AbilityClass, ExtractSubjectType } from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { CaslAction } from 'src/constants/enums';
import { Subjects } from '../types/casl';
import { RoleUtil } from '../utils';
import { RoleStrategyFactory } from '../utils/role-strategy';
import { UserDto } from 'src/providers/user/dto/user.dto';

export type AppAbility = Ability<[CaslAction, Subjects]>;
@Injectable()
export class CaslAbilityFactory {
  createForUser(user: UserDto) {
    const { can, cannot, build } = new AbilityBuilder<Ability<[CaslAction, Subjects]>>(Ability as AbilityClass<AppAbility>);
    const role = RoleUtil.getInstance().getRoleType(user.role);
    const strategy = RoleStrategyFactory.getInstance().getStrategy(role);
    strategy.defineAbilities(can, cannot);

    return build({
      // Read https://casl.js.org/v6/en/guide/subject-type-detection#use-classes-as-subject-types for details
      detectSubjectType: item => item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
