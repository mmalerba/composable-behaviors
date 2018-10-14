import {Control} from './control';
import {HasValue, withValue} from './has-value';
import {hasBehavior, WrappedElement} from './mixin';
import {CanDisable, withDisable} from './can-disable';

describe('Behaviors', () => {
  it('should work', () => {
    const el = document.createElement('input');
    const ctrl = new Control(el);
    expect(ctrl.disabled).toBe(false);
    expect(ctrl.value).toBe('');
    ctrl.disabled = true;
    ctrl.value = 'test';
    expect(el.disabled).toBe(true);
    expect(el.value).toBe('test');
    expect(ctrl.disabled).toBe(true);
    expect(ctrl.value).toBe('test');
  });

  it('should correctly identify behaviors', () => {
    const WrappedElWithValue = withValue(WrappedElement<Element & {value: string}>());
    const WrappedElWithDisabled = withDisable(WrappedElement<Element & {disabled: boolean}>());
    const objWithValue: unknown = new WrappedElWithValue(document.createElement('input'));
    const objWithDisabled: unknown = new WrappedElWithDisabled(document.createElement('input'));
    const objWithBoth: unknown = new Control(document.createElement('input'));
    expect(hasBehavior(objWithValue, HasValue)).toBe(true);
    expect(hasBehavior(objWithDisabled, HasValue)).toBe(false);
    expect(hasBehavior(objWithBoth, HasValue)).toBe(true);
    expect(hasBehavior(objWithValue, CanDisable)).toBe(false);
    expect(hasBehavior(objWithDisabled, CanDisable)).toBe(true);
    expect(hasBehavior(objWithBoth, CanDisable)).toBe(true);
  });
});
