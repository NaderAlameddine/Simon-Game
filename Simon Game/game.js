// alert("Hello ");
var buttonColours = ["red", "blue", "green", "yellow"];
//tracks the game clicks
var gamePattern = [];
//tracks the user clicks
var userClickedPattern = [];
var level = 0;
var won = false;
function nextSequence() {
  level++;
  var randomNumber = Math.floor(Math.random() * 4);
  // console.log(randomNumber);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  // console.log($(randomId));

  $("#" + randomChosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColour);

  $("h1").text("Level " + level);
  // console.log(level);
  //Method 2 (easier way)

  /* switch (randomChosenColour) {            Method 1 
    case "green":
      var greenSound = new Audio("sounds/green.mp3");
      greenSound.play();
      break;
    case "red":
      var redSound = new Audio("sounds/red.mp3");
      redSound.play();
      break;
    case "blue":
      var blueSound = new Audio("sounds/blue.mp3");
      blueSound.play();
      break;
    case "yellow":
      var yellowSound = new Audio("sounds/yellow.mp3");
      yellowSound.play();
      break;
    default:
      var wrongSound = new Audio("sounds/wrong.mp3");
      wrongSound.play();
  }*/
}
$(".btn").click(function () {
  var userChosenColour = $(this).attr("id");
  playSound(userChosenColour);
  animatePress(userChosenColour);
  userClickedPattern.push(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("." + currentColour).addClass("pressed");
  setTimeout(() => {
    $("." + currentColour).removeClass("pressed");
  }, 100);
}
var count = 0;
//i guess we shall add a toggle here
$(document).keypress(function () {
  count++;
  if (count === 1) {
    nextSequence();
    $("h1").text("Level " + level);
  }
});

/*function checkAnswer() {
  for (var i = 0; i <= gamePattern.length; i++ ) {
    if (gamePattern[i] == userClickedPattern[i]) {
        userClickedPattern = [];
        nextSequence();

    }
  }
}
  */

function checkAnswer(currentLevel) {
  //  VVV IMP   I combined correctness and completion in one condition using &&, which delayed validation until the end.

  // The .length === gamePattern.length check blocked early failure, allowing wrong clicks to pass.

  // Correct Simon logic requires immediate validation per click, then a separate check for completion.
  if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      console.log("success!");
      setTimeout(function () {
        nextSequence();
        userClickedPattern = [];
      }, 1000);
      // console.log(gamePattern);
      // console.log(userClickedPattern);
    }
  } else {
    console.log("wrong");
    var wrongSound = new Audio("sounds/wrong.mp3");
    wrongSound.play();
    $("body").addClass(" game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over, Press Any Key to Restart :(");
    startOver();
    a;
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  count = 0;
}
