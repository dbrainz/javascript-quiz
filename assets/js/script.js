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
    }];

    var startButton = document.querySelector("#start-button");
    var idleScreen = document.querySelector("#game-idle");
    var quizScreen = document.querySelector("#quiz-screen");
    var timerEl= document.querySelector("#timer");
    var questionEl = document.querySelector("#question-text");
    var answer1 = document.querySelector("#answer1");
    var answer2 = document.querySelector("#answer2");
    var answer3 = document.querySelector("#answer3");
    var answer4 = document.querySelector("#answer4");
    var questionIndex = 0;
    var score = 0;
    var gameEnd = true;
    var timerValue = 60;

    startButton.addEventListener("click", function() {
        console.log("click")
        idleScreen.classList.add("invisible");
        quizScreen.classList.remove("invisible");
        startQuiz();

    });

    function displayQuestion() {
        questionEl.textContent = questions[questionIndex].q_text;
        answer1.textContent = questions[questionIndex].q_choice1;
        answer2.textContent = questions[questionIndex].q_choice2;
        answer3.textContent = questions[questionIndex].q_choice3;
        answer4.textContent = questions[questionIndex].q_choice4;
    }

    function startQuiz() {
        timerValue = 60;
        score=0;
        questionIndex=0;
        gameEnd=false;

        timerEl.textContent = timerValue;
        displayQuestion();

        var timerInterval = setInterval(function() {
            timerValue--;
            timerEl.textContent = timerValue;
            if (timerValue<=0 || gameEnd) {
                clearInterval(timerInterval);
                idleScreen.classList.remove("invisible");
                quizScreen.classList.add("invisible");

                
            }
        }, 1000)

  
    }

    function answerChosen(userAnswer){
        if (userAnswer===questions[questionIndex].q_answer) {
            score+=10;
        } else {
            timerValue-=3;
        }
        questionIndex++;
        if (questionIndex<questions.length) {
            displayQuestion();
        } else {
            gameEnd();
        }
    
    }

    answer1.addEventListener("click", function(){
        answerChosen("A");
    })

    answer2.addEventListener("click", function(){
        answerChosen("B");
    })

    answer3.addEventListener("click", function(){
        answerChosen("C");
    })

    answer4.addEventListener("click", function(){
        answerChosen("D");
    })