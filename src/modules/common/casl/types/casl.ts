import { Ability, InferSubjects } from '@casl/ability';
import { CaslAction, CaslSubjectAll } from 'src/constants/enums';
import { ExecutionContext } from '@nestjs/common';
import { UserDto } from 'src/modules/common//user/dtos';
import { RoleDto } from 'src/modules/common//role/dtos';
import { NewsDto } from 'src/modules/common//news/dtos';

type InferModelSubjects = typeof UserDto | typeof RoleDto | typeof NewsDto;

export type Subjects = InferSubjects<InferModelSubjects> | typeof CaslSubjectAll;
export type AppAbility = Ability<[CaslAction, Subjects]>;

interface IPolicyHandler {
  handle(ability: AppAbility, context?: ExecutionContext): boolean;
}

type PolicyHandlerCallback = (ability: AppAbility, context?: ExecutionContext) => boolean;

export type PolicyHandler = IPolicyHandler | PolicyHandlerCallback;
