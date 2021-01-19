var dog,happyDog,database;
var FoodS,foodStock;
var Dog

function preload()
{
  dog = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");
}

function setup() {

  createCanvas(500, 500);

  database = firebase.database()
  
  Dog = createSprite(width/2,height/2,20,20);
  Dog.addImage(dog);
  Dog.scale=0.15;

  foodStock = database.ref("Food")
  foodStock.on("value",readStock,showerror)
  
}


function draw() {  

  background(46,139,87);

  fill("white");
  stroke("white");
  textSize(20);
  text("Note: Press UP_ARROW Key to feed Harry Milk!",40,50);
  text("Food Remaining:"+FoodS,150,150);

  if(keyWentDown(UP_ARROW)){
    writeStock(FoodS);
    Dog.addImage(happyDog);
  }
  
  drawSprites();

}

function writeStock(x){
    if(x<=0){
      x=0
    }else{
      x=x-1;
    }

     database.ref("/").set({      
     Food:x
    })
  
}

function readStock(data){
  FoodS = data.val();
}

function showerror(){
  console.log("error");
}


