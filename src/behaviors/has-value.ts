import {Constructor, WrappedElement} from './mixin';

export interface HasValue<V> {
  value: V;
}
// Allows the interface to be passed to `hasBehavior`.
export namespace HasValue {
  export let behaviorType: HasValue<any>;
}

export function withValue<V, T extends Constructor<WrappedElement<Element & {value: V}>>>(Base: T): T & Constructor<HasValue<V>> {
  return class extends Base implements HasValue<V> {
    constructor(...args: any[]) {
      super(...args);
      this.addBehavior(HasValue);
    }

    get value() {
      return this.element.value;
    }
    set value(value: V) {
      this.element.value = value;
    }
  };
}
