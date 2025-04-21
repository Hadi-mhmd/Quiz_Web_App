// function getSelectedQuiz() {
//     const quizId = localStorage.getItem('selectedQuizId');
//     const quizzes = JSON.parse(localStorage.getItem('quizzes'));
//     return quizzes.find(quiz => quiz.id === parseInt(quizId));
// }

// function loadQuiz() {
//     const quiz = getSelectedQuiz();
//     let questionIndex = 0;
//     let score = 0;

//     const questionText = document.getElementById('question-text');
//     const optionsDiv = document.getElementById('options-container');
//     const nextButton = document.getElementById('next-button');
//     const scoreDiv = document.getElementById('score');
//     const timerDisplay = document.getElementById('timer');
//     let timerInterval;
//     let selected = false;

//     function startTimer() {
//         let timeLeft = 20;
//         timerDisplay.innerText = `Time Left: ${timeLeft}s`;

//         timerInterval = setInterval(() => {
//             timeLeft--;
//             timerDisplay.innerText = `Time Left: ${timeLeft}s`;

//             if (timeLeft <= 0) {
//                 clearInterval(timerInterval);
//                 showCorrectAnswer(false); // false = no answer selected
//                 setTimeout(() => nextQuestion(), 1500); // Auto-move after showing correct
//             }
//         }, 1000);
//     }

    


//     function showQuestion() {
//         selected = false;
//         clearInterval(timerInterval);
//         nextButton.style.display = 'none';
//         timerDisplay.innerText = '';
//         startTimer();

//         const question = quiz.questions[questionIndex];
//         questionText.innerText = question.questionText;
//         optionsDiv.innerHTML = '';

//         for (let key in question.answers) {
//             const btn = document.createElement('button');
//             btn.innerText = question.answers[key];
//             btn.classList.add('option-btn');
//             btn.onclick = () => handleAnswer(key, btn);
//             optionsDiv.appendChild(btn);
//         }
//     }

//     function showCorrectAnswer(shouldAddScore = false, selectedAnswer = null) {
//         const correctAnswer = quiz.questions[questionIndex].correctAnswer;
//         const buttons = document.querySelectorAll('.option-btn');

//         buttons.forEach(button => {
//             const answerKey = Object.keys(quiz.questions[questionIndex].answers)
//                 .find(k => quiz.questions[questionIndex].answers[k] === button.innerText);

//             if (answerKey === correctAnswer) {
//                 button.style.backgroundColor = 'green';
//                 button.style.color = 'white';
//             } else if (answerKey === selectedAnswer) {
//                 button.style.backgroundColor = 'red';
//                 button.style.color = 'white';
//             }
//         });

//         if (shouldAddScore && selectedAnswer === correctAnswer) {
//             score++;
//         }

//         nextButton.style.display = 'block';
//     }

//     function handleAnswer(selectedAnswer, btn) {
//         if (selected) return;
//         selected = true;
//         clearInterval(timerInterval);

//         showCorrectAnswer(true, selectedAnswer);
//     }

//     function displayScore() {
//         questionText.innerText = '';
//         optionsDiv.innerHTML = '';
//         nextButton.style.display = 'none';
//         timerDisplay.innerText = '';
//         scoreDiv.innerText = `You scored ${score} out of ${quiz.questions.length}`;

//         const users = JSON.parse(localStorage.getItem('users')) || [];
//         const username = localStorage.getItem('name');
//         const user = users.find(u => u.name === username);

//         if (user) {
//             user.scores.push({
//                 quizId: quiz.id,
//                 quizName: quiz.name,
//                 score: score,
//                 total: quiz.questions.length
//             });
//             localStorage.setItem('users', JSON.stringify(users));
//         }
//     }

//     function nextQuestion() {
//         questionIndex++;
//         if (questionIndex < quiz.questions.length) {
//             showQuestion();
//         } else {
//             displayScore();
//         }
//     }

//     nextButton.onclick = nextQuestion;
//     showQuestion();
// }

// document.addEventListener('DOMContentLoaded', loadQuiz);




function getSelectedQuiz() {
    const quizId = localStorage.getItem('selectedQuizId');
    const quizzes = JSON.parse(localStorage.getItem('quizzes'));
    return quizzes.find(quiz => quiz.id === parseInt(quizId));
}

function loadQuiz() {
    const quiz = getSelectedQuiz();
    let questionIndex = 0;
    let score = 0;

    const questionText = document.getElementById('question-text');
    const optionsDiv = document.getElementById('options-container');
    const nextButton = document.getElementById('next-button');
    const scoreDiv = document.getElementById('score');
    const timerDisplay = document.getElementById('timer');
    let timerInterval;
    let selected = false;

    function updateTimerDisplay(timeLeft) {
        let color = 'red'; // default color
        if (timeLeft < 5) {
            color = 'red';
        } else if (timeLeft < 10) {
            color = 'orange';
        } else {
            color = 'green';
        }

        timerDisplay.innerHTML = `Time Left: <span class="time-value" style="color: ${color}; font-weight: bold;">${timeLeft}s</span>`;
    }

    function startTimer() {
        let timeLeft = 20;
        updateTimerDisplay(timeLeft);

        timerInterval = setInterval(() => {
            timeLeft--;
            updateTimerDisplay(timeLeft);

            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                showCorrectAnswer(false); // false = no answer selected
                setTimeout(() => nextQuestion(), 1500);
            }
        }, 1000);
    }

    function showQuestion() {
        selected = false;
        clearInterval(timerInterval);
        nextButton.style.display = 'none';
        timerDisplay.innerText = '';
        startTimer();

        const question = quiz.questions[questionIndex];
        questionText.innerText = question.questionText;
        optionsDiv.innerHTML = '';

        for (let key in question.answers) {
            const btn = document.createElement('button');
            btn.innerText = question.answers[key];
            btn.classList.add('option-btn');
            btn.onclick = () => handleAnswer(key, btn);
            optionsDiv.appendChild(btn);
        }
    }

    function showCorrectAnswer(shouldAddScore = false, selectedAnswer = null) {
        const correctAnswer = quiz.questions[questionIndex].correctAnswer;
        const buttons = document.querySelectorAll('.option-btn');

        buttons.forEach(button => {
            const answerKey = Object.keys(quiz.questions[questionIndex].answers)
                .find(k => quiz.questions[questionIndex].answers[k] === button.innerText);

            if (answerKey === correctAnswer) {
                button.style.backgroundColor = 'green';
                button.style.color = 'white';
            } else if (answerKey === selectedAnswer) {
                button.style.backgroundColor = 'red';
                button.style.color = 'white';
            }
        });

        if (shouldAddScore && selectedAnswer === correctAnswer) {
            score++;
        }

        nextButton.style.display = 'block';
    }

    function handleAnswer(selectedAnswer, btn) {
        if (selected) return;
        selected = true;
        clearInterval(timerInterval);

        showCorrectAnswer(true, selectedAnswer);
    }

    function displayScore() {
        questionText.innerText = '';
        optionsDiv.innerHTML = '';
        nextButton.style.display = 'none';
        timerDisplay.innerText = '';
        scoreDiv.innerText = `You scored ${score} out of ${quiz.questions.length}`;

        const users = JSON.parse(localStorage.getItem('users')) || [];
        const username = localStorage.getItem('name');
        const user = users.find(u => u.name === username);

        if (user) {
            user.scores.push({
                quizId: quiz.id,
                quizName: quiz.name,
                score: score,
                total: quiz.questions.length
            });
            localStorage.setItem('users', JSON.stringify(users));
        }
    }

    function nextQuestion() {
        questionIndex++;
        if (questionIndex < quiz.questions.length) {
            showQuestion();
        } else {
            displayScore();
        }
    }

    nextButton.onclick = nextQuestion;
    showQuestion();
}

document.addEventListener('DOMContentLoaded', loadQuiz);
