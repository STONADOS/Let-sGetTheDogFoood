//Create variables here
var dooogie, database, foodstock, data;
var dogEating, dogSitting;
var thumpsupleft, thumpsupright;
var thumpsupleftimage, thumpsuprightimage;
var sun, sunimage;

function preload()
{
  dogSitting = loadImage("images/dogImg.png")
  dogEating = loadImage("images/dogImg1.png")
  dogcrying = loadImage("images/cryingdog.png")
  thumpsupleftimage = loadImage("images/thumpsup.png")
  thumpsuprightimage = loadImage("images/THUMPSUP2.png")
  sunimage = loadImage("images/—Pngtree— cartoon yellow sun_3815519.png")

}

function setup() {
  database =firebase.database();
	createCanvas(800, 700);
  dooogie = createSprite(400, 400, 50, 50);
  dooogie.addImage("dog1", dogSitting)
  dooogie.scale = 0.5;
  
  foodstock = database.ref('Food');
  foodstock.on("value", readStock);

  thumpsupleft = createSprite(150, 300, 50, 50);
  thumpsupleft.addImage("thumps", thumpsupleftimage);
  thumpsupleft.scale = 0.7;
  thumpsupleft.visible = false;

  thumpsupright = createSprite(650, 300, 50, 50);
  thumpsupright.addImage("thumps1", thumpsuprightimage);
  thumpsupright.scale = 0.7;
  thumpsupright.visible = false;

  // sun = createSprite(100, 100, 50, 50);
  // sun.addImage("sun", sunimage)
  // sun.scale = 0.2;

}


function draw() { 
  background("skyblue"); 
  textSize(30);
  fill("black");

  // and intensionally i have used different statements instaed of keeping it
  // in one statement..........
  if (keyWentDown("space")&& foodstock > 0){
    dooogie.addImage("dog1", dogEating);
    data = foodstock -= 1;
    thumpsupleft.visible = true;
    thumpsupright.visible = true;
    database.ref('/').set({
      Food:data
    });
  }

  if(keyWentUp("space") && foodstock > 0){
    thumpsupleft.visible = false;
    thumpsupright.visible = false;
    dooogie.addImage("dog1", dogSitting);

  }

  drawSprites();

  if(foodstock > 0){
    text("BRuhhhh YoU CaN Feed me "+ foodstock + " TiMeS", 150, 100);
    text("BRuhhhh UsE SpACe To Feed me ", 170, 50);
  }

  if(foodstock < 30){
    text("BRuhhhh UsE R tO ReFiLL ThE FoOd", 150, 150);
    text("OnE Byyy OnE", 300, 190);
    text("BRuhhhh UsE F tO fUlLy FiLl tHe FoOd TaNk", 130, 650);
    if (keyWentDown("f")){
      database.ref("/").set({
        Food:30
        
      })
      dooogie.addImage("dog1", dogSitting);
    }
    if(foodstock == 30){
    dooogie.addImage("dog1", dogSitting);
    }
    
    if (keyWentDown("r")){
      data = foodstock += 1;
      database.ref('/').set({
        Food:data
      })
    }
  }

  if(foodstock == 0){
  text("BRuhhhh YoU CaNt Feed me Any MoRe", 130, 100);
  dooogie.addImage("dog1", dogcrying);
  thumpsupleft.visible = false;
  thumpsupright.visible = false;
  }

}

function readStock(data){
  foodstock = data.val();
}