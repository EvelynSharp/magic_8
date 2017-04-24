
var answers = [];
answers[0] = "It is certain";
answers[1] = "It is decidedly so";
answers[2] = "Without a doubt";
answers[3] = "Yes definitely";
answers[4] = "You may rely on it";
answers[5] = "As I see it yes";
answers[6] = "Most likely";
answers[7] = "Outlook good";
answers[8] = "Yes";
answers[9] = "Signs point to yes";
answers[10] = "Reply hazy try again";
answers[11] = "Ask again later";
answers[12] = "Better not tell you now";
answers[13] = "Cannot predict now";
answers[14] = "Concentrate and ask again";
answers[15] = "Don't count on it";
answers[16] = "My reply is no";
answers[17] = "My sources say no";
answers[18] = "Outlook not so good";
answers[19] = "Very doubtful";

var newAnswerCount = 0;
var button = document.getElementById('askQuestion');
button.addEventListener('click', function(){
  generateAnswer();
});

document.getElementById('userQuestion')
  .addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode == 13) {
        generateAnswer();
    } else if (event.keyCode == 27) {
      document.getElementById('userQuestion').value=null;
    }
});




var Question = function(userQuestion) {
  this.userQuestion = userQuestion;
}

Question.prototype.addToList = function() {
  var list = document.getElementById('historyList')
  var li = document.createElement('li');
  li.innerHTML = this.userQuestion;
  list.appendChild(li)
}


function generateAnswer() {
  var userQuestion = document.getElementById('userQuestion');
  var question = new Question(userQuestion.value);
  var magicAnswer = document.getElementById('magicAnswer');
  var answerNum = Math.floor(Math.random()*answers.length+1)
  var userString = userQuestion.value.toLowerCase();
  if (userString.includes('add_answer')){
    toAddAnswer(userQuestion.value);
  } else if (userString.includes('clear_answers')) {
    toRemoveAnswer();
    magicAnswer.value = 'Customized answers cleared.';
  } else if (userString.includes('clear_history')) {
    clearList('historyList');
  } else if (userString === '') {
    magicAnswer.value = "I'm sorry. What did you ask?";
  }
  else {
    magicAnswer.value = answers[answerNum];
    question.addToList();
  }
  userQuestion.value = null;

}

function toAddAnswer(userString) {
  var magicAnswer = document.getElementById('magicAnswer');
  var toAddAnswer = userString.slice(12,userString.length);
  answers.push(toAddAnswer);
  magicAnswer.value = '"' + toAddAnswer + '"'+ ' added to Library.';
  newAnswerCount++;
}

function toRemoveAnswer() {
  // var endIndex = answers.length
  for (var counter = 0; counter < newAnswerCount; counter++){
    answers.pop();
  }
  newAnswerCount = 0;
}


function clearList(id) {
  var list = document.getElementById(id);
  list.innerHTML = null;
}
