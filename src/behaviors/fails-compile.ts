import {baseBehavior} from './behavior';
import {withDisable} from './can-disable';

// fails: passing the BaseBehavior class directly is not allowed
let _ = withDisable(baseBehavior);
// fails: calling the BaseBehavior function without correct type
_ = withDisable(baseBehavior<HTMLDivElement>());
// works: calling the BaseBehavior function with correct type
_ = withDisable(baseBehavior<HTMLButtonElement>());


