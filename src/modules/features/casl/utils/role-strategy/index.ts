import { AdminRoleStrategy } from './admin';
import { UserRoleStrategy } from './user';
import { DeniedRoleStrategy } from './denied';
import { RoleStrategy } from '../../interfaces';

export class RoleStrategyFactory {
  private static roleStrategyFactoryIns: RoleStrategyFactory;

  private strategies: Record<string, RoleStrategy> = {
    admin: new AdminRoleStrategy(),
    user: new UserRoleStrategy(),
    denied: new DeniedRoleStrategy(),
  };

  public static getInstance(): RoleStrategyFactory {
    if (!this.roleStrategyFactoryIns) {
      this.roleStrategyFactoryIns = new RoleStrategyFactory();
    }

    return this.roleStrategyFactoryIns;
  }

  getStrategy(role: string): RoleStrategy {
    return this.strategies[role] || new DeniedRoleStrategy();
  }
}
