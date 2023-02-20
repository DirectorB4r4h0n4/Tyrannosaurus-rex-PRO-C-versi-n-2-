var trex ,trex_running;
var ground, groundImage,ivicibleGround;
var cloud, cloudImage;
var obstacle, obstacle1, obstacle2, obstacle3;
var obstacle4, obstacle5, obstacle6; 
var rand 
var play = 1;
var end = 0;
var gameState = play;
var score;
var obstaclesGroup, cloudsGroup;
var gameOver, gameOverImg, restart, restartImg;
var trex_collided, trex_collidedImg;
var jumpSound, dieSound, checkPointSound; 

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");

  groundImage = loadImage("ground2.png");

  cloudImage = loadImage("cloud.png");

  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");  

  trex_collided = loadImage("trex_collided.png");

  jumpSound = loadSound("jump.mp3")
  dieSound = loadSound("die.mp3")
  checkPointSound = loadSound("checkPoint.mp3")
}

function setup(){
  createCanvas(windowWidth, windowHeight);
  
  //crear sprite de Trex
 trex = createSprite(50, height-70, 20, 50);
 trex.setCollider("circle", 0, 0, 35);
 trex.addAnimation("running", trex_running);
 trex.addAnimation("collided", trex_collided)
 trex.debug = true; 

 trex.scale = 0.5;

 //suelo
 ground = createSprite(width/2, height-79, width, 20);

 ground.addImage("ground", groundImage)

 ivicibleGround = createSprite(width/2, height-10, width, 150)

 ivicibleGround.visible = false;
 //Math.random lo utlizamos para generar numeros aleatorios
 
 //Math.round nos sirve para poder redondear numeros decimales

 var rand = Math.round(Math.random(1, 100));

 console.log( "numero aleatorio" + rand) 

 
 obstaclesGroup = new Group();
 cloudsGroup = new Group();

 gameOver = createSprite(300, 100);
 gameOver.addImage(gameOverImg);
 gameOver.scale = 0.5;
 gameOver.visible = false;
 restart = createSprite(300, 140);
 restart.addImage(restartImg);
 restart.scale = 0.5;
 restart.visible = false;

 score = 0;
}

function draw(){
  background("white")
  text("Puntuación " + score, 500, 15)
  
  
  

  if(gameState == play){
    score = score + Math.round(frameCount/60);
    ground.velocityX = -2;
    console.log(ground.x)
 

    if(ground.x < 0){
      ground.x = ground.width/2;
    }
    if(touches.length > 0 || keyDown("space")&& trex.y >= 100 ){
      trex.velocityY = -10;
      jumpSound.play();
      touches = []
    
    

  }

  if(score > 0 && score % 900 == 0){
    checkPointSound.play()
  }

 //aparecer nubes

 spawnClouds ();

 //Aparecer obstaculos

 SpawnObstacles();


  if(obstaclesGroup.isTouching(trex)){
    gameState = end;
    dieSound.play();
  }

  
  } else if(gameState == end){
    ground.velocityX = 0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    gameOver.visible = true;
    restart.visible = true;
    trex.changeAnimation("collided", trex_collided);
  }
  

  console.log(ground.x)

  
 
  
  trex.velocityY = trex.velocityY + 0.8;

  trex.collide(ivicibleGround)

  if(mousePressedOver(restart)){
    reset();
   }
  drawSprites();
}

function spawnClouds (){

  if(frameCount % 60 == 0){

//crear nubes 600, 100, 40, 10

cloud = createSprite(600, 100, 40, 10)

cloud.addImage(cloudImage);

cloud.scale = 0.5;

//velocidad nubes

cloud.velocityX = -3;

cloud.y = Math.round(random(10, 100));

if(score > 0 && score % 100 == 0){
  obstacle.velocityX = -(6 + score/100)
}


cloud.depth = trex.depth;

trex.depth = trex.depth + 1;

console.log("esta es la profundiad de nuestro trex" + trex.depth) 

console.log("hello " + "there")

console.log("profundidad de las nubes" + cloud.depth)

cloud.lifeTime = 300;

cloudsGroup.add(cloud)
  }
  
}

function SpawnObstacles(){

  if(frameCount % 60 == 0){

    obstacle = createSprite(600, height-100, 10, 40);

    obstacle.velocityX = -6;

    obstacle.scale = 0.6

    rand = Math.round(random(1, 6));

    
    switch(rand){
      case 1:
        obstacle.addImage(obstacle1)
        break
      case 2:
        obstacle.addImage(obstacle2)
      case 3:
        obstacle.addImage(obstacle3)
      case 4:
        obstacle.addImage(obstacle4)
      case 5:
        obstacle.addImage(obstacle5)
      case 6:
        obstacle.addImage(obstacle6)
    }
    obstacle.lifeTime = 300;

    obstaclesGroup.add(obstacle)
  }

}

function reset(){
  gameState = play;
  gameOver.visible = false;
  restart.visible = false;
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  trex.changeAnimation("running", trex_running);
  score = 0;
}