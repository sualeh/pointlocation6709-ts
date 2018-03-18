import * as chai from 'chai';

const expect = chai.expect;

import { PointLocation6709 } from '../../main/typescript/pointlocation6709';

describe('Test Angle', () => {

  it('Happy path test, with radians', () => {
    let angle1 = new PointLocation6709.Angle(1);
    expect(angle1.getRadians()).to.equal(1);
    expect(angle1.getDegrees()).to.equal(57.29577951308232);
    expect(angle1.getField(PointLocation6709.Fields.DEGREES)).to.equal(57);
    expect(angle1.getField(PointLocation6709.Fields.MINUTES)).to.equal(17);
    expect(angle1.getField(PointLocation6709.Fields.SECONDS)).to.equal(45);
    expect(angle1.toString()).to.equal("57\u00B0 17\" 45'");

    let angle_1 = new PointLocation6709.Angle(-1);
    expect(angle_1.getRadians()).to.equal(-1);
    expect(angle_1.getDegrees()).to.equal(-57.29577951308232);
    expect(angle_1.getField(PointLocation6709.Fields.DEGREES)).to.equal(-57);
    expect(angle_1.getField(PointLocation6709.Fields.MINUTES)).to.equal(-17);
    expect(angle_1.getField(PointLocation6709.Fields.SECONDS)).to.equal(-45);
    expect(angle_1.toString()).to.equal("-57\u00B0 17\" 45'");
  });

  it('Happy path test, with static factories', () => {
    let angle1 = PointLocation6709.Angle.fromRadians(1);
    expect(angle1.getRadians()).to.equal(1);
    expect(angle1.toString()).to.equal("57\u00B0 17\" 45'");

    let angle2 = PointLocation6709.Angle.fromDegrees(1);
    expect(angle2.getDegrees()).to.equal(1);
    expect(angle2.toString()).to.equal("1\u00B0 0\"");
  });

});
