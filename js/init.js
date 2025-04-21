function initializeQuizzes() {
    const quizzes = [
        {
            id: 1,
            name: "Basic Computer Science Quiz",
            questions: [
                {
                    questionText: "What is a program in computer science?",
                    answers: {
                        a: "a planned series of events, a schedule",
                        b: "a translated language that is easy for the computer to understand",
                        c: "a general process for solving a category of problems",
                        d: "a sequence of instructions that specifies how to perform a computation"
                    },
                    correctAnswer: "d"
                },
                {
                    questionText: "What is 5+5=",
                    answers: {
                        a: "25",
                        b: "a translated language that is easy for the computer to understand",
                        c: "20",
                        d: "10"
                    },
                    correctAnswer: "d"
                },
                {
                    questionText: "What is the function of the compiler?",
                    answers: {
                        a: "It reads a high-level program and translates everything at once, before executing any of the commands.",
                        b: "It loads the program from its saved location and makes the computer execute it.",
                        c: "It translates the program line-by-line, alternately reading lines and carrying out commands.",
                        d: "It translates the program from the low-level language you coded in to a high-level language that the computer can understand."
                    },
                    correctAnswer: "a"
                }
            ]
        },
        {
            id: 2,
            name: "General Knowledge Quiz",
            questions: [
                {
                    questionText: "What is the capital of France?",
                    answers: {
                        a: "Berlin",
                        b: "Madrid",
                        c: "Paris",
                        d: "Rome"
                    },
                    correctAnswer: "c"
                },
                {
                    questionText: "Who painted the Mona Lisa?",
                    answers: {
                        a: "Vincent van Gogh",
                        b: "Pablo Picasso",
                        c: "Leonardo da Vinci",
                        d: "Claude Monet"
                    },
                    correctAnswer: "c"
                },
                {
                    questionText: "2+2=?",
                    answers: {
                        a: "Vincent van Gogh",
                        b: "Pablo Picasso",
                        c: "4",
                        d: "Claude Monet"
                    },
                    correctAnswer: "c"
                }
            ]
        },
        {
            id: 3,
            name: "Math & Logic Quiz",
            questions: [
                {
                    questionText: "What is the square root of 64?",
                    answers: {
                        a: "6",
                        b: "8",
                        c: "10",
                        d: "12"
                    },
                    correctAnswer: "b"
                },
                {
                    questionText: "Which number completes the pattern: 2, 4, 8, 16, __?",
                    answers: {
                        a: "18",
                        b: "20",
                        c: "24",
                        d: "32"
                    },
                    correctAnswer: "d"
                },
                {
                    questionText: "If all bloops are razzies and all razzies are lazzies, are all bloops definitely lazzies?",
                    answers: {
                        a: "Yes",
                        b: "No",
                        c: "Only some",
                        d: "Cannot be determined"
                    },
                    correctAnswer: "a"
                }
            ]
        }
    ];

    localStorage.setItem('quizzes', JSON.stringify(quizzes));
}



function initializeUsers() {
    const existingUsers = JSON.parse(localStorage.getItem('users'));
    if (!existingUsers) {
        localStorage.setItem('users', JSON.stringify([]));
    }
}
initializeUsers();
initializeQuizzes();