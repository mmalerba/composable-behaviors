export type Constructor<T> = new (...args: any[]) => T;

export interface BaseBehavior<T = {}> {
  adapter: T;
  setup(): void;
  teardown(): void;
}
export function baseBehavior<T>(): new(element: T) => BaseBehavior<T> {
  return BaseBehaviorImpl;
}

// Common base that all mixins build off of.
class BaseBehaviorImpl<T> {
  constructor(public adapter: T) {}

  setup() {}

  teardown() {}
}
