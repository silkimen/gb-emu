import * as ar16 from './arithmetic-word';
import * as ar8 from './arithmetic-byte';
import * as ctrl from './control';
import * as jmp from './jump';
import * as ld16 from './load-word';
import * as ld8 from './load-byte';
import * as rot from './rotation';

export default Object.assign({}, ar16, ar8, ctrl, jmp, ld16, ld8, rot);
