const questions = [
    {
        question: 'Which HTML tag is used to define an inline style?',
        choice1: '<script>',
        choice2: '<css>',
        choice3: '<style>',
        choice4: '<span>',
        answer: 3,
    },
    {
        question: 'Which property is used to change the text color in CSS?',
        choice1: 'text-color',
        choice2: 'font-color',
        choice3: 'text-style',
        choice4: 'color',
        answer: 4,
    },
    {
        question: 'Which of the following is the correct way to comment in HTML?',
        choice1: '// Comment',
        choice2: '<!-- Comment -->',
        choice3: '/* Comment */',
        choice4: '<! Comment>',
        answer: 2,
    },
];

let currentQuestionIndex = 0;
let acceptingAnswers = false;
let score = 0;

document.addEventListener('DOMContentLoaded', () => {
    const questionElement = document.getElementById('question');
    const choiceElements = Array.from(document.getElementsByClassName('choice-text'));
    const questionCounterElement = document.getElementById('questionCounter');
    const scoreElement = document.getElementById('score');
    const progressBarFull = document.getElementById('progress');

    function startGame() {
        shuffleArray(questions); // Shuffle questions array
        currentQuestionIndex = 0;
        score = 0;
        updateHUD();
        getNewQuestion();
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function updateProgressBar() {
        const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
        progressBarFull.style.width = `${progress}%`;
    }

    function updateHUD() {
        questionCounterElement.innerText = `${currentQuestionIndex + 1}/${questions.length}`;
        scoreElement.innerText = score;
        updateProgressBar();
    }

    function getNewQuestion() {
        if (currentQuestionIndex >= questions.length) {
            localStorage.setItem('mostRecentScore', score);
            return window.location.assign('end.html');
        }

        const currentQuestion = questions[currentQuestionIndex];
        questionElement.innerText = currentQuestion.question;

        choiceElements.forEach(choice => {
            const number = choice.dataset['number'];
            choice.innerText = currentQuestion['choice' + number];
            choice.classList.remove('correct', 'incorrect', 'selected', 'no-hover');
        });

        acceptingAnswers = true;
    }

    choiceElements.forEach(choice => {
        choice.addEventListener('click', e => {
            if (!acceptingAnswers) return;

            acceptingAnswers = false;
            const selectedChoice = e.target;
            const selectedAnswer = selectedChoice.dataset['number'];

            const classToApply = selectedAnswer == questions[currentQuestionIndex].answer ? 'correct' : 'incorrect';

            if (classToApply === 'correct') {
                incrementScore();
            }

            selectedChoice.classList.add(classToApply);
            selectedChoice.classList.add('no-hover');

            setTimeout(() => {
                currentQuestionIndex++;
                updateHUD();
                getNewQuestion();
            }, 1000);
        });
    });

    function incrementScore() {
        score++;
    }

    startGame();
});
