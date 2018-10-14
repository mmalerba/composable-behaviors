import {WrappedElement} from './mixin';
import {withValue} from './has-value';
import {withDisable} from './can-disable';

const ControlBase = withDisable(WrappedElement<Element & {disabled: boolean, value: string}>());
export class Control extends withValue<string, typeof ControlBase>(ControlBase) {}

// Note: if we try to do:
// `class Control extends withValue(withDisable(WrappedElement<Element & {disabled: boolean, value: string}>())) {}`
// we lose the generic type for `value`.
