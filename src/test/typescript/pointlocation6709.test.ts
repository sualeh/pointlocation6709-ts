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
    expect(angle1.sin()).to.equal(0.8414709848078965);
    expect(angle1.cos()).to.equal(0.5403023058681398);
    expect(angle1.toString()).to.equal("57\u00B0 17\" 45'");

    let angle_1 = new PointLocation6709.Angle(-1);
    expect(angle_1.getRadians()).to.equal(-1);
    expect(angle_1.getDegrees()).to.equal(-57.29577951308232);
    expect(angle_1.getField(PointLocation6709.Fields.DEGREES)).to.equal(-57);
    expect(angle_1.getField(PointLocation6709.Fields.MINUTES)).to.equal(-17);
    expect(angle_1.getField(PointLocation6709.Fields.SECONDS)).to.equal(-45);
    expect(angle_1.sin()).to.equal(-0.8414709848078965);
    expect(angle_1.cos()).to.equal(0.5403023058681398);
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

describe('Test Latitude', () => {

  it('Happy path test', () => {
    let angle1 = new PointLocation6709.Angle(1);
    let latitude1 = new PointLocation6709.Latitude(angle1);
    expect(latitude1.getRadians()).to.equal(1);
    expect(latitude1.getDegrees()).to.equal(57.29577951308232);
    expect(latitude1.getField(PointLocation6709.Fields.DEGREES)).to.equal(57);
    expect(latitude1.getField(PointLocation6709.Fields.MINUTES)).to.equal(17);
    expect(latitude1.getField(PointLocation6709.Fields.SECONDS)).to.equal(45);
    expect(latitude1.sin()).to.equal(0.8414709848078965);
    expect(latitude1.cos()).to.equal(0.5403023058681398);
    expect(latitude1.toString()).to.equal("57\u00B0 17\" 45' N");

    let angle_1 = new PointLocation6709.Angle(-1);
    let latitude_1 = new PointLocation6709.Latitude(angle_1);
    expect(latitude_1.getRadians()).to.equal(-1);
    expect(latitude_1.getDegrees()).to.equal(-57.29577951308232);
    expect(latitude_1.getField(PointLocation6709.Fields.DEGREES)).to.equal(-57);
    expect(latitude_1.getField(PointLocation6709.Fields.MINUTES)).to.equal(-17);
    expect(latitude_1.getField(PointLocation6709.Fields.SECONDS)).to.equal(-45);
    expect(latitude_1.sin()).to.equal(-0.8414709848078965);
    expect(latitude_1.cos()).to.equal(0.5403023058681398);
    expect(latitude_1.toString()).to.equal("57\u00B0 17\" 45' S");
  });

  it('Negative test', () => {
    let angle1 = PointLocation6709.Angle.fromDegrees(91);
    expect(() => new PointLocation6709.Latitude(angle1)).to.throw('91\u00B0 is out of range, +/-90\u00B0');

    let angle_1 = PointLocation6709.Angle.fromDegrees(-91);
    expect(() => new PointLocation6709.Latitude(angle_1)).to.throw('-91\u00B0 is out of range, +/-90\u00B0');
  });

});

describe('Test Longitude', () => {

  it('Happy path test', () => {
    let angle1 = new PointLocation6709.Angle(1);
    let longitude1 = new PointLocation6709.Longitude(angle1);
    expect(longitude1.getRadians()).to.equal(1);
    expect(longitude1.getDegrees()).to.equal(57.29577951308232);
    expect(longitude1.getField(PointLocation6709.Fields.DEGREES)).to.equal(57);
    expect(longitude1.getField(PointLocation6709.Fields.MINUTES)).to.equal(17);
    expect(longitude1.getField(PointLocation6709.Fields.SECONDS)).to.equal(45);
    expect(longitude1.sin()).to.equal(0.8414709848078965);
    expect(longitude1.cos()).to.equal(0.5403023058681398);
    expect(longitude1.toString()).to.equal("57\u00B0 17\" 45' E");

    let angle_1 = new PointLocation6709.Angle(-1);
    let longitude_1 = new PointLocation6709.Longitude(angle_1);
    expect(longitude_1.getRadians()).to.equal(-1);
    expect(longitude_1.getDegrees()).to.equal(-57.29577951308232);
    expect(longitude_1.getField(PointLocation6709.Fields.DEGREES)).to.equal(-57);
    expect(longitude_1.getField(PointLocation6709.Fields.MINUTES)).to.equal(-17);
    expect(longitude_1.getField(PointLocation6709.Fields.SECONDS)).to.equal(-45);
    expect(longitude_1.sin()).to.equal(-0.8414709848078965);
    expect(longitude_1.cos()).to.equal(0.5403023058681398);
    expect(longitude_1.toString()).to.equal("57\u00B0 17\" 45' W");
  });

  it('Negative test', () => {
    let angle1 = PointLocation6709.Angle.fromDegrees(181);
    expect(() => new PointLocation6709.Longitude(angle1)).to.throw('181\u00B0 is out of range, +/-180\u00B0');

    let angle_1 = PointLocation6709.Angle.fromDegrees(-181);
    expect(() => new PointLocation6709.Longitude(angle_1)).to.throw('-181\u00B0 is out of range, +/-180\u00B0');
  });

});
