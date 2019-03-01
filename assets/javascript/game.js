  "use strict;"

  // ---- constants ---- //
  const MAX_CHANCES = 6;

  const LETTERS = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

  const WORDS_ARR = [{
    word: "giraffe",
    clue: "Has a long neck.",
    blanksArr: ['_', '_', '_', '_', '_', '_', '_']
  }, {
    word: "zebra",
    clue: "Looks like a horse with stripes.",
    blanksArr: ['_', '_', '_', '_', '_']
  }, {
    word: "tiger",
    clue: "Striped wild cat.",
    blanksArr: ['_', '_', '_', '_', '_']
  }];

  // global variables
  var gWins = 0;
  var gLosses = 0;
  var gIndex = 0;
  var gChances = MAX_CHANCES;
  var gGuessed = "";
  var gWord = newWord();

  // initialize game
  document.getElementById("wins").textContent = gWins;
  document.getElementById("losses").textContent = gLosses;
  document.getElementById("chances").textContent = gChances;
  document.getElementById("guessed").textContent = gGuessed;
  document.getElementById("word").textContent = gWord.word;
  document.getElementById("clue").textContent = gWord.clue;
  document.getElementById("blanks").textContent = gWord.blanksArr.join(" ");

  // newWord(): get the current word from WORDS_ARR and increment gIndex
  function newWord() {

    var word = {
      word: WORDS_ARR[gIndex].word,
      clue: WORDS_ARR[gIndex].clue,
      blanksArr: WORDS_ARR[gIndex].blanksArr
    }
    gIndex++;
    return word;
  }