/*
choose random word
    display number of blanks

capture user input

    Record guessed letter.

    check if guess correct. 
        Correct
            Reveal letter

        Wrong
            Decrement guesses left
            Add to hangman

        Check if won.
        Check if lost.

*/

var wordList = ["cat", "dog", "ape", "monkey", "bird", "antelope"];
var wordToGuess = "";
var userGuess;
var guessesLeft;
var guessedLetters = [];

//FUNCTIONS
function initialize(){
    guessesLeft = 7;
    guessedLetters = [];
    document.getElementById("guesses-left").innerHTML = guessesLeft;
}

function randomWord(){
    wordToGuess = wordList[Math.floor(Math.random()*((wordList.length-1)-1+1)+1)];
}

function captureUserInput(){
    document.onkeyup = function(event){ 
        console.log(event.key); 
        userGuess = event.key; 
        recordGuesses(); //everytime key is pressed record the guess

        if(userGuess !== undefined){ // is guess defined, is guess right/wrong
            if( isGuessCorrect() ){
                revealLetter();
            } else{
                wrongGuess();
            }
        }
    }
}

function isGuessCorrect(){
    var correct;

    if( wordToGuess.indexOf(userGuess) == -1 ){ //WRONG
        correct = false;
    }else{ //CORRECT
        correct = true;
    }
    return correct;
}

function revealLetter(){
    console.log("RIGHt");
}

function wrongGuess(){
    console.log("WRONG");
    guessesLeft--;
    document.getElementById("guesses-left").innerHTML = guessesLeft;
    //Add to hangman
}

function createBlanks(){
    var theWordBlank;
    for(var i=0; i<wordToGuess.length; i++){
        theWordBlank = document.getElementById("word");
        theWordBlank.innerHTML += " _ ";
        console.log(theWordBlank.innerHTML);
    } 
}

function recordGuesses(){
    if(isLetter(userGuess)){
        guessedLetters.push(userGuess);
    }
    document.getElementById("guessed").innerHTML = guessedLetters;
    console.log("recordGuesses " + guessedLetters);
}

function guessedBefore( guess ){
    if(guessedLetters.indexOf(guess) === -1){
        return false;
    }else{
        return true;
    }
}

function isLetter( string ){
    return (/[a-zA-Z]/.test(string) && string.length === 1 );
}
//END FUNCTIONS

//Function Calls
window.onload = function(){

    initialize();
    randomWord();
    createBlanks();

    captureUserInput();  

};