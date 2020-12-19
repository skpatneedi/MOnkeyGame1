
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var ground, invisibleGround, groundImage;
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var foodGroup, obstacleGroup
var score = 0;
var gameOverImg,restartImg
var jumpSound , checkPointSound, dieSound;
var score1 = 0;
function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
   groundImage = loadImage("ground2.png");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 restartImg = loadImage("restart.png")
  gameOverImg = loadImage("gameOver.png")
  
  jumpSound = loadSound("jump.mp3")
  dieSound = loadSound("die.mp3")
  checkPointSound = loadSound("checkPoint.mp3")
}



function setup() {
  createCanvas(700,250)
  monkey = createSprite(50,180,20,50);
  monkey.addAnimation("running", monkey_running);
 // monkey.addAnimation("collided", trex_collided);
  monkey.scale = 0.15;
  invisibleGround = createSprite(200,230,400,10);
  invisibleGround.visible = false;
  
  obstacleGroup = createGroup();
  foodGroup = createGroup();

   ground = createSprite(200,230,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  monkey.setCollider("rectangle",0,0,monkey.width,monkey.height);
  //monkey.debug = true
   gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(300,140);
  restart.addImage(restartImg);
  
 
  gameOver.scale = 0.5;
  restart.scale = 0.5;

}


function draw() {
background("pink")
drawSprites();  
 text("Survival Time: "+ score, 500,50);
 text("Score: "+ score1, 100,50);
  
  if(gameState === PLAY){

    gameOver.visible = false;
    restart.visible = false;
    
   ground.velocityX = -(6 + 3* score/100)
    //scoring
    score = Math.ceil(frameCount/frameRate())
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    if (foodGroup.isTouching(monkey)){
      score1 = score1+1;
      foodGroup.destroyEach();
      checkPointSound.play()
      
    }
    
    //jump when the space key is pressed
    if(keyDown("space")&& monkey.y >= 100) {
        monkey.velocityY = -12;
        jumpSound.play();
    }
    monkey.changeAnimation("running")
     spawnbanana();
    //add gravity
    monkey.velocityY = monkey.velocityY + 0.8
  
    //spawn obstacles on the ground
    spawnObstacles();
    
    if(obstacleGroup.isTouching(monkey)){
      jumpSound.play();
      gameState = END;
      dieSound.play()
      
    }
  }
   else if (gameState === END) {
      gameOver.visible = true;
      restart.visible = true;
      ground.velocityX = 0;
     fill(10);
     textSize(20)
     text("Survival Time: "+ score, 500,200);
     textSize(20)
     text("Score: "+ score1, 200,200);

//set lifetime of the game objects so that they are never destroyed
    obstacleGroup.setLifetimeEach(-1);
    obstacleGroup.setVelocityXEach(0);
    
    foodGroup.setLifetimeEach(-1);
    foodGroup.setVelocityXEach(0);
   }
  
 
  //stop monkey from falling down
  monkey.collide(invisibleGround);
  
  if(mousePressedOver(restart)) {
      reset();
   }


  drawSprites();
}

function reset(){
 gameState =  PLAY;
restart.visible = false;
gameOver.visible = false;
obstacleGroup.destroyEach();
foodGroup.destroyEach();
score = 0 ;
}


function spawnObstacles(){
 if (frameCount % 150 === 0){
   var obstacle = createSprite(600,220,10,40);
   obstacle.velocityX = -(6 + score/100);
   obstacle.addImage(obstacleImage);
    obstacle.scale = 0.13;
    obstacle.lifetime = 300;
   obstacle.setCollider("rectangle",0,0,450,450);
   obstacle.debug = true;
  
   //add each obstacle to the group
    obstacleGroup.add(obstacle);
 }
}
function spawnbanana() {
  //write code here to spawn the clouds
  if (frameCount % 120 === 0) {
     banana = createSprite(600,120,40,10);
    banana.y = Math.round(random(100,170));
    banana.addImage(bananaImage);
    banana.scale = 0.13;
    banana.velocityX = -(6 + score/100);
    
     //assign lifetime to the variable
    banana.lifetime = 200;

    //add each cloud to the group
    foodGroup.add(banana);
  }
}


