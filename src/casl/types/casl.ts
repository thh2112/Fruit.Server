import { Ability, InferSubjects } from '@casl/ability';
import { CaslAction, CaslSubjectAll } from 'src/constants/enums';
import { ExecutionContext } from '@nestjs/common';
import { UserDto } from 'src/repositories/dtos/user/user.dto';
import { RoleDto } from 'src/repositories/dtos/role/role.dto';
import { NewDto } from 'src/repositories/dtos/new/new.dto';

type InferModelSubjects = typeof UserDto | typeof RoleDto | typeof NewDto;

export type Subjects = InferSubjects<InferModelSubjects> | typeof CaslSubjectAll;
export type AppAbility = Ability<[CaslAction, Subjects]>;

interface IPolicyHandler {
  handle(ability: AppAbility, context?: ExecutionContext): boolean;
}

type PolicyHandlerCallback = (ability: AppAbility, context?: ExecutionContext) => boolean;

export type PolicyHandler = IPolicyHandler | PolicyHandlerCallback;
