import {BaseBehavior, Constructor} from './behavior';
import {HasChildrenAdapter} from './has-children';
import {HasId} from './has-id';

export interface HasActiveDescendantAdapter<D extends HasId> extends HasChildrenAdapter<D> {}

export interface HasActiveDescendant<D extends HasId> extends BaseBehavior<HasActiveDescendantAdapter<D>> {
  readonly activeDescendantIndex: number;
  readonly activeDescendantId: string;
  readonly activeDescendant: D | null;

  activateNextItem(): void;
  activatePreviousItem(): void;
  activateFirstItem(): void;
  activateLastItem(): void;
}

export function withActiveDescendant<T extends Constructor<BaseBehavior<HasActiveDescendantAdapter<D>>>, D extends HasId>(Base: T):
    T & Constructor<HasActiveDescendant<D>> {
  return class extends Base implements HasActiveDescendant<D> {
    activeDescendantIndex = -1;
    activeDescendantId = '';
    activeDescendant: D | null = null;

    // TODO: deal with disabled items
    // TODO: deal with wrapping either here in or in the keyscheme
    // NOTE: important to not keep a reference to the item list because it might change

    activateItem(item: D) {
      // TODO: handle item == null

      const items = this.adapter.children;
      this.activeDescendantIndex = items.indexOf(item);
      this.activeDescendantId = item.id;
      this.activeDescendant = item;
    }

    activateItemByIndex(index: number) {
      // TODO: handle array out of bounds
      this.activateItem(this.adapter.children[index]);
    }

    activateNextItem() {
      const nextIndex = (this.activeDescendantIndex + 1) % this.adapter.children.length;
      this.activateItemByIndex(nextIndex);
    }

    activatePreviousItem() {
      const length = this.adapter.children.length;
      const nextIndex = (this.activeDescendantIndex - 1 + length) % length;
      this.activateItemByIndex(nextIndex);
    }

    activateFirstItem() {
      this.activateItemByIndex(0);
    }

    activateLastItem() {
      this.activateItemByIndex(this.adapter.children.length - 1);
    }
  };
}
