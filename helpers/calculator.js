var lib = lib || {};

/**
 * A library with linear algerbra algorithims and input similar to a calculator.
 */
lib.calc = {
    /**
     * Convert radians to degree
     * @link http://stackoverflow.com/questions/135909/is-there-a-built-in-method-for-converting-radians-to-degrees
     * @param {number} rad Radians to convert
     * @returns {number} 0 to 360 degrees
     */
    radiansToDegrees: function (rad) {
        return rad * (180 / Math.PI);
    },

    /**
     * Convert degrees to radians
     * @param {number} degrees 0 to 360 degrees
     * @returns {number} Numerical value of radians
     */
    degreesToRadian: function (degrees) {
        return degrees * (Math.PI / 180);
    }
};