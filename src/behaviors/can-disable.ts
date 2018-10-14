import {Constructor, WrappedElement} from './mixin';

export interface CanDisable {
  disabled: boolean;
}
// Allows the interface to be passed to `hasBehavior`.
export namespace CanDisable {
  export let behaviorType: CanDisable;
}

export function withDisable<T extends Constructor<WrappedElement<Element & {disabled: boolean}>>>(Base: T): T & Constructor<CanDisable> {
  return class extends Base implements CanDisable {
    constructor(...args: any[]) {
      super(...args);
      this.addBehavior(CanDisable);
    }

    get disabled() {
      return this.element.disabled;
    }
    set disabled(value: boolean) {
      this.element.disabled = value;
    }
  };
}
