

var p5Inst = new p5(null, 'sketch');

window.preload = function () {
  initMobileControls(p5Inst);

  p5Inst._predefinedSpriteAnimations = {};
  p5Inst._pauseSpriteAnimationsByDefault = false;
  var animationListJSON = {"orderedKeys":["76bf470b-616a-4df4-8fb4-9d00069e57a0","92c768d4-9535-4707-a326-a3858792301f","ee2cdfad-a20d-4b4e-8a28-ec16e1f7c45f","10a445b9-17d4-408a-9b28-d8d33b943d12","079bbdcb-c7b0-4319-8b50-95e65c031020","f53f9343-31d6-4539-bc3d-ac6f3005879f","7f894736-d3e5-4f2d-8370-ef6d31f9debf"],"propsByKey":{"76bf470b-616a-4df4-8fb4-9d00069e57a0":{"name":"fruit1","sourceUrl":null,"frameSize":{"x":382,"y":310},"frameCount":1,"looping":true,"frameDelay":15,"version":"Uwo_7.wnqZyTkQl6lCLhHIV.evePe2eC","loadedFromSource":true,"saved":true,"sourceSize":{"x":382,"y":310},"rootRelativePath":"assets/76bf470b-616a-4df4-8fb4-9d00069e57a0.png"},"92c768d4-9535-4707-a326-a3858792301f":{"name":"fruit2","sourceUrl":null,"frameSize":{"x":206,"y":300},"frameCount":1,"looping":true,"frameDelay":12,"version":"lnHcY2KWYGO1EgJQPvXBGRDdo.ZFWqwt","loadedFromSource":true,"saved":true,"sourceSize":{"x":206,"y":300},"rootRelativePath":"assets/92c768d4-9535-4707-a326-a3858792301f.png"},"ee2cdfad-a20d-4b4e-8a28-ec16e1f7c45f":{"name":"alienGreen_badge_1","sourceUrl":"assets/api/v1/animation-library/gamelab/oJA_StLAuFjArBvI70IttdAWhnlMl8Wo/category_characters/alienGreen_badge.png","frameSize":{"x":49,"y":49},"frameCount":2,"looping":true,"frameDelay":2,"version":"oJA_StLAuFjArBvI70IttdAWhnlMl8Wo","loadedFromSource":true,"saved":true,"sourceSize":{"x":98,"y":49},"rootRelativePath":"assets/api/v1/animation-library/gamelab/oJA_StLAuFjArBvI70IttdAWhnlMl8Wo/category_characters/alienGreen_badge.png"},"10a445b9-17d4-408a-9b28-d8d33b943d12":{"name":"sword_silver_1","sourceUrl":null,"frameSize":{"x":100,"y":109},"frameCount":1,"looping":true,"frameDelay":12,"version":"O2d2Bdd2_ugDikhxLqwONvLj7.46cvRN","loadedFromSource":true,"saved":true,"sourceSize":{"x":100,"y":109},"rootRelativePath":"assets/10a445b9-17d4-408a-9b28-d8d33b943d12.png"},"079bbdcb-c7b0-4319-8b50-95e65c031020":{"name":"fruit3","sourceUrl":"assets/api/v1/animation-library/gamelab/fMHBc6gLlWB588.zoou2w1zBXJtuuJKM/category_food/red_apple.png","frameSize":{"x":272,"y":300},"frameCount":1,"looping":true,"frameDelay":2,"version":"fMHBc6gLlWB588.zoou2w1zBXJtuuJKM","loadedFromSource":true,"saved":true,"sourceSize":{"x":272,"y":300},"rootRelativePath":"assets/api/v1/animation-library/gamelab/fMHBc6gLlWB588.zoou2w1zBXJtuuJKM/category_food/red_apple.png"},"f53f9343-31d6-4539-bc3d-ac6f3005879f":{"name":"fruit4","sourceUrl":"assets/api/v1/animation-library/gamelab/beKav7FPDAJPbSxLSOlaNv2O1w.9vbY9/category_food/orange.png","frameSize":{"x":300,"y":296},"frameCount":1,"looping":true,"frameDelay":2,"version":"beKav7FPDAJPbSxLSOlaNv2O1w.9vbY9","loadedFromSource":true,"saved":true,"sourceSize":{"x":300,"y":296},"rootRelativePath":"assets/api/v1/animation-library/gamelab/beKav7FPDAJPbSxLSOlaNv2O1w.9vbY9/category_food/orange.png"},"7f894736-d3e5-4f2d-8370-ef6d31f9debf":{"name":"gameover","sourceUrl":"assets/api/v1/animation-library/gamelab/jlwUdmDfQ.Fl8uZni7e_c3sVaNJCXBYL/category_gameplay/textGameOver.png","frameSize":{"x":412,"y":78},"frameCount":1,"looping":true,"frameDelay":2,"version":"jlwUdmDfQ.Fl8uZni7e_c3sVaNJCXBYL","loadedFromSource":true,"saved":true,"sourceSize":{"x":412,"y":78},"rootRelativePath":"assets/api/v1/animation-library/gamelab/jlwUdmDfQ.Fl8uZni7e_c3sVaNJCXBYL/category_gameplay/textGameOver.png"}}};
  var orderedKeys = animationListJSON.orderedKeys;
  var allAnimationsSingleFrame = false;
  orderedKeys.forEach(function (key) {
    var props = animationListJSON.propsByKey[key];
    var frameCount = allAnimationsSingleFrame ? 1 : props.frameCount;
    var image = loadImage(props.rootRelativePath, function () {
      var spriteSheet = loadSpriteSheet(
          image,
          props.frameSize.x,
          props.frameSize.y,
          frameCount
      );
      p5Inst._predefinedSpriteAnimations[props.name] = loadAnimation(spriteSheet);
      p5Inst._predefinedSpriteAnimations[props.name].looping = props.looping;
      p5Inst._predefinedSpriteAnimations[props.name].frameDelay = props.frameDelay;
    });
  });

  function wrappedExportedCode(stage) {
    if (stage === 'preload') {
      if (setup !== window.setup) {
        window.setup = setup;
      } else {
        return;
      }
    }
// -----

// gamestates
var PLAY = 1;
var END = 0;
var gameState = PLAY;

var knife = createSprite(World.mouseX,World.mouseY,10,10);
knife.setAnimation("sword_silver_1");

var score=0;
var fruitGroup = createGroup();
var enemyGroup = createGroup();


function draw() {
 background(102,51,0);
 // increase the score
 if(fruitGroup.isTouching(knife)){
   fruitGroup.destroyEach();
   score = score+1;
   playSound("assets/category_accent/puzzle_game_accent_b_02.mp3");
 }
 


 // if it touches
 if (enemyGroup.isTouching(knife)){
   gameState = END;
   knife.setAnimation("gameover");
   knife.x = 200;
   knife.y = 200;
   knife.scale = 0.8;
   enemyGroup.destroyEach();
   fruitGroup.velocityX = 0;
   enemyGroup.velocityX = 0;
   playSound("assets/category_human/character_calvin_boom_2.mp3");
 }
 
 if(gameState==PLAY){
   knife.x = World.mouseX;
   knife.y = World.mouseY;
   fruits();
 enemy();
 }
 

 drawSprites();
  fill("red");
 text("Score: " + score,320,30);
textSize(20);
textFont("Arial");

fill("green");
text("Fruit Ninja",30,370);
textSize(40);
textFont("Futura");

}
  
function fruits(){
  if(World.frameCount%80==0){
    var fruit = createSprite(400,200,20,20);
    fruit.scale = 0.2;
    var r = randomNumber(1,4);
    fruit.setAnimation("fruit"+r);
    fruit.y =randomNumber(50,340);
    
    fruit.lifetime = 100;
    fruitGroup.add(fruit);
    
    var position = randomNumber(1,2);
  if(position==1){
    fruit.x = 400;
     fruit.velocityX = -(7+(score/4));
  }else if(position == 2){
    fruit.x =0;
    fruit.velocityX= 7+(score/4);
  }  
  
  }
}  
 
function enemy(){
  if(World.frameCount%100==0){
    var monster = createSprite(400,200,20,20);
    monster.setAnimation("alienGreen_badge_1");
    monster.y = randomNumber(100,300);
    monster.velocityX = -(8+(score/10));
  
    monster.lifetime = 50;
    enemyGroup.add(monster);
  }
} 
 
 
 
 

// -----
    try { window.draw = draw; } catch (e) {}
    switch (stage) {
      case 'preload':
        if (preload !== window.preload) { preload(); }
        break;
      case 'setup':
        if (setup !== window.setup) { setup(); }
        break;
    }
  }
  window.wrappedExportedCode = wrappedExportedCode;
  wrappedExportedCode('preload');
};

window.setup = function () {
  window.wrappedExportedCode('setup');
};
