//Create variables here
var dog, happyDog;
 var database;
 var foodS, foodStock;
//var position;
var dogImg,happyDogImg;


var feed,add;
var fedTime, lastFed;
var foodObj;
var Obj;
var FoodObj1,FoodObj2,FoodObj3;


function preload()
{
  //load images here
  dogImg=loadImage("dogImg.png")
  happyDogImg=loadImage("dogImg1.png")
}

function setup() {
createCanvas(600, 500)
database = firebase.database();

  dog=createSprite( 400,250,10,10);
  dog.addImage(dogImg);
  dog.scale=0.20;

foodStock=database.ref('Food');
foodStock.on("value",readStock);

foodObj= new Food()


feed=createButton("Feed the dog")
feed.position(500,85)
feed.mousePressed(feedDog)

addFood=createButton("Add food")
addFood.position(600,85)
addFood.mousePressed(addFoods)


}


function draw() {  
background(46,139,87)

foodObj.display()



fedTime=database.ref('FeedTime');
fedTime.on("value",function(data){
lastFed=data.val()
})

fill(255,255,254)
textSize(15);
if(lastFed>=12){
  text("last feed:"+lastFed%12+"PM",350,30)
}
else if(lastFed==0){
  text("last feed:12 AM",350,30)
}else{
  text("last feed:"+lastFed+"Am",350,30)
}




  drawSprites();
  //add styles here


}
function readStock(data){
  foodS=data.val();
}

function writeStock(x){

  if(x<=0){
    x=0;
  }
  else{
    x=x-1;
  }

database.ref('/').update({
  Food:x
})


}


function feedDog(){;
  dog.addImage(happyDogImg)


foodObj.updateFoodStock(foodObj.getFoodStock()-1);
database.ref('/').update({
Food:foodObj.getFoodStock(),
fedTime:hour()
})
}

function addFoods(){
foodS++;
database.ref('/').update({
  Food:foodS
})
}












