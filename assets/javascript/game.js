/*TODO: Display on page "Press any key to get started"
Optional: Remove once a key is pressed*/
//KNOWN BUGS:
//Shows your final, incorrect, keypress if it appears in the new word it picks.

// Create a list of hangman words
var words = ["Java", "jQuery", "MySQL", "JavaScript", "MongoDB", "Heroku"];

//So I can have a title screen, because it's not in the specs but it doesn't say *not* to.
var gameStarted = false;
var chosenWord;
var chosenWordIndex;
var blankWord = [];
var winNumber=0;
var lossNumber=0;
var guesses = [];
var guessesRemaining = 12;

//The following if statement is me trying to be clever and make this a single page app with a title screen.


if(!gameStarted){
	//listens for a key press (technically key down, but eeh)
	document.onkeydown = function(event){
		//initializes variable, because not initializing your variables is bad, m'kay?
		var letter = " "
		//sanitizes the keydown input, though I probably don't need to do this here. But I more or less copy pasted code.
		var letter = String.fromCharCode(event.keyCode).toLowerCase();
		//sets the full screen jumbotron with "Press any key to start!" to not render
		document.getElementById("startBox").style.display = "none";
		//sets everything else, which starts unrendered, to render.
		document.getElementById("gameBox").style.display = "initial";
		console.log(gameStarted)
		}
		//stops it from ever running again. I could probably code a reset button at this point where if pressed it calls this block as a function, but I haven't gotten around to that.
		gameStarted = true;
}


//to keep track of my initial list if I remove things from the array.
//I haven't coded that functionality yet, because .split isn't working right for me, and I'm not sure if there's a different method I ought to use for that.
var wordsBackup = words;

//Refactored from original code for ease of coding.
function indexPicker() {
	//Pick random number between 0 and words.length from the array
	var chosenWordIndex = Math.floor(Math.random() * words.length);
	//Use the previous number to get the actual word from the list
	// ToDo: Remove word once chosen to eliminate duplication. Probably print a "You win!" or something at the end. 
	return chosenWordIndex;
}

//Refactored from original code for ease of coding.
function wordPicker() {
	var chosenWordIndex = indexPicker();
	var chosenWord = words[chosenWordIndex];
	// ToDo: Remove word once chosen to eliminate duplication. Probably print a "You win!" or something at the end.
	// ToDo: Remove duplicate comments in my code. 
	return chosenWord;
}

//make sure I didn't screw up

chosenWord = wordPicker();


//generate an array equal to the length of the word filled with underscores to put on the page
function underscoreWord(){
		for(i = 0; len = chosenWord.length, i < len; i+=1){
		blankWord.push("_");
		guessedWord.innerHTML = blankWord.join(" ")
		wins.innertext = "Wins: " + wins;
	};
};

//actually call the preceding function.
underscoreWord();

/*"efficiently borrowed" (aka stolen from Stack Overflow) code
checks for every occurance of an element in chosenWord
Then if it finds it, sets that index in blankWord to that character in chosenWord*/
//This throws a minor error when the game restarts as I can't figure out how to not get it to auto-guess the last key pressed in the previous round without making it freak out, but it still works.
function hangman(arr, val) {
    for(i = 0; i < arr.length; i++){
    	//works out such that if a character in chosenWord is equal to the typed letter, the appropriate underscore in blankWord is replaced with that letter in chosenWord. 
		if (arr[i].toLowerCase() === val.toLowerCase()){
            blankWord[i]=chosenWord[i];
            //update the page HTML with the new partially-underscored word 
    		guessedWord.innerHTML = blankWord.join(" ");
    		//check if you got the word
    		if (blankWord.join("") === chosenWord) {
	    		//Increments the number of wins
	    		winNumber+=1;
	    		//outputs the new number to HTML
	    		wins.innerHTML = "Wins: " + winNumber;
	    		alert("You got it! Your word was " + chosenWord);
	    		//resets blankWord to empty.
	    		blankWord = [];
	    		//picks a new word
	    		chosenWord = wordPicker();
	    		//sets the blankWord to a bunch of underscores as long as chosenWord
	    		underscoreWord();
	    		//resets the various fields
	    		guessesRemaining = 12;
	    		guessesRemainingField.innerHTML = "Number of Guesses Remaining: " + guessesRemaining;
	    		guesses = [];
	    		guessedLettersField.innerHTML = "Guessed Letters: ";
	    		hangman(chosenWord, letter);
    		} 
		} 

	}
}


//somehow, you broke it such that it'll subtract a guess for capital letter but not a lower case letter. 
if(gameStarted===true){
//Pulls a letter that someone types
	document.onkeypress = function(event) {
		//Sanitizes input by grabbing the actual unicode of the keypress, converting it to a character, rendering it as a string, and converting it to lowercase,
		var letter = String.fromCharCode(event.keyCode).toLowerCase();
		//runs through the Hangman code
		hangman(chosenWord, letter);
		//It took me WAY too long to figure out that I needed these next three lines, and to change the last bit of my If statement to not use up a guess when guessing a capital letter that's actually in the word.
		var blankWordLC = []
		for (var i = 0 ; i < blankWord.length; i++) {
			blankWordLC[i] = blankWord[i].toLowerCase();
		};
		console.log(blankWordLC);
		console.log(letter.charCodeAt());
		//I am *quite* proud of this actually. I didn't have to put in every single letter in a giant if statement! Thanks, Unicode!
		//I'm sorta wondering if there's a more efficient way to say "for x in range y-z" in JavaScript, but I haven't had a chance to dig for it yet.
		//if (you can't find what key you pressed in the "already guessed" index) AND (the character code of your letter is lower-case-A or later)
		//AND (the character code of your letter is lower-case-z or earlier AND (the guess isn't part of the displayed word yet))
		if(guesses.indexOf(letter) === -1 && letter.charCodeAt() > 93 && letter.charCodeAt() < 123 && blankWordLC.indexOf(letter) === -1){
			console.log(letter.charCodeAt());
			guesses.push(letter);
			guessedLettersField.innerHTML = "Letters Already Guessed: " + guesses.join(" ");
			guessesRemaining-=1;
			//Finally found the correct position in the code to put this such that it doesn't require an extra keypress to trigger the fail state.
			if (guessesRemaining < 1) {
				console.log("BLarg")
	    		//Increments the number of losses
	    		lossNumber+=1;
	    		//outputs the new number to HTML
	    		losses.innerHTML = "Losses: " + lossNumber;
	    		alert("You lose! Your word was " + chosenWord);
	    		//resets blankWord to empty.
	    		blankWord = [];
	    		//picks a new word
	    		chosenWord = wordPicker();
	    		//sets the blankWord to a bunch of underscores as long as chosenWord
	    		underscoreWord();
	    		//resets the various fields
	    		guessesRemaining = 12;
	    		guessesRemainingField.innerHTML = "Number of Guesses Remaining: " + guessesRemaining;
	    		guesses = [];
	    		guessedLettersField.innerHTML = "Guessed Letters: ";
	    		hangman(chosenWord, null);
	    	}
		}
		guessesRemainingField.innerHTML = "Number of Guesses Remaining: " + guessesRemaining;
	}
}



//Counts number of wins



