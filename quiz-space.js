const body=document.getElementById("body");
const back=document.getElementById("back");
const header=document.getElementById("header");
const rightWrongContainer=document.getElementById("right-wrong-container");
const right=document.getElementById("right");
const wrong=document.getElementById("wrong");
const rightText=document.getElementById("right-txt");
const wrongText=document.getElementById("wrong-txt");
const correctAnswerAudio=document.getElementById("correct-answer-audio");
const wrongAnswerAudio=document.getElementById("wrong-answer-audio");
const horizontalPane=document.getElementById("horizontal-pane");


back.addEventListener('click', function() {
    window.location.href='index.html';
})

right.addEventListener('click', function() {
    header.style.display='none';
    back.style.display='none';
    horizontalPane.style.display='none';
    rightWrongContainer.style.display='none';
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
            window.location.href='quiz-space.html'
        },2300)
    }, 1500)
})



wrong.addEventListener('click', function() {
    header.style.display='none';
    back.style.display='none';
    horizontalPane.style.display='none';
    rightWrongContainer.style.display='none';
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
            window.location.href='quiz-space.html'
        },2300)
    }, 1500)
})