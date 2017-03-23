import cbBit from './cb-bit';
import cbReset from './cb-reset';
import cbSet from './cb-set';
import ld8 from './load-byte';
import * as ar16 from './arithmetic-word';
import * as ar8 from './arithmetic-byte';
import * as cbRotation from './cb-rotation';
import * as cbShift from './cb-shift';
import * as ctrl from './control';
import * as jmp from './jump';
import * as ld16 from './load-word';
import * as rot from './rotation';

export default Object.assign({}, ar16, ar8, cbBit, ctrl,
  jmp, ld16, ld8, cbReset, rot, cbRotation, cbSet, cbShift);
