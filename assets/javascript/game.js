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
        displayIdElement("message", "");
        displayIdElement("chances", this.numChances);
        displayIdElement("used-letters", "");
        displayIdElement("clue", this.currentWord.clue);
        displayIdElement("blanks", this.currentWord.blanks.join(" "));
      } else {
        console.log("Game over!");
        displayIdElement("message", "Game over! Wins: " + this.wins + ", Losses: " + this.losses);
        document.getElementById("game-box").style.display = "none";
      }
    },

    processLetter: function (letter) {

      var letter = letter.toUpperCase();

      if (this.usedLetters.indexOf(letter) !== -1) {
        // letter has been used
        console.log("'" + letter + "' has been used.");
        displayIdElement("message", "'" + letter + "' has been used.");
      } else {
        // letter has not been used
        console.log("'" + letter + "' has NOT been used.");
        this.usedLetters += letter;
        displayIdElement("used-letters", this.usedLetters);

        if (this.currentWord.word.indexOf(letter) >= 0) {
          // letter is in the word
          console.log("'" + letter + "' is in the word.");
          this.insertLetter(letter);

          if (this.isWon()) {
            // if no more blanks, user wins
            console.log("You won!");
            displayIdElement("message", "You won!");
            displayIdElement("wins", ++this.wins);
            this.newWord();
          }

        } else {
          // letter is not in the word
          console.log("'" + letter + "' is NOT in '" + this.currentWord.word + "'");
          displayIdElement("chances", --this.numChances);

          if (this.numChances === 0) {
            // if chances are used up, user lost
            console.log("You lost!");
            displayIdElement("message", "You lost!");
            displayIdElement("losses", ++this.losses);
            this.newWord();

          }
        }
      }
    }, // processLetter()

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
  document.getElementById("game-box").style.display = "none";
  document.getElementById("message").style.display = "block";
  displayIdElement("message", "Press any key to start!");


  // THIS IS WHERE THE ACTION IS . . .
  document.onkeyup = function (event) {

    var key = event.key;

    console.log(key + " was pressed.");
    displayIdElement("message", "");

    if (game.index === 0) {

      // first word -> initialize the game
      game.newWord();
      document.getElementById("game-box").style.display = "block";
      displayIdElement("wins", game.wins);
      displayIdElement("losses", game.losses);
    } else {

      if (LETTERS.indexOf(key) === -1) {
        console.log("'" + key + "' is not a letter");
        displayIdElement("message", "'" + key + "' is not a letter");
      } else { // key is a letter

        game.processLetter(key);
      }
    }
  }; // end onkeyup() 

  /*****  FUNCTIONS *****/

  function displayIdElement(which, str) {
    // make it easy to display elements

    document.getElementById(which).textContent = str;

  } // end displayElement()