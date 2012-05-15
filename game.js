/*
Name: Canvas SAT Demo
Version: 1.0
Author: Ashton Blue
Author URL: http://blueashes.com
*/

// How to figure out what a user's computer can handle for frames with fallbacks
// Original by Paul Irish: http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// Clear interval version here created by Jerome Etienne http://notes.jetienne.com/2011/05/18/cancelRequestAnimFrame-for-paul-irish-requestAnimFrame.html
window.requestAnimFrame = ( function() {
    return window.requestAnimationFrame         || 
    window.webkitRequestAnimationFrame          || 
    window.mozRequestAnimationFrame             || 
    window.oRequestAnimationFrame               || 
    window.msRequestAnimationFrame              || 
    function(/* function */ callback, /* DOMElement */ element){
        return window.setTimeout(callback, 1000 / 60);
    };
})();

var Game = {
    // Setup configuration
    canvas: document.getElementById('canvas'),
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
        Square.init();
        Triangle.init();
    },
    
    animate: function() {
        // Run from the global space, so you must use Game instead of this to prevent a crash
        Game.draw();
        Game.play = requestAnimFrame(Game.animate);
    },
    
    draw: function() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); 
        
        // Draw objects
        Square.draw();
        Triangle.draw();
    },
    
    detectCollisions: function() {
        var textY = 30;
        
        if (shapeBeingDragged) {
           shapes.forEach( function (shape) {
              if (shape !== shapeBeingDragged) {
                 if (shapeBeingDragged.collidesWith(shape)) {
                    context.fillStyle = shape.fillStyle;
                    context.fillText('collision', 20, textY);
                    textY += 40;
                 }
              }
           });
        }
    }
};

/***************************
Game Objects
***************************/
var Square = {
    x: 20,
    y: 20,
    width: 50,
    height: 50,
    point: function(x, y) {
        return {
            x: x,
            y: y
        };
    },
    init: function() {
        this.points = [
            this.point(this.x, this.y),
            this.point(this.x + this.width, this.y),
            this.point(this.x + this.width, this.y + this.height),
            this.point(this.x, this.y + this.height)
        ]
    },
    draw: function() {
        Game.ctx.alpha = .5;
        Game.ctx.fillStyle = '#000';
        Game.ctx.fillRect(this.x, this.y, this.width, this.height);
    }
};

var Triangle = {
    init: function() {
        this.points = [
            this.point(250, 150),
            this.point(250, 250),
            this.point(350, 250)
        ]
    },
    draw: function() {
        Game.ctx.alpha = .5;
        Game.ctx.fillStyle = '#ff0';
        this.polygon();
        Game.ctx.fill();
    },
    point: function(x, y) {
        return {
            x: x,
            y: y
        };
    },
    polygon: function() {
        Game.ctx.beginPath();
        
        for (var p = this.points.length; p--;) {
            Game.ctx.lineTo(this.points[p].x, this.points[p].y);
        }
        
        Game.ctx.closePath();
    }
};

// Checks for SAT impact
var CollideTest = {
    collidesWith: function (shape) {
        var axes = this.getAxes().concat(shape.getAxes());
        return !this.separationOnAxes(axes, shape);
    },
    draw: function() {
        //Square.points;
        //Triangle.points;
        

        
        //function detectCollisions() {
        //    var textY = 30;
        //    
        //    if (shapeBeingDragged) {
        //       shapes.forEach( function (shape) {
        //          if (shape !== shapeBeingDragged) {
        //             if (shapeBeingDragged.collidesWith(shape)) {
        //                context.fillStyle = shape.fillStyle;
        //                context.fillText('collision', 20, textY);
        //                textY += 40;
        //             }
        //          }
        //       });
        //    }
        //};
    }
};

/***************************
Run Game
***************************/
window.onload = function() {
    Game.setup();
}