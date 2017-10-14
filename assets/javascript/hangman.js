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
var letterReveal = []; //shows blanks and revealed letters
var correctIndex = [];

//FUNCTIONS
function initialize(){
    console.log("INITIALIZE");
    guessesLeft = 7;
    guessedLetters = [];
    letterReveal = [];
    correctIndex = [];
    document.getElementById("guesses-left").innerHTML = guessesLeft;
    document.getElementById("guessed").innerHTML = "";
    document.getElementById("notification").innerHTML = "";
    document.getElementById("play-again").style.display = "none";

    randomWord();
    createBlanks();
}

function randomWord(){
    wordToGuess = wordList[Math.floor(Math.random()*((wordList.length-1)-1+1)+1)];
}

function captureUserInput(){
    document.onkeyup = function(event){ 
        console.log(event.key); 
        userGuess = event.key; 
        
        if(!isWinner()){ //Check if word revealed, won
            if(!isGameOver()){ //Check if guesses left
                if(userGuess !== undefined){ // is guess defined, is guess right/wrong
                    if( isGuessCorrect2() ){
                        revealLetter2();
                    } else if( guessedBefore() === false ){
                        if(isLetter(userGuess)) wrongGuess();
                    }

                    recordGuesses(); //everytime key is pressed record the guess
                    if(isWinner())winner(); //check winning conditions again
                }
            }else{
                console.log("GAME OVER");
                document.getElementById("notification").innerHTML = "You Lose!";
                document.getElementById("play-again").style.display = "block";
            }
        }else{ //WINNER
            console.log("WINNER");
            winner();
        }
    }
}

function winner(){
    wins++;
    document.getElementById("notification").innerHTML = "WINNER!";
    document.getElementById("play-again").style.display = "block";
}

function isWinner(){
    var winner = true;
    for(var i=0; i<wordToGuess.length; i++ ){
        if(letterReveal[i] !== wordToGuess[i]){
            winner = false;
        }
    }
    return winner;
}

function isGameOver(){
    if(guessesLeft>0){
        return false;
    }else{
        return true;
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

function isGuessCorrect2(){
    var correct = false;
    for(var i=0; i<wordToGuess.length; i++){
        //console.log("wordToGuess[i] " + wordToGuess[i] + " userGuess: " + userGuess);
        
        if(wordToGuess[i] === userGuess){
            correctIndex.push(i);
            correct = true;
        }
    }
    return correct;
}

function revealLetter(){
    console.log("RIGHT - Reveal Letter");
    letterReveal[ wordToGuess.indexOf(userGuess) ] = userGuess;
    console.log(letterReveal.toString());
    document.getElementById("word").innerHTML = letterReveal;
}

function revealLetter2(){
    for(var i=0; i < correctIndex.length; i++){
       letterReveal[correctIndex[i]] = wordToGuess[correctIndex[i]]; 
       console.log("letterreveal: " + letterReveal[correctIndex[i]] + "wordtoguess: " + wordToGuess[correctIndex[i]]);
    }    

    console.log("RIGHT - Reveal Letter");
    console.log(letterReveal.toString());
    document.getElementById("word").innerHTML = letterReveal;
}

function wrongGuess(){
    console.log("WRONG");
    guessesLeft--;
    document.getElementById("guesses-left").innerHTML = guessesLeft;
    //Add to hangman
}

function createBlanks(){
    var theWordBlank;
    document.getElementById("word").innerHTML = "";
    for(var i=0; i<wordToGuess.length; i++){
        //theWordBlank = document.getElementById("word");
        //theWordBlank.innerHTML += " _ ";
        letterReveal[i] = " _ "
        //console.log(theWordBlank.innerHTML);
        console.log(letterReveal);
    } 
    document.getElementById("word").innerHTML = letterReveal;
}

function recordGuesses(){
    if(isLetter(userGuess)){
        guessedLetters.push(userGuess);
    }
    document.getElementById("guessed").innerHTML = guessedLetters;
    console.log("recordGuesses " + guessedLetters);
}

function guessedBefore(){
    console.log("Guessed Before" + guessedLetters.indexOf(userGuess));
    if(guessedLetters.indexOf(userGuess) === -1){
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

    var resetButton = document.getElementById("play-again");
    resetButton.onclick = initialize;

    initialize();
//    randomWord();
//    createBlanks();

    captureUserInput();  

};