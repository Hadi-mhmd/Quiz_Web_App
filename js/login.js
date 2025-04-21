// Ensure quizzes exist when registering
if (!localStorage.getItem('quizzes')) {
    initializeQuizzes();
}

function store() {
    var name = document.getElementById('name').value;
    var pw = document.getElementById('pw').value;
    var lowerCaseLetters = /[a-z]/g;
    var numbers = /[0-9]/g;

    if (name.length == 0) {
        alert('Please fill in email');
    } else if (pw.length == 0) {
        alert('Please fill in password');
    } else if (pw.length > 8) {
        alert('Max of 8 characters');
    } else if (!pw.match(numbers)) {
        alert('Please add 1 number');
    } else if (!pw.match(lowerCaseLetters)) {
        alert('Please add 1 lowercase letter');
    } else {
        // Admin-specific check
        if (name === "admin@quiz.com" && pw !== "admin123") {
            alert('Admin password must be exactly "admin123"');
            return;
        }

        let users = JSON.parse(localStorage.getItem('users')) || [];

        // Check if the user already exists
        const existingUser = users.find(u => u.name === name);
        if (!existingUser) {
            let role = (name === "admin@quiz.com" && pw === "admin123") ? "admin" : "user";

            users.push({ name: name, pw: pw, role: role, scores: [] });
            localStorage.setItem('users', JSON.stringify(users));
        }

        // Store logged in user's info
        localStorage.setItem('name', name);
        localStorage.setItem('role', (name === "admin@quiz.com" && pw === "admin123") ? 'admin' : 'user');

        alert('Your account has been created');
    }
}



function check() {
    const userName = document.getElementById('userName').value;
    const userPw = document.getElementById('userPw').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];

    const foundUser = users.find(user => user.name === userName && user.pw === userPw);

    if (foundUser) {
        localStorage.setItem('name', foundUser.name);
        localStorage.setItem('role', foundUser.role);

        alert('You are logged in.');

        if (foundUser.role === 'admin') {
            window.location.href = "../admin.html";  
        } else {
            window.location.href = "../quiz_home.html";
        }
    } else {
        alert('Error on login');
    }
}
