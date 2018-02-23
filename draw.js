
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
    translate(pt.x, pt.y);
    var xDis = 10 * Math.pow((w/2) - pt.x, 1) / w ;
    var yDis = 10 * Math.pow((w/2) - pt.y, 1) / w;
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


function draw() {

}
