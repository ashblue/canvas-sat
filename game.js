/*
Name: Canvas SAT Demo
Version: 1.0
Author: Ashton Blue
Author URL: http://blueashes.com
*/

// How to figure out what a user's computer can handle for frames with fallbacks
// Original by Paul Irish: http://paulirish.com/2011/requestanimationframe-for-smart-animating/
window.requestAnimFrame = ( function() {
    return window.requestAnimationFrame         ||
    window.webkitRequestAnimationFrame          ||
    window.mozRequestAnimationFrame             ||
    window.oRequestAnimationFrame               ||
    window.msRequestAnimationFrame              ||
    function (callback, element){
        return window.setTimeout(callback, 1000 / 60);
    };
}());

var Game = {
    // Setup configuration
    canvas: document.getElementById('canvas'),
    satDelay: true,
    satCount: 0,
    setup: function() {
        if (this.canvas.getContext){
            // Setup variables
            this.ctx = this.canvas.getContext('2d');

            // Run the game
            this.init();
            this.animate();
        }
    },

    init: function() {
        Square1.init();
        Square2.init();
        triangle.init();
    },

    animate: function() {
        // Run from the global space, so you must use Game instead of this to prevent a crash
        Game.draw();
        Game.play = requestAnimFrame(Game.animate);
    },

    draw: function() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw objects
        //Square1.draw();
        Square2.draw();
        triangle.draw();

        // Run separation axis theorem
        if (this.satDelay) {
            console.log(lib.vert.sat(triangle.vertices, Square2.vertices));
            //console.log(lib.vert.sat(Square1.vertices, Square2.vertices));
            this.satDelay = false;
        }
    }
};

/***************************
Game Objects
***************************/
var Square1 = {
    x: 10,
    y: 70,
    width: 100,
    height: 10,
    angle: 45,
    color: '#f00',
    alpha: 0.5,
    vertices: null,

    init: function() {
        this.vertices = lib.vert.convertSquare(this);
    },

    draw: function() {
        // Define draw properties
        Game.ctx.globalAlpha = this.alpha;
        Game.ctx.fillStyle = this.color;

        // Draw the rectangle
        if (this.angle !== 0) {
            Game.ctx.save();
            Game.ctx.translate(this.center[0], this.center[1]);
            Game.ctx.rotate(lib.calc.degreesToRadian(this.angle));
            Game.ctx.translate(-this.center[0], -this.center[1]);
        }
        Game.ctx.fillRect(this.x, this.y, this.width, this.height);
        if (this.angle !== 0) {
            Game.ctx.restore();
        }

        // Draw the vertices
        Game.ctx.fillStyle = '#000';
        Game.ctx.globalAlpha = 1;
        for (var i = this.vertices.length; i--;) {
            Game.ctx.fillRect(this.vertices[i][0] - 2, this.vertices[i][1] - 2, 4, 4);
        }
    }
};

var Square2 = {
    x: 30,
    y: 30,
    width: 50,
    height: 50,
    angle: 45,
    color: '#00f',
    alpha: 0.5,

    init: function() {
        this.vertices = lib.vert.convertSquare(this);
    },

    draw: function() {
        // Define draw properties
        Game.ctx.globalAlpha = this.alpha;
        Game.ctx.fillStyle = this.color;

        // Draw the rectangle
        if (this.angle !== 0) {
            Game.ctx.save();
            Game.ctx.translate(this.center[0], this.center[1]);
            Game.ctx.rotate(lib.calc.degreesToRadian(this.angle));
            Game.ctx.translate(-this.center[0], -this.center[1]);
        }
        Game.ctx.fillRect(this.x, this.y, this.width, this.height);
        if (this.angle !== 0) {
            Game.ctx.restore();
        }

        // Draw the vertices
        Game.ctx.fillStyle = '#000';
        Game.ctx.globalAlpha = 1;
        for (var i = this.vertices.length; i--;) {
            Game.ctx.fillRect(this.vertices[i][0] - 2, this.vertices[i][1] - 2, 4, 4);
        }
    }
};

/**
 * @todo Ask Adam about triangles and why they must go in the order or must go in the order of top, right, left to work for some odd reason
 */
var triangle = {
    color: '#ff0',
    angle: 0,
    alpha: 0.5,

    init: function () {
        // Vertices on triangles must go in the order of top, right, left to work for some odd reason
        this.vertices = [
            [60, 0],
            [30, 90],
            [10, 30]
        ];
        console.log(this.vertices);

        this.center = [
            (this.vertices[0][0] + this.vertices[1][0] + this.vertices[2][0]) / 3,
            (this.vertices[0][1] + this.vertices[1][1] + this.vertices[2][1]) / 3
        ];
    },

    draw: function () {
        // Define draw properties
        Game.ctx.globalAlpha = this.alpha;
        Game.ctx.fillStyle = this.color;

        // Draw the rectangle
        if (this.angle !== 0) {
            Game.ctx.save();
            Game.ctx.translate(this.center[0], this.center[1]);
            Game.ctx.rotate(lib.calc.degreesToRadian(this.angle));
            Game.ctx.translate(-this.center[0], -this.center[1]);
        }
        Game.ctx.beginPath();

        for (var n = 0; n < this.vertices.length; n++) {
            if (n === 0) {
                Game.ctx.moveTo(this.vertices[n][0], this.vertices[n][1]);
                continue;
            }

            Game.ctx.lineTo(this.vertices[n][0], this.vertices[n][1]);
        }
        Game.ctx.closePath();
        Game.ctx.stroke();
        if (this.angle !== 0) {
            Game.ctx.restore();
        }

        // Draw the vertices
        Game.ctx.fillStyle = '#000';
        Game.ctx.globalAlpha = 1;
        for (var i = this.vertices.length; i--;) {
            Game.ctx.fillRect(this.vertices[i][0] - 2, this.vertices[i][1] - 2, 4, 4);
        }
    }
};

/***************************
Run Game
***************************/
window.onload = function() {
    Game.setup();
};