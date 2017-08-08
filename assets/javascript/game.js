/*TODO: Display on page "Press any key to get started"
Optional: Remove once a key is pressed*/

// Create a list of hangman words
var words = ["Java", "jQuery", "Ruby", "Heroku", "JavaScript"];

//So I can have a title screen
var gameStarted = false;
var chosenWord;
var chosenWordIndex;
var blankWord = [];

document.onkeyup = function(event){
	var letter
	var letter = String.fromCharCode(event.keyCode).toLowerCase();
	document.getElementById("startBox").style.display = "none";
	}
	gameStarted = true;

	console.log(gameStarted);
var wordsBackup = words;
//to keep track of my initial list if I remove things from the array.

function indexPicker() {
	//Pick random number between 0 and words.length from the array
	var chosenWordIndex = Math.floor(Math.random() * words.length);
	//Use the previous number to get the actual word from the list
	var chosenWord = words[chosenWordIndex];
	// ToDo: Remove word once chosen to eliminate duplication. Probably print a "You win!" or something at the end. 
	return chosenWordIndex;
}

var chosenWordIndex = indexPicker()

function wordPicker() {
	var chosenWord = words[chosenWordIndex];
	// ToDo: Remove word once chosen to eliminate duplication. Probably print a "You win!" or something at the end. 
	return chosenWord;
}

var chosenWord = wordPicker()

//make sure I didn't screw up
console.log(chosenWord);
console.log(chosenWordIndex);

chosenWord = wordPicker()

//generate an array equal to the length of the word filled with underscores to put on the page
for(i = 0; len = words[chosenWordIndex].length, i < len; i+=1){
	blankWord.push("_");
};

//Output blankWord with spaces rather than commas for neatness.
console.log(blankWord.join(" "));
var wins=0
if(gameStarted){
//Pulls a letter that someone types
	document.onkeypress = function(event) {
		var letter = String.fromCharCode(event.keyCode).toLowerCase();
		var result = hangman(chosenWord, letter)
		console.log(letter)
	}

	/*"efficiently borrowed" (aka stolen from Stack Overflow) code
	checks for every occurance of an element in chosenWord
	Then if it finds it, sets that index in blankWord to that character in chosenWord*/

	console.log(wins);
		function hangman(arr, val) {
		    var indexes = [], i;
		    for(i = 0; i < arr.length; i++)
		        if (arr[i].toLowerCase() === val.toLowerCase()){
		            blankWord[i]=chosenWord[i];
		    		guessedLetters.innerHTML = blankWord.join(" ");
		    	}
		    	if (blankWord.join("") === chosenWord) {
		    		++wins;
		    		console.log("Wins: " + wins);
		    		indexPicker();
		    		wordPicker();
		    	}
		}
}

//Counts number of wins



