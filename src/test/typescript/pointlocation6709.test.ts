import * as chai from 'chai';

const expect = chai.expect;

import { PointLocation6709 } from '../../main/typescript/pointlocation6709';

describe('Test Angle', () => {

  it('Basic test, with radians', () => {
    let angle1 = new PointLocation6709.Angle(1);
    expect(angle1.getRadians()).to.equal(1);
    expect(angle1.toString()).to.equal("57\u00B0 17\" 45'");

    let angle_1 = new PointLocation6709.Angle(-1);
    expect(angle_1.getRadians()).to.equal(-1);
    expect(angle_1.toString()).to.equal("-57\u00B0 17\" 45'");
  });

});
