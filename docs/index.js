
let timeLeft = 10;
let totalStages = Infinity;
let currentStage = 1;
let timerInterval, progressInterval;
let sinal = "";
let isEasy = false;
let isMedium = false;
let isHard = false;
let isFree = false;
let cont;
let correctAnswer;
let contador = 0;

function startGame() {
    document.getElementById('startScreen').style.display = 'none';
    document.getElementById('gameScreen').style.display = 'block';
    document.getElementById('level').style.display = 'none';
    startTimer();
    updateQuestion();
    updateStagesLeft();
}

function nivel() {
    document.getElementById('startScreen').style.display = 'none';
    document.getElementById('gameScreen').style.display = 'none';
    document.getElementById('level').style.display = 'block';
}

function showCorrectAnswer() {
    document.getElementById('correctAnswerMessage').innerText = `A resposta correta era: ${correctAnswer}`;
    document.getElementById('correctAnswerMessage').style.display = 'block';
}

function startTimer() {
    let timeLimit = isEasy ? 20 : isMedium ? 10 : isHard ? 5 : 10;
    timeLeft = timeLimit;
    updateTimer();
    resetProgressBar();

    timerInterval = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            updateTimer();
            updateProgressBar(timeLimit);
        } else {
            clearInterval(timerInterval);
            endGame(false);  
            showCorrectAnswer();
        }
    }, 1000);
}

function updateTimer() {
    document.getElementById('timer').innerText = timeLeft;
}

function resetProgressBar() {
    document.getElementById('progress').style.width = '0%';
}

function updateProgressBar(timeLimit) {
    let progressElem = document.getElementById('progress');
    let progressPercent = ((timeLimit - timeLeft) / timeLimit) * 100;
    progressElem.style.width = progressPercent + '%';
}

function updateScore() {
    document.getElementById('correctCount').innerText = contador;
}

function updateQuestion() {
    let sinalAleatorio = Math.floor(Math.random() * 20);
    let num1, num2;

    if (sinalAleatorio >= 15 && sinalAleatorio <= 20 && (isMedium == true || isHard == true || isFree == true)) {
        num1 = Math.floor(Math.random() * 30) + 1;
        num2 = Math.floor(Math.random() * 10) + 1;
        sinal = "/";
        correctAnswer = num1 / num2;
        document.getElementById('question').innerText = `${num1} / ${num2}`;
    } else if (sinalAleatorio >= 10 && sinalAleatorio <= 15 && (isMedium == true || isHard == true || isFree == true)) {
        num1 = Math.floor(Math.random() * 30);
        num2 = Math.floor(Math.random() * 30);
        sinal = "*";
        correctAnswer = num1 * num2;
        document.getElementById('question').innerText = `${num1} * ${num2}`;
    } else {
        num1 = Math.floor(Math.random() * (isEasy ? 10 : 30));
        num2 = Math.floor(Math.random() * (isEasy ? 10 : 30));
        sinal = sinalAleatorio < 5 ? "-" : "+";
        correctAnswer = sinal === "+" ? num1 + num2 : num1 - num2;
        document.getElementById('question').innerText = `${num1} ${sinal} ${num2}`;
    }

   
    correctAnswer = correctAnswer % 1 === 0 ? correctAnswer : correctAnswer.toFixed(2);  
    updateScore();
}

function checkAnswer() {
    let answer = parseFloat(document.getElementById('answer').value);  
    let isCorrect = Math.abs(answer - correctAnswer) < 0.01; 

    if (isCorrect) {
        currentStage++;
        contador++;  
        updateScore();  
        document.getElementById('answer').value = '';
        if (currentStage > totalStages) {
            endGame(true);
        } else {
            timeLeft = isEasy ? 20 : isMedium ? 10 : isHard ? 5 : 10;
            setTimeout(() => {
                updateQuestion();
                updateStagesLeft();
                resetProgressBar();
            }, 500);
        }
    } else {
        document.getElementById('correctAnswerMessage').innerText = `A resposta correta era: ${correctAnswer}`;
        document.getElementById('correctAnswerMessage').style.display = 'block';
        timeLeft -= isEasy ? 2 : isMedium ? 4 : isHard ? 5 : 3;

        if (timeLeft < 0) timeLeft = 0;
        updateTimer();
    }
}

function updateStagesLeft() {
    document.getElementById('stagesLeft').innerText = totalStages === Infinity ? 'Infinito' : totalStages - currentStage + 1;
}

function endGame(won) {
    clearInterval(timerInterval);
    document.getElementById('gameScreen').style.display = 'none';

    if (won) {
        document.getElementById('winScreen').style.display = 'block';
    } else {
        document.getElementById('loseScreen').style.display = 'block';
    }
}

function restartGame() {
    currentStage = 1;
    contador = 0;  
    updateScore();  
    document.getElementById('correctAnswerMessage').style.display = 'none';
    document.getElementById('startScreen').style.display = 'block';
    document.getElementById('gameScreen').style.display = 'none';
    document.getElementById('winScreen').style.display = 'none';
    document.getElementById('loseScreen').style.display = 'none';
    document.getElementById('stagesLeft').innerText = 'Infinito'; 

    document.getElementById('answer').value = '';
}


function setEasy() {
    isEasy = true;
    isMedium = false;
    isHard = false;
    totalStages = 15;
    startGame();
}

function setMedium() {
    isEasy = false;
    isMedium = true;
    isHard = false;
    totalStages = 25;
    startGame();
}

function setHard() {
    isEasy = false;
    isMedium = false;
    isHard = true;
    totalStages = 35;
    startGame();
}

function setFree() {
    isEasy = false;
    isMedium = false;
    isHard = false;
    isFree = true;
    totalStages = Infinity;
    startGame();
}
