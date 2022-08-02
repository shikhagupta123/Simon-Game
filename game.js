var buttonColours = ["red","blue", "green", "yellow"];
var gamePattern = [];
var userClickedPatter = [];
var level = 0;
var started = false;

// Game Stated for the first timeout
$(document).keydown(function(){
  if(!started){
    $("#level-title").text("Level : "+level);
    nextSequence();
    started = true;
  }
});

// Genrating new sequence
function nextSequence(){
  level++;
  $("#level-title").text("Level : "+level);
  var randomNumber = Math.floor(Math.random()*4);
  var randomChooseColour = buttonColours[randomNumber];
  gamePattern.push(randomChooseColour);
  $("#"+randomChooseColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChooseColour);

}

// Button Click Actions
$(".btn").click(function(event){
  var userChoosenColour = event.target.id;
  userClickedPatter.push(userChoosenColour);
  //console.log(userClickedPatter);
  playSound(userChoosenColour);
  animatePress(userChoosenColour);
  checkAnswer(userClickedPatter.length-1);
})

// Sound play for each button
function playSound(name){
  var audio = new Audio("sounds/"+name+".mp3");
  audio.play();
}

// Animation
function animatePress(currntColor){
  $("#"+currntColor).addClass("pressed");
  setTimeout(function(){
    $("#"+currntColor).removeClass("pressed")
  }, 100);
}

function checkAnswer(currentLevel){
  if(userClickedPatter[currentLevel]===gamePattern[currentLevel]){
    console.log("sucsess");
    setTimeout(function(){
      nextSequence();
    },1000);
  }else{
    console.log("wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over")
    },500);
    $("#level-title").text("Game Over! Score :"+ level);
    setTimeout(function(){
      $("#level-title").text("Press A key to Restart");
    },1000);
    startOver();
  }
}

//Restart the game
function startOver(){
  level = 0;
  started = false;
  gamePattern = [];
  userClickedPatter = [];
}
