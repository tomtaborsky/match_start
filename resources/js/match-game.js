

$(document).ready(function() {

  var shuffledArray = MatchGame.generateCardValues();
  var $game = $("#game");
  MatchGame.renderCards(shuffledArray, $game);
});

var MatchGame = {};

/*
  Sets up a new game after HTML document has loaded.
  Renders a 4x4 board of cards.
*/

/*
  Generates and returns an array of matching card values.
 */
MatchGame.generateCardValues = function () {
  var array = generateArray();
   array = shuffleArray(array);
  return array;
};

// Returns a generic Array with Values 1,1, 2,2 ...
generateArray = function () {
  var genericArray = [];
  for (i = 0; i < 8; i++) {
    genericArray[i*2] = i+1;
    genericArray[i*2+1] = i+1;
  }
  return genericArray;
}
// returns shuffled input array
shuffleArray = function (sourceArray) {

  rndNumber = 0;
  for (i = 0; i < sourceArray.length; i++) {
    rndNumber = generateRndNumber(sourceArray.length);
    var temp = sourceArray[i];
    sourceArray[i] = sourceArray[rndNumber];
    sourceArray[rndNumber] = temp;
  }
  return sourceArray;
}
//Generates a random Number, between 0 and (not including) upperBoundary
generateRndNumber = function(upperBoundary) {
  var randomNumber = Math.floor((Math.random() * (upperBoundary)));
  return randomNumber;
}
/*
  Converts card values to jQuery card objects and adds them to the supplied game
  object.
*/

MatchGame.renderCards = function(cardValues, $game) {

  $game.data("flippedCards", []);
  var cardColors = ["hsl(25, 85%, 65%)", "hsl(55, 85%, 65%)", "hsl(90, 85%, 65%)", "hsl(160, 85%, 65%)",
                    "hsl(220, 85%, 65%)", "hsl(265, 85%, 65%)", "hsl(310, 85%, 65%)", "hsl(365, 85%, 65%)"];
  $game.empty();

  for (i = 0; i < cardValues.length; i++) {
    var $card = $('<div class="card col-xs-3"></div>');
    $card.data("value", cardValues[i]);
    $card.data("flipped", false);
    $card.data("color", cardColors[cardValues[i]-1]);
    $game.append($card);
  }
  $(".card").click(function(){
    MatchGame.flipCard($(this), $game);
  });
};

/*
  Flips over a given card and checks to see if two cards are flipped over.
  Updates styles on flipped cards depending whether they are a match or not.
 */

MatchGame.flipCard = function($card, $game) {

  //Check if card has been flipped; If not, apply:
  if ($card.data("flipped") !== true) {
    //Update card value and background-color, change "flipped" property to true, add card to temporary flippedCards
    $card.text($card.data("value"));
    $card.data("flipped", true);
    $card.css("background-color", $card.data("color"));
    $game.data("flippedCards").push($card);
  } else return;
  //Check if two cards have been flipped
  if ($game.data("flippedCards").length === 2) {
    //if so, check if those two have the same values
    if ($game.data("flippedCards")[0].data("value") === $game.data("flippedCards")[1].data("value")) {
      //if so, adjust their background-color
      for (x in $game.data("flippedCards")){
        $game.data("flippedCards")[x].css("background-color", "grey");
        $game.data("flippedCards")[x].css("color", "rgb(204, 204, 204)");
      }
      $game.data("flippedCards").splice(0, 3);
    } else {
      setTimeout(function(){
        for (x in $game.data("flippedCards")){
          $game.data("flippedCards")[x].text("");
          $game.data("flippedCards")[x].data("flipped", false);
          $game.data("flippedCards")[x].css("background-color", "rgb(32, 64, 86)");
        }
      $game.data("flippedCards").splice(0, 3);
      }, 200);

    }
  }



  // wenn die Karte die zweite geflippte Karte, prüfe:
  // for ($card in $game){
  //   if ($card.data("value") === $card.data("value")) {
  //     //keep values
  //   } else {
  //     // erase the last two entries
  //   }
  // }
};
