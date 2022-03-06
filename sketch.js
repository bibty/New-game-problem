var alienIMG
var fuelIMG
var rocketIMG
var meteorIMG
var spacebackgroundIMG
var spaceshipdebrisIMG
var stoneIMG
var alien,fuel,rocket,meteor,spacebg,spaceshipdebris,stone
var stonegrp,fuelgrp, meteorgrp
var score = 0 
var fuelbar = 200
var life = 200
var level1Img,level2Img,level3Img,level4Img
var level1
var level2 
var level3 
var level4 
var level = 0
var gamelevel = 1


function preload(){
  alienIMG = loadImage("./assets/alienspaceship.png")
  fuelIMG = loadImage("./assets/fuel.png")
  rocketIMG = loadImage("./assets/rocket.png")
  meteorIMG = loadImage("./assets/meteor.png")
  spacebackgroundIMG = loadImage("./assets/space_background.jpg")
  spaceshipdebrisIMG = loadImage("./assets/spaceshipdebris.png")
  stoneIMG = loadImage("./assets/stone.png")
  level1Img = loadImage("./assets/level 1.png")
  level2Img = loadImage("./assets/level 2.png")
  level3Img = loadImage("./assets/level 3.png")
  level4Img = loadImage("./assets/level 4.png")
}

function setup(){
  createCanvas(windowWidth,windowHeight)

  spacebg = createSprite(windowWidth/2,windowHeight/2)
  spacebg.addImage(spacebackgroundIMG)
  spacebg.velocityY = 2

  rocket = createSprite(windowWidth/2,windowHeight-100)
  rocket.addImage(rocketIMG)
  rocket.scale = 0.2
  rocket.debug = true
  rocket.setCollider("rectangle", 0,0,500,900)

  level1 = createSprite(windowWidth/2+100,windowHeight/2)
  level1.addImage(level1Img); 
  level1.scale = 1

  level2 = createSprite(windowWidth/2+100,windowHeight/2)
  level2.addImage(level2Img); 
  level2.scale = 1
  level2.visible = false; 

  level3 = createSprite(windowWidth/2+100,windowHeight/2)
  level3.addImage(level3Img); 
  level3.scale = 1
  level3.visible = false; 

  level4 = createSprite(windowWidth/2+100,windowHeight/2)
  level4.addImage(level4Img); 
  level4.scale = 1
  level4.visible = false; 

  stonegrp = new Group()

  fuelgrp = new Group()

  meteorgrp = new Group()


  

}

function draw(){
background("blue")
drawSprites()

if(spacebg.y > height){
  spacebg.y = height/2; 
}

if(keyDown("LEFT_ARROW")){
  rocket.x = rocket.x-10
}

if(keyDown("RIGHT_ARROW")){
  rocket.x = rocket.x+10
}



  if(mousePressedOver(level1)){
    level = 1
    level1.visible = false; 
  }
  
  if(level == 1 && score >=0 && score <= 350 ){
    level1fn()
    score = score+Math.round(getFrameRate()/60)
  }




  if(mousePressedOver(level2)){
    level = 2
    level2.visible = false; 
  }
  
  if(level == 2 && score >=350 && score <= 650 ){
    level2fn()
    score = score+Math.round(getFrameRate()/60)
  }



textSize(40)
fill("white")



text("Score:" + score, width/2, 50)


text("Fuel:" + fuelbar, 100, 50)

text("Life:" + life, width-250, 50)

console.log(score)


}



function level1fn(){
  createstone()
  createfuel()
  if(rocket.isTouching(stonegrp)){
    for(var i = 0; i < stonegrp.length; i++){
      life = life-10
      stonegrp[i].destroy()
    }
  }

  if(rocket.isTouching(fuelgrp)){
    for(var i = 0; i < fuelgrp.length; i++){
      fuelbar = fuelbar+50
      fuelgrp[i].destroy()
    }
  }
  fuelbar = fuelbar-Math.round(getFrameRate()/60)

  if(score <= 350 && score >= 0){
    spacebg.velocityY = 0
    fuelgrp.destroyEach()
    stonegrp.destroyEach()
    level2.visible = true
    gamelevel = 2 
  }
console.log("level1 entered")
}

function createstone(){
  if(frameCount%50 == 0){
    stone = createSprite(100,0,2,2)
    stone.scale = 0.35
    stone.addImage(stoneIMG)
    stone.velocityY = 5
    stone.x = Math.random()*width; 
    stone.lifetime = 170
    stonegrp.add(stone)
    stone.debug = true
    stone.setCollider("circle", 0,0,4)
  }
}

function createfuel(){
  if(frameCount%100 == 0){
    fuel = createSprite(100,0,2,2)
    fuel.scale = 0.15
    fuel.addImage(fuelIMG)
    fuel.velocityY = 4
    fuel.x = Math.random()*width;
    fuel.lifetime = 200
    fuelgrp.add(fuel)
  }
}

function createmeteor(){
  if(frameCount%50 == 0){
    meteor = createSprite(100,0,2,2)
    meteor.scale = 0.35
    meteor.velocityY = 5
    meteor.x = Math.random()*width;
    meteor.lifetime = 75
    meteorgrp.add(meteor); 
  }
}

function level2fn(){
  createstone()
  createfuel()
  createmeteor()
  if(rocket.isTouching(stonegrp)){
    for(var i = 0; i < stonegrp.length; i++){
      life = life-10
      stonegrp[i].destroy()
    }
  }

  if(rocket.isTouching(fuelgrp)){
    for(var i = 0; i < fuelgrp.length; i++){
      fuelbar = fuelbar+50
      fuelgrp[i].destroy()
    }
  }

  if(rocket.isTouching(meteorgrp)){
    for(var i = 0; i < meteorgrp.length; i++){
      life = life-10
      meteorgrp[i].destroy()
    }
  }
  fuelbar = fuelbar-Math.round(getFrameRate()/60)

  if(score >= 350 && score <= 650){
    spacebg.velocityY = 0
    fuelgrp.destroyEach()
    stonegrp.destroyEach()
    meteorgrp.destroyEach()
    level2.visible = true
    gamelevel = 3
  }
}