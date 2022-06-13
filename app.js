//VARIABLES

const highScoreContainer = document.getElementById('highscore-container')
const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionsElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const highScoreButton = document.getElementById('score-button')
const timerElement = document.getElementById('timer')
const sectionTimer = document.getElementById('timer-container')

const playAgainButton = document.getElementById('play-again')

const initialsContainer = document.getElementById('initial-container')
const saveInitialsButton = document.getElementById('save-highscore')



let TimeRemaining = 100;
let timerId;


let shuffledQuestions, currentQuestionIndex;

startButton.addEventListener('click', startGame,)
//startButton.addEventListener('click', startTimer,)

nextButton.addEventListener ("click", () => {
    currentQuestionIndex++
    setNextQuestion()
})

playAgainButton.addEventListener('click', restart)


//restart function
function restart(){
    
    startGame()
   

}
//start game function
function startGame(){
   
    shuffledQuestions = questions.sort(()=> Math.random()- .5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide')
    highScoreContainer.classList.add('hide')
    setNextQuestion()
    timerElement.textContent = TimeRemaining;
    startTimer()
}

//set next question
function setNextQuestion(){
    resetState()
    startButton.classList.add('hide')

    showQuestion(shuffledQuestions[currentQuestionIndex])
}
//show question
function showQuestion(question){

    questionsElement.innerText = question.question
    question.answers.forEach(answer => {
    startButton.classList.add('hide')

       const button = document.createElement('button') 
       button.innerText = answer.text
       button.classList.add('btn')
       if (answer.correct) {
           button.dataset.correct = answer.correct
       }
       button.addEventListener('click', selectAnswer)
       answerButtonsElement.appendChild(button)
    })
}
//resets state
function resetState(){
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild){
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}
//selects answer
function selectAnswer(event){

    const selectedButton = event.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)

    })
    if(shuffledQuestions.length > currentQuestionIndex + 1){
    nextButton.classList.remove('hide')


    }else
    
    endGame()
}
//sets  status
function setStatusClass (element, correct){
    clearStatusClass(element)
    startButton.classList.add('hide')

    if(correct){
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
        TimeRemaining = TimeRemaining -10;
    }
}
//clears answered question colours.
function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
    startButton.classList.add('hide')

}

//timer function
function startTimer(){
    
    sectionTimer.classList.remove('hide')
    timerId = setInterval(function(){
        TimeRemaining = TimeRemaining -1;
        timerElement.textContent = TimeRemaining;
        if(TimeRemaining <= 0){
            
            endGame()
        }
    },1000)
}

//question array
const questions = [
    {
        question: 'What is not javascript?',
        answers: [
            {text: 'pineapple sorbet', correct: true},
            {text: 'eventListener', correct: false},
            {text: 'variable', correct: false},
            {text: 'argument', correct: false},
        ]
    },
    {
        question: 'what is not a method?',
        answers: [
            {text: 'sort()', correct: false},
            {text: 'forEach()', correct: false},
            {text: 'aHippopotamus()', correct: true},
            {text: 'includes()', correct: false}, 
        ]
        },
        {
            question: 'Where does the internet live?',
            answers: [
                {text: 'Bill Gates house', correct: false},
                {text: 'Elon Musks rocketship', correct: false},
                {text: 'Fox Mulders imagination', correct: true},
                {text: 'The bottom of the ocean', correct: false}, 
            ]
            } 
]

// function endGame (){
//     highScoreButton.classList.remove('hide') 
//     questionContainerElement.classList.add()
//     clearInterval(timerId)
// }

//end of game array

function endGame(){
    console.log('ending game')
    questionContainerElement.classList.add('hide')
    clearInterval(timerId)
    highScoreContainer.classList.remove('hide')
    startButton.classList.remove('hide')
    

}
//high score board
function renderLastScore() {
    var inputId = localStorage.getItem('inputId');
    var time = localStorage.getItem('timeRemaining');
    var scoring = (inputId + ' ' + time)

    const para = document.createElement("p");
    para.textContent = scoring;
    highScoreContainer.appendChild(para);

    // const scoreList = document.createElement('p')
    // scoreList.innerText = (inputId, time)
    console.log(time);
    console.log(inputId);
}


 var inputMessage = document.getElementById('input-message')

 function displayMessage(type, message){
     inputMessage.textContent = message;
 }
 
 saveInitialsButton.addEventListener('click', function(score){ 
     score.preventDefault();

     
     let inputId = document.getElementById('input-id').value;
  

    console.log(timerElement)
     localStorage.setItem('inputId', inputId);
     localStorage.setItem('timeRemaining', TimeRemaining);
    document.getElementById('input-id').value = '';
    renderLastScore()
 })



 
function scoreBoard(event){
event.preventDefault();
// const inputId = document.getElementById('input-id')
// if (inputId === ""){
//    inputMessage = ('Error', "name cannot be blank");
// } else {
//    inputMessage = ('congratulations', 'you rock');
//     }
}