
var gridPoints = [];
var s = 20;
var w;

var Engine = Matter.Engine;
var World = Matter.World;
var Bodies = Matter.Bodies;
var ball = Bodies.circle(320, 350, 10, {isStatic: false});


function setup () {
  createCanvas(600, 600);
  background(100);

  var engine = Engine.create();
  var world = engine.world;


  World.add(world, ball);
  Engine.run(engine);
  // console.log(width/size);
  w = width;
  // s = 20;
  makeGrid();
  addVectors();

  console.log(gridPoints);
}


function draw() {
  ellipse(ball.position.x, ball.position.y, 20);
}


function addVectors() {
  gridPoints.forEach(function(pt) {
    translate(pt.x, pt.y);
    var xDis = 20 * Math.pow((w/2) - pt.x, 1) / w ;
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
