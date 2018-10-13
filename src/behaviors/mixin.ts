export type Constructor<T = {}> = new (...args: any[]) => T;

// Common base that all mixins build off of.
export class WrappedElementImpl<T extends Element> implements WrappedElement<T> {
  constructor(public element: T) {
    if (this.constructor !== WrappedElementImpl) {
      return WrappedElementImpl as any;
    }
  }
}

// Forces user to explicitly specify `T` by calling `WrappedElement<...>()`
export type WrappedElement<T extends Element> = WrappedElementImpl<T>;
export const WrappedElement =
    WrappedElementImpl as any as (<T extends Element>() => new (el: T) => WrappedElementImpl<T>);
