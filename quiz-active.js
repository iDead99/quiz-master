const questionText = document.getElementById('question-text');
const nextBtn = document.getElementById('next-btn');
const previousBtn = document.getElementById('previous-btn');
const finishBtn = document.getElementById('finish-btn');

const readBtn = document.getElementById('read-btn');

const optionA = document.getElementById('option-a');
const optionB = document.getElementById('option-b');
const optionC = document.getElementById('option-c');
const optionD = document.getElementById('option-d');

const body=document.getElementById("body");
const dashboard=document.querySelector(".dashboard");

const correctBtn = document.querySelector('.btn-correct');
const wrongBtn = document.querySelector('.btn-wrong');

const rightText=document.getElementById("right-txt");
const wrongText=document.getElementById("wrong-txt");

const correctAnswerAudio=document.getElementById("correct-answer-audio");
const wrongAnswerAudio=document.getElementById("wrong-answer-audio");

const accessToken = localStorage.getItem('accessToken');

if(!accessToken){
    window.location.href="login.html";
 }

correctBtn.addEventListener('click', function() {
    dashboard.style.display='none';
    body.style.backgroundColor='rgba(0, 230, 0, 1)';
    setTimeout(() => {
    body.style.backgroundColor='rgba(0, 5000, 0, 1)'
    }, 300)
    setTimeout(() => {
        body.style.backgroundColor='rgba(0, 255, 0, 0)'
    }, 400)
    setTimeout(() => {
        body.style.backgroundColor='rgba(0, 5000, 0, 1)'
    }, 500)
    setTimeout(() => {
        body.style.backgroundColor='rgba(0, 230, 0, 1)'
    }, 600)
    setTimeout(() => {
        body.style.backgroundColor='rgba(0, 5000, 0, 1)'
    }, 900)
    setTimeout(() => {
        body.style.backgroundColor='rgba(0, 230, 0, 1)'
    }, 1100)
    setTimeout(() => {
        body.style.backgroundColor='rgba(0, 255, 0, 0)'
    }, 1200)
    setTimeout(() => {
        body.style.backgroundColor='rgba(0, 5000, 0, 1)'
    }, 1300)
    setTimeout(() => {
        body.style.backgroundColor='rgba(0, 5000, 0, 1)'
    }, 1400)

    setTimeout(() => {
        rightText.style.display='block';
        setTimeout(() => {
            correctAnswerAudio.play();
        },500)
        setTimeout(() => {
            rightText.style.display='none';
            dashboard.style.display='flex';
            body.style.backgroundColor='#f4f4f4';
        },2300)
    }, 1500)
    
})

wrongBtn.addEventListener('click', function() {
    dashboard.style.display='none';
    body.style.backgroundColor='rgba(128, 0, 0, 1)';
    setTimeout(() => {
    body.style.backgroundColor='rgba(200, 0, 0, 1)'
    }, 300)
    setTimeout(() => {
        body.style.backgroundColor='rgba(128, 0, 0, 1)'
    }, 600)
    setTimeout(() => {
        body.style.backgroundColor='rgba(200, 0, 0, 1)'
    }, 900)
    setTimeout(() => {
        body.style.backgroundColor='rgba(128, 0, 0, 1)'
    }, 1100)
    setTimeout(() => {
        body.style.backgroundColor='rgba(200, 0, 0, 1)'
    }, 1400)

    setTimeout(() => {
        wrongText.style.display='block';
        setTimeout(() => {
            wrongAnswerAudio.play();
        },500)
        setTimeout(() => {
            wrongText.style.display='none';
            dashboard.style.display='flex';
            body.style.backgroundColor='#f4f4f4';
        },2300)
    }, 1500)
})


document.addEventListener('DOMContentLoaded', function() {
    const params = new URLSearchParams(window.location.search);
    const quizId = params.get('id');

    if (quizId) {
        getParticularQuiz(quizId); // Fetch the quiz data using the quizId
    }
});

function getParticularQuiz(id) {

    fetch(`https://quiz-master-back.onrender.com/manage_quizmaster/questions/?quiz__id=${id}`, {
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
        populateQuizForm(data); // Populate the form with quiz data
    })
    .catch(error => {
        alert(error);
    });
}

function populateQuizForm(quizData) {
    let questionCount = 0;
    let questionNumber = 0;

    quizData.forEach(() => {
        questionNumber++;
    })
    if(questionNumber!==0){
    questionText.textContent=`${questionCount+1}. ${quizData[questionCount].question}`;
    
    optionA.textContent=`A. ${quizData[questionCount].option1}`
    optionB.textContent=`B. ${quizData[questionCount].option2}`
    optionC.textContent=`C. ${quizData[questionCount].option3}`
    optionD.textContent=`D. ${quizData[questionCount].option4}`

    optionA.style.display='block';
    optionB.style.display='block';
    optionC.style.display='block';
    optionD.style.display='block';

    if(`${quizData[questionCount].option1}`===''){
        optionA.style.display='none';
    }
    if(`${quizData[questionCount].option2}`===''){
        optionB.style.display='none';
    }
    if(`${quizData[questionCount].option3}`===''){
        optionC.style.display='none';
    }
    if(`${quizData[questionCount].option4}`===''){
        optionD.style.display='none';
    }

    if(questionNumber===1){
        finishBtn.style.display='block';
        nextBtn.style.display='none';
    }
    else{
        finishBtn.style.display='none';
        nextBtn.style.display='block';
    }

    }
    else{
    questionText.textContent='No questions available for this quiz!';
    nextBtn.textContent='Back <<';
    if(nextBtn.textContent==='Back <<'){
        nextBtn.addEventListener('click', function() {
        window.location.href='start-quiz.html';
            })
    }
    readBtn.style.display='none';
    }

    nextBtn.addEventListener('click', function() {
    
        questionCount++;

        questionText.textContent=`${questionCount+1}. ${quizData[questionCount].question}`;

        optionA.textContent=`A. ${quizData[questionCount].option1}`
        optionB.textContent=`B. ${quizData[questionCount].option2}`
        optionC.textContent=`C. ${quizData[questionCount].option3}`
        optionD.textContent=`D. ${quizData[questionCount].option4}`

        if(`${quizData[questionCount].option1}`===''){
            optionA.style.display='none';
        }
        else{
            optionA.style.display='block';
        }
        if(`${quizData[questionCount].option2}`===''){
            optionB.style.display='none';
        }
        else{
            optionB.style.display='block';
        }
        if(`${quizData[questionCount].option3}`===''){
            optionC.style.display='none';
        }
        else{
            optionC.style.display='block';
        }
        if(`${quizData[questionCount].option4}`===''){
            optionD.style.display='none';
        }
        else{
            optionD.style.display='block';
        }

        if(questionCount>0){
            previousBtn.style.display='block';
        }

        if(questionCount+1===questionNumber || questionCount==0){
            nextBtn.style.display='none';
            finishBtn.style.display='block';
        }
        else{
            finishBtn.style.display='none';
        }
        
    })

    previousBtn.addEventListener('click', function() {
        questionCount--;

        questionText.textContent=`${questionCount+1}. ${quizData[questionCount].question}`;

        optionA.textContent=`A. ${quizData[questionCount].option1}`
        optionB.textContent=`B. ${quizData[questionCount].option2}`
        optionC.textContent=`C. ${quizData[questionCount].option3}`
        optionD.textContent=`D. ${quizData[questionCount].option4}`

        if(`${quizData[questionCount].option1}`===''){
            optionA.style.display='none';
        }
        else{
            optionA.style.display='block';
        }
        if(`${quizData[questionCount].option2}`===''){
            optionB.style.display='none';
        }
        else{
            optionB.style.display='block';
        }
        if(`${quizData[questionCount].option3}`===''){
            optionC.style.display='none';
        }
        else{
            optionC.style.display='block';
        }
        if(`${quizData[questionCount].option4}`===''){
            optionD.style.display='none';
        }
        else{
            optionD.style.display='block';
        }

        if(questionCount==0){
            previousBtn.style.display='none';
            nextBtn.style.display='block';
            finishBtn.style.display='none';
        }
        else{
            nextBtn.style.display='block';
            finishBtn.style.display='none';
        }
        
        
    })

    finishBtn.addEventListener('click', function() {
        window.location.href='start-quiz.html';
    })

    readBtn.addEventListener('click', function() {
        readBtn.disabled=true;
        if(readBtn.disabled===true){
        readBtn.style.opacity='50%'
        }

        let questionReadFinish = false;
        let optionReadFinish = false;

        const questionTextutterance = new SpeechSynthesisUtterance(questionText.textContent.slice(3))
        questionTextutterance.rate=0.7;
        window.speechSynthesis.speak(questionTextutterance);

        const optionAutterance = new SpeechSynthesisUtterance(optionA.textContent)
        const optionButterance = new SpeechSynthesisUtterance(optionB.textContent)
        const optionCutterance = new SpeechSynthesisUtterance(optionC.textContent)
        const optionDutterance = new SpeechSynthesisUtterance(optionD.textContent)

        if(`${quizData[questionCount].option1}`!==''){
            window.speechSynthesis.speak(optionAutterance);
            optionAutterance.rate=0.7;
        }
        if(`${quizData[questionCount].option2}`!==''){
            window.speechSynthesis.speak(optionButterance);
            optionButterance.rate=0.7;
        }
        if(`${quizData[questionCount].option3}`!==''){
            window.speechSynthesis.speak(optionCutterance);
            optionCutterance.rate=0.7;
        }
        if(`${quizData[questionCount].option4}`!==''){
            window.speechSynthesis.speak(optionDutterance);
            optionDutterance.rate=0.7;
        }

        optionDutterance.onend = () => {
            readBtn.disabled=false;
            if(readBtn.disabled===false){
                readBtn.style.opacity='100%';
            }
        }

    })
    
}