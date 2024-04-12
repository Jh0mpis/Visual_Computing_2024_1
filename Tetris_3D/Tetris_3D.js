let size = 20;

function setup() {
  createCanvas(720, 720, WEBGL);
}


function draw() {
  background(0);
  
  draw_box();

  
  //camera(0, 400, 500);
  orbitControl();
  
}

function draw_box(){
  push();
  translate(-5.5*size, -5.5*size, -10*size);
  strokeWeight(2);
  stroke(255);
  fill(255);
  
  for(let i=0; i<=11; i++){
    line(i*size, 0, 0, i*size, 11*size, 0);
    line(11*size, i*size, 0, 0, i*size, 0);
    line(i*size, 0, 0, i*size, 0, 21*size);
    line(0, i*size, 0, 0, i*size, 21*size);
    line(i*size, 11*size, 0, i*size, 11*size, 21*size);
    line(11*size, i*size, 0, 11*size, i*size, 21*size);
  }
  
  for(let i=0; i<=21; i++){
    line(0, 0, i*size, 11*size, 0, i*size);
    line(0, 11*size, i*size, 11*size, 11*size, i*size);
    line(0, 0, i*size, 0, 11*size, i*size);
    line(11*size, 0, i*size, 11*size, 11*size, i*size);
  }
  
  pop();
}

class Cell{
  constructor(x, y, vel, r, g, b){
    this.pos = createVector(x, y, 21*size);
    this.vel = vel;
    this.color = color(r, g, b);
  }
  
  render(){
     
  }
}
