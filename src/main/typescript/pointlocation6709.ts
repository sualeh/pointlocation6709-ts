namespace pointlocation {

  class Field {

    private _name: string;
    private _ordinal: number;
    private _symbol: string;

    constructor(ordinal: number, name: string, symbol: string) {
      this._name = name;
      this._ordinal = ordinal;
      this._symbol = symbol;
    }

    public getName() {
      return this._name;
    }

    public getOrdinal() {
      return this._ordinal;
    }

    public toString() {
      return this._symbol;
    }

  }

  export const DEGREES = new Field(0, 'degrees', '\u00B0');
  export const MINUTES = new Field(1, 'minutes', '"');
  export const SECONDS = new Field(2, 'seconds', '\'');


  /**
  * Represents an angle in degrees or radians. Has convenience methods to do
  * trigonometric operations, and normalizations.
  *
  * @author Sualeh Fatehi
  */
  class Angle {

    private _radians: number;

    constructor(radians: number) {
      this._radians = radians;
    }


    public getDegrees() {
      return this._radians * 180.0 / Math.PI;
    }

    public getRadians() {
      return this._radians;
    }

    checkRange(range: number) {
      var degrees = this.getDegrees();
      if (Math.abs(degrees) > range) {
        throw new Error("" + degrees + DEGREES.toString() + " is out of range, +/-"
          + range + DEGREES.toString());
      }
    }

    public sin() {
      return Math.sin(this._radians);
    }

    public cos() {
      return Math.cos(this._radians);
    }

    public getDirection() {
      return null;
    }

    /**
     * Splits a double value into it's sexagesimal parts. Each part has the same
     * sign as the provided value.
     *
     * @param value
     *          Value to split
     * @return Split parts
     */
    private sexagesimalSplit(value: number) {

      var absValue;
      var units;
      var minutes;
      var seconds;
      var sign = value < 0 ? -1 : 1;

      // Calculate absolute integer units
      absValue = Math.abs(value);
      units = Math.floor(absValue);
      seconds = Math.round((absValue - units) * 3600.0);

      // Calculate absolute integer minutes
      minutes = seconds / 60; // Integer arithmetic
      if (minutes == 60) {
        minutes = 0;
        units++;
      }
      minutes = Math.floor(minutes);

      // Calculate absolute integer seconds
      seconds = seconds % 60;

      // Correct for sign
      units = units * sign;
      minutes = minutes * sign;
      seconds = seconds * sign;

      return [units, minutes, seconds];

    }

    public getField(field: Field) {
      /// <summary>Gets an angle field - such as degrees, minutes, or seconds. Signs
      /// will be consistent.</summmary>
      /// <param name="field">One of the field constants specifying the field to be
      ///        retrieved.</parameter>
      /// <return>Value of the specified field.</return>
      return this.sexagesimalSplit(this.getDegrees())[field.getOrdinal().valueOf()];
    }

    public toString() {
      var absIntDegrees = Math.abs(this.getField(DEGREES));
      var absIntMinutes = Math.abs(this.getField(MINUTES));
      var absIntSeconds = Math.abs(this.getField(SECONDS));
      var direction = this.getDirection();

      var angleString = "" + absIntDegrees + DEGREES.toString() + " " + absIntMinutes + MINUTES.toString();
      if (absIntSeconds > 0) {
        angleString = angleString + " " + absIntSeconds + SECONDS.toString();
      }
      if (direction === null) {
        if (this.getRadians() < 0) {
          angleString = '-' + angleString;
        }
      }
      else {
        angleString = angleString + " " + direction;
      }

      return angleString;
    }

  }

  export class AngleUtility {

    /**
    * Static construction method, constructs an angle from the degree
    * value provided.
    *
    * @param degrees
    *        Value of the angle in degrees.
    * @return A new Angle.
    */
    static fromDegrees(degrees: number) {
      return AngleUtility.fromRadians(degrees * Math.PI / 180.0);
    }

    /**
    * Static construction method, constructs an angle from the radian
    * value provided.
    *
    * @param radians
    *        Value of the angle in radians.
    * @return A new Angle.
    */
    static fromRadians(radians: number) {
      return new Angle(radians);
    }

  }

  /**
  * Represents a latitude in degrees or radians.
  *
  * @author Sualeh Fatehi
  */
  class Latitude {

    private _latitude: Angle;

    constructor(angle: Angle) {

      this._latitude = new Angle(angle.getRadians());

      this._latitude.checkRange(90);
    }

    public getDirection() {
      if (this._latitude.getRadians() < 0) {
        return "S";
      }
      else {
        return "N";
      }
    }

  }

  /**
  * Represents a longitude in degrees or radians.
  *
  * @author Sualeh Fatehi
  */
  var Longitude = function (angle) {

    var longitude = new Angle(angle.getRadians());

    longitude.checkRange(180);

    longitude.getDirection = function () {
      if (longitude.getRadians() < 0) {
        return "W";
      }
      else {
        return "E";
      }
    };

    return longitude;

  };
