class Animation{
  constructor(img){
    this.pos = createVector(0,0);
    this.explosion_radius = 0;
    this.size = 40;
    this.img = img
  }
  
  explosion(){
    if(this.explosion_radius < this.size){
      push()
      image(this.img, this.pos.x, this.pos.y, this.explosion_radius, this.explosion_radius);
      pop();
      this.explosion_radius += 1;
      return true;
    }else{
      this.explosion_radius = 0;
      return false;
    }
  }
}
