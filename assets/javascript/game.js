/*TODO: Display on page "Press any key to get started"
Optional: Remove once a key is pressed*/

// Create a list of hangman words
var words = ["Java"];

//So I can have a title screen, because it's not in the specs but it doesn't say *not* to.
var gameStarted = false;
var chosenWord;
var chosenWordIndex;
var blankWord = [];
var winNumber=0

if(!gameStarted){
	document.onkeyup = function(event){
		var letter
		var letter = String.fromCharCode(event.keyCode).toLowerCase();
		document.getElementById("startBox").style.display = "none";
		document.getElementById("gameBox").style.display = "initial";
		console.log(gameStarted)
		}
		gameStarted = true;
}

var wordsBackup = words;
//to keep track of my initial list if I remove things from the array.

function indexPicker() {
	//Pick random number between 0 and words.length from the array
	var chosenWordIndex = Math.floor(Math.random() * words.length);
	//Use the previous number to get the actual word from the list
	// ToDo: Remove word once chosen to eliminate duplication. Probably print a "You win!" or something at the end. 
	return chosenWordIndex;
}

chosenWordIndex = indexPicker()

function wordPicker() {
	var chosenWord = words[chosenWordIndex];
	// ToDo: Remove word once chosen to eliminate duplication. Probably print a "You win!" or something at the end. 
	return chosenWord;
}

//make sure I didn't screw up

chosenWord = wordPicker(chosenWordIndex)
console.log(chosenWord);
console.log(chosenWordIndex);


//generate an array equal to the length of the word filled with underscores to put on the page
for(i = 0; len = words[chosenWordIndex].length, i < len; i+=1){
	blankWord.push("_");
	guessedLetters.innerHTML = blankWord.join(" ")
	wins.innertext = "Wins: " + wins;
};

//Output blankWord with spaces rather than commas for neatness.
console.log(blankWord.join(" "));

if(gameStarted===true){
//Pulls a letter that someone types
	document.onkeypress = function(event) {
		var letter = String.fromCharCode(event.keyCode).toLowerCase();
		var result = hangman(chosenWord, letter)
		console.log(letter)
	}

	/*"efficiently borrowed" (aka stolen from Stack Overflow) code
	checks for every occurance of an element in chosenWord
	Then if it finds it, sets that index in blankWord to that character in chosenWord*/

		function hangman(arr, val) {
		    var indexes = [], i;
		    for(i = 0; i < arr.length; i++)
		        if (arr[i].toLowerCase() === val.toLowerCase()){
		            blankWord[i]=chosenWord[i];
		    		guessedLetters.innerHTML = blankWord.join(" ");
		    	}
		    	if (blankWord.join("") === chosenWord) {
		    		++winNumber;
		    		wins.innerHTML = "Wins: " + winNumber;
		    		wordPicker(indexPicker());
		    		console.log("Wins: This one is working " + winNumber);
		    	}
		}
}



//Counts number of wins



