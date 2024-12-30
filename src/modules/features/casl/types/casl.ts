import { Ability, InferSubjects } from '@casl/ability';
import { CaslAction, CaslSubjectAll } from 'src/constants/enums';
import { ExecutionContext } from '@nestjs/common';
import { UserDto } from 'src/modules/features//user/dtos';
import { RoleDto } from 'src/modules/features//role/dtos';
import { NewsDto } from 'src/modules/features//news/dtos';
import { CategoryDto } from '../../product-management/category/dtos/category.dto';

type InferModelSubjects = typeof UserDto | typeof RoleDto | typeof NewsDto | typeof CategoryDto;

export type Subjects = InferSubjects<InferModelSubjects> | typeof CaslSubjectAll;
export type AppAbility = Ability<[CaslAction, Subjects]>;

interface IPolicyHandler {
  handle(ability: AppAbility, context?: ExecutionContext): boolean;
}

type PolicyHandlerCallback = (ability: AppAbility, context?: ExecutionContext) => boolean;

export type PolicyHandler = IPolicyHandler | PolicyHandlerCallback;
