// GLOBAL VARIABLES
var panel = $('#questions-area');
var countStartNumber = 30;


// CLICK EVENTS
$(document).on('click', '#start-over', function (e) {
  game.reset();
});

$(document).on('click', '.answer-button', function (e) {
  game.clicked(e);
});

$(document).on('click', '#start', function (e) {
  $('#game-area').prepend('<h2>Time Remaining: <span id="counter-number">30</span> Seconds</h2>');
  game.loadQuestion();
});

// QUESTIONS

// Array of 8 questions, with 4 possible answers, and one correct answer
var questions = [
  {
    question: "Which of the following is a physical quantity that has a magnitude but no direction?",
    answers: ["Vector", "Frame of reference", "Resultant", "Scalar"],
    correctAnswer: "Scalar"
  },
  {
    question: "Identify the following quantities as scalar or vector: the mass of an object, the number of leaves on a tree, wind velocity.",
    answers: ["Vector, scalar, scalar", "Vector, scalar, vector", "Scalar, scalar, vector", "Scalar, vector, vector"],
    correctAnswer: "Scalar, scalar, vector"
  },
  {
    question: "Which of the following is an example of a vector quantity?",
    answers: ["Temperature", "Velocity", "Volume", "Mass"],
    correctAnswer: "Velocity"
  },
  {
    question: "Metals are good conductors of electricity because:",
    answers: ["They contain free electrons", "The atoms are lightly packed", "They have a high melting point", "All of the above"],
    correctAnswer: "They contain free electrons"
  },
  {
    question: "Rectifiers are used to convert:",
    answers: ["DC to AC", "AC to DC", "high voltage to low voltage", "low voltage to high voltage"],
    correctAnswer: "AC to DC"
  },
  {
    question: "Of the following properties of a wave, the one that is independent of the others is its:",
    answers: ["Amplitude", "Velocity", "Wavelength", "Frequency"],
    correctAnswer: "Amplitude"
  },
  {
    question: "Which of the following is NOT emitted by a radioactive substance?",
    answers: ["Electrons", "Gamma rays", "Electromagnetic radiation", "Neutrons"],
    correctAnswer: "Neutrons"
  },
  {
    question: "In the complex plane, the number 14 – j5 is located in the:",
    answers: ["fourth quadrant", "first quadrant", "third quadrant", "second quadrant"],
    correctAnswer: "fourth quadrant"
  }
];

var game = {
  questions: questions,
  currentQuestion: 0,
  counter: countStartNumber,
  correct: 0,
  incorrect: 0,

  countdown: function () {
    game.counter--;
    // Add the #counter-number id using jquery with other click events later at the top
    $('#counter-number').html(game.counter);

    if (game.counter === 0) {
      game.timeUp();
    }
  },

  loadQuestion: function () {
    timer = setInterval(game.countdown, 1000);
    panel.html('<h2>' + questions[this.currentQuestion].question + '</h2>');
    for (var i = 0; i < questions[this.currentQuestion].answers.length; i++) {
      panel.append('<button class="answer-button" id="button"' + 'data-name="' + questions[this.currentQuestion].answers[i] + '">' + questions[this.currentQuestion].answers[i]+ '</button>');
    }
  },

  nextQuestion: function () {
    game.counter = countStartNumber;
    $('#counter-number').html(game.counter);
    game.currentQuestion++;
    game.loadQuestion();
  },

  timeUp: function () {
    clearInterval(timer);
    $('#counter-number').html(game.counter);

    panel.html('<h2>Out of Time!</h2>');
    panel.append('<h3>The Correct Answer was: ' + questions[this.currentQuestion].correctAnswer);

    if (game.currentQuestion === questions.length - 1) {
      setTimeout(game.results, 5 * 1000);
    } else {
      setTimeout(game.nextQuestion, 5 * 1000);
    }
  },

  results: function () {
    clearInterval(timer);

    panel.html('<h2>All done, heres how you did!</h2>');
    $('#counter-number').html(game.counter);
    panel.append('<h3>Correct Answers: ' + game.correct + '</h3>');
    panel.append('<h3>Incorrect Answers: ' + game.incorrect + '</h3>');
    panel.append('<h3>Unanswered: ' + (questions.length - (game.incorrect + game.correct)) + '</h3>');
    panel.append('<br><button id="start-over">Start Over?</button>');
  },

  clicked: function (e) {
    clearInterval(timer);

    // https://api.jquery.com/data/#data-html5 //////////////////////////////////////
    if ($(e.target).data("name") === questions[this.currentQuestion].correctAnswer) {
      this.answeredCorrectly();
    } else {
      this.answeredIncorrectly();
    }
  },

  answeredIncorrectly: function () {
    game.incorrect++;
    clearInterval(timer);
    panel.html('<h2>Nope!</h2>');
    panel.append('<h3>The Correct Answer was: ' + questions[game.currentQuestion].correctAnswer + '</h3>');

    if (game.currentQuestion === questions.length - 1) {
      setTimeout(game.results, 5 * 1000);
    } else {
      setTimeout(game.nextQuestion, 5 * 1000);
    }
  },

  answeredCorrectly: function () {
    clearInterval(timer);
    game.correct++;
    panel.html('<h2>Correct!</h2>');

    if (game.currentQuestion === questions.length - 1) {
      setTimeout(game.results, 5 * 1000);
    } else {
      setTimeout(game.nextQuestion, 5 * 1000);
    }
  },

  reset: function () {
    this.currentQuestion = 0;
    this.counter = countStartNumber;
    this.correct = 0;
    this.incorrect = 0;
    this.loadQuestion();
  }

};