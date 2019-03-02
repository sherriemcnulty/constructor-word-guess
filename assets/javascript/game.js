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
  var index = 0;
  var wins = 0;
  var losses = 0;
  var numChances;
  var usedLtrs;
  var thisWord;

  // INITIAL DISPLAY
  document.getElementById("game").style.display = "none";
  document.getElementById("msg").textContent = "Press any key to begin!";

  // THIS IS WHERE THE ACTION IS . . .
  document.onkeyup = function (event) {

    var key = event.key;

    console.log(key + " was pressed.");

    if (index === 0) { // start game

      console.log("Initialize game.");
      newWord(index);
      document.getElementById("msg").style.display = "none"; // hide startup message
      document.getElementById("game").style.display = "block"; // display scoreboard
      displayIdElement("wins", wins);
      displayIdElement("losses", losses);
    } else {

      if (LETTERS.indexOf(key) === -1) {

        console.log("'" + key + "' is not a letter"); //////////////////
        alert("'" + key + "' is not a letter");

      } else {

        console.log("'" + key + "' is a letter."); //////////////////
        var letter = key.toUpperCase();

        if (usedLtrs.indexOf(letter) < 0) {

          console.log("'" + letter + "' has NOT been used."); ///////////////
          usedLtrs += letter;

          if (thisWord.word.indexOf(letter) >= 0) {

            console.log("'" + letter + "' is in the word.");
            insertLetter(letter);

            if (isWon()) {

              console.log("You won!");
              alert("You won!");
              displayIdElement("wins", ++wins);
              newWord();
            }

          } else {

            console.log("'" + key + "' is NOT in '" + thisWord.word + "'"); ///////////////////
            displayIdElement("chances", --numChances);
            if (numChances === 0) {
              alert("You lose!");
              newWord();
            }
          }

        } else {
          console.log("'" + letter + "' has been used."); //////////////////////
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

  function insertLetter(ltr) {

    var wordArr = thisWord.word.split("");
    var length = wordArr.length;

    for (var i = 0; i < length; i++) {

      if (ltr === wordArr[i]) {

        thisWord.blanks[i] = ltr;
      }
    }

    displayIdElement("blanks", thisWord.blanks.join(" "));

  } // end insertLetter()

  function isWon() {
    // determine whether the user guessed the word

    for (var i = 0; i < thisWord.blanks.length; i++) {

      console.log("isWon(): i=" + i + "thisWord.blanks[i]=" + thisWord.blanks[i]);
      if (thisWord.blanks[i] === '_') {

        return false;
      }
    }
    return true;
  }

  function newWord() {
    // retrieve new word and reset tracking

    if (index < WORDS.length) {
      usedLtrs = "";
      numChances = MAX_CHANCES;
      thisWord = {
        word: WORDS[index].word,
        clue: WORDS[index].clue,
        blanks: WORDS[index++].blanks
      }

      displayIdElement("chances", numChances);
      displayIdElement("clue", thisWord.clue);
      displayIdElement("blanks", thisWord.blanks.join(" "));
    } else {
      alert("Game over!");
    }
  } // end newWord()