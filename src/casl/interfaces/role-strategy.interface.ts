export interface RoleStrategy {
  defineAbilities(can: any, cannot: any): void;
}
