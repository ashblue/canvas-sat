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
    },

    animate: function() {
        // Run from the global space, so you must use Game instead of this to prevent a crash
        Game.draw();
        Game.play = requestAnimFrame(Game.animate);
    },

    draw: function() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw objects
        Square1.draw();
        Square2.draw();

        // Run separation axis theorem
        if (this.satDelay) {
            lib.vert.sat(Square1.vertices, Square2.vertices);
            this.satDelay = false;
        }
    }
};

/***************************
Game Objects
***************************/
var Square1 = {
    x: 100,
    y: 55,
    width: 50,
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
    angle: 0,
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

/***************************
Run Game
***************************/
window.onload = function() {
    Game.setup();
};