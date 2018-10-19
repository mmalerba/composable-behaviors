import {BaseBehavior} from './behavior';

export interface HasChildrenAdapter<T extends BaseBehavior> {
  readonly children: ReadonlyArray<T>;
}

export interface HasChildren<T extends BaseBehavior> extends BaseBehavior<HasChildrenAdapter<T>> {
  readonly children: ReadonlyArray<T>;
}
