
// Global vars:
var gridPoints = [];
var s = 20;
var w;

var Engine = Matter.Engine;
var World = Matter.World;
var Bodies = Matter.Bodies;
var Body = Matter.Body;

var ball = Bodies.circle(320, 350, 5, {isStatic: false});
var allBalls = [];

var world;

var xOff = -0.02;
var yOff = 0.05;
// var xOffPrev = xOff;
// var yOffPrev = yOff;

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
  drawVectors();

  console.log(gridPoints);
}

// Draw:
function draw() {
  background(100);
  drawVectors();

  noLoop();

  ellipse(ball.position.x, ball.position.y, 10);
  // remember, we're just hard coding the fidelity to the vector field here -- should bind them with a global rule:
  Body.setVelocity(ball, { x: (w/2 - ball.position.x) / w, y: (w/2 - ball.position.y) / w});

  for (var i=0; i < allBalls.length; i++) {
    var newBall = allBalls[i];
    ellipse(newBall.position.x, newBall.position.y, 10);
    Body.setVelocity(newBall, { x: (w/2 - newBall.position.x) / w, y: (w/2 - newBall.position.y) / w});
  }
}

// Helper functions:
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

    // --Failed attempt:--
    // to keep continuity going downward as well as across:
    // if (index % (w/s) == 0) {
    //   xOff = xOffPrev;
    //   yOff = yOffPrev;
    // }
    // xOff += 0.15;
    // yOff += 0.15;
    // var nx = noise(xOff);
    // var ny = noise(yOff);
    // var xDis = 30 * nx;
    // var yDis = 30 * ny;
    //
    // xOffPrev = nx;
    // yOffPrev = ny;

    var noiseVal = noise(xOff + pt.x/s, yOff + pt.y/s);
    // console.log(noiseVal);

    var angle = noiseVal * 2 * Math.PI;

    rotate(angle);


    stroke(255);
    line(0, 0, 5, 0);

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
