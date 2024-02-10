let buttonColours = ["red", "blue", "green", "yellow"];
let level = 0;
let gamePattern = [];
let userClickedPattern = [];



function nextSequence(){
    level++;
    $("h1").text("Level " + level);
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    
    playSound(randomChosenColour);
}

function playSound(colour){
    let audio = new Audio("sounds/" + colour + ".mp3");
    audio.play();
}

$(".btn").on("click", function() {
    let userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    animatePress(userChosenColour);
    playSound(userChosenColour);
    checkAnswer();
});

function checkAnswer(){
    if( userClickedPattern[userClickedPattern.length-1] == gamePattern[userClickedPattern.length-1]){
        if(userClickedPattern.length === gamePattern.length){
            userClickedPattern = [];
            setTimeout(nextSequence, 1000);
        }    
    }
    else {
        $("body").addClass("game-over");
        setTimeout (function() {$("body").removeClass("game-over");}, 300);
        startOver();
    }

}

function animatePress(currentColour){
    $("."+currentColour).addClass("pressed");
    
    setTimeout (function() {$("."+currentColour).removeClass("pressed");}, 100)

}

$(document).on("keydown", function(event) {
    if ((event.key === 'A' || event.key === 'a') && level === 0 ) {
        $("h1").text("Level " + level);
        nextSequence();
    }
});

function startOver() {
    $("h1").text("Game Over, Press A to Restart");
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
}