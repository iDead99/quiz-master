const quizTitle = document.getElementById('quiz-title');
const quizDescription = document.getElementById('description');
const dateToStart = document.getElementById('date-to-start');
const confirmUpdateProfile = document.getElementById('confirm-update-quiz');
const submitBtn = document.querySelector('.btn-update-quiz');

const accessToken = localStorage.getItem('accessToken');
let quizName='';

if (!accessToken) {
    window.location.href = "login.html";
}

quizTitle.addEventListener('input', function() {
    confirmUpdateProfile.style.display='none';
})
quizDescription.addEventListener('input', function() {
    confirmUpdateProfile.style.display='none';
})
dateToStart.addEventListener('input', function() {
    confirmUpdateProfile.style.display='none';
})

document.addEventListener('DOMContentLoaded', function() {
    const params = new URLSearchParams(window.location.search);
    const quizId = params.get('id');

    if (quizId) {
        getParticularQuiz(quizId); // Fetch the quiz data using the quizId
    }
});

function getParticularQuiz(id) {

    fetch(`http://127.0.0.1:8000/manage_quizmaster/quizzes/${id}/`, {
        headers: {
            'Authorization': `JWT ${accessToken}`,
            'Content-Type': 'application/json',
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network was not ok!');
        }
        return response.json();
    })
    .then(data => {
        populateQuizForm(data)
    })
    .catch(error => {
        alert(error);
    });
}

function populateQuizForm(quizData) {
    quizTitle.value = quizData.title;
    quizDescription.value = quizData.description;


    // Convert the date to the correct format for datetime-local input
    let startDate = quizData.date_to_start;

    // Remove the 'Z' at the end if it exists
    if (startDate.endsWith('Z')) {
        startDate = startDate.slice(0, -1);
    }

    // Optional: Convert to local time if necessary
    // let localDateToStart = new Date(dateToStart).toISOString().slice(0, -1);
    // dateToStart = localDateToStart.slice(0, 16); // Truncate milliseconds

    dateToStart.value = startDate;

    quizName = quizData.title
}

document.getElementById('quiz-form').addEventListener('submit', function(e) {
    e.preventDefault();
    submitBtn.disabled = true;
    if (submitBtn.disabled) {
        submitBtn.style.backgroundColor = 'gray';
    }
    
    const params = new URLSearchParams(window.location.search);
    const quizId = params.get('id');

    if (quizId) {
        updateQuiz(quizId); // Update the quiz with the specific ID
    }
});

function updateQuiz(id) {
    
    fetch(`http://127.0.0.1:8000/manage_quizmaster/quizzes/${id}/`, {
        method: 'PUT',
        headers: {
            'Authorization': `JWT ${accessToken}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            title: quizTitle.value,
            description: quizDescription.value,
            date_to_start: dateToStart.value
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network was not ok!');
        } else {
            confirmUpdateProfile.style.display = 'block';
            window.location.href='#confirmUpdateProfile'
            submitBtn.disabled = false;
            if (submitBtn.disabled === false) {
                submitBtn.style.backgroundColor = '#007bff';
            }
            const params = new URLSearchParams(window.location.search);
            const quizId = params.get('id');
        
            if (quizId) {
                getParticularQuiz(quizId); // Fetch the quiz data using the quizId
            }
        }
        return response.json();
    })
    .then(data => {
        const updatedQuizName = `Updated the quiz: "from ${quizName} to ${data.title}"`;
        localStorage.setItem('updatedQuizRecentActivity', updatedQuizName)
    })
    .catch(error => {
        alert(error);
    });
}
