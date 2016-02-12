/* **** Guessing Game Functions **** */

// Global variables
var winningNumber = generateWinningNumber();
var guesses = [];

// Generate the Winning Number

function generateWinningNumber(){
	// Generate a random number between 1 and 100, inclusive
	return (Math.floor(Math.random()*100)+1);
}

// Fetch the Players Guess

function playersGuessSubmission(){
	// Assign user input to variable
	var playersGuess = +$('#userGuess').val();
	// Clear the player's guess from the DOM
	$('#userGuess').val("");
	// Check guess
	checkGuess(playersGuess);
}

// Determine if the current guess is higher or lower than the winning number

function lowerOrHigher(guess){
	return(((guess - winningNumber) > 0)?"higher":"lower");
}

// Return a string that will be used when the checkGuess function is invoked

function guessMessage(guess) {
	var currentGuess = guess;

	// Distance in 10's
	var distance = Math.ceil(Math.abs(currentGuess - winningNumber) / 10) * 10;

	// Direction (lower or higher)
	var direction = lowerOrHigher(currentGuess);

	// Return message
	return("Your guess is " + direction + " and within " + distance + " digits of the winning number.");
}

// Check if the Player's Guess is the winning number
function checkGuess(guess){
	var currentGuess = guess;

	// Remind the user if the guess is out of bounds
	if ((currentGuess > 100) || (currentGuess < 1)) {
		console.log("in here")
		$('#messageBox').text("I SAID, guess a number between ONE and ONE HUNDRED.").toggleClass('alt');
		return;
	}

	// if WIN
	if (currentGuess == winningNumber) {
		// EFFECTS: Add guess to notepad
		$('blockquote').append("<li>"+ currentGuess + "</li>");
		// EFFECTS: Show confetti and add winning decorations
		$('body').addClass('winning');
		$('p').find('#confetti').slideDown();
		$('h2').remove();
		$('h1').text("YOU WIN!!!").addClass('winning');
		$('#messageBox').text("YOU WIN!");

	// if REPEAT
	} else if (guesses.indexOf(currentGuess) >= 0) {
		// EFFECTS: Let user know guess is duplicate
		$('#messageBox').text("You guessed that already. " + guessMessage(currentGuess)).toggleClass('alt');
	}

	// if LOSE
	else {
		// Keep track of guesses
		guesses.push(currentGuess); // array
		// EFFECTS: Add guess to notepad
		$('blockquote').append("<li>"+ currentGuess + "</li>");
		// EFFECTS: Update number of guesses left
		$('#tally').text(10 - guesses.length);
		// EFFECTS: Let user know guess is incorrect
		$('#messageBox').text("Try again! " + guessMessage(currentGuess)).toggleClass('alt');

		// Game over?
		if ($('li').length >= 10) {
			// EFFECTS: Show flames and show losing decorations
			$('body').addClass('losing');
			$('p').find('#fire').slideDown();
			$('#smileyface').hide();
			$('p').find('#sadface').slideDown();
			$('h1').text("YOU LOSE!!!").addClass('losing');;
			$('#messageBox').text("GAME OVER");
		}
	}
}

// Create a provide hint button that provides additional clues to the "Player"

function provideHint(){
	var length = winningNumber.toString().length;
	var evenOdd = (winningNumber%2)?"odd":"even";
	return (" The winning number is " + evenOdd + " and " + length + " digits long.");
}

// Allow the "Player" to Play Again

function playAgain(){
	location.reload();
}

/* **** Event Listeners/Handlers ****  */

$(document).ready(function() {

	// Submit Guess Button functionality
	$('.pinkButton').on('click', function() {
		playersGuessSubmission();
		return false;
	});

	// Submit Input Field functionality
	$('input').on('keypress', function(e) {
		if (e.which == 13) {
			playersGuessSubmission();
			return false;
		}
	});

	// Hint Button functionality
	$('#hintButton').on('click', function() {
		$('#messageBox').append(provideHint());
		return false;
	});

	// Start Over Button functionality
	$('#restart').click(playAgain);
	});