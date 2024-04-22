class Enemy{
  constructor(kx, ky, imgs, explosion_img){
    let r = Math.sqrt(width**2+height**2);
    let theta = random(0, 2*PI);
    this.pos = createVector(r*cos(theta), r*sin(theta));
    this.kx = kx;
    this.ky = ky;
    this.vel = createVector(0, 0);
    this.acc = createVector(0,0);
    this.size = 40;
    this.force = createVector(0,0);
    this.is_death = false;
    this.animation = new Animation(explosion_img);
    this.imgs = imgs;
    this.imgs_counter = 0;
  }
 
  update(){
    this.act_force();
    this.vel.add(this.acc);
    this.pos.add(this.vel);
  }
 
  render(){
    push()
    fill(0, 255, 0);
    translate(this.pos.x, this.pos.y);
    rotate(Math.atan(this.vel.y/this.vel.x));
    if(this.imgs_counter<15.4){
      this.imgs_counter += 0.5;
    }else{
      this.imgs_counter = 0; 
    }
    image(this.imgs[Math.floor(this.imgs_counter)], 0, 0,this.size, this.size);
    pop()
    if(this.is_death){
      this.is_death = this.animation.explosion();
    }
  }
 
  act_force(){
    const x = this.pos.x-width/2;
    const y = this.pos.y-height/2;
    this.acc.x = -this.kx*x;
    this.acc.y = -this.ky*y;
  }
  
  reset(){
    this.vel = createVector(0, 0);
    this.acc = createVector(0,0);
    let r = Math.sqrt(width**2+height**2);
    let theta = random(0, 2*PI);
    this.pos = createVector(r*cos(theta), r*sin(theta));
    this.kx = k*random(1,2);
    this.ky = k*random(1,2);
  }
  
  death(){
    this.animation.pos.x = this.pos.x;
    this.animation.pos.y = this.pos.y;
    this.reset();
    this.is_death = true;
  }
  
  check_collision(player){
    const x = this.pos.x-width/2;
    const y = this.pos.y-height/2;
    
    if(Math.abs(x)<player.size && Math.abs(y)<player.size){
      this.death();
      player.lifes -= 1;
    }
  }
}
