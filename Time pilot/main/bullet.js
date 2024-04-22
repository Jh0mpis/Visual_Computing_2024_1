class Bullet{
  constructor(angle, imgs){
    this.angle = angle;
    this.pos = createVector(width/2 , height/2);
    this.vel = 2;
    this.visible = true;
    this.imgs = imgs;
    this.imgs_count = 0;
    this.size = 20;
  }
 
  render(){
    if(this.visible){
      push();
      if(this.imgs_count<13.8){
        this.imgs_count += 0.1
      }else{
        this.imgs_count = 0;
      }
      translate(this.pos.x, this.pos.y);
      rotate(this.angle*PI/180);
      image(this.imgs[Math.floor(this.imgs_count)], 0, 0, this.size, this.size);
      pop();
    }
  }
 
  update(angle){
    this.pos.x += this.vel*Math.cos(this.angle*PI/180);
    this.pos.y += this.vel*Math.sin(this.angle*PI/180);
    if(Math.sqrt((this.pos.x-width/2)**2+(this.pos.y-height/2)**2)>=height/2+50){
      this.pos.x = width/2;
      this.pos.y = height/2;
      this.angle = angle;
      this.visible = true;
    }
  }
  
  check_collitions(enemy, player){
     if(this.visible){
       if(0<=this.pos.x && this.pos.x<=width && 0<=this.pos.y && this.pos.y<=height){
          if(Math.abs(this.pos.x-enemy.pos.x)< enemy.size/2 && Math.abs(this.pos.y-enemy.pos.y)< enemy.size/2){
            this.visible = false;
            player.points += 1000;
            enemy.death();
          }
       }
     }
  }
}
