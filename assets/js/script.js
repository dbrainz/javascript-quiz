// Array of 10 questions along with the answer choices and which choice is correct
// each question is an object
// currently filled with test data - will replace with actual questions later

var questions = [
    {
        q_text: "test A",
        q_answer: "A",
        q_choice1: "A",
        q_choice2: "B",
        q_choice3: "C",
        q_choice4: "D"
    },
    {
        q_text: "test B",
        q_answer: "B",
        q_choice1: "A",
        q_choice2: "B",
        q_choice3: "C",
        q_choice4: "D"
    },    
    {
        q_text: "test C",
        q_answer: "C",
        q_choice1: "A",
        q_choice2: "B",
        q_choice3: "C",
        q_choice4: "D"
    },
    {
        q_text: "test D",
        q_answer: "D",
        q_choice1: "A",
        q_choice2: "B",
        q_choice3: "C",
        q_choice4: "D"
    },
    {
        q_text: "test A",
        q_answer: "A",
        q_choice1: "A",
        q_choice2: "B",
        q_choice3: "C",
        q_choice4: "D"
    },
    {
        q_text: "test B",
        q_answer: "B",
        q_choice1: "A",
        q_choice2: "B",
        q_choice3: "C",
        q_choice4: "D"
    },
    {
        q_text: "test C",
        q_answer: "C",
        q_choice1: "A",
        q_choice2: "B",
        q_choice3: "C",
        q_choice4: "D"
    },
    {
        q_text: "test D",
        q_answer: "D",
        q_choice1: "A",
        q_choice2: "B",
        q_choice3: "C",
        q_choice4: "D"
    },
    {
        q_text: "test A",
        q_answer: "A",
        q_choice1: "A",
        q_choice2: "B",
        q_choice3: "C",
        q_choice4: "D"
    },
    {
        q_text: "test B",
        q_answer: "B",
        q_choice1: "A",
        q_choice2: "B",
        q_choice3: "C",
        q_choice4: "D"
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
    console.log("click")
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

    timerEl.textContent = timerValue;
    displayQuestion();

    var timerInterval = setInterval(function() {
        timerValue--;
        timerEl.textContent = timerValue;
        if (timerValue<=0) {
            clearInterval(timerInterval);
            gameEnd();
            
        }
    }, 1000)
}

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

function getHighScore(){
    highScreen.classList.remove("invisible");
    quizScreen.classList.add("invisible");
    highScoreMsgEl.textContent = "You got a high score! " + score + " points!"



}

function updateHighScores(event){
    event.preventDefault()
    highScores.push({name: highScoreForm.elements["nameEntry"].value, score: score})
    highScores.sort((a, b) => b.score - a.score);
    if (highScores.length>5) {
        highScores.pop();
    }
    
    localStorage.setItem("jsQuizHighScores", JSON.stringify(highScores))
    displayHighScores();
    highScreen.classList.add("invisible");
    idleScreen.classList.remove("invisible");

}

function displayScore(){
    quizScreen.classList.add("invisible");
    endScreen.classList.remove("invisible");
    if (score!==1) {
        endScoreMsgEl.textContent = "You scored " + score + " points!"
    } else {
        endScoreMsgEl.textContent = "You scored " + score + " point!"
    }
}

function goIdle() {
    endScreen.classList.add("invisible");
    displayHighScores();
    idleScreen.classList.remove("invisible")
}

highScoreForm.addEventListener("submit", updateHighScores);

function displayHighScores(){
    highScoreListEl.innerHTML=""
    for (i=0;i<highScores.length;i++){
        let listItem = document.createElement("li")
        listItem.textContent=highScores[i].name + " - " + highScores[i].score;
        highScoreListEl.append(listItem);

    }
}

if (localStorage.getItem("jsQuizHighScores")) {
    highScores = JSON.parse(localStorage.getItem("jsQuizHighScores"))
}
console.log(highScores);
displayHighScores();