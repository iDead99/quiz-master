const accessToken=localStorage.getItem('accessToken');
if(!accessToken){
    window.location.href="login.html";
 }


 document.addEventListener('DOMContentLoaded', function() {
    getQuiz();
})

function getQuiz(){
    const accessToken = localStorage.getItem('accessToken')

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
        displayQuiz(data);
    })
    .catch(error => {
        alert(error);
    })
}


function displayQuiz(quizData){
    const tbody = document.getElementById('tbody');
    
    tbody.innerHTML='';

    if(quizData.length === 0){

        tbody.innerHTML = `<tr><td colspan="5">No quiz available <button type="submit" class="create-quiz-btn">Create Quiz</button></td></tr>`;
        const createQuizBtn = document.querySelector('.create-quiz-btn');
        createQuizBtn.addEventListener('click', function() {
            window.location.href='create-quiz.html';
        })
        return;
    }

    const headers = Object.keys(quizData[0]).filter(header => (header !== 'id' && header !== 'description' && header !== 'date_created' && header !== 'date_to_start' && header!=='master'));

    
    quizData.forEach(item => {
        const tr = document.createElement('tr');
        tr.className='tr';

        headers.forEach(header => {
            const td = document.createElement('td');
            td.textContent = item[header];
            td.addEventListener('click', function() {
                if(item.id){
                    window.location.href = `quiz-active.html?id=${item.id}`;
                }                
            })
            tr.appendChild(td);
        });
        tbody.appendChild(tr);
    });

}
