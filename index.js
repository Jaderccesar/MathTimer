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

function startTimer() {
    timeLeft = isEasy ? 20 : isMedium ? 10 : 5;
    updateTimer();
    resetProgressBar();

    timerInterval = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            updateTimer();
            updateProgressBar();
        }
        
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            endGame(false);
        }
    }, 1000);
}

function updateTimer() {
    document.getElementById('timer').innerText = timeLeft;
}

function resetProgressBar() {
    document.getElementById('progress').style.width = '0%';
}

function updateProgressBar() {
    let progressElem = document.getElementById('progress');
    let maxTime = isEasy ? 20 : isMedium ? 10 : isHard ? 5 : 10;
    let progressPercent = ((maxTime - timeLeft) / maxTime) * 100;

    if (timeLeft <= 0) {
        progressPercent = 100;
    }

    progressElem.style.width = progressPercent + '%';
}


function updateQuestion() {
    let sinalAleatorio = Math.floor(Math.random() * 20);
    let num1, num2;

    if (sinalAleatorio >= 15 && sinalAleatorio <= 20 && (isMedium || isHard || isFree)) {
        num1 = isMedium ? Math.floor(Math.random() * 15) : Math.floor(Math.random() * 30);
        num2 = isMedium ? Math.floor(Math.random() * 9) : Math.floor(Math.random() * 26);

        if (num2 == 0) num2 = 1;        
        if (num2 > num1) {
            let aux = num2;
            num2 = num1;
            num1 = aux;
        }

        sinal = "/";
        correctAnswer = num1 / num2; 
        document.getElementById('question').innerText = `${num1} / ${num2}`;
    } else if (sinalAleatorio >= 10 && sinalAleatorio <= 15 && (isMedium || isHard || isFree)) {
        num1 = isMedium ? Math.floor(Math.random() * 15) : Math.floor(Math.random() * 30);
        num2 = isMedium ? Math.floor(Math.random() * 15) : Math.floor(Math.random() * 30);
        sinal = "*";
        correctAnswer = num1 * num2; 
        document.getElementById('question').innerText = `${num1} * ${num2}`;
    } else {
        num1 = isEasy ? Math.floor(Math.random() * 10) : isMedium ? Math.floor(Math.random() * 15) : Math.floor(Math.random() * 30);
        num2 = isEasy ? Math.floor(Math.random() * 10) : isMedium ? Math.floor(Math.random() * 15) : Math.floor(Math.random() * 30);
        sinal = sinalAleatorio < 5 ? "-" : "+";
        correctAnswer = sinal === "+" ? num1 + num2 : num1 - num2; 
        document.getElementById('question').innerText = `${num1} ${sinal} ${num2}`;
    }
    document.getElementById('contAnswer').innerText = `Quantidade de acertos: ${contador}`;
    document.getElementById('answer').value = '';
}

function checkAnswer() {
    let answer = parseInt(document.getElementById('answer').value);
    let [num1, , num2] = document.getElementById('question').innerText.split(' ').map(Number);
    let isCorrect = false;

    if (sinal === '/') correctAnswer = num1 / num2;
    else if (sinal === '*') correctAnswer = num1 * num2; 
    else if (sinal === '+') correctAnswer = num1 + num2;
    else if (sinal === '-') correctAnswer = num1 - num2;

    isCorrect = answer === correctAnswer;

    if (isCorrect) {
        currentStage++;
        contador++;
        document.getElementById('correctAnswerMessage').style.display = 'none'; 
        ocument.getElementById('correctCount').innerText = contador;
        if (currentStage > totalStages) {
            endGame(true);
        } else {
            timeLeft = isEasy ? 20 : isMedium ? 10 : isHard ? 5 : 10;
            updateQuestion();
            updateStagesLeft();
            resetProgressBar();
        }
    } else {
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

        document.getElementById('correctAnswerMessage').style.display = 'block';
        document.getElementById('correctAnswerMessage').innerText = `A resposta correta era: ${correctAnswer}`;
    }
}

function restartGame() {
    currentStage = 1;
    document.getElementById('level').style.display = 'none';
    document.getElementById('winScreen').style.display = 'none';
    document.getElementById('loseScreen').style.display = 'none';
    document.getElementById('correctAnswerMessage').style.display = 'none';
    document.getElementById('startScreen').style.display = 'block';
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

function setHard(){
    isEasy = false;
    isMedium = false
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
