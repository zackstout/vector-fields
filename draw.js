
// Global vars:
var gridPoints = [];
var s = 20;
var w;
var fullArray = [];

var Engine = Matter.Engine;
var World = Matter.World;
var Bodies = Matter.Bodies;
var Body = Matter.Body;

var ball = Bodies.circle(325, 350, 5, {isStatic: false});
var allBalls = [];

var world;

var xOff = -0.02;
var yOff = 0.05;

// Setup:
function setup () {
  createCanvas(600, 600);
  background(100);

  var engine = Engine.create();
  world = engine.world;
  world.gravity.y = 0;

  World.add(world, ball);
  Engine.run(engine);
  w = width;
  makeGrid();
  // drawVectors();

  console.log(gridPoints);
}

// Draw:
function draw() {
  background(100);
  drawVectors();
  // console.log(fullArray);

  // noLoop();

  ellipse(ball.position.x, ball.position.y, 10);
  // remember, we're just hard coding the fidelity to the vector field here -- should bind them with a global rule:
  // And that's easier said than done -- do we add a Perlin-noised value to each pixel in the canvas? How else to smoothly determine velocity?
  // Another option would be to check which of four points is closest to a given ball, and dictate its velocity that way.

  // Say ball is at (25, 35): need to check (20, 20), (20, 40), (40, 20), and (40, 40).
  // Lot of work to get the closest grid-point...but whatev:
  var closest;

  var altPosX = ball.position.x / s;
  var altPosY = ball.position.y / s;
  var one = Math.floor(altPosX);
  var two = Math.floor(altPosY);
  var three = Math.ceil(altPosX);
  var four = Math.ceil(altPosY);
  var realOne = s * one;
  var realTwo = s * two;
  var realThree = s * three;
  var realFour = s * four;

  var dist1 = distance({x: ball.position.x, y: ball.position.y}, {x: realOne, y: realTwo});
  var dist2 = distance({x: ball.position.x, y: ball.position.y}, {x: realOne, y: realFour});
  var dist3 = distance({x: ball.position.x, y: ball.position.y}, {x: realThree, y: realTwo});
  var dist4 = distance({x: ball.position.x, y: ball.position.y}, {x: realThree, y: realFour});

  var min = Math.min(dist1, dist2, dist3, dist4);

  if (min == dist1) {
    closest = {x: realOne, y: realTwo};
  } else if (min == dist2) {
    closest = {x: realOne, y: realFour};
  } else if (min == dist3) {
    closest = {x: realThree, y: realTwo};
  } else if (min == dist4) {
    closest = {x: realThree, y: realFour};
  }

  console.log(closest);

  var xDis, yDis;
  // get the Perlin value of the closest grid point to determine velocity:
  fullArray.forEach(function(c) {
    if (c.x == closest.x && c.y == closest.y) {
      // console.log(c);
      var angle = c.val * 2 * Math.PI;
      // console.log(angle);
      xDis = Math.cos(angle);
      yDis = Math.sin(angle);
      console.log(xDis, yDis);
    }
  });


  Body.setVelocity(ball, { x: 10* xDis, y: 10* yDis });

  for (var i=0; i < allBalls.length; i++) {
    var newBall = allBalls[i];
    ellipse(newBall.position.x, newBall.position.y, 10);
    Body.setVelocity(newBall, { x: (w/2 - newBall.position.x) / w, y: (w/2 - newBall.position.y) / w});
  }
}




// Helper functions:
function distance(a, b) {
  return Math.pow(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2), 0.5);
}

// can be mouseClicked or mouseDragged:
function mouseDragged() {
  var ball = Bodies.circle(mouseX, mouseY, 5, {isStatic: false});
  World.add(world, ball);
  allBalls.push(ball);
}

// In our case, w=600, s=20, and w/s = 30 = number of cells per row:
function drawVectors() {
  gridPoints.forEach(function(pt, index) {
    translate(pt.x, pt.y);
    // --Basic field:--
    // var xDis = 20 * ((w/2) - pt.x) / w;
    // var yDis = 20 * ((w/2) - pt.y) / w;

    // Perfect, this makes it look more continuous and natural:
    var scale = 0.1;

    var noiseVal = noise(scale * pt.x/s, scale * pt.y/s);

    fullArray.push({
      x: pt.x,
      y: pt.y,
      val: noiseVal
    });

    var angle = noiseVal * 2 * Math.PI;
    rotate(angle);

    stroke(255);
    line(0, 0, 10, 0);

    rotate(-angle);

    // line(0, 0, xDis, yDis);
    // don't forget to translate back out -- could likely also use push and pop to achieve same effect:
    translate(-pt.x, -pt.y);
  });
}

function makeGrid() {
  for (var i=0; i < w/s; i++) {
    for (var j=0; j < w/s; j++) {
      var point = {
        x: j * s,
        y: i * s
      };
      gridPoints.push(point);
    }
  }
}
