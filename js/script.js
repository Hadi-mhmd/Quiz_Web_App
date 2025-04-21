
function loadQuizzes() {
    const quizzes = JSON.parse(localStorage.getItem('quizzes')) || [];
    const quizListDiv = document.getElementById('quiz-list');
    
 
    const username = localStorage.getItem('name');
    const userNameWithoutEmail = username.split('@')[0];

    
    const welcomeMessageDiv = document.getElementById('welcome-message');
    welcomeMessageDiv.innerText = `Welcome, ${userNameWithoutEmail}!`;

    quizzes.forEach((quiz) => {
        const quizElement = document.createElement('div');
        quizElement.classList.add('quiz-item');
        quizElement.innerText = quiz.name;
        
        // When the user clicks a quiz, store its ID in localStorage and navigate to quiz.html
        quizElement.addEventListener('click', () => {
            localStorage.setItem('selectedQuizId', quiz.id);
            window.location.href = '../quiz.html';
        });
        
        quizListDiv.appendChild(quizElement);
    });
}

// Load quizzes when the page loads
document.addEventListener('DOMContentLoaded', loadQuizzes);
