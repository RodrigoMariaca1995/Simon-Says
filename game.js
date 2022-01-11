var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

$(document).keypress(function(){
    if(started === false){
        nextSequence();
        started = true;
    }
})


$("div.btn").click(function(){
    var userChosenColor = $(this).attr("id")
    userClickedPattern.push(userChosenColor);
    
    playSound(userChosenColor);
    animatePress(userChosenColor);
    
    checkAnswer(userClickedPattern.length - 1)
})

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      console.log("success");

      if (userClickedPattern.length === gamePattern.length){

        setTimeout(function () {
          nextSequence();
        }, 1000);

      }

    } else {
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200)

        var audio = new Audio("sounds/wrong.mp3")
        audio.play();

        $("h1").text("Game Over, Press Any Key to Restart");
        
        console.log("wrong");
        
        startOver();
    }

}

function nextSequence(){
    userClickedPattern = [];
    level++;

    $("#level-title").text("Level " + level)

    var randomNumber = Math.floor(Math.random() * 3) + 1;
    var randomColor = buttonColors[randomNumber];
    gamePattern.push(randomColor);  

    for(var i = 0; i < gamePattern.length; i++)
    {
        patternAnimation(i);
    }
}

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}

function patternAnimation(i) {
    setTimeout(function(){
        $("#" + gamePattern[i]).fadeOut(100).fadeIn(100);
        playSound(gamePattern[i]);
    }, 500 * i)
    
}