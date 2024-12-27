import { Ability, AbilityBuilder, AbilityClass, ExtractSubjectType } from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { CaslAction } from 'src/constants/enums';
import { AppAbility, Subjects } from '../types/casl';
import { RoleUtil } from '../utils';
import { RoleStrategyFactory } from '../utils/role-strategy';
import { UserDto } from 'src/repositories/dtos/user/user.dto';

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: UserDto) {
    const { can, cannot, build } = new AbilityBuilder<Ability<[CaslAction, Subjects]>>(Ability as AbilityClass<AppAbility>);
    const role = RoleUtil.getInstance().getRoleType(user.role);
    const strategy = RoleStrategyFactory.getInstance().getStrategy(role);
    strategy.defineAbilities(can, cannot, user);

    return build({
      // Read https://casl.js.org/v6/en/guide/subject-type-detection#use-classes-as-subject-types for details
      detectSubjectType: item => item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
