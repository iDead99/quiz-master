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
})

function getMasterName(){
    const accessToken = localStorage.getItem('accessToken')

    fetch('http://127.0.0.1:8000/auth/users/me/', {
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
    const accessToken = localStorage.getItem('accessToken')

    fetch('http://127.0.0.1:8000/manage_quizmaster/quizzes/', {
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
        if(quizNumber!==0){
        createdNewQuiz.textContent+=`Created a new quiz: "${data[0].title}"`
        }
    })
    .catch(error => {
        alert(error);
    })
}

function getQuestion(){
    const accessToken = localStorage.getItem('accessToken')

    fetch('http://127.0.0.1:8000/manage_quizmaster/questions/', {
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