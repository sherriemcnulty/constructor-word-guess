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

    newWord: function (i) {
      // retrieve new word and reset tracking
      if (i < WORDS.length) {
        this.usedLetters = "";
        this.numChances = MAX_CHANCES;
        this.currentWord = {
          word: WORDS[i].word,
          clue: WORDS[i].clue,
          blanks: WORDS[i].blanks
        }
        displayIdElement("chances", this.numChances);
        displayIdElement("used-letters", "");
        displayIdElement("clue", this.currentWord.clue);
        displayIdElement("blanks", this.currentWord.blanks.join(" "));
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

        if (this.currentWord.blanks[i] === '_') {

          return false;
        }
      }
      return true;
    } // isWon()
  } // gameObj


  // INITIAL DISPLAY
  document.getElementById("game-box").style.display = "none";
  document.getElementById("message").style.display = "block";
  displayIdElement("message", "Press any key to start!");


  // THIS IS WHERE THE ACTION IS . . .
  document.onkeyup = function (event) {

    var key = event.key;

    console.log(key + " was pressed.");
    displayIdElement("message", "");

    if (game.index === 0) { // first word
      game.newWord(game.index++);
      document.getElementById("game-box").style.display = "block";
      displayIdElement("wins", game.wins);
      displayIdElement("losses", game.losses);

    } else if (game.index > WORDS.length) { // game over
      console.log("Game over!");
      displayIdElement("message", "Game over! Wins: " + game.wins + ", Losses: " + game.losses);
      document.getElementById("game-box").style.display = "none";

    } else {
      if (LETTERS.indexOf(key) === -1) {
        console.log("'" + key + "' is not a letter");
        displayIdElement("message", "'" + key + "' is not a letter");

      } else { // key is a letter

        var letter = key;
        letter = letter.toUpperCase();

        if (game.usedLetters.indexOf(letter) !== -1) {
          // letter has been used
          console.log("'" + letter + "' has been used.");
          displayIdElement("message", "'" + letter + "' has been used.");
        } else {
          // letter has not been used
          console.log("'" + letter + "' has NOT been used.");
          game.usedLetters += letter;
          displayIdElement("used-letters", this.usedLetters);

          if (game.currentWord.word.indexOf(letter) >= 0) {
            // letter is in the word
            console.log("'" + letter + "' is in the word.");
            game.insertLetter(letter);

            if (game.isWon()) {
              // if no more blanks, user wins
              console.log("You won!");
              displayIdElement("message", "You won!");
              displayIdElement("wins", ++game.wins);
              game.newWord(game.index++);
            }

          } else {
            // letter is not in the word
            console.log("'" + letter + "' is NOT in '" + game.currentWord.word + "'");
            displayIdElement("chances", --game.numChances);

            if (game.numChances === 0) {
              // if chances are used up, user lost
              console.log("You lost!");
              displayIdElement("message", "You lost!");
              displayIdElement("losses", ++game.losses);
              game.newWord(game.index++);

            }
          }
        }
      }
    }
  }; // end onkeyup() 

  /*****  FUNCTIONS *****/

  function displayIdElement(which, str) {
    // make it easy to display elements

    document.getElementById(which).textContent = str;

  } // end displayElement()