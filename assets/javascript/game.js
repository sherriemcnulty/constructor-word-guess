  "use strict;"

  // ---- global variables ---- //
  var WINS = 0;
  var LOSSES = 0;
  var LETTERS = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

  var WORDS = [{
    word: "giraffe",
    clue: "Has a long neck.",
  }, {
    word: "zebra",
    clue: "Looks like a horse with stripes.",
  }, {
    word: "tiger",
    clue: "Striped wild cat.",
  }];

  // initialize game
  var WINS = 0;
  var LOSSES = 0;

  // Loop through list of words. 
  // For each word in the list: 
  //    A word and clue is displayed.
  //    User types letters to solve the puzzle.
  //    The maximum number of errors allowed is 6.

  console.log(WORDS.length);
  var i = 0;

  //ffor (var i = 0; i < WORDS.length; i++) {
  var word = WORDS[i].word;
  var clue = WORDS[i].clue;
  var numWrong = 0; // this gets tracked internally
  var guessed = "";
  var message = "";

  var winsSpan = document.getElementById("wins").textContent = WINS;
  var lossesSpan = document.getElementById("losses").textContent = LOSSES;
  var wrongSpan = document.getElementById("num-wrong").textContent = numWrong;
  var clueSpan = document.getElementById("clue").textContent = clue;

  // initialize blanks
  function displayBlanks(word) {

  }

  // display