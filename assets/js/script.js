// Array of 10 questions along with the answer choices and which choice is correct
// each question is an object

var questions = [
    {
        q_text: "What is ['a', 'b', 'c']?",
        q_answer: "B",
        q_choice1: "an object",
        q_choice2: "an array",
        q_choice3: "a string",
        q_choice4: "none of the above"
    },
    {
        q_text: "Which is NOT a Javascript data type?",
        q_answer: "C",
        q_choice1: "null",
        q_choice2: "bigint",
        q_choice3: "pointer",
        q_choice4: "symbol"
    },    
    {
        q_text: "Which of these is NOT falsy in Javascript?",
        q_answer: "B",
        q_choice1: "NaN",
        q_choice2: "void",
        q_choice3: "null",
        q_choice4: "0"
    },
    {
        q_text: "Which is a valid loop type in Javascript?",
        q_answer: "D",
        q_choice1: "for",
        q_choice2: "do",
        q_choice3: "while",
        q_choice4: "all of the above"
    },
    {
        q_text: "In what HTML element do we put the Javascript file?",
        q_answer: "C",
        q_choice1: "<style>",
        q_choice2: "<js>",
        q_choice3: "<script>",
        q_choice4: "<javascript>"
    },
    {
        q_text: "In the function declaration 'function test(a)' what is a?",
        q_answer: "B",
        q_choice1: "an argument",
        q_choice2: "a parameter",
        q_choice3: "a string",
        q_choice4: "a pointer"
    },
    {
        q_text: "How do you write a comment in Javascript?",
        q_answer: "C",
        q_choice1: "**Comment",
        q_choice2: "<!--Comment-->",
        q_choice3: "//Comment",
        q_choice4: "--Comment"
    },
    {
        q_text: "Which of these can go in an array?",
        q_answer: "D",
        q_choice1: "strings",
        q_choice2: "numbers",
        q_choice3: "objects",
        q_choice4: "all of the above"
    },
    {
        q_text: "What event occurs when the user clicks on the page?",
        q_answer: "B",
        q_choice1: "click",
        q_choice2: "onclick",
        q_choice3: "submit",
        q_choice4: "onmouseclick"
    },
    {
        q_text: "Which of these will return an element with the id of 'test'?",
        q_answer: "C",
        q_choice1: "document.queryselector('test')",
        q_choice2: "document.queryselector('.test')",
        q_choice3: "document.queryselector('#test')",
        q_choice4: "document.queryselector(#test)"
    }
];

var startButton = document.querySelector("#startBtn");
var idleScreen = document.querySelector("#gameIdle");
var quizScreen = document.querySelector("#quizScreen");
var highScreen = document.querySelector("#highScoreEntry")
var endScreen = document.querySelector("#endScore")
var highScoreListEl = document.querySelector("#highScoreList")
var timerEl= document.querySelector("#timer");
var questionEl = document.querySelector("#questionText");
var answer1 = document.querySelector("#answer1Btn");
var answer2 = document.querySelector("#answer2Btn");
var answer3 = document.querySelector("#answer3Btn");
var answer4 = document.querySelector("#answer4Btn");
var highScoreForm = document.querySelector("#highScoreEntryForm")
var highScoreMsgEl = document.querySelector("#highScoreMessage");
var endScoreMsgEl = document.querySelector("#endScoreMessage")
var questionIndex = 0;
var score = 0;
var stopTimer = false;
var timerValue = 120;
var numCorrect = 0;
var highScores = [];

startBtn.addEventListener("click", function() {
    idleScreen.classList.add("invisible");
    quizScreen.classList.remove("invisible");
    startQuiz();
});

function displayQuestion() {
    questionEl.textContent = (questionIndex + 1) + ")  " + questions[questionIndex].q_text;
    answer1.textContent = questions[questionIndex].q_choice1;
    answer2.textContent = questions[questionIndex].q_choice2;
    answer3.textContent = questions[questionIndex].q_choice3;
    answer4.textContent = questions[questionIndex].q_choice4;
}

function startQuiz() {
    timerValue = 120;
    score=0;
    questionIndex=0;
    stopTimer=false;
    numCorrect=0;

    timerEl.textContent = "Time : " + timerValue;
    displayQuestion();

    var timerInterval = setInterval(function() {
        timerValue--;
        timerEl.textContent = "Time : " + timerValue;
        if (timerValue<=0) {
            clearInterval(timerInterval);
            gameEnd();
            
        }
    }, 1000)
}

// Runs at the end of the game
function gameEnd() {
    if (highScores.length<5) {
        getHighScore();
    } else if (highScores[highScores.length-1].score<score) {
        getHighScore();
    } else {
        displayScore();
    }
    timerValue=0;
}

// Tied to the answer buttons - userAnswer indicates which of the four buttons they clicked
// Updates score and or/timer depending on whether or not they answered correctly
// Moves to the next question
function answerChosen(userAnswer){
    if (questionIndex===questions.length){
        return;
    }
    if (userAnswer===questions[questionIndex].q_answer) {
        score+=10;
    } else {
        timerValue-=12;
    }
    questionIndex++;
    if (questionIndex<questions.length) {
        displayQuestion();
    } else {
        timerValue=0;
    }
}

// Displays the high score entry page
function getHighScore(){
    highScreen.classList.remove("invisible");
    quizScreen.classList.add("invisible");
    highScoreMsgEl.textContent = "You got a high score! " + score + " points!"
}

// Runs when user clicks the submit button on the name entry form after getting a high score
// Adds the new high score to the high score array, sorts it, and saves it to local storage
function updateHighScores(event){
    event.preventDefault()
    highScores.push({name: highScoreForm.elements["nameEntry"].value, score: score})
    highScores.sort((a, b) => b.score - a.score);
    // remove last array entry if there are more than 5 high scores
    if (highScores.length>5) {
        highScores.pop();
    }   
    localStorage.setItem("jsQuizHighScores", JSON.stringify(highScores))
    displayHighScores();
    highScreen.classList.add("invisible");
    idleScreen.classList.remove("invisible");
}

// Displays the score screen at the end of the game when the user didn't get a high score
function displayScore(){
    quizScreen.classList.add("invisible");
    endScreen.classList.remove("invisible");
    if (score!==1) {
        endScoreMsgEl.textContent = "You scored " + score + " points!"
    } else {
        endScoreMsgEl.textContent = "You scored " + score + " point!"
    }
}

// Displays the game idle screen
function goIdle() {
    endScreen.classList.add("invisible");
    displayHighScores();
    idleScreen.classList.remove("invisible")
}

highScoreForm.addEventListener("submit", updateHighScores);

// Writes the high scores to the page
function displayHighScores(){
    highScoreListEl.innerHTML=""
    for (i=0;i<highScores.length;i++){
        let listItem = document.createElement("li")
        listItem.textContent=highScores[i].name + " - " + highScores[i].score;
        highScoreListEl.append(listItem);

    }
}

// on page load check whether high scores are saved in local storage 
// if they are, load them into highScores
if (localStorage.getItem("jsQuizHighScores")) {
    highScores = JSON.parse(localStorage.getItem("jsQuizHighScores"))
}
displayHighScores();