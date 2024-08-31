const quizTitle = document.getElementById('quiz-title')
const quizDescription = document.getElementById('quiz-description')
const quizDate = document.getElementById('quiz-date')
const confirmCreateQuiz = document.getElementById('confirm-create-quiz')
const submitBtn = document.querySelector('.btn-create')

const accessToken=localStorage.getItem('accessToken');

if(!accessToken){
    window.location.href="login.html";
 }

 quizTitle.addEventListener('input', function() {
    confirmCreateQuiz.style.display='none';
 })
 quizDescription.addEventListener('input', function() {
    confirmCreateQuiz.style.display='none';
 })
 quizDate.addEventListener('input', function() {
    confirmCreateQuiz.style.display='none';
 })

document.getElementById('create-quiz-form').addEventListener('submit', function(e) {
    e.preventDefault();
    createQuiz()
    submitBtn.disabled=true;
    if(submitBtn.disabled){
    submitBtn.style.backgroundColor='gray';
    }
})

function createQuiz(){
    
    fetch('http://127.0.0.1:8000/manage_quizmaster/quizzes/', {
        method: 'POST',
        headers: {
            'Authorization': `JWT ${accessToken}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            title: quizTitle.value.toUpperCase(),
            description: quizDescription.value.charAt(0).toUpperCase() + quizDescription.value.slice(1),
            date_to_start: quizDate.value,
        })
    })
    .then(response => {
        if(!response.ok){
             throw new Error('Network was not ok!');
          }
          else{
            submitBtn.disabled=false;
            if(submitBtn.disabled===false){
            submitBtn.style.backgroundColor='#218838';
            }
            confirmCreateQuiz.style.display='block'
            window.location.href='#confirmCreateQuiz'
            quizTitle.value=''
            quizDescription.value=''
            quizDate.value=''
          }
          return response.json();
       })
       .then(data => {
        const createdQuizName = `Created a new quiz: "${data.title}"`;
        localStorage.setItem('createdQuizRecentActivity', createdQuizName)        
       })
       .catch(error => {
        alert(error)
       })
}