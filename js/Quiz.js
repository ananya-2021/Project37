class Quiz {
  constructor(){}

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
      contestant = new Contestant();
      var contestantCountRef = await database.ref('contestantCount').once("value");
      if(contestantCountRef.exists()){
        contestantCount = contestantCountRef.val();
        contestant.getCount();
      }
      question = new Question()
      question.display();
    }
  }

  play(){
    //write code here to hide question elements
    question.hide();

    //write code to change the background color here
    background("lightBlue");

    //write code to show a heading for showing the result of Quiz
    textSize(18)
    fill("black")
    text("Score:",100,200);

    //call getContestantInfo( ) here
    Contestant.getPlayerInfo();

    //write condition to check if contestantInfor is not undefined
    if(allContestants !== undefined){
    text("(Player who has anwered correctly is highlighted in green)",100,220);
    var correctAns = "2";
    var display_position = 230;
    for(var plr in allContestants){
      
      if (correctAns === allContestants[plr].answer)
        fill("green")
      else
        fill("red");

      
      display_position+=20
      textSize(15);
      text(allContestants[plr].name + ": " + allContestants[plr].answer, 120,display_position)
    }
    }
    
  }

}
