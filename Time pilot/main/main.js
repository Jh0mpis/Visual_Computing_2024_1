let player;

function setup() {
  createCanvas(720, 960);
  rectMode(CENTER);
  player = new Player();
}


function draw() {
  background(0);
  push()
  player.render();
  player.update();
  pop()
  translate(player.pos.x, player.pos.y);
}

function keyPressed(){
   if(keyCode === UP_ARROW){
      player.set_number(3);
      player.pressed[3] = true;
   }else if(keyCode === RIGHT_ARROW){
      player.set_number(4);
      player.pressed[0] = true;
   }else if(keyCode === LEFT_ARROW){
      player.set_number(2);
      player.pressed[2] = true;
   }else if(keyCode === DOWN_ARROW){
      player.set_number(1);
      player.pressed[1] = true;
   }
}

function keyReleased(){
   if(keyCode === UP_ARROW){
      player.pressed[3] = false;
   }else if(keyCode === RIGHT_ARROW){
      player.pressed[0] = false;
   }else if(keyCode === LEFT_ARROW){
      player.pressed[2] = false;
   }else if(keyCode === DOWN_ARROW){
      player.pressed[1] = false;
   }
}

class Player{
    constructor(){
      this.pos = createVector(width/2, height/2);
      this.size= 30;
      this.vel = 10;
      this.angle = 360;
      this.points = 0;
      this.lifes = 3;
      this.number = 4;
      this.angular_vel = 2;
      this.pressed = [false, false, false, false]
    }
    
    render(){
       push();
       translate(width/2, height/2)
       rotate(this.angle*PI/180);
       rect(0, 0, this.size+20*30/this.size, this.size);
       pop();
    }
    
    update(){
       this.pos.x += this.vel*Math.cos(this.angle*PI/180);
       this.pos.y += this.vel*Math.sin(this.angle*PI/180);
       this.update_angle();
    }
    
    update_angle(){
      if(!this.pressed[(4+this.number)%4]){return;}
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

class Shoot{
  constructor(angle){
    this.angle = angle;
    this.pos = createVector(0 , 0);
    this.vel = 2;
  }
}
