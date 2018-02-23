
var gridPoints = [];

function setup () {
  var size = 20;
  createCanvas(600, 600);
  background(100);
  console.log(width/size);
  for (var i=0; i < width/size; i++) {
    for (var j=0; j < width/size; j++) {
      var pointY = j * size;
      var pointX = i * size;
      var point = {
        x: pointX,
        y: pointY
      };
      gridPoints.push(point);
    }
  }

  console.log(gridPoints);
}


function draw() {

}
