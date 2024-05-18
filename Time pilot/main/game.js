class Game{
  constructor(){
    this.player = new Player(player_imgs, bullet_imgs);
    this.is_tutorial = true;
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
    this.draw_data(this.player, this.level);
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
  
  draw_data(player, level){
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
  
  tutorial(){
    background(0);
    textAlign(CENTER);
    textSize(32);
    textFont(font);
    fill(255, 0, 0);
    text("TIME PILOT", width/2, 85);
    fill(255);
    text("Game developed by", width/2, 115);
    text("Jhon Sebastian Moreno Triana", width/2, 145);
    text("Andres Felipe Rojas Aguilar", width/2, 175);
    text("Sergio Andres Ruiz Herrera", width/2, 205);
    fill(0, 0, 255);
    text("TUTORIAL", width/2, 260);
    
    if(this.player.count_frames <59.4){
      this.player.count_frames += 0.5;
    }else{
      this.player.count_frames = 0;
    }
    
    push();
    translate(width/2, 350);
    rotate(frameCount/50);
    image(this.player.imgs[Math.floor(this.player.count_frames)], 0, 0, this.player.size, this.player.size);
    pop();
    
    image(keys[0][(Math.floor((frameCount/50)/(PI/2)%4)+2)%4 == 0 ? 1 : 0], width/2, 450, this.player.size, this.player.size);
    image(keys[1][(Math.floor((frameCount/50)/(PI/2)%4)+2)%4 == 1 ? 1 : 0], width/2+this.player.size+10, 450+this.player.size+10, this.player.size, this.player.size);
    image(keys[2][(Math.floor((frameCount/50)/(PI/2)%4)+2)%4 == 2 ? 1 : 0], width/2, 450+this.player.size+10, this.player.size, this.player.size);
    image(keys[3][(Math.floor((frameCount/50)/(PI/2)%4)+2)%4 == 3 ? 1 : 0], width/2-this.player.size-10, 450+this.player.size+10, this.player.size, this.player.size);
    
    fill(255);
    text("Evade and kill Enemies", width/2, 600);
    image(enemy_imgs[Math.floor(frameCount/2)%16], width/2+25*sin(frameCount/10), 700+20*sin(frameCount/30), this.player.size, this.player.size);
    fill(255,0,0);
    text("And Survive", width/2, 800);
    fill(255);
    text("You can Pause with ESC.", width/2, height-100);
    text("Press ENTER to continue.", width/2, height-50);
  }
}
