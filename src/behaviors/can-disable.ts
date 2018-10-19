import {BaseBehavior, Constructor} from './behavior';

export interface CanDisableAdapter {
  disabled: boolean;
}

export interface CanDisable extends BaseBehavior<CanDisableAdapter> {
  disabled: boolean;
}

export function withDisable<T extends Constructor<BaseBehavior<CanDisableAdapter>>>(Base: T): T & Constructor<CanDisable> {
  return class extends Base implements CanDisable {
    get disabled()  {
      return this.adapter.disabled;
    }
    set disabled(value: boolean) {
      this.adapter.disabled = value;
    }
  };
}
