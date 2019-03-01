$(document).ready(function() {
    "use strict";

    var letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "_"];

    var questionBank = ["orangatan", "giraffe", "chimpanzee", "elephant", "gorilla", "hippopotamus", "leopard", "rhinoceros", "saola"];

    var clueBank = ["assets/images/orangatan.jpg", "assets/images/giraffe.jpg", "assets/images/chimpanzee.jpg", "assets/images/elephant.jpg", "assets/images/gorilla.jpg", "assets/images/hippopotamus.jpg", "assets/images/leopard.jpg", "assets/images/rhinoceros.jpg", "assets/images/saola.jpg"];

    var wordArray = new Array;
    var previousGuesses = new Array;
    var currentWord;
    var currentClue;
    var wrongAnswerCount;

    function titleScreen() {

        $('#gameContent').append('<div id="gameTitle">HANGMAN</div><div id="startButton" class="button">BEGIN</div>');
        $('#startButton').on("click", function() {
            gameScreen()
        });

    } // titleScreen

    titleScreen();

    function getWord() {

        var randomNum = Math.floor(Math.random() * questionBank.length);

        currentWord = questionBank[randomNum];
        currentClue = clueBank[randomNum];
        questionBank.splice(randomNum);
        clueBank.splice(randomNum);
        wordArray = currentWord.split("");

    } //getword

    function handleKeyUp(event) {

        if ((event.keyCode > 64) && (event.keyCode < 91)) {
            var found = false;
            var previouslyEntered = false;
            var input = String.fromCharCode(event.keyCode).toLowerCase();

            for (var i = 0; i < previousGuesses.length; i++) {
                if (input == previousGuesses[i]) {
                    previouslyEntered = true;
                }
            }

            if (!previouslyEntered) {
                previousGuesses.push(input);

                for (i = 0; i < wordArray.length; i++) {
                    if (input == wordArray[i]) {
                        found = true;
                        $('#t' + i).append(input);
                    }
                } //for

                if (found) {
                    checkAnswer();
                } else {
                    wrongAnswer(input);
                }
            } //if
        } //if
    } //handlekeyup

    function gameScreen() {

        $('#gameContent').empty();
        $('#gameContent').append('<div id="pixHolder"><img id="hangman" src="assets/images/hangman0.jpg"></div>');
        $('#gameContent').append('<div id="wordHolder"></div>');
        $('#gameContent').append('<div id="clueHolder"></div>');
        $('#gameContent').append('<div id="guesses">Previous guesses:</div>');
        $('#gameContent').append('<div id="feedback"></div>');

        getWord();

        var numberOfTiles = currentWord.length;
        wrongAnswerCount = 0;
        previousGuesses = [];

        for (var i = 0; i < numberOfTiles; i++) {
            $('#wordHolder').append('<div class="tile" id=t' + i + '></div>');
        }

        $('#clueHolder').append("HINT: " + currentClue);
        $('#')
        $(document).on("keyup", handleKeyUp);

    } //gamescreen

    function checkAnswer() {
        var currentAnswer = "";

        for (i = 0; i < currentWord.length; i++) {
            currentAnswer += ($('#t' + i).text());
        }

        if (currentAnswer == currentWord) {
            victoryMessage();
        };
    } //checkanswer

    function wrongAnswer(a) {
        wrongAnswerCount++;
        var pos = (wrongAnswerCount * -75) + "px";
        $('#guesses').append(" " + a);
        $('#hangman').css("left", pos);
        if (wrongAnswerCount == 6) {
            defeatMessage();
        }
    } //wronganswe
});

function victoryMessage() {
    $(document).off("keyup", handleKeyUp);
    $('#feedback').append("CORRECT!<br><br><div id='replay' class='button'>CONTINUE</div>");
    $('#replay').on("click", function() {
        if (questionBank.length > 0) {
            gameScreen()
        } else {
            finalPage()
        }
    });
} //victoryMessage

function defeatMessage() {
    $(document).off("keyup", handleKeyUp);
    $('#feedback').append("You're Dead!<br>(answer= " + currentWord + ")<div id='replay' class='button'>CONTINUE</div>");
    $('#replay').on("click", function() {
        if (questionBank.length > 0) {
            gameScreen();
        } else {
            finalPage();
        }
    });
} // defeatMessage

function finalPage() {
    $('#gameContent').empty();
    $('#gameContent').append('<div id="finalMessage">You have finished all the words in the game!</div>');
} // finalpage