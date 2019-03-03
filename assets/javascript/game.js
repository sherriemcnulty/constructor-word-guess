  "use strict;"

  // CONSTANTS 
  const MAX_CHANCES = 6;
  const LETTERS = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const WORDS = [{
    word: "GIRAFFE",
    clue: "Has a long neck.",
    blanks: ['_', '_', '_', '_', '_', '_', '_']
  }, {
    word: "ZEBRA",
    clue: "Looks like a horse with stripes.",
    blanks: ['_', '_', '_', '_', '_']
  }, {
    word: "TIGER",
    clue: "Striped wild cat.",
    blanks: ['_', '_', '_', '_', '_']
  }];

  // VARIABLES
  var game = gameObj = {
    index: 0,
    wins: 0,
    losses: 0,
    numChances: MAX_CHANCES,
    usedLetters: "",
    currentWord: "",

    newWord: function () {
      console.log("inside newWord()")
      // retrieve new word and reset tracking
      if (this.index < WORDS.length) {
        this.usedLetters = "";
        this.numChances = MAX_CHANCES;
        this.currentWord = {
          word: WORDS[this.index].word,
          clue: WORDS[this.index].clue,
          blanks: WORDS[this.index++].blanks
        }
        displayIdElement("chances", this.numChances);
        displayIdElement("clue", this.currentWord.clue);
        displayIdElement("blanks", this.currentWord.blanks.join(" "));
      } else {
        alert("Game over!");
      }
    },

    insertLetter: function (letter) {

      var wordArr = this.currentWord.word.split("");
      var length = wordArr.length;

      for (var i = 0; i < length; i++) {

        if (letter === wordArr[i]) {

          this.currentWord.blanks[i] = letter;
        }
      }

      displayIdElement("blanks", this.currentWord.blanks.join(" "));
    }, // insertLetter()

    isWon: function () {
      // determine whether the user guessed the word

      for (var i = 0; i < this.currentWord.blanks.length; i++) {

        console.log("isWon(): i=" + i + "currentWord.blanks[i]=" + this.currentWord.blanks[i]);
        if (this.currentWord.blanks[i] === '_') {

          return false;
        }
      }
      return true;
    } // isWon()
  } // gameObj


  // INITIAL DISPLAY
  document.getElementById("game").style.display = "none";

  // THIS IS WHERE THE ACTION IS . . .
  document.onkeyup = function (event) {

    var key = event.key;

    console.log(key + " was pressed.");

    if (game.index === 0) { // start game

      console.log("Initialize game.");
      game.newWord();
      document.getElementById("start-message").style.display = "none"; // hide startup message
      document.getElementById("game").style.display = "block"; // display scoreboard
      displayIdElement("wins", game.wins);
      displayIdElement("losses", game.losses);
    } else {

      if (LETTERS.indexOf(key) === -1) {

        console.log("'" + key + "' is not a letter");
        alert("'" + key + "' is not a letter");

      } else {

        console.log("'" + key + "' is a letter.");
        var letter = key.toUpperCase();

        if (game.usedLetters.indexOf(letter) < 0) {

          console.log("'" + letter + "' has NOT been used.");
          game.usedLetters += letter;

          if (game.currentWord.word.indexOf(letter) >= 0) {

            console.log("'" + letter + "' is in the word.");
            game.insertLetter(letter);

            if (game.isWon()) {

              console.log("You won!");
              alert("You won!");
              displayIdElement("wins", ++game.wins);
              game.newWord();
            }

          } else {

            console.log("'" + key + "' is NOT in '" + game.currentWord.word + "'");
            displayIdElement("chances", --game.numChances);
            if (game.numChances === 0) {
              alert("You lose!");
              game.newWord();
            }
          }

        } else {
          console.log("'" + letter + "' has been used.");
          alert("'" + letter + "' has been used.");
        }
      }
    }
  }; // end onkeyup() 

  /*****  FUNCTIONS *****/

  function displayIdElement(which, str) {
    // make it easy to display elements

    document.getElementById(which).textContent = str;

  } // end displayElement()