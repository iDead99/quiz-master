const quiz=document.getElementById("quiz");

const questionText = document.getElementById('question-text')

const optionLabel1 = document.getElementById('answer-option-label-1')
const OptionDeleteBtn1 = document.getElementById('delete-option-btn-1')
const option1 = document.getElementById('answer-option-1')

const optionLabel2 = document.getElementById('answer-option-label-2')
const OptionDeleteBtn2 = document.getElementById('delete-option-btn-2')
const option2 = document.getElementById('answer-option-2')

const optionLabel3 = document.getElementById('answer-option-label-3')
const OptionDeleteBtn3 = document.getElementById('delete-option-btn-3')
const option3 = document.getElementById('answer-option-3')

const optionLabel4 = document.getElementById('answer-option-label-4')
const OptionDeleteBtn4 = document.getElementById('delete-option-btn-4')
const option4 = document.getElementById('answer-option-4')

const correctAnswerLabel = document.getElementById('correct-answer-label')
const correctAnswer = document.getElementById('correct-answer')

const addOptionBtn = document.getElementById('add-option-btn')

const confirmCreateQuestion = document.getElementById('confirm-create-question');
const submitBtn = document.querySelector('.btn-add-question')


const accessToken=localStorage.getItem('accessToken');

if(!accessToken){
    window.location.href="login.html";
 }

function correctAnswerLoad(options) {
    const correctAnswerSelect = document.getElementById('correct-answer');
    correctAnswerSelect.innerHTML = '';

    options.forEach(option => {
        const opt = document.createElement('option');
        opt.value = option.name;
        opt.textContent = option.name;
        correctAnswerSelect.appendChild(opt);
    });
}


// addOptionBtn.addEventListener('click', function() {
//     if(option1.style.display==='none' && optionLabel1.style.display==='none'){
//         optionLabel1.style.display='block';
//         OptionDeleteBtn1.style.display='block';
//         option1.style.display='block';
//         if(option1.style.display==='block'){
//             option1.required = true;
//             }

//         addOptionBtn.addEventListener('click', function() {
//             if(option2.style.display==='none' && optionLabel2.style.display==='none'){
//                 optionLabel2.style.display='block';
//                 OptionDeleteBtn2.style.display='block';
//                 option2.style.display='block';
//                     if(option2.style.display==='block'){
//                     option2.required = true;
//                     if(option1.style.display==='block' && option2.style.display==='block'){
//                         const correctAnswerOption = [
//                             {name: "Option A"},
//                             {name: "Option B"},
//                          ];
//                          correctAnswerLoad(correctAnswerOption)
                        
//                     }
//                     }

//                 addOptionBtn.addEventListener('click', function() {
//                     if(option3.style.display==='none' && optionLabel3.style.display==='none'){
//                         optionLabel3.style.display='block';
//                         OptionDeleteBtn3.style.display='block';
//                         option3.style.display='block';
//                         if(option3.style.display==='block'){
//                             option3.required = true;
//                             const correctAnswerOption = [
//                                 {name: "Option C"},
//                              ];
//                              correctAnswerLoad(correctAnswerOption)
//                             }

//                         addOptionBtn.addEventListener('click', function() {
//                             if(option4.style.display==='none' && optionLabel4.style.display==='none'){
//                                 optionLabel4.style.display='block';
//                                 OptionDeleteBtn4.style.display='block';
//                                 option4.style.display='block';
//                                 addOptionBtn.disabled=true;
//                                 if(option4.style.display==='block'){
//                                     option4.required = true;

//                                     const correctAnswerOption = [
//                                         {name: "Option D"},
//                                      ];
//                                      correctAnswerLoad(correctAnswerOption)

//                                     }
//                                     if(addOptionBtn.disabled){
//                                     addOptionBtn.style.backgroundColor='gray';
//                                     addOptionBtn.style.opacity='20%';
//                                     }
//                             }
//                         })
//                     }
//                 })
//             }
//         })
//     }
// })

addOptionBtn.addEventListener('click', function() {
    optionLabel1.style.display='block';
    option1.style.display='block';
    addOptionBtn.style.display='none';
})

questionText.addEventListener('input', function() {
    confirmCreateQuestion.style.display='none'
})

option1.addEventListener('input', function() {
    confirmCreateQuestion.style.display='none'

    if(option1.value.trim()===''){
        optionLabel2.style.display='none';
        option2.style.display='none';
        option2.value='';

        optionLabel3.style.display='none';
        option3.style.display='none';
        option3.value='';

        optionLabel4.style.display='none';
        option4.style.display='none';
        option4.value='';

        correctAnswerLabel.style.display='none';
        correctAnswer.style.display='none';

    }
    else{
        optionLabel2.style.display='block';
        option2.style.display='block';
    }
})
option2.addEventListener('input', function() {
    confirmCreateQuestion.style.display='none'

    if(option2.value.trim()===''){
        optionLabel3.style.display='none';
        option3.style.display='none';
        option3.value='';

        optionLabel4.style.display='none';
        option4.style.display='none';
        option4.value='';

        correctAnswerLabel.style.display='none';
        correctAnswer.style.display='none';

        correctAnswerLoad([]);
}
    else{
        optionLabel3.style.display='block';
        option3.style.display='block';
    
        correctAnswerLabel.style.display='block';
        correctAnswer.style.display='block';

        const correctAnswerOption = [
            {name: "Option A"},
            {name: "Option B"}
            ];
        correctAnswerLoad(correctAnswerOption);
}
})
option3.addEventListener('input', function() {
    confirmCreateQuestion.style.display='none'

    if(option3.value.trim()===''){
        optionLabel4.style.display='none';
        option4.style.display='none';
        option4.value='';

        const correctAnswerOption = [
            {name: "Option A"},
            {name: "Option B"},
            ];
        correctAnswerLoad(correctAnswerOption);
    }
    else{
        optionLabel4.style.display='block';
        option4.style.display='block';

        const correctAnswerOption = [
            {name: "Option A"},
            {name: "Option B"},
            {name: "Option C"},
            ];
        correctAnswerLoad(correctAnswerOption);        
    }
})
option4.addEventListener('input', function() {
    confirmCreateQuestion.style.display='none'

    if(option4.value.trim()===''){
        const correctAnswerOption = [
            {name: "Option A"},
            {name: "Option B"},
            {name: "Option C"},
            ];
        correctAnswerLoad(correctAnswerOption);
    }
    else{
        optionLabel2.style.display='block';
        option2.style.display='block'; 
        
        const correctAnswerOption = [
            {name: "Option A"},
            {name: "Option B"},
            {name: "Option C"},
            {name: "Option D"},
            ];
        correctAnswerLoad(correctAnswerOption);
    }
})

// function OptionDeleteBtnFunction(){
// OptionDeleteBtn1.addEventListener('click', function() {
//     optionLabel1.style.display='none';
//     OptionDeleteBtn1.style.display='none';
//     option1.style.display='none';
//     option1.required=false;
// })
// OptionDeleteBtn2.addEventListener('click', function() {
//     optionLabel2.style.display='none';
//     OptionDeleteBtn2.style.display='none';
//     option2.style.display='none';
//     option2.required=false;
// })
// OptionDeleteBtn3.addEventListener('click', function() {
//     optionLabel3.style.display='none';
//     OptionDeleteBtn3.style.display='none';
//     option3.style.display='none';
//     option3.required=false;
// })
// OptionDeleteBtn4.addEventListener('click', function() {
//     optionLabel4.style.display='none';
//     OptionDeleteBtn4.style.display='none';
//     option4.style.display='none';
//     option4.required=false;
// })
// }


document.getElementById('add-questions-form').addEventListener('submit', function(e) {
    e.preventDefault();

    submitBtn.disabled=true;
    if(submitBtn.disabled){
    submitBtn.style.backgroundColor='gray';
    }

    let questionData = {}

    if(option2.value===''){
        questionData = {
            quiz: quiz.value,
            question: questionText.value,
        }
    }
    else{
        questionData = {
            quiz: quiz.value.charAt(0).toUpperCase() + quiz.value.slice(1),
            question: questionText.value.charAt(0).toUpperCase() + questionText.value.slice(1),
            option1: option1.value.charAt(0).toUpperCase() + option1.value.slice(1),
            option2: option2.value.charAt(0).toUpperCase() + option2.value.slice(1),
            option3: option3.value.charAt(0).toUpperCase() + option3.value.slice(1),
            option4: option4.value.charAt(0).toUpperCase() + option4.value.slice(1),
            answer: correctAnswer.value,
        }
    }
    
    addQuestion(questionData);
})

function getQuizzes(){
    
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
        else{

        }
        return response.json();
    })
    .then(data => {
            const selectQuiz=document.getElementById("quiz");
            data.forEach(item => {
                const option = document.createElement('option');
                option.value = item.id;
                option.textContent=item.title;
                selectQuiz.appendChild(option);
            })
        })
}
getQuizzes();

function addQuestion(questionData){
    
    fetch('https://quiz-master-back.onrender.com/manage_quizmaster/questions/', {
        method: 'POST',
        headers: {
            'Authorization': `JWT ${accessToken}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(questionData)
    })
    .then(response => {
        if(!response.ok){
             throw new Error('Network was not ok!');
          }
          else{
            submitBtn.disabled=false;
            if(submitBtn.disabled===false){
            submitBtn.style.backgroundColor='#007bff';
            }
            confirmCreateQuestion.style.display='block'
            window.location.href='#confirmCreateQuestion'
            questionText.value=''
            option1.value=''
            option2.value=''
            option3.value=''
            option4.value=''
          }
          return response.json();
       })
       .catch(error => {
        alert(error)
       })
}