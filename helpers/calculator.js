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
    },

    /**
     * A sign is the dot product of a number. Meaning it pretty much tests if a number is in positive or negative space.
     * @link http://en.wikipedia.org/wiki/Sign_function
     * @link http://en.wikipedia.org/wiki/Dot_product
     */
    sign: function (number) {
        return number && number / Math.abs(number);
    }
};