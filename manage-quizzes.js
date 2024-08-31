const dashboard = document.querySelector(".dashboard");

const confirmDelteQuizYESbtn = document.getElementById("confirm-delete-quiz-yes-btn");
const confirmDelteQuizNObtn = document.getElementById("confirm-delete-quiz-no-btn");
const confirmDelteQuiz = document.getElementById("confirm-delete-quiz");


document.addEventListener('DOMContentLoaded', function() {
    getQuiz();
})

const accessToken=localStorage.getItem('accessToken');

if(!accessToken){
    window.location.href="login.html";
 }

function getQuiz(){

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
            displayQuiz(data);
    })
    .catch(error => {
        alert(error);
    })
}


function deleteQuiz(id){

    fetch(`http://127.0.0.1:8000/manage_quizmaster/quizzes/${id}/`, {
        method: 'DELETE',
        headers: {
            'Authorization': `JWT ${accessToken}`,
            'Content-Type': 'application/json',
        }
    })
    .then(response => {
        if(!response.ok){
            throw new Error ('Network was not ok!')
        }
        else{
            getQuiz();
        }
    })
    .catch(error => {
        alert(error);
    })
}


function displayQuiz(quizData){
    const tbody = document.getElementById('tbody');
    
    tbody.innerHTML='';

    if(quizData.length === 0){
        tbody.innerHTML = '<tr><td colspan="5">No quiz available</td></tr>';
        return;
    }

    const headers = Object.keys(quizData[0]).filter(header => (header !== 'id' && header !== 'date_to_start' && header!=='master'));

    quizData.forEach(item => {
        const tr = document.createElement('tr');
        tr.className='tr';

        const btnEdit = document.createElement('button');
        const btnDelete = document.createElement('button');

        btnEdit.className='btn-edit';
        btnEdit.textContent='Edit';
        btnEdit.addEventListener('click', function() {
            if(item.id){
                window.location.href = `edit-quiz.html?id=${item.id}`;
            }
        })

        btnDelete.className='btn-delete';
        btnDelete.textContent='Delete';
        btnDelete.addEventListener('click', function() {
            dashboard.style.display='none';
            confirmDelteQuiz.style.display='block';

            confirmDelteQuizYESbtn.onclick=function(){
                deleteQuiz(item.id);
                confirmDelteQuiz.style.display='none';
                dashboard.style.display='flex'
             }
             confirmDelteQuizNObtn.onclick=function(){
                window.location.href="manage-quizzes.html";
            }
        })

        headers.forEach(header => {
            const td = document.createElement('td');
            td.textContent = item[header];
            tr.appendChild(td);
            tr.appendChild(btnEdit)
            tr.appendChild(btnDelete);
        });
        tbody.appendChild(tr);
    });

}
