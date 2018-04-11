
export namespace PointLocation6709 {

  export class Field {

    private readonly _name: string;
    private readonly _ordinal: number;
    private readonly _symbol: string;

    constructor(ordinal: number, name: string, symbol: string) {
      this._name = name;
      this._ordinal = ordinal;
      this._symbol = symbol;
    }

    public getName(): string {
      return this._name;
    }

    public getOrdinal(): number {
      return this._ordinal;
    }

    public toString(): string {
      return this._symbol;
    }

  }

  export class Fields {
    static readonly DEGREES = new Field(0, 'degrees', '\u00B0');
    static readonly MINUTES = new Field(1, 'minutes', '"');
    static readonly SECONDS = new Field(2, 'seconds', '\'');
  }


  /**
  * Represents an angle in degrees or radians. Has convenience methods to do
  * trigonometric operations, and normalizations.
  *
  * @author Sualeh Fatehi
  */
  export class Angle {

    private readonly _radians: number;

    constructor(radians: number) {
      this._radians = radians;
    }

    public getDegrees(): number {
      return this._radians * 180.0 / Math.PI;
    }

    public getRadians(): number {
      return this._radians;
    }

    protected checkRange(range: number): void {
      var degrees = this.getDegrees();
      if (Math.abs(degrees) > range) {
        throw new Error("" + degrees + Fields.DEGREES.toString() + " is out of range, +/-"
          + range + Fields.DEGREES.toString());
      }
    }

    public sin(): number {
      return Math.sin(this._radians);
    }

    public cos(): number {
      return Math.cos(this._radians);
    }

    public getDirection(): string {
      return "";
    }

    /**
     * Splits a double value into it's sexagesimal parts. Each part has the same
     * sign as the provided value.
     *
     * @param value
     *          Value to split
     * @return Split parts
     */
    private sexagesimalSplit(value: number): number[] {

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

    public getField(field: Field): number {
      /// <summary>Gets an angle field - such as degrees, minutes, or seconds. Signs
      /// will be consistent.</summmary>
      /// <param name="field">One of the field constants specifying the field to be
      ///        retrieved.</parameter>
      /// <return>Value of the specified field.</return>
      return this.sexagesimalSplit(this.getDegrees())[field.getOrdinal().valueOf()];
    }

    public toString(): string {
      var absIntDegrees = Math.abs(this.getField(Fields.DEGREES));
      var absIntMinutes = Math.abs(this.getField(Fields.MINUTES));
      var absIntSeconds = Math.abs(this.getField(Fields.SECONDS));
      var direction = this.getDirection();

      var angleString = "" + absIntDegrees + Fields.DEGREES.toString() + " " + absIntMinutes + Fields.MINUTES.toString();
      if (absIntSeconds > 0) {
        angleString = angleString + " " + absIntSeconds + Fields.SECONDS.toString();
      }
      if (direction == "") {
        if (this.getRadians() < 0) {
          angleString = '-' + angleString;
        }
      }
      else {
        if (direction != "") {
          angleString = angleString + " ";
        }
        angleString = angleString + direction;
      }

      return angleString;
    }

    /**
    * Static construction method, constructs an angle from the degree
    * value provided.
    *
    * @param degrees
    *        Value of the angle in degrees.
    * @return A new Angle.
    */
    static fromDegrees(degrees: number): Angle {
      return Angle.fromRadians(degrees * Math.PI / 180.0);
    }

    /**
    * Static construction method, constructs an angle from the radian
    * value provided.
    *
    * @param radians
    *        Value of the angle in radians.
    * @return A new Angle.
    */
    static fromRadians(radians: number): Angle {
      return new Angle(radians);
    }

  }

  /**
  * Represents a latitude in degrees or radians.
  *
  * @author Sualeh Fatehi
  */
  export class Latitude extends Angle {

    constructor(angle: Angle) {
      super(angle.getRadians());
      this.checkRange(90);
    }

    public getDirection(): string {
      if (this.getRadians() < 0) {
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
  export class Longitude extends Angle {

    constructor(angle: Angle) {
      super(angle.getRadians());
      this.checkRange(180);
    }

    public getDirection(): string {
      if (this.getRadians() < 0) {
        return "W";
      }
      else {
        return "E";
      }
    }

  }

}
