function Word(word, clue) {
	this.word = word;
	this.clue = clue;
	this.blanks = [];
	this.printWord = function () {
		alert(this.word);
	};
	this.printClue = function () {
		alert(this.clue);
	};
	this.isInWord = function (letter) {
		alert(letter);
	};
	this.setBlanks = function () {
		for (let i = 0; i < this.word.length; i++) {
			this.blanks.push("_ ");
		}
		alert("setBlanks: " + this.blanks);
	};
	this.printBlanks = function () {
		alert(this.blanks);
	};
}
