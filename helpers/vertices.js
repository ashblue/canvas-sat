var lib = lib || {};

(function () {
    _private = {

    };

    /**
     * Vertices library
     * @requires calculator.js
     */
    lib.vert = {
        /**
         * Creates a vertex point for a cartesian graph with a standardized method
         * @param {number} x X coordinate on a cartesian graph
         * @param {number} y Y coordinate on a cartesian graph
         * @returns {array} Returns a standardized vector formatted as [x, y]
         */
        vertex: function (x, y) {
            return [x, y];
        },

        /**
         * Converts an existing square to vertices and rotates them automatically from the center
         * if an angle is present on the square. Also calculates x and y of a rotated
         * square and updates it
         * @todo Is the 5th vertex (center) even necessary?
         * @param {object} square Contains all graph data necessary to create vertices.
         * Requires minimum JSON data of {x, y, width, height, angle}. JSON data {angle} is
         * optional
         * @returns {array} Returns an array of vertices containing [x, y] data for each
         * @todo Needs to convert angle to radians
         */
        convertSquare: function (square) {
            // Convert center x and y to top left x and y, must be done since we're moving squares from the center
            square.center = this.vertex(square.x + (square.width / 2), square.y + (square.height / 2));

            // Record all vertices
            var points = [
                // top left
                this.vertex(square.x, square.y),

                // top right
                this.vertex(square.x + square.width, square.y),

                // bottom right
                this.vertex(square.x + square.width, square.y + square.height),

                // bottom left
                this.vertex(square.x, square.y + square.height)
            ];

            // Rotate all points from the center of the square via angle
            if (typeof square.angle === 'number' && square.angle !== 0) {
                var rad = lib.calc.degreesToRadian(square.angle);

                for (var i = points.length; i--;) {
                    var rotatedPoint = this.rotatePoint(square.center, points[i], rad);
                    points[i][0] = rotatedPoint[0];
                    points[i][1] = rotatedPoint[1];
                }
            }

            return points;
        },

        /**
         * Calculates the angle between two separate points
         * @link https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Math/atan2
         * @param {object} startVert Beginning vertex [x, y]
         * @param {object} endVert End vertex [x, y]
         * @returns {number} Returns a counterclockwise angle in radians
         */
        angleBetweenPoints: function (startVert, endVert) {
            return Math.atan2(-(endVert[1] - startVert[1]), endVert[0] - startVert[0]);
        },

        /**
         * Rotates a point from an axis
         * @link http://stackoverflow.com/questions/6645093/how-to-rotate-a-group-of-2d-shapes-around-an-arbitrary-point/6645412#answer-6645412
         * @param {array} Axis to rotate from, formatted as a vetex array [x, y]
         * @param {array} Point to rotate, formatted as a vertex array [x, y]
         * @param {number} Angle in radians for rotation
         * @returns {array} Returns the points new location as a vector point [x, y]
         */
        rotatePoint: function (axis, point, angle) {
            // Calculate points to the graph's origin
            var location = [
                point[0] - axis[0],
                point[1] - axis[1]
            ];

            var x = axis[0] + location[0] * Math.cos(angle) - location[1] * Math.sin(angle);
            var y = axis[1] + location[0] * Math.sin(angle) + location[1] * Math.cos(angle);

            return [x, y];
        },

        /**
         * Separation Axis Theorem test to two convex polygons and see if the overlap.
         * @link http://stackoverflow.com/questions/115426/algorithm-to-detect-intersection-of-two-rectangles
         * @todo See if the loop can be reverse and still work for faster processing
         */
        sat: function (shape1, shape2) {
            // Loop through all vertices of shape 1
            var edge, pointSibling;
            for (var i = 0; i < shape1.length; i++) {
                // Get the edge
                if (i === shape1.length) {
                    pointSibling = 0;
                } else {
                    pointSibling = i + 1;
                }
                edge = shape1[i] - shape1[pointSibling];

                console.log(edge);
            }
        },

        /**
         * Adds two vertices together
         * @param {array} vert1 Vertex formatted as [x, y]
         * @param {array} vart2 Same as vert1
         * @returns {array} Sum of vector points
         */
        add: function(vert1, vert2) {
            return [
                vert1[0] + vert2[0],
                vert1[1] + vert2[1]
            ];
        },

        /**
         * Subtracts the second vertex from the first
         * @param {array} vert1 Vertex formatted as [x, y]
         * @param {array} vart2 Vertex amount to subtract
         * @returns {array} Difference of vector points
         */
        subtract: function(vert1, vert2) {
            return [
                vert1[0] - vert2[0],
                vert1[1] - vert2[1]
            ];
        }
    };
}());