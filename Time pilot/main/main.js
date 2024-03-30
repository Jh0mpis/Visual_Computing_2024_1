let player, counts = 0, max_enemies = 5;
const k = 0.00001;
const bullets = new Array();
const enemies = new Array();

function setup() {
  createCanvas(720, 960);
  rectMode(CENTER);
  player = new Player();
}


function draw() {
  background(0);
 
  for(const bullet in bullets){
    bullets[bullet].update(player.angle);
    bullets[bullet].render();
  }
 
  push()
  player.render();
  player.update();
  pop()
  for(let enemy in enemies){
    enemies[enemy].render();
    enemies[enemy].update();
  }
  
  push();
  translate(player.pos.x, player.pos.y);
  ellipse(0,0,20,20);
  
  if(counts<=100){
    counts++;
  }else{
    counts = 0;
    if(enemies.length<max_enemies){
      enemies.push(new Enemy(k*random(1,2), k*random(1,2)));
    }
  }
  
  //console.log(enemy.pos.x, enemy.pos.y);
  pop();
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
      this.vel = 1;
      this.angle = 360;
      this.points = 0;
      this.lifes = 3;
      this.number = 4;
      this.angular_vel = 3;
      this.pressed = [false, false, false, false]
      this.count  = 0;
      this.num_of_bullets = 0;
    }
   
    render(){
       push();
       translate(width/2, height/2)
       rotate(this.angle*PI/180);
       rect(0, 0, this.size+20*30/this.size, this.size);
       
      //for(let bullet in bullets){
        //console.log(bullets[bullet]);
      //  bullets[bullet].render();
      //}
     
       pop();
    }
   
    update(){
       this.pos.x -= this.vel*Math.cos(this.angle*PI/180);
       this.pos.y -= this.vel*Math.sin(this.angle*PI/180);
       this.update_angle();
     
      if(this.num_of_bullets<26){
        if(this.count<10){
          this.count ++;
        }else{
          this.count = 0;
          bullets.push(new Bullet(this.angle));
          this.num_of_bullets ++;
        }
      }
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

class Bullet{
  constructor(angle){
    this.angle = angle;
    this.pos = createVector(width/2 , height/2);
    this.vel = 2;
  }
 
  render(){
    push();
    fill(255,0,0);
    ellipse(this.pos.x, this.pos.y, 10, 10);
    pop();
  }
 
  update(angle){
    this.pos.x += this.vel*Math.cos(this.angle*PI/180);
    this.pos.y += this.vel*Math.sin(this.angle*PI/180);
    if(Math.sqrt((this.pos.x-width/2)**2+(this.pos.y-height/2)**2)>=height/2+70){
      this.pos.x = width/2;
      this.pos.y = height/2;
      this.angle = angle;
    }
  }
}

class Enemy{
  constructor(kx, ky){
    let r = Math.sqrt(width**2+height**2);
    let theta = random(0, 2*PI);
    this.pos = createVector(r*cos(theta), r*sin(theta));
    this.kx = kx;
    this.ky = ky;
    this.vel = createVector(0, 0);
    this.acc = createVector(0,0);
    this.size = 30;
    this.force = createVector(0,0)
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
    rect(0, 0,this.size+20, this.size);
    pop()
  }
 
  act_force(){
    const x = this.pos.x-width/2;
    const y = this.pos.y-height/2;
    this.acc.x = -this.kx*x;
    this.acc.y = -this.ky*y;
  }
  
  reset(){
  }
}
