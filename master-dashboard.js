const masterName=document.getElementById('master-name');
const quizMaster=document.getElementById('quiz-master');

const totalQuiz=document.getElementById('total-quizzes');
const totalQuestion=document.getElementById('total-questions');

const createdNewQuiz=document.getElementById('created-a-new-quiz');
const updatedQuiz=document.getElementById('updated-the-quiz');
const deletedTheQuiz=document.getElementById('deleted-the-quiz');

const accessToken=localStorage.getItem('accessToken');

if(!accessToken){
    window.location.href="login.html";
 }

document.addEventListener('DOMContentLoaded', function() {
    getMasterName();
    getQuiz();
    getQuestion();

    const createdQecentActivity = localStorage.getItem('createdQuizRecentActivity')

    if(createdQecentActivity){
    const recentActivityElement = document.querySelector('.recent-activities');
    const activityItem = document.createElement('li');
    activityItem.textContent = createdQecentActivity;
    recentActivityElement.appendChild(activityItem)

    }

    const recentActivity = localStorage.getItem('updatedQuizRecentActivity')

    if(recentActivity){
    const recentActivityElement = document.querySelector('.recent-activities');
    const activityItem = document.createElement('li');
    activityItem.textContent = recentActivity;
    recentActivityElement.appendChild(activityItem)

    }

})

function getMasterName(){

    fetch('https://quiz-master-back.onrender.com/auth/users/me/', {
        headers: {
            'Authorization': `JWT ${accessToken}`,
            'Content-Type': 'application/json',
        }
    })
    .then(response => {
        if(!response.ok){
            throw new Error ('Network was not ok!')
        }
        return response.json();
    })
    .then(data => {
        masterName.textContent += `, ${data.first_name} ${data.last_name}`;
        quizMaster.textContent += `${data.first_name} ${data.last_name}`;
    })
    .catch(error => {
        alert(error);
    })
}


function getQuiz(){

    fetch('https://quiz-master-back.onrender.com/manage_quizmaster/quizzes/', {
        headers: {
            'Authorization': `JWT ${accessToken}`,
            'Content-Type': 'application/json',
        }
    })
    .then(response => {
        if(!response.ok){
            throw new Error ('Network was not ok!')
        }
        return response.json();
    })
    .then(data => {
        let quizNumber=0;
        data.forEach(() => {
            quizNumber++;
        })
        totalQuiz.textContent=quizNumber;
    })
    .catch(error => {
        alert(error);
    })
}

function getQuestion(){

    fetch('https://quiz-master-back.onrender.com/manage_quizmaster/questions/', {
        headers: {
            'Authorization': `JWT ${accessToken}`,
            'Content-Type': 'application/json',
        }
    })
    .then(response => {
        if(!response.ok){
            throw new Error ('Network was not ok!')
        }
        return response.json();
    })
    .then(data => {
        let questionNumber=0;
        data.forEach(() => {
            questionNumber++;
        })
        totalQuestion.textContent=questionNumber;
    })
    .catch(error => {
        alert(error);
    })
}