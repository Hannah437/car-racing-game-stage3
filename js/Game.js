class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
        player.getRank()
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(100,200);
     car1.addImage(car1img);
    car2 = createSprite(300,200);
    car2.addImage(car2img)
    car3 = createSprite(500,200);
    car3.addImage(car3img)
    car4 = createSprite(700,200);
    car4.addImage(car4img)
    cars = [car1, car2, car3, car4];
  }

  play(){
    form.hide();

    Player.getPlayerInfo();
    
    if(allPlayers !== undefined){
      //var display_position = 100;
      background(groundimg)
      image(trackimg, 0,-windowHeight*4, windowWidth, windowHeight*5)
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 0;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = x + 200;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance - 200;
        cars[index-1].x = x;
        cars[index-1].y = y;

        if (index === player.index){
          fill("red");
          ellipse(x, y, 60, 60)
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(player.distance >= 3050){
      player.rank = player.rank + 1
      player.updateRank();
      gameState = 2;
      textSize(30);
      fill("red");
      text("rank: "+ player.rank, width/2,-2600 )
    }
    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }

    drawSprites();
  }
}
