import * as chai from 'chai';

const expect = chai.expect;

import { PointLocation6709 } from '../../main/typescript/pointlocation6709';

describe('Test Field', () => {

  it('Happy path test', () => {
    let field = PointLocation6709.Fields.DEGREES;
    expect(field.getName()).to.equal("degrees");
  });

});

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

  it('Comparisons', () => {
    let angle1 = PointLocation6709.Angle.fromRadians(1);
    let angle2 = PointLocation6709.Angle.fromRadians(1);
    let angle3 = PointLocation6709.Angle.fromRadians(1.1);

    expect(angle1.compareTo(angle2)).to.equal(0);
    expect(angle1.compareTo(angle3)).to.be.lessThan(0);
    expect(angle3.compareTo(angle1)).to.be.greaterThan(0);

    expect(angle1.equals(angle2)).to.equal(true);
    expect(angle1.equals(angle3)).to.equal(false);

    expect(angle1.equals(null)).to.equal(false);
    expect(angle1.equals("angle3")).to.equal(false);
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

  it('Negative test, out of range', () => {
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

  it('Negative test, out of range', () => {
    let angle1 = PointLocation6709.Angle.fromDegrees(181);
    expect(() => new PointLocation6709.Longitude(angle1)).to.throw('181\u00B0 is out of range, +/-180\u00B0');

    let angle_1 = PointLocation6709.Angle.fromDegrees(-181);
    expect(() => new PointLocation6709.Longitude(angle_1)).to.throw('-181\u00B0 is out of range, +/-180\u00B0');
  });

});

describe('Test Point Location', () => {

  it('Happy path test', () => {

    let angle1 = new PointLocation6709.Angle(1);
    let latitude1 = new PointLocation6709.Latitude(angle1);
    let longitude1 = new PointLocation6709.Longitude(angle1);

    let pointlocation1 = new PointLocation6709.PointLocation(latitude1, longitude1, 1.5, "Coordinate System");

    expect(pointlocation1.getAltitude()).to.equal(1.5);
    expect(pointlocation1.getCoordinateReferenceSystemIdentifier()).to.equal("Coordinate System");
    expect(pointlocation1.getLatitude()).to.equal(latitude1);
    expect(pointlocation1.getLongitude()).to.equal(longitude1);
    expect(pointlocation1.toString()).to.equal("57\u00B0 17\" 45' N 57\u00B0 17\" 45' E 1.5");

    let pointlocation2 = new PointLocation6709.PointLocation(latitude1, longitude1, 1.5)

    expect(pointlocation2.getAltitude()).to.equal(1.5);
    expect(pointlocation2.getCoordinateReferenceSystemIdentifier()).to.equal("");
    expect(pointlocation2.getLatitude()).to.equal(latitude1);
    expect(pointlocation2.getLongitude()).to.equal(longitude1);
    expect(pointlocation2.toString()).to.equal("57\u00B0 17\" 45' N 57\u00B0 17\" 45' E 1.5");

    let pointlocation3 = new PointLocation6709.PointLocation(latitude1, longitude1)

    expect(pointlocation3.getAltitude()).to.equal(0);
    expect(pointlocation3.getCoordinateReferenceSystemIdentifier()).to.equal("");
    expect(pointlocation3.getLatitude()).to.equal(latitude1);
    expect(pointlocation3.getLongitude()).to.equal(longitude1);
    expect(pointlocation3.toString()).to.equal("57\u00B0 17\" 45' N 57\u00B0 17\" 45' E");
  });

  it('Negative test, constructor', () => {

    let angle1 = new PointLocation6709.Angle(1);
    let latitude1 = new PointLocation6709.Latitude(angle1);
    let longitude1 = new PointLocation6709.Longitude(angle1);

    expect(() => new PointLocation6709.PointLocation(null, longitude1))
      .to.throw('Both latitude and longitude need to be specified');

    expect(() => new PointLocation6709.PointLocation(latitude1, null))
      .to.throw('Both latitude and longitude need to be specified');
  });

  it('Comparison', () => {

    let angle1 = new PointLocation6709.Angle(1);
    let angle2 = new PointLocation6709.Angle(0.5);
    let latitude1 = new PointLocation6709.Latitude(angle1);
    let longitude1 = new PointLocation6709.Longitude(angle1);
    let latitude2 = new PointLocation6709.Latitude(angle2);
    let longitude2 = new PointLocation6709.Longitude(angle2);

    let pointlocation1 = new PointLocation6709.PointLocation(latitude1, longitude1, 1.5, "Coordinate System");
    let pointlocation1a = new PointLocation6709.PointLocation(latitude1, longitude1, 1.5, "Coordinate System");
    let pointlocation2 = new PointLocation6709.PointLocation(latitude1, longitude1, 2);
    let pointlocation3 = new PointLocation6709.PointLocation(latitude1, longitude2, 1.5, "Coordinate System");
    let pointlocation4 = new PointLocation6709.PointLocation(latitude2, longitude1, 1.5, "Coordinate System");

    expect(pointlocation1.compareTo(pointlocation1a)).to.equal(0);
    expect(pointlocation1.compareTo(pointlocation2)).to.be.lessThan(0);
    expect(pointlocation1.compareTo(pointlocation2)).to.be.lessThan(0);
    expect(pointlocation1.compareTo(pointlocation3)).to.be.greaterThan(0);

    expect(pointlocation1.equals(pointlocation1a)).to.equal(true);
    expect(pointlocation1.equals(pointlocation2)).to.equal(false);

    expect(pointlocation1.equals(null)).to.equal(false);
    expect(pointlocation1.equals("pointlocation1")).to.equal(false);

  });

});
