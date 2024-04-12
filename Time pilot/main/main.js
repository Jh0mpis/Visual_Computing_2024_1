let player, counts = 0, max_enemies = 5, num_clouds = 15;
let font, heart, explosion_image, cloud_img;
const k = 0.00001;
var bullets = new Array();
var enemies = new Array();
let clouds = new Array();

const player_imgs = new Array(), enemy_imgs = new Array(),  bullet_imgs = new Array();

function preload(){
  font = loadFont('ARCADEPI.TTF');
  heart = loadImage('images/heart.png');
  for(let i = 0; i<60; i++){
    player_imgs.push(loadImage('images/NaveSprite/'+(i+1).toString()+'.png'))
  }
  for(let i = 0; i<16; i++){
    enemy_imgs.push(loadImage('images/EnemigoSprite/'+(i+1).toString()+'.png'))
  }
  for(let i = 0; i<14; i++){
    bullet_imgs.push(loadImage('images/Misil/'+(i+1).toString()+'.png'))
  }
  explosion_image = loadImage('images/explosion.png');
  cloud_img = loadImage('images/Clouds.png');
}

function setup() {
  createCanvas(720, 960);
  rectMode(CENTER);
  imageMode(CENTER);
  
    game = new Game();
}


function draw() {
  if(game.is_game_over){
    game.game_over();
  }else if(!game.is_paused){
    game.update();
  }else{
    game.pause();
  }
}

function keyPressed(){
   if(keyCode === UP_ARROW){
      game.player.set_number(3);
      game.pressed[3] = true;
   }else if(keyCode === RIGHT_ARROW){
      game.player.set_number(4);
      game.pressed[0] = true;
   }else if(keyCode === LEFT_ARROW){
      game.player.set_number(2);
      game.pressed[2] = true;
   }else if(keyCode === DOWN_ARROW){
      game.player.set_number(1);
      game.pressed[1] = true;
   }else if(keyCode === ESCAPE){
     game.is_paused = !game.is_paused;
   }else if(keyCode === ENTER){
     if(game.is_game_over){
        game.is_game_over = false;
        game.restart();
     }
   }
}

function keyReleased(){
   if(keyCode === UP_ARROW){
      game.pressed[3] = false;
   }else if(keyCode === RIGHT_ARROW){
      game.pressed[0] = false;
   }else if(keyCode === LEFT_ARROW){
      game.pressed[2] = false;
   }else if(keyCode === DOWN_ARROW){
      game.pressed[1] = false;
   }
}

function draw_data(player, level){
  push()
  fill(0);
  rect(width/2, 50, width, 100);
  rect(width/2, height-20, width, 40);
  fill(0, 255, 0);
  rect(width/2, height-20, (width-40)*(player.points-level*5000)/5000, 20);
  fill(255);
  textSize(32);
  textFont(font);
  textAlign(CENTER);
  text(player.points, width/2, 85);
  text('TIME', width-100, 40);
  text('PILOT',  width-100, 72);
  textSize(20);
  fill(255, 0, 0);
  text('LEVEL: '+level.toString(),  width/2, height-15);
  fill(255, 0, 0);
  textSize(40);
  text('SCORE', width/2, 40);
  text('LIFES', 100, 40);
  for(let i = 0; i< player.lifes; i++){
    image(heart,50+i*45,70,40+3*sin(frameCount/10),40+3*sin(frameCount/10));
  }
  pop();
}

class Game{
  constructor(){
    this.player = new Player(player_imgs, bullet_imgs);
    this.is_game_over = false;
    this.is_paused = false;
    for(let i = 0; i< num_clouds; i++){
      let size = random(30, 80)
      clouds[i] = new Array(random(-width/2, width/2), random(-height/2, height/2), size);
    }
    
    this.level = 0;
    this.pressed = [false, false, false, false]
  }
  
  update(){
    if(this.player.lifes === 0){
      this.is_game_over = true;
    }
    background(0, 0, 60);
    
    for(let cloud in clouds){
     if(clouds[cloud][2]<=55){
        image(cloud_img,clouds[cloud][0]+this.player.pos.x,clouds[cloud][1]+this.player.pos.y, 2*clouds[cloud][2], clouds[cloud][2]);
     }
    }
    
    for(const bullet in bullets){
      bullets[bullet].update(this.player.angle);
      bullets[bullet].render();
    }
   
    push()
    this.player.render();
    this.player.update(this.pressed);
    pop()
    for(let enemy in enemies){
      enemies[enemy].render();
      enemies[enemy].update();
      enemies[enemy].check_collision(this.player);
      for(const bullet in bullets){
        bullets[bullet].check_collitions(enemies[enemy], this.player);
      }
    }
    
    for(let cloud in clouds){
      if(clouds[cloud][2] > 55){
        image(cloud_img,clouds[cloud][0]+this.player.pos.x,clouds[cloud][1]+this.player.pos.y, 2*clouds[cloud][2], clouds[cloud][2]);
       }
      if(clouds[cloud][0]+this.player.pos.x < -clouds[cloud][2]){
        clouds[cloud][0] += width +2*clouds[cloud][2];
      }else if(clouds[cloud][0]+this.player.pos.x > width+clouds[cloud][2]){
        clouds[cloud][0] -= width +2*clouds[cloud][2];
      }
      if(clouds[cloud][1]+this.player.pos.y < -clouds[cloud][2]/2){
        clouds[cloud][1] += height+clouds[cloud][2]/2;
      }else if(clouds[cloud][1]+this.player.pos.y > height+clouds[cloud][2]/2){
        clouds[cloud][1] -= height+clouds[cloud][2];
      }
    }
    
    push();
    translate(this.player.pos.x, this.player.pos.y);
    
    if(counts<=100){
      counts++;
    }else{
      counts = 0;
      if(enemies.length<max_enemies+this.level){
        enemies.push(new Enemy(k*random(1,2), k*random(1,2), enemy_imgs, explosion_image));
      }
    }
    
    pop();
    
    this.level = Math.floor(this.player.points/5000);
    draw_data(this.player, this.level);
  }
  
  pause(){
    fill(128, 128, 128, 10);
    rect(width/2, height/2, width, 200);
    fill(Math.floor(Math.abs(2*sin(frameCount/20)))*255);
    textSize(32);
    textFont(font);
    textAlign(CENTER);
    text('PAUSE', width/2, height/2+16);
  }
  
  game_over(){
    background(0);
    fill(255,0,0);
    textSize(32);
    textFont(font);
    textAlign(CENTER);
    text('GAME OVER :C', width/2, height/2);
    fill(255);
    text('PRESS ENTER TO RESTART', width/2, height/2+34);
  }
  
  restart(){
    this.player.lifes = 3;
    this.player.pos = createVector(width/2, height/2);
    this.player.angle = 360;
    this.player.points = 0;
    this.level = 0;
    bullets = [];
    enemies = [];
  }
}

class Player{
    constructor(imgs, bullet_imgs){
      this.pos = createVector(width/2, height/2);
      this.size=40;
      this.vel = 1;
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
