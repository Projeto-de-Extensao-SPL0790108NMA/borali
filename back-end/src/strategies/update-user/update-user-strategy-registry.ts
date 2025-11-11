import { UpdateUserStrategy } from './update-user-strategy'

export class UpdateUserStrategyRegistry {
  private static readonly strategies = new Map<string, UpdateUserStrategy>()

  static register(userType: string, strategy: UpdateUserStrategy): void {
    this.strategies.set(userType, strategy)
  }

  static get(userType: string): UpdateUserStrategy {
    const strategy = this.strategies.get(userType)

    if (!strategy) {
      throw new Error(`No strategy registered for user type: ${userType}`)
    }

    return strategy
  }
}
