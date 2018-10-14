export type Constructor<T = {}> = new (...args: any[]) => T;

const hasBehaviorSymbol = Symbol();

// Common base that all mixins build off of.
export class WrappedElementImpl<T extends Element> implements WrappedElement<T> {
  private behaviors = new Set<{}>();

  constructor(public element: T) {
    if (!(this instanceof WrappedElementImpl)) {
      return WrappedElementImpl as any;
    }
  }

  protected addBehavior(behavior: {}) {
    this.behaviors.add(behavior);
  }

  [hasBehaviorSymbol](behavior: {}) {
    return this.behaviors.has(behavior);
  }
}

// Forces user to explicitly specify `T` by calling `WrappedElement<...>()`. This is a workaround
// for the fact that the generic type info is lost if the class is passed directly.
export type WrappedElement<T extends Element> = WrappedElementImpl<T>;
export const WrappedElement = WrappedElementImpl as any as (<T extends Element>() => new (el: T) => WrappedElementImpl<T>);

// Type guard that verifies presence of a behavior
// Note: if T is a generic type we can't actually verify that the generic type matches, it's just assumed to be any
export function hasBehavior<T>(obj: unknown, behavior: {behaviorType: T}): obj is T {
  return obj instanceof WrappedElement() && obj[hasBehaviorSymbol](behavior);
}
