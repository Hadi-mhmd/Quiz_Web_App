function loadDashboard() {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userTable = document.getElementById('user-table');

    
    const filteredUsers = users.filter(user => user.role !== 'admin');

    filteredUsers.forEach(user => {
        const userRow = document.createElement('tr');

        const nameCell = document.createElement('td');
        nameCell.innerText = user.name;
        userRow.appendChild(nameCell);

        const roleCell = document.createElement('td');
        roleCell.innerText = user.role;
        userRow.appendChild(roleCell);

        const scoresCell = document.createElement('td');
        if (user.scores && user.scores.length > 0) {
            const quizAttempts = {};
            scoresCell.innerHTML = user.scores.map(s => {
            const name = s.quizName;
            quizAttempts[name] = (quizAttempts[name] || 0) + 1;
            return `${name} (Attempt ${quizAttempts[name]}): ${s.score}/${s.total}`;
            }).join('<br>');
        } else {
            scoresCell.innerText = 'No quiz taken';
        }

        userRow.appendChild(scoresCell);
        userTable.appendChild(userRow);
    });
}

function loadScores() {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const tbody = document.querySelector('#scoreTable tbody');
    tbody.innerHTML = '';

    users.forEach(user => {
        // Skip admin
        if (user.role === 'admin') return;

        if (!user.scores || user.scores.length === 0) {
            const tr = document.createElement('tr');
            const tdName = document.createElement('td');
            tdName.textContent = user.name;
            const tdQuiz = document.createElement('td');
            tdQuiz.textContent = 'No quiz taken';
            const tdScore = document.createElement('td');
            tdScore.textContent = '-';
            tr.appendChild(tdName);
            tr.appendChild(tdQuiz);
            tr.appendChild(tdScore);
            tbody.appendChild(tr);
        } else {
            user.scores.forEach(score => {
                const tr = document.createElement('tr');
                const tdName = document.createElement('td');
                tdName.textContent = user.name;
                const tdQuiz = document.createElement('td');
                tdQuiz.textContent = score.quizName;
                const tdScore = document.createElement('td');
                tdScore.textContent = `${score.score}/${score.total}`;
                tr.appendChild(tdName);
                tr.appendChild(tdQuiz);
                tr.appendChild(tdScore);
                tbody.appendChild(tr);
            });
        }
    });
}








function showAllQuizzes() {
    const quizContainer = document.createElement('div');
    quizContainer.className = 'quiz-section';

    const quizzes = JSON.parse(localStorage.getItem('quizzes')) || [];

    quizzes.forEach(quiz => {
        const quizBox = document.createElement('div');
        quizBox.className = 'quiz-box';

        const title = document.createElement('h3');
        title.textContent = quiz.name;
        quizBox.appendChild(title);

        quiz.questions.forEach((q, index) => {
            const question = document.createElement('p');
            question.innerHTML = `<strong>Q${index + 1}:</strong> ${q.questionText}`;
            quizBox.appendChild(question);

            const ul = document.createElement('ul');
            for (let key in q.answers) {
                const li = document.createElement('li');
                li.textContent = `${key.toUpperCase()}: ${q.answers[key]}`;
                if (key === q.correctAnswer) {
                    li.classList.add('correct');
                }
                ul.appendChild(li);
            }

            quizBox.appendChild(ul);
        });

        quizContainer.appendChild(quizBox);
    });

    document.getElementById('quiz-section').appendChild(quizContainer);

}

document.addEventListener('DOMContentLoaded', () => {
    loadDashboard();
    showAllQuizzes(); 
});



// document.addEventListener('DOMContentLoaded', loadDashboard);