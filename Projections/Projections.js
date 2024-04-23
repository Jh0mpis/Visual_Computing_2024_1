let axis = [false, false, false, false, false, false]
var projector, pentachoron, tesseract;
let figures, index;

function setup() {
  createCanvas(680, 680, WEBGL);
  projector = new Projector();
  pentachoron = new Pentachoron(height/2-50);
  tesseract = new Tesseract(height/2-50);
  orthoplex = new Orthoplex(height/2-50);
  hyper_diamond = new Hyper_diamond(height/4);
  tetraplex = new Tetraplex(height/3);
  
  figures = [pentachoron, tesseract, orthoplex, hyper_diamond, tetraplex];
  index = 0;
  noStroke();
}


function draw() {
  background(0);
  orbitControl();
  
  projector.rotations(matmul, axis, frameCount/100);
  
  figures[index].update(matmul, projector);
  figures[index].render();
}

function keyPressed(){
  if(key === "1"){
    axis[0] = !axis[0];
  }else if(key === "2"){
    axis[1] = !axis[1];
  }else if(key === "3"){
    axis[2] = !axis[2];
  }else if(key === "4"){
    axis[3] = !axis[3];
  }else if(key === "5"){
    axis[4] = !axis[4];
  }else if(key === "6"){
    axis[5] = !axis[5];
  }else if(key === "o"){
    projector.mode = 1;
  }else if(key === "p"){
    projector.mode = 2;
  }else if(keyCode === LEFT_ARROW){
    index -= 1;
    index = index % figures.length;
    if(index<0){
      index+=figures.length;
    }
  }else if(keyCode === RIGHT_ARROW){
    index += 1;
    index = index % figures.length;
  }else if(key === "+" && projector.mode === 2){
    projector.distance += 0.5;
  }else if(key === "-" && projector.mode === 2){
    projector.distance -= 0.5;
  }
}

const matmul = (matrixA, matrixB) => {
  const rowsA = matrixA.length;
  const colsA = matrixA[0].length;
  const rowsB = matrixB.length;
  const colsB = matrixB[0].length;

  if (colsA !== rowsB) {
    throw new Error("Matrix dimensions are not compatible for multiplication.");
  }

  // Create an empty result matrix
  const result = new Array(rowsA).fill()
    .map(() => new Array(colsB).fill(0));
  

  // Perform matrix multiplication
  for (let i = 0; i < rowsA; i++) {
    for (let j = 0; j < colsB; j++) {
      let sum = 0;
      for (let k = 0; k < colsA; k++) {
        sum += matrixA[i][k] * matrixB[k][j];
      }
      result[i][j] = sum;
    }
  }
  
  return result;
}
