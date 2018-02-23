
var gridPoints = [];
var s = 20;
var w;

var Engine = Matter.Engine;
var World = Matter.World;
var Bodies = Matter.Bodies;
var Body = Matter.Body;

var ball = Bodies.circle(320, 350, 5, {isStatic: false});


function setup () {
  createCanvas(600, 600);
  background(100);

  var engine = Engine.create();
  var world = engine.world;
  world.gravity.y = 0;

  World.add(world, ball);
  Engine.run(engine);
  // console.log(width/size);
  w = width;
  // s = 20;
  makeGrid();
  drawVectors();

  console.log(gridPoints);
}


function draw() {
  ellipse(ball.position.x, ball.position.y, 10);
  Body.setVelocity(ball, { x: (w/2 - ball.position.x) / w, y: (w/2 - ball.position.y) / w});
}


function drawVectors() {
  gridPoints.forEach(function(pt) {
    translate(pt.x, pt.y);
    var xDis = 20 * Math.pow((w/2) - pt.x, 1) / w;
    var yDis = 20 * Math.pow((w/2) - pt.y, 1) / w;
    stroke(255);
    // console.log(pt);
    line(0, 0, xDis, yDis);
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
