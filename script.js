var startButtonEl = document.querySelector('.start-btn');
var timeLeftEl = document.querySelector('#time-left');
var startScreenEl = document.querySelector('#welcome-page');
var questionsContEl = document.querySelector('#questions');
var highscoreForm = document.querySelector('#highscore-form');

var initialsBox = document.createElement('input');
var submitScore = document.createElement('button');
var scoreMessage = document.createElement('h2');




// keeps track of current question rendered on the page
var currentQuestionIndex = 0;

// keeps track of user score
var userScore = 0;

// starting time when quiz begins
var timeLeft = 60;

// variable for our set interval timer function
var intervalId;


// array of objects for our question/answer/choices prompts
var quizQuestions = [
  {
    question: 'What is the highest rank in Valorant?',
    answer: 'Radiant', // A
    choices: ['Radiant', 'Ascendant', 'Iron', 'Immortal'],
  },
  {
    question: 'Which of the following agents is classified as a duelist?',
    answer: 'Jett', // D
    choices: ['Cypher', 'Breach', 'Viper', 'Jett']
  },
  {
    question: 'What is the minimum econ needed for a full loadout?',
    answer: '3900', // B
    choices: ['4000', '3900', '3850', '4100']
  },
  {
    question: 'Which agent has an ability named "Cove"?',
    answer: 'Harbor', // B
    choices: ['Skye', 'Harbor', 'Astra', 'Omen']
  },
  {
    question: 'Which of the following maps only has 3 bomb sites?',
    answer: 'Haven', // C
    choices: ['Ascent', 'Bind', 'Haven', 'Breeze']
  },
  {
    question: 'Which country is Sova from?',
    answer: 'Russia', // A
    choices: ['Russia', 'Denmark', 'Germany', 'Norway']
  },
  {
    question: 'How many points does Cypher need for his Ultimate Ability?',
    answer: '6', //C
    choices: ['7', '5', '6', '8',]
  },
  {
    question: 'What agent can flash opponents even while looking away?',
    answer: 'Omen', // D
    choices: ['Breach', 'Kay/O', 'Yoru', 'Omen']
  },
  {
    question: 'How many seconds does one round in Valorant last?',
    answer: '100', // A
    choices: ['100', '120', '150', '180']
  },
  {
    question: 'How much econ does a frenzy cost?',
    answer: '450', // B
    choices: ['400', '450', '500', '550']
  }
];

// function for timer to start
function timer() {
  timeLeftEl.textContent = `${timeLeft} second(s)`;
  timeLeft--;

  if (timeLeft <= 0) {
    clearInterval(intervalId);
    timeLeftEl.innerHTML = '';
    quizDone();
  }
}

// function for display when quiz is done
function quizDone() {
  clearInterval(intervalId);
  questionsContEl;
  questionsContEl.innerHTML = '';
  questionsContEl.innerHTML = `<h1>You scored ${userScore} points out of 100!<h1>`;
  timeLeftEl.textContent = '';

  scoreMessage.textContent = 'Please enter your initials to save your score';
  submitScore.textContent = 'Submit';
  highscoreForm.append(scoreMessage, initialsBox, submitScore);
  
  submitScore.addEventListener('submit', function (event) {
    event.preventDefault();
    var userInitials = initialsBox.value;
    localStorage.setItem(userInitials, userScore);
  });

}



// function to render our current question
function renderQuestion() {
  questionsContEl.innerHTML = '';
  // code for displaying the current question
  startScreenEl.style.display = 'none';
  var h2El = document.createElement('h2');
  h2El.textContent = quizQuestions[currentQuestionIndex].question;
  questionsContEl.appendChild(h2El);

  // for loop to display all choices on application
  for (i = 0; i < quizQuestions[currentQuestionIndex].choices.length; i++) {
    var choicesEl = document.createElement('button');
    choicesEl.setAttribute('id', quizQuestions[currentQuestionIndex].answer);
    choicesEl.textContent = quizQuestions[currentQuestionIndex].choices[i];
    questionsContEl.appendChild(choicesEl);
  };

}


// start button function on home page to begin quiz
function startBtn() {
  intervalId = setInterval(timer, 1000);
  renderQuestion();

}

function choiceInput(event) {
  if (event.target.matches('button')) {


    if (event.target.textContent === event.target.getAttribute('id')) {
      userScore += 10;
    } else {
      timeLeft -= 10;
    }

    currentQuestionIndex++;

    if (currentQuestionIndex < quizQuestions.length) {
      renderQuestion()
    } else {
      quizDone();
    }

  }
}


// event listener for welcome page start button
startButtonEl.addEventListener('click', startBtn);
// event listener for choice buttons
questionsContEl.addEventListener('click', choiceInput);

