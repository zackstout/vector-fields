
var gridPoints = [];
var s = 20;
var w;

function setup () {
  createCanvas(600, 600);
  background(100);
  // console.log(width/size);
  w = width;
  // s = 20;
  makeGrid();

  addVectors();

  console.log(gridPoints);
}

function addVectors() {
  gridPoints.forEach(function(pt) {
    var xDis = (w/2 - pt.x) / 450;
    var yDis = (w/2 - pt.y) / 450;
    stroke(255);
    line(pt.x, pt.y, xDis, yDis);
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


function draw() {

}
