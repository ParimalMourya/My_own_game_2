const Engine = Matter.Engine;
const World = Matter.World;

var spaceCraft_img;
var background_img;
var alienShip_img;
var asteroid1_img, asteroid2_img;
var bullet_img, gun_img, repairTool_img, shield_img; 

var spaceCraft;
var asteroidsGroup, bulletsGroup;

var life = 200;
var fixedLife = 200;
var score = 0;

function preload() {
  backgroundImg = loadImage("assets/Background.gif");
  spaceCraft_img = loadImage("assets/SpaceCraft.png");
  alienShip_img = loadImage("assets/Alien_ship.png");
  asteroid1_img = loadImage("assets/Asteroid_1.png");
  asteroid2_img = loadImage("assets/Asteroid_2.png");
  bullet_img = loadImage("assets/Bullet.png");
  gun_img = loadImage("assets/Gun.png");
  repairTool_img = loadImage("assets/Repair_tool.png");
  shield_img = loadImage("assets/Shield.png");
}

function setup() {
  canvas = createCanvas(windowWidth,windowHeight);
  engine = Engine.create();
  world = engine.world;

  spaceCraft = createSprite(600, 800, 20, 20);
  spaceCraft.addImage(spaceCraft_img);
  spaceCraft.scale = 0.25;

  asteroidsGroup = new Group();
  bulletsGroup = new Group();
}

function draw() {
  background(189);
  image(backgroundImg, 0, 0, width, height);

  
  if(keyIsDown(RIGHT_ARROW)){
    spaceCraft.x += 15;
  }
  if(keyIsDown(LEFT_ARROW)){
    spaceCraft.x -= 15;
  }

  if (keyWentDown("space")){
    shootBullet();
  }

  //if(bulletsGroup.collide(asteroidsGroup)){
  //  bulletsGroup.destroyEach();
  //  asteroidsGroup.destroyEach();
  //  score += 10;
  //}

  if(bulletsGroup.isTouching(asteroidsGroup)){
    bulletsGroup.overlap(asteroidsGroup, function(collector, collected){
      collector.remove();
      collected.remove()
    });

    score += 10;
  }

  if(spaceCraft.isTouching(asteroidsGroup)){
    spaceCraft.overlap(asteroidsGroup, function(collector, collected){
      collected.remove()
    });

    life -= fixedLife/5;
  }

  if(life === 0){
    gameOver();
  }

  showLife();
  displayScore();
  spawnObstacles();
  drawSprites();

}

function spawnObstacles(){
  if(frameCount%50 === 0){
    var asteroid = createSprite(random(200,width-200),20);

    var rand = Math.round(random(1,2));
    switch (rand){
      case 1:asteroid.addImage(asteroid1_img);
      asteroid.scale = 0.2;
      break;
      case 2:asteroid.addImage(asteroid2_img);
      asteroid.scale = 0.3;
      break;
  }

    asteroid.velocityY = 10;
    asteroid.lifetime = 200;
    asteroidsGroup.add(asteroid);
  }
  
}

function shootBullet(){
  var bullet = createSprite(spaceCraft.x, spaceCraft.y);
  bullet.addImage(bullet_img);
  bullet.scale = 0.05;
  bullet.velocityY = -10;
  bullet.lifetime = 100;
  bulletsGroup.add(bullet);
}

function showLife(){
  push();
    textSize(25);
    fill("yellow")
    text("HEALTH", 75, 75);
    fill("white");
    rect(50, 100, 200, 20);
    fill("red");
    rect(50, 100, life, 20);
    noStroke();

    pop();
}

function displayScore(){
  push();
  textSize(30);
  fill("yellow")
  text("SCORE : "+score, width-250, 75);
  pop();
}

function gameOver(){
  swal({
    title:`GAME OVER`,
    text:"You Score is "+score,
    imageUrl:"https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
    imageSize:"100x100",
    confirmButton:"Thanks for playing!!"
  },
  function(isConfirm) {
    if (isConfirm) {
      location.reload();
    }
  });
}
