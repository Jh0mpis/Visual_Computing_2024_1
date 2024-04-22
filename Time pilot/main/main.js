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
