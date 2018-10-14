import {Control} from './control';
import {CanDisable, withDisable} from './can-disable';
import {hasBehavior, WrappedElement} from './mixin';

// fails: div doesn't have disable, value.
let _: any = new Control(document.createElement('div'));
// works: input has correct properties.
_ = new Control(document.createElement('input'));

// fails: passing the WrappedElement class directly is not allowed
_ = withDisable(WrappedElement);
// fails: calling the WrappedElement function without correct type
_ = withDisable(WrappedElement());
// works: calling the WrappedElement function with correct type
_ = withDisable(WrappedElement<Element & {disabled: boolean}>());

const test: unknown = new Control(document.createElement('input'));
// fails: type is unknown
_ = test.disabled;
if (hasBehavior(test, CanDisable)) {
  // works: type is known due to type guard
  _ = test.disabled;
}
