'use strict';

/**
 * Just a simple helper class for my items.
 *
 * @todo : seems to be an issue with mean ave possible re: negative numbers
 * [-19, 19.8, 20.14, 20.64, 21.2, 22.1] -> App set temp to : 20.39 - it should be 10.7
 *
 * 2018-12-12 04:49:33 [log] [ManagerDrivers] [sensor] [0] Initialising States for Grouped Devices on Sensor
 * 2018-12-12 04:49:33 [log] [ManagerDrivers] [sensor] [0] Setting group capability value : measure_temperature to 20.39 :: [-19, 19.8, 20.14, 20.64, 21.2, 22.1](mean)
 * 2018-12-12 04:49:33 [log] [ManagerDrivers] [sensor] [0] Update Capability Label Sensor
 * 2018-12-12 04:49:33 [log] [ManagerDrivers] [sensor] [0] Setting Capability Labels for Sensor to "Temperature (Mean Average)"
 */
class Helper {

  static ignore(values) {}


  //---- Type Casting


  /**
   * Ensure that the value is a boolean.
   * @param value
   * @returns {boolean}
   */
  static boolean(value) {
    return !!value;
  }


  /**
   * Force the value to be a number
   * @param value
   * @returns {number}
   */
  static number(value) {
    return value * 1;
  }


  /**
   * Enum types are not currently supported
   * @param value
   */
  static enum(value) {
    return value;
  }


  //-- Boolean Methods


  /**
   * Obviously always returns on.
   * @param values
   * @returns {number}
   */
  static always(values) {
    return true;
  }


  /**
   * Obviously always returns off.
   * @param values
   * @returns {number}
   */
  static never(values) {
    return false;
  }


  /**
   * All items are on.
   *
   * @param values
   * @returns {boolean}
   */
  static and(values) {
    return !!Math.min(...values);
  }


  /**
   * At least one item is on
   *
   * @param values
   * @returns {boolean}
   */
  static or(values) {
    return !!Math.max(...values);
  }


  /**
   * Not And
   *
   * @returns {boolean}
   */
  static nand(values) {
    return (this.sum(values) !== values.length);
  }


  /**
   * Exclusive OR
   * @returns {boolean}
   */
  static xor(values) {
    return (this.nand(values) && this.or(values));
  }

  /**
   * Exclusive NOT OR
   *
   * Why not.
   * @param values
   * @returns {boolean}
   */
  static xnor(values) {
    return !(this.xor(values));
  }


  //-- Calculated Methods


  /**
   * The largest value of the devices
   *
   * Also used for
   * @param values
   * @returns {number}
   */
  static max(values) {
    return Math.max(...values);
  }


  /**
   * The smallest number of the devices
   *
   * @param values
   * @returns {number}
   */
  static min(values) {
    return Math.min(...values);
  }


  /**
   * Sum of the values of the device
   *
   * @param values
   * @returns {number}
   */
  static sum(values) {
    return values.reduce(function (a, b) {
      return a + b
    }, 0);
  }


  /**
   * The mean average (total/number)
   *
   * @param values
   * @returns {number}
   */
  static mean(values) {
    console.log('MEAN MEAN MEAN');
    return this.sum(values) / values.length
  }


  /**
   * The value in the middle, or ave of two middle items if array is even
   *
   * @param values
   * @returns {number}
   */
  static median(values) {
    console.log('median median median');
    values.sort((a, b) => a - b);

    let lowMiddle = Math.floor((values.length - 1) / 2);
    let highMiddle = Math.ceil((values.length - 1) / 2);

    // Even length will be ave of two middle ones, even will be middle item.
    return (values[lowMiddle] + values[highMiddle]) / 2;
  }


  //-- ENUM Methods


  /**
   * Return the value with the most occurrences.
   *
   * @param array of enum values ['hue','hue','temperature','saturation']
   * @returns {String}
   */
  static mode(values) {
    // Convert our enum into a count of values (c => property)
    let items = values.reduce((p, c) => {
      p[c] = (p.hasOwnProperty(c)) ? p[c] : 0;
      p[c]++;
      return p;
    }, {});

    // Turn the count into keys, sort them and return the most popular
    let results = Object.keys(items).sort(function(a,b){return items[b]-items[a]});
    return results[0];
  }

  //-- Validate

  static validate(value, rules) {

    if (rules.hasOwnProperty('min')) {
      value = Math.max(value, rules.min);
    }

    if (rules.hasOwnProperty('max')) {
      value = Math.min(value, rules.max);
    }

    if (rules.hasOwnProperty('decimals')) {
      let base = Math.pow(10, rules.decimals);
      value = Math.round(value * base)/base
    }

    return value;
  }

}


module.exports = Helper;
