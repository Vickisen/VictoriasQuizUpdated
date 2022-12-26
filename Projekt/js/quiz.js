var questionBank= [
    {
        question : 'In which Italian city can you find the Colosseum?',
        option : ['Venice','Rome','Venedig','Milan'],
        answer : 'Rome'
    },
    {
        question : 'In which museum can you find Leonardo Da Vincis Mona Lisa?',
        option : ['British Museum','Uffizi Museum','Le Louvre','Metropolitan Museum of Art'],
        answer : 'Le Louvre'
    },
    {
        question : 'What is the largest continent in size?',
        option : ['Asia','Africa','Europe','North America'],
        answer : 'Asia'
    },
    {
        question : 'Who was the first woman to win a Nobel Prize?',
        option : ['Mother Teresa','Marie Curie','Jane Adams','Alva Myrdal'],
        answer : 'Marie Curie'
    },
    {
        question : 'Who famously said “Veni, vidi, vici”?',
        option : ['Winston Churchill','Charles de Gaulle','Julius Caesar','Alexander the Great'],
        answer : 'Julius Caesar'
    },
    {
        question : 'What is the name of the main character in Pride and Prejudice?',
        option : ['Bernadette Smith','Poppy Williams','Elizabeth Bennet','Maggie Johnson'],
        answer : 'Elizabeth Bennet'
    },
    {
        question : 'Which constellation is on the Australian flag?',
        option : ['The southern cross','Orion','Ursa Minor','Scorpius'],
        answer : 'The southern cross'
    },
    {
        question : 'What is the capital of New Zealand?',
        option : ['Christchurch','Wellington','Auckland','Dunedin'],
        answer : 'Wellington'
    },
    {
        question : 'Which natural landmark is not in Australia?',
        option : ['Moeraki Boulders','The Great Barrier Reef','Uluru','12 Apostles'],
        answer : 'Moeraki Boulders'
    },
    {
        question : 'In which city was Martin Luther King Jr. assassinated?',
        option : ['New York','Austin','Miami','Memphis'],
        answer : 'Memphis'
    },
]

var question = document.getElementById('question');
var quizContainer = document.getElementById('quiz-container');
var mainMenu = document.getElementById('mainMenu');
var scorecard = document.getElementById('scorecard');
var option0 = document.getElementById('option0');
var option1 = document.getElementById('option1');
var option2 = document.getElementById('option2');
var option3 = document.getElementById('option3');
var nextButton = document.querySelector('.nextButton');
var points = document.getElementById('score');
var scoreText = document.getElementById('scoreText');
var span = document.querySelectorAll('span');
var correctRandomQuestion = "";
var i = 0;
var score = 0;
var isQuestionsShuffled = false;
var questionsAsked = 0;
const numberOfQuestions = questionBank.length;
var answerText = document.getElementById('answerText');

function playQuestions()
{
    mainMenu.style.display = 'none';
    quizContainer.style.display = 'block';
    while (questionsAsked < numberOfQuestions)
    {
        displayQuestion();
    }
}

function displayQuestion(){
    for (var a = 0; a < span.length; a++)
    {
        span[a].style.background='none';
    }
    if (isQuestionsShuffled === false)
    {
        for (ix = numberOfQuestions -1; ix > 0; ix--)
        {
            j = Math.floor(Math.random() * ix);
            k = questionBank[ix];
            questionBank[ix] = questionBank[j];
            questionBank[j] = k;
        }
        isQuestionsShuffled = true;
    }

    var randomQuestion = questionBank;
    question.innerHTML = 'Q.' + (i+1) + ' ' + randomQuestion[i].question;
    option0.innerHTML = randomQuestion[i].option[0];
    option1.innerHTML = randomQuestion[i].option[1];
    option2.innerHTML = randomQuestion[i].option[2];
    option3.innerHTML = randomQuestion[i].option[3];
    stat.innerHTML = "Question" + ' ' + (i+1) + ' ' + 'of' + ' ' + numberOfQuestions;
    correctRandomQuestion = randomQuestion[i].answer;
    questionsAsked++;
}

function calcScore(e)
{
    if (e.innerHTML === correctRandomQuestion && score < numberOfQuestions)
    {
        var previousScore = 0;
        var newScore = 0;
        score = score + 1;
        var currentQuestion = 0;

        if (localStorage.getItem("score") !== null)
        {
            currentQuestion++;
            previousScore = parseInt(localStorage.getItem("score"));
            newScore += currentQuestion + previousScore;
        }
        else
        {
            currentQuestion++;
            newScore += currentQuestion;
        }
        
        localStorage.setItem("score", newScore);
        document.getElementById(e.id).style.background= 'limegreen';
    }
    else
    {
        document.getElementById(e.id).style.background= 'tomato';
    }
    setTimeout(nextQuestion, 300);
}

function nextQuestion()
{
    if (i < numberOfQuestions -1)
    {
        i = i + 1;
        displayQuestion();
    }
    else
    {
        points.innerHTML = score + '/' + numberOfQuestions;
        if (localStorage.getItem("score") !== null)
        {
            answerText.innerHTML = "Total high-score: " + localStorage.getItem("score") + " points";
        }
        quizContainer.style.display = 'none';
        scoreboard.style.display = 'block';
        getScoreText();
    }
}

function cancelQuiz()
{
    points.innerHTML = score + '/' + numberOfQuestions;
    if (localStorage.getItem("score") !== null)
    {
        answerText.innerHTML = "High-score: " + localStorage.getItem("score") + " points";
    }
    quizContainer.style.display = 'none';
    scoreboard.style.display = 'block';
    getScoreText();
}

function displayMainMenu()
{
    mainMenu.style.display = 'block';
    quizContainer.style.display = 'none';
}

nextButton.addEventListener('click', nextQuestion);

function backToQuiz()
{
    location.reload();
}

function replayQuiz()
{
    location.reload();
}

function resetHistory()
{
    if (localStorage.getItem("score") !== null)
    {
        localStorage.clear("score");
        answerText.style.display = "none";
    }
}

function checkAnswer()
{
    var answerBank = document.getElementById('answerBank');
    var answers = document.getElementById('answers');
    answerBank.style.display= 'block';
    scoreboard.style.display= 'none';

    for(var a = 0; a < numberOfQuestions; a++)
    {
        var list = document.createElement('li');
        list.innerHTML = questionBank[a].answer;
        answers.appendChild(list);
    }
    getScoreText();
}

function getScoreText()
{
    switch (score)
    {
        case score = 0:
            scoreText.innerHTML = "Try harder!";
            break;
        case score = numberOfQuestions / 2:
            scoreText.innerHTML = "Half of the questions were correct.";
            break;
        case score = numberOfQuestions -1:
            scoreText.innerHTML = "Almost there..";
            break;
        case score = numberOfQuestions -2:
            scoreText.innerHTML = "Almost there..";
            break;
        case score = numberOfQuestions:
            scoreText.innerHTML = "Nicely done!";
            break;
        default:
            scoreText.innerHTML = "Try harder!";
    }
}

displayMainMenu();