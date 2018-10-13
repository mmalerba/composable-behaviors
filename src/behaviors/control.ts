import {Constructor, WrappedElement} from './mixin';

export interface CanDisable {
  disabled: boolean;
}
export function CanDisable<T extends Constructor<WrappedElement<Element & {disabled: boolean}>>>(base: T):
  T & Constructor<CanDisable> {
  return class extends base implements CanDisable {
    constructor(...args: any[]) {
      super(...args);
    }

    get disabled() {
      return this.element.disabled;
    }
    set disabled(value: boolean) {
      this.element.disabled = value;
    }
  };
}

export interface HasValue<V> {
  value: V;
}
export function HasValue<V, T extends Constructor<WrappedElement<Element & {value: V}>>>(base: T):
  T & Constructor<HasValue<V>> {
  return class extends base implements HasValue<V> {
    constructor(...args: any[]) {
      super(...args);
    }

    get value() {
      return this.element.value;
    }
    set value(value: V) {
      this.element.value = value;
    }
  };
}

// Works:
const Control = HasValue(CanDisable(WrappedElement<Element & {disabled: boolean, value: string}>()));
const myControl = new Control(document.createElement('input'));

// Does not work:
// const BadControl1 = HasValue(CanDisable(WrappedElement));
// const BadControl2 = HasValue(CanDisable(WrappedElement()));
// const myBadControl = new Control(document.createElement('div'));
