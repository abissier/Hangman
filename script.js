
//global variables
var wordArray = ["vase", "money", "hydrate"]; //array of hangman words to be cycled through 
var currentWord = ""; //the item of the array to be checked against during current round
var displayWord = []; //starts w _ but gets updated w correct word when guessed
var wrongUserGuess = []; //puts wrong guess in this array 

var round = 0;
var wins = 0;

var generateWord = function () {
    if (round <= 2) {
        currentWord = wordArray[round]; 

        for (var i = 0; i < currentWord.length; i++) {
            displayWord.push("_");
        }
         $(".display-word").append(displayWord);
    } else {
        var endDisplay = $("<div>");
        endDisplay.addClass("end-message animated bounce");
        $(".current-word-section").empty().append(endDisplay);

        $(".user-guess-section").empty();
        $(".end-message").append("<h2>" + "Game over! You won a total of " + wins + " time(s)!" + "</h2>")
    }
};

//button that calls function to generate word
$(".btn").on("click", function () {
    $(".btn").addClass("clicked");
    generateWord();
})

//user enters letter
$("body").keydown(function (event) {
    userGuess = (event.key);
    checkLetter();
});

// letter is checked in selected word
function checkLetter() {
    if (currentWord.includes(userGuess)) {
        addLetter(userGuess);
    } else {
        if (!wrongUserGuess.includes(userGuess) && wrongUserGuess.length <= 5) {
            wrongUserGuess.push(userGuess);
            $(".letters-guessed").append(userGuess);
        } else {
            wrongWord();
        }
    }
};

//add correct letter to the screen
function addLetter(userGuess) {
    var letterPosition = currentWord.indexOf(userGuess);
    displayWord[letterPosition] = userGuess;
    displayWord.splice(letterPosition, 1, userGuess);
    $(".display-word").empty();
    $(".display-word").append(displayWord);
    if (!displayWord.includes("_")) {
        correctWord();
    }
}

//advance round w correct word
function correctWord() {
    round++;
    wins++;
    currentWord = "";
    displayWord = [];
    wrongUserGuess = [];
    $(".display-word").empty();
    $(".letters-guessed").empty();
    generateWord();
}

//advance round when too many failed guesses 
function wrongWord() {
    round++;
    wins--;
    currentWord = "";
    displayWord = [];
    wrongUserGuess = [];
    $(".display-word").empty();
    $(".letters-guessed").empty();
    generateWord();
}
