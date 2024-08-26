const body=document.getElementById("body");
const back=document.getElementById("back");
const header=document.getElementById("header");
const startBtnContainer=document.getElementById("start-btn-container");
const banner=document.getElementById("banner");
const startBtn=document.getElementById("start-btn");
const quizGuideContainer=document.getElementById("quiz-guide-container");
const okBtn=document.getElementById("ok-btn");
const readCheck=document.getElementById("read-check");
const readGuideContainer=document.getElementById("read-guide-container");
const horizontalPane=document.getElementById("horizontal-pane");
const readAudio=document.getElementById("read-audio");
const greenFlash=document.getElementById("green-flash");
const redFlash=document.getElementById("red-flash");

back.addEventListener('click', function() {
    window.location.href='index.html';
})

startBtn.addEventListener('click', function() {
    header.style.display='none';
    startBtnContainer.style.display='none';
    quizGuideContainer.style.display='block';
    back.style.display='block';
})

okBtn.addEventListener('click', function() {
    if(readCheck.checked){
        header.style.display='none';
        startBtnContainer.style.display='none';
        horizontalPane.style.display='none';
        quizGuideContainer.style.display='none';
        readGuideContainer.style.display='block';
        back.style.display='block';
        back.style.border='1px solid white';
        setTimeout(() => {
            readGuideContainer.classList.add('visible')
            setTimeout(() => {
                greenFlash.style.display='block';
                }, 28390)
            setTimeout(() => {
                redFlash.style.display='block';
                }, 30900)
            setTimeout(() => {
                readAudio.play();
                }, 1000)
        }, 100)
        setTimeout(() => {
            // readGuideContainer.classList.add('visible')
            readGuideContainer.classList.remove('visible')
            setTimeout(() => {
            window.location.href='quiz-space.html';
            }, 3000)
        }, 35500)
    }
    else{
        window.location.href='quiz-space.html';
    }
})