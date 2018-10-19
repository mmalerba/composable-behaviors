import {baseBehavior} from './behavior';
import {CanDisableAdapter, withDisable} from './can-disable';
import {HasActiveDescendantAdapter, withActiveDescendant} from './has-active-descendant';
import {HasId, HasIdAdapter, withUniqueId} from './has-id';

describe('Behaviors', () => {
  it('withDisable should work', () => {
    const Disableable = withDisable(baseBehavior<CanDisableAdapter>());
    const el = document.createElement('button');
    const disableable = new Disableable(el);
    expect(disableable.disabled).toBe(false);
    disableable.disabled = true;
    expect(el.disabled).toBe(true);
  });

  it('withUniqueId should work', () => {
    const Identifiable = withUniqueId(baseBehavior<HasIdAdapter>());
    const el = document.createElement('div');
    const identifiable = new Identifiable(el);
    identifiable.setup();
    expect(identifiable.id).toBe('uuid-0');
  });

  it('withActiveDescendant should work', () => {
    const AD = withActiveDescendant(baseBehavior<HasActiveDescendantAdapter<HasId>>());
    const Item = withUniqueId(baseBehavior<HasIdAdapter>());
    class Adapter {
      children: HasId[] = [];

      constructor(private el: Element) {
        for (let i = 0; i < el.children.length; i++) {
          this.children.push(new Item(el.children[i]));
        }
      }
    }
    const parent = document.createElement('div');
    const child1 = document.createElement('div');
    const child2 = document.createElement('div');
    const child3 = document.createElement('div');
    child1.id = 'child1';
    child2.id = 'child2';
    child3.id = 'child3';
    parent.append(child1, child2, child3);
    const ad = new AD(new Adapter(parent));

    ad.adapter.children.forEach(c => c.setup());
    ad.setup();

    ad.activateNextItem();
    ad.activateNextItem();
    expect((ad.activeDescendant as any).adapter).toBe(child2);
  });
});
