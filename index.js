let timeLeft = 10; 
let totalStages = 8; 
let currentStage = 1;
let timerInterval, progressInterval;
let sinal = "";


function startGame() {
    document.getElementById('startScreen').style.display = 'none';
    document.getElementById('gameScreen').style.display = 'block';
    document.getElementById('level').style.display = 'none';
   
    startTimer();
    updateQuestion();
    updateStagesLeft();
}

function nivel(){
    document.getElementById('startScreen').style.display = 'none';
    document.getElementById('gameScreen').style.display = 'none';
    document.getElementById('level').style.display = 'block';  
}

function startTimer() {
    timeLeft = 10; 
    updateTimer();
    resetProgressBar();
    timerInterval = setInterval(() => {
        timeLeft--;
        updateTimer();
        updateProgressBar();
        if (timeLeft <= 0) {
            endGame(false);
        }
    }, 1000);
}

function updateTimer() {
    document.getElementById('timer').innerText = timeLeft;
}

function resetProgressBar() {
    let progressElem = document.getElementById('progress');
    progressElem.style.width = '0%';
}

function updateProgressBar() {
    let progressElem = document.getElementById('progress');
    let progressPercent = ((10 - timeLeft) / 10) * 100; 
    progressElem.style.width = progressPercent + '%'; 
}

function updateQuestion() {

    let sinalAleatorio = Math.floor(Math.random() * 20);
    let num1 = Math.floor(Math.random() * 10);
    let num2 = Math.floor(Math.random() * 10);

    if(sinalAleatorio >= 15 && sinalAleatorio <= 20 && easy == false){
        let num1 = Math.floor(Math.random() * 5);
        let num2 = Math.floor(Math.random() * 10);

        sinal = "/";

        document.getElementById('question').innerText = `${num1} / ${num2}`;
    }else if (sinalAleatorio >= 10 && sinalAleatorio <= 15 && easy == false){

        sinal = "*";

        document.getElementById('question').innerText = `${num1} * ${num2}`;
    }else if (sinalAleatorio >= 5 && sinalAleatorio <= 10 && easy){

        sinal = "+";

        document.getElementById('question').innerText = `${num1} + ${num2}`;
    }else{

         sinal = "-";

        document.getElementById('question').innerText = `${num1} - ${num2}`;
    }

    //console.log("SINAL: " + sinalAleatorio);
    //document.getElementById('question').innerText = `${num1} + ${num2}`;
    
    document.getElementById('answer').value = ''; 
}

function checkAnswer() {
    let answer = parseInt(document.getElementById('answer').value);
    let question = document.getElementById('question').innerText;
    let [num1, , num2] = question.split(' ').map(Number);


    if(sinal == '/'){
        if(answer === num1 / num2){
            currentStage++;
            if (currentStage > totalStages) {
                endGame(true); 
            } else {
                timeLeft = 10;
                updateQuestion();
                updateStagesLeft();
                resetProgressBar();
            }
        }else{
            timeLeft -= 2;
        }
    }else if (sinal == '*'){
        if(answer === num1 * num2){
            currentStage++;
            if (currentStage > totalStages) {
                endGame(true); 
            } else {
                timeLeft = 10;
                updateQuestion();
                updateStagesLeft();
                resetProgressBar();
            }
        }else{
            timeLeft -= 2;
        }
    }else if (sinal == '+'){
        if(answer === num1 + num2){
            currentStage++;
            if (currentStage > totalStages) {
                endGame(true); 
            } else {
                timeLeft = 10;
                updateQuestion();
                updateStagesLeft();
                resetProgressBar();
            }
        }else{
            timeLeft -= 2;
        }
    }else if (sinal == '-'){
        if (answer === num1 - num2) {
            currentStage++;
            if (currentStage > totalStages) {
                endGame(true); 
            } else {
                timeLeft = 10;
                updateQuestion();
                updateStagesLeft();
                resetProgressBar();
            }
        }else{
            timeLeft -=2;
        }
    }

    
    // if (answer === num1 + num2) {
    //     currentStage++;
    //     if (currentStage > totalStages) {
    //         endGame(true); 
    //     } else {
    //         timeLeft = 10;
    //         updateQuestion();
    //         updateStagesLeft();
    //         resetProgressBar();
    //     }
    // }else{
    //     timeLeft -=2;
    // }
}

function updateStagesLeft() {
    document.getElementById('stagesLeft').innerText = totalStages - currentStage + 1;
}

function endGame(won) {
    clearInterval(timerInterval);
    clearInterval(progressInterval);
    document.getElementById('gameScreen').style.display = 'none';
    if (won) {
        document.getElementById('winScreen').style.display = 'block';
    } else {
        document.getElementById('loseScreen').style.display = 'block';
    }
}

function restartGame() {
    currentStage = 1;
    document.getElementById('level').style.display = 'none';
    document.getElementById('winScreen').style.display = 'none';
    document.getElementById('loseScreen').style.display = 'none';
    document.getElementById('startScreen').style.display = 'block';
}

function easy(){
    let num1 = Math.floor(Math.random() * 10);
    let num2 = Math.floor(Math.random() * 10);

    let timeLeft = 20; 
    let totalStages = 15; 
    let currentStage = 1;
    startGame();

    return easy;
}

function medium(){
    
}