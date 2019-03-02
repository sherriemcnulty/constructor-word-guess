  "use strict;"

  // ---- constants ---- //
  const MAX_CHANCES = 6;
  const LETTERS = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const WORDS = [{
    word: "giraffe",
    clue: "Has a long neck.",
    blanks: ['_', '_', '_', '_', '_', '_', '_']
  }, {
    word: "zebra",
    clue: "Looks like a horse with stripes.",
    blanks: ['_', '_', '_', '_', '_']
  }, {
    word: "tiger",
    clue: "Striped wild cat.",
    blanks: ['_', '_', '_', '_', '_']
  }];

  // variables
  var index = 0;
  var wins = 0;
  var losses = 0;
  var numChances;
  var usedLtrs;
  var thisWord;

  document.getElementById("game").style.display = "none";
  document.getElementById("msg").textContent = "Press any key to begin!";



  // the action happens here . . .
  document.onkeyup = function (event) {

    var key = event.key;

    console.log(key + " was pressed.");

    if (index === 0) { // start game

      newWord(index++);
      document.getElementById("msg").style.display = "none"; // hide startup message
      document.getElementById("game").style.display = "block"; // display scoreboard
      displayElement("wins", wins);
      displayElement("losses", losses);
      displayElement("chances", numChances);
      displayElement("clue", thisWord.clue);
      displayElement("blanks", thisWord.blanks.join(" "));

    } else {

      if (LETTERS.indexOf(key) === -1) {

        console.log("'" + key + "' is not a letter");
        alert("'" + key + "' is not a letter");

      } else {

        console.log("'" + key + "' is a letter.");
        var letter = key.toLowerCase();

        if (usedLtrs.indexOf(letter) < 0) {

          console.log("'" + letter + "' has NOT been used.");

          if (thisWord.word.indexOf(letter) >= 0) { // letter is in the word

            console.log("'" + letter + "' is in the word.");
            //insertLetter(letter);

          } else {

            console.log("'" + key + "' is NOT in '" + thisWord.word + "'")
            numChances--;
            displayElement("chances", --numChances);
          }

        } else {
          console.log("'" + letter + "' has been used.");
          alert("'" + letter + "' has been used.");
        }


      }
    }
  }; // end onkeyup() 


  /*****  FUNCTIONS *****/

  function newWord(i) {
    // retrieve new word and reset tracking

    usedLtrs = "";
    numChances = MAX_CHANCES;
    thisWord = {
      word: WORDS[i].word,
      clue: WORDS[i].clue,
      blanks: WORDS[i].blanks
    }
  } // end newWord()

  function displayElement(which, str) {
    // make it easy to display elements
    document.getElementById(which).textContent = str;
  }