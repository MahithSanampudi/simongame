var buttonColors=["red", "blue", "green", "yellow"];

var gamePattern=[];

var userClickedPattern=[];

var level=0;

var started=false;

$(document).on("keypress",function(){

    if(!started){
    level=0;
    $("#level-title").text("Level "+level);
    gamePattern=[];
    randomSequence();
    started=true;

    }
})

$(".btn").click(function(){

   var userChosenColor=$(this).attr("id");
   userClickedPattern.push(userChosenColor);

   playSound(userChosenColor);
   animatePress(userChosenColor); 
   checkAnswer(userClickedPattern.length-1);  

});
function randomSequence(){
    userClickedPattern=[];
    level++;
    $("#level-title").text("Level "+level);

    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColor=buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

    var audio=new Audio("sounds/"+randomChosenColor+".mp3");
    audio.play();

}

function playSound(name){

    var audio=new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColor){
     $("#"+currentColor).addClass("pressed");
      setTimeout(function() {

        $("#"+currentColor).removeClass("pressed");
        }, 100);
}

function checkAnswer(currentLevel){

    if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
        console.log("success");

        if (userClickedPattern.length === gamePattern.length){
          setTimeout(function () {
            randomSequence();
          }, 1000);
  
        }
    }
    else{
        console.log("failure");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");
        setTimeout(function () {
            $("body").removeClass("game-over");
            var audio=new Audio("./sounds/wrong.mp3");
            audio.play();
          }, 200);
          started=false;
    }
 }



