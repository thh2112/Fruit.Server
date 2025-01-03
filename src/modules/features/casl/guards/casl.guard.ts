import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { CaslAbilityFactory } from '../providers/casl-ability.factory';
import { AppAbility, PolicyHandler } from '../types';
import { CHECK_POLICIES_KEY } from '../decorators';
import { CustomForbiddenException } from 'src/interceptors/exceptions/forbidden.exception';

@Injectable()
export class PoliciesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private caslAbilityFactory: CaslAbilityFactory,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const policyHandlers = this.reflector.get<PolicyHandler[]>(CHECK_POLICIES_KEY, context.getHandler()) || [];
    const { user } = context.switchToHttp().getRequest();
    const ability = this.caslAbilityFactory.createForUser(user);

    const isAllowed = policyHandlers.every(handler => {
      return this.execPolicyHandler(handler, ability, context);
    });

    if (!isAllowed) {
      throw new CustomForbiddenException();
    }

    return isAllowed;
  }

  private execPolicyHandler(handler: PolicyHandler, ability: AppAbility, context: ExecutionContext) {
    if (typeof handler === 'function') {
      return handler(ability, context);
    }
    return handler.handle(ability, context);
  }
}
