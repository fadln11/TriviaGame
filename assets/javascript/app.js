$(document).ready(function () {

  // Initial event listeners
  $("#start").on('click', startGame);
  $(document).on('click', '#start-btn', startGame);

  $(document).on('click', '.option', checkAnswer);

  // $(document).on('click', '#stop-btn', stopGame);

});


// Vars
// ------------
var timerNum = 30;
var intervalId;
var correct = 0;
var incorrect = 0;
var unanswered = 0;
var questionCounter;
var currentQuestion;
var timeRunning = false;

var QnAs = [{
  question: "Which year did the World War I begin?",
  options: ['1923', '1938', '1914', '1918'],
  correctAnswer: '1914'
}, {
  question: "The disease that ravaged and killed a third of Europe's population in the 14th century is known as:?",
  options: ['The White Death', 'The Black Plague', 'Smallpox', 'The Bubonic Plague'],
  correctAnswer: 'The Bubonic Plague'
}, {
  question: "What is the oldest known story in the world?",
  options: ['The Bible', 'The Histories', 'The Epic of Gilgamesh', 'The Odyssey'],
  correctAnswer: 'The Epic of Gilgamesh'
}, {
  question: "Which of these was one of the seven ancient wonders of the world?",
  options: ['Great Wall of China', 'Macchi Picchu', 'Lighthouse of Alexandria', 'Taj Mahal'],
  correctAnswer: 'Lighthouse of Alexandria'
}, {
  question: "John F. Kennedy was assassinated in:",
  options: ['New York', 'Austin', 'Dallas', 'Miami'],
  correctAnswer: 'Dallas'
}, {
  question: "In 1066 at the Battle of Hastings, King Harold was defeated by?",
  options: ['Harald', 'William', 'Tostig', 'Ragnar'],
  correctAnswer: 'William'
}, {
  question: "Sliced bread was invented in:",
  options: ['America in 1928', 'France in 1789', 'Austria in 1897', 'Scottland in 1902'],
  correctAnswer: 'America in 1928'
}, {
  question: "What year did the Berlin Wall fall?",
  options: ['1988', '1994', '1991', '1989'],
  correctAnswer: '1989'
}, {
  question: "Which country did Germany invade on the 1st of September 1939?",
  options: ['France', 'Czechoslovakia', 'Poland', 'Finland'],
  correctAnswer: 'Poland'
}, {
  question: "Who was said to be so beautiful that her face launched a thousand ships??",
  options: ['Cleopatra', 'Helen', 'Nefertiti', 'Salome'],
  correctAnswer: 'Helen'
}
];


// Main Logic and Functions
// ------------------------

// start game on click
function startGame() {

  clearInterval(intervalId);

  // clear results
  correct = 0;
  incorrect = 0;
  unanswered = 0;
  questionCounter = 0;

  // show game section and timer
  $('#game').show();

  //  empty results
  $('#results').empty();
  // hide start button
  $('#start').hide();

  // empty start over button
  $('#start-btn').empty()

  // ask first question
  showQuestion();
}


// Show questions
function showQuestion() {

  // show question only when exist
  if (questionCounter < QnAs.length) {

    // reset and start timer for each question
    timerNum = 30;
    timeRunning = true;
    intervalId = setInterval(countDown, 1000);

    // Show timer
    $('#timer').html(
      '<div>Time Remaining:  '
      + '<span class="timer-style">'
      + timerNum
      + '</span> s </div>');

    // clear previous options and results
    $('#options').empty()
    $('#results').empty();


    currentQuestion = QnAs[questionCounter];
    $('#question').html('<h3>' + currentQuestion.question + '</h3>');

    var currentOptions = QnAs[questionCounter].options;
    // create buttons based on options
    for (var i = 0; i < currentOptions.length; i++) {
      var a = $("<button>");
      a.addClass("btn btn-default btn-block option mb-3");
      // Adding attribute "data-name"
      a.attr("data-name", currentOptions[i]);
      // Providing the initial button text
      a.text(currentOptions[i]);
      // Adding the button to the options div
      $('#options').append(a);
    }
  }
  else {
    stopGame();
  }
}


// Check answer when user click any of the .options button
function checkAnswer() {

  // Pause timer
  clearInterval(intervalId);
  timeRunning = false;

  $('#question').empty()
  $('#options').empty()

  // Check answer
  if ($(this).attr('data-name') === currentQuestion.correctAnswer) {
    correct++;
    $('#results').html('<h4>Yeaay! You guessed it right!</h4>');
  }
  else {
    incorrect++;
    $('#results').html(
      '<h4>Oops... not quite. Correct answer: <br>' +
      currentQuestion.correctAnswer + '</h4>');
  }

  // Next question
  questionCounter++;
  setTimeout(showQuestion, 1000 * 1);
}


function countDown() {

  // There is still time left and more questions
  if (timerNum > 0 && (questionCounter < QnAs.length)) {
    timerNum--;
    // Show timer
    $('#timer').html(
      '<div>Time Remaining:  '
      + '<span class="timer-style">'
      + timerNum
      + '</span> s </div>');
  }
  // Time's up
  else if (timerNum === 0) {
    unanswered++;

    // Pause timer
    clearInterval(intervalId);
    timeRunning = false;

    // Show correct answer
    $('#question').empty();
    $('#options').empty();
    $('#results').html(
      "<h3> Time's up! Correct answer: " +
      currentQuestion.correctAnswer + "</h3>");

    // Next question
    questionCounter++;
    setTimeout(showQuestion, 1000 * 1);
  }
}


function stopGame() {

  $('#start-btn').empty()

  clearInterval(intervalId);
  timeRunning = false;

  // Show final results
  $('#results').html(
    '<h3 class="mb-5">Thanks for playing!</h3>' +
    '<p>Correct: ' + correct + '</p>' +
    '<p>Incorrect: ' + incorrect + '</p>' +
    '<p>Unaswered: ' + unanswered + '</p>');

  // hide game section
  $('#game').hide();

  // show start button to begin a new game
  var a = $("<button>");
  a.addClass("btn btn-primary btn-lg");
  a.text('Start Over ?');
  $('#start-btn').append(a);
}
