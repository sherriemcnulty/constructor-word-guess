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

    insertLetter: function (ltr) {

      var wordArr = this.currentWord.word.split("");
      var length = wordArr.length;

      for (var i = 0; i < length; i++) {

        if (ltr === wordArr[i]) {

          this.currentWord.blanks[i] = ltr;
        }
      }

      displayIdElement("blanks", this.currentWord.blanks.join(" "));
    }, // insertLetter()

    isInit: function () {
      if (this.index === 0) {
        return true;
      }
      return false;
    },

    isInWord: function (ltr) {
      if (this.currentWord.word.indexOf(ltr) >= 0) {
        return true;
      }
      return false;
    }, // isInWord()

    isLost: function () {
      if (game.numChances === 0) {
        return true;
      }
      return false;
    }, // isLost()

    isOver: function () {
      if (game.index > WORDS.length) {
        return true;
      }
      return false;
    }, // isOver()

    isUsed: function (ltr) {
      if (this.usedLetters.indexOf(ltr) !== -1) {
        return true;
      }
      return false;

    }, // isUsed()

    isValid: function (ltr) {
      if (LETTERS.indexOf(ltr) != -1) {
        return true;
      }
      return false;
    },

    isWon: function () {

      for (var i = 0; i < this.currentWord.blanks.length; i++) {

        if (this.currentWord.blanks[i] === '_') {

          return false;
        } // if
      } // for
      return true;
    }, // isWon()

    newWord: function (i) {

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
      } // if
    }, // newWord()

  } // gameObj

  function displayIdElement(which, str) {
    document.getElementById(which).textContent = str;
  } // end displayElement()


  // THIS IS WHERE THE ACTION IS . . .

  // set up initial display
  document.getElementById("game-box").style.display = "none";
  document.getElementById("message").style.display = "block";
  displayIdElement("message", "Press any key to start!");

  // listen for key press
  document.onkeyup = function (event) {

    var key = event.key;

    console.log(key + " was pressed.");
    displayIdElement("message", "");

    if (game.isOver()) {
      // print score & return if game is over
      //
      displayIdElement("message", "Game over! Total Wins: " + game.wins + ", Lost: " + game.losses);
      document.getElementById("game-box").style.display = "none";
      return;
    } // if game.isOver()

    if (game.isInit()) {
      // get first word, show play screen & return
      //
      game.newWord(game.index++);
      document.getElementById("game-box").style.display = "block";
      displayIdElement("wins", game.wins);
      displayIdElement("losses", game.losses);
      return;
    }

    if (!game.isValid(key)) {
      // return if key pressed is not a letter
      //
      displayIdElement("message", "'" + key + "' is not a letter.");
      return;
    }

    letter = key.toUpperCase();

    if (game.isUsed(letter)) {
      // return if letter has already been used
      //
      game.usedLetters += letter;
      displayIdElement("message", "'" + letter + "' has been used.");
      return;
    }

    /**************************************************************************
     If we got this far, we have a valid letter that has not already been used.
     **************************************************************************/

    console.log("letter = " + letter + ". Proceed with the game.");

    game.usedLetters += letter;
    displayIdElement("used-letters", this.usedLetters);

    if (game.isInWord(letter)) {
      game.insertLetter(letter);
      console.log("'" + letter + "' is in the word.");

      if (game.isWon()) {
        ++game.wins
        displayIdElement("wins", game.wins);
        displayIdElement("message", "You won!");
        game.newWord(game.index++);

      }
    } else { // letter is not in the word
      displayIdElement("chances", --game.numChances);
      console.log("'" + letter + "' is NOT in '" + game.currentWord.word + "'");

      if (game.isLost()) {
        ++game.losses;
        displayIdElement("losses", game.losses);
        displayIdElement("message", "You lost!");
        game.newWord(game.index++);
      }
    }
  }; // end onkeyup()