import {BaseBehavior, Constructor} from './behavior';

const idIsUnique = Symbol();

let i = 0;

export interface HasIdAdapter {
  id: string;
}

export interface HasId extends BaseBehavior<HasIdAdapter> {
  readonly id: string;
  [idIsUnique]: undefined;
}

export function withUniqueId<T extends Constructor<BaseBehavior<HasIdAdapter>>>(Base: T): T & Constructor<HasId> {
  return class extends Base implements HasId {
    [idIsUnique]: undefined;

    get id() {
      return this.adapter.id;
    }

    setup() {
      super.setup();
      this.adapter.id = this.adapter.id || `uuid-${i++}`;
    }
  };
}
