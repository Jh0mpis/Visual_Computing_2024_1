class Player{
    constructor(imgs, bullet_imgs){
      this.pos = createVector(width/2, height/2);
      this.size=40;
      this.vel = 2;
      this.angle = 360;
      this.points = 0;
      this.lifes = 3;
      this.number = 4;
      this.angular_vel = 5;
      this.count  = 0;
      this.imgs = imgs;
      this.count_frames = 0;
      this.bullet_imgs = bullet_imgs;
    }
   
    render(){
       push();
       translate(width/2, height/2)
       rotate(this.angle*PI/180);
       if(this.count_frames<59.4){
         this.count_frames += 0.5;
       }else{
         this.count_frames = 0;
       }
       image(this.imgs[Math.floor(this.count_frames)], 0, 0, this.size, this.size);
       pop();
    }
   
    update(pressed){
       this.pos.x -= this.vel*Math.cos(this.angle*PI/180);
       this.pos.y -= this.vel*Math.sin(this.angle*PI/180);
       this.update_angle(pressed);
     
      if(bullets.length<25){
        if(this.count<10){
          this.count ++;
        }else{
          this.count = 0;
          bullets.push(new Bullet(this.angle, this.bullet_imgs));
          this.num_of_bullets ++;
        }
      }
    }
   
    update_angle(pressed){
      if(!pressed[(4+this.number)%4]){return;}
      if(this.angle>270 && this.number ==1){
        this.number = 5;
      }
      if(this.number == 5 && this.angle<270){
        this.number = 1;
      }
      if(this.angle <= 180 && this.number == 4){
        this.number = 0;
      }
      if(this.number == 0 && this.angle > 180){
        this.number = 4;
      }
      if(this.angle <= 90 && this.number == 3){
        this.number = -1;
      }
      if(this.number == -1 && this.angle > 90){
        this.number = 3;
      }
      if((90*this.number-this.angular_vel/2)>=this.angle || this.angle>= (90*this.number+this.angular_vel/2)){
        if(this.angle - 90*this.number >=0){
            this.angle -= this.angular_vel;
        }else{
          this.angle += this.angular_vel;
        }
      }
     if(this.angle<=0){
       this.angle += 360;
     }
     if(this.angle >360){
       this.angle = this.angle-360;
     }
    }
   
    set_number(number){
      this.number = number;
    }
}
